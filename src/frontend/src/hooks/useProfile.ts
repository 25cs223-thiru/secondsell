import type { UserProfile as BackendProfile } from "@/backend";
import type { UserProfile } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBackend } from "./useBackend";

// ── Map backend UserProfile → frontend UserProfile ────────────────────────────
function mapProfile(b: BackendProfile): UserProfile {
  try {
    return {
      name: b.username ?? "Seller",
      bio: b.bio || undefined,
      avatar: b.avatarUrl || undefined,
      joinedAt: b.createdAt,
      totalListings: Number(b.listingCount ?? 0),
    };
  } catch {
    return { name: "Seller" };
  }
}

function mapProfileToBackend(
  profile: UserProfile,
  existing: BackendProfile,
): BackendProfile {
  return {
    ...existing,
    username: profile.name,
    bio: profile.bio ?? "",
    avatarUrl: profile.avatar || undefined,
  };
}

// ── My profile ────────────────────────────────────────────────────────────────
export function useMyProfile() {
  const { actor, isFetching } = useBackend();
  const { isAuthenticated } = useInternetIdentity();

  const query = useQuery<UserProfile | null>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const result = await actor.getCallerUserProfile();
        return result ? mapProfile(result) : null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    retry: false,
  });

  return {
    ...query,
    isLoading: isFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

// ── Any user profile ──────────────────────────────────────────────────────────
export function useUserProfile(userId: string | undefined) {
  const { actor, isFetching } = useBackend();

  // Validate that the userId is a plausible Principal text before enabling
  const isValidPrincipal = !!userId && userId.trim().length > 0;

  return useQuery<UserProfile | null>({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      try {
        // Dynamically import Principal so conversion errors are caught locally
        const { Principal } = await import("@icp-sdk/core/principal");
        let principal: Principal;
        try {
          principal = Principal.fromText(userId);
        } catch {
          // userId is not a valid Principal string — return null gracefully
          return null;
        }
        const result = await actor.getUserProfile(principal);
        return result ? mapProfile(result) : null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && isValidPrincipal,
    retry: false,
  });
}

// ── Save profile ──────────────────────────────────────────────────────────────
export function useSaveProfile() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      const existing = await actor.getCallerUserProfile();
      const backendProfile: BackendProfile = existing
        ? mapProfileToBackend(profile, existing)
        : {
            username: profile.name,
            bio: profile.bio ?? "",
            avatarUrl: profile.avatar || undefined,
            userId: "" as unknown as Principal,
            createdAt: BigInt(0),
            listingCount: BigInt(0),
          };
      return actor.saveCallerUserProfile(backendProfile);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
}
