import { type Backend, createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";

/**
 * Provides typed access to the backend actor.
 * Returns `{ actor, isFetching }` where `actor` is null until ready.
 */
export function useBackend() {
  const { actor, isFetching } = useActor(createActor);
  return {
    actor: actor as Backend | null,
    isFetching,
    isReady: !!actor && !isFetching,
  };
}
