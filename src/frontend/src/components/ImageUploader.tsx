import { ExternalBlob } from "@/backend";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageIcon, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

interface ImageUploaderProps {
  images: ExternalBlob[];
  onChange: (images: ExternalBlob[]) => void;
  maxImages?: number;
  className?: string;
}

interface UploadingFile {
  id: string;
  name: string;
  previewUrl: string;
  progress: number;
  blob?: ExternalBlob;
  done: boolean;
}

export function ImageUploader({
  images,
  onChange,
  maxImages = 6,
  className,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<UploadingFile[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const processFiles = async (files: File[]) => {
    const allowed =
      maxImages - images.length - uploading.filter((u) => !u.done).length;
    const toProcess = files.slice(0, allowed);
    if (!toProcess.length) return;

    const newUploading: UploadingFile[] = toProcess.map((file) => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      previewUrl: URL.createObjectURL(file),
      progress: 0,
      done: false,
    }));

    setUploading((prev) => [...prev, ...newUploading]);

    const results = await Promise.all(
      toProcess.map(async (file, i) => {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
          setUploading((prev) =>
            prev.map((u) =>
              u.id === newUploading[i].id ? { ...u, progress: pct } : u,
            ),
          );
        });
        setUploading((prev) =>
          prev.map((u) =>
            u.id === newUploading[i].id ? { ...u, done: true, blob } : u,
          ),
        );
        return blob;
      }),
    );

    onChange([...images, ...results]);
    // Clean up completed uploads after a delay
    setTimeout(() => {
      setUploading((prev) => prev.filter((u) => !u.done));
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      processFiles(
        Array.from(e.dataTransfer.files).filter((f) =>
          f.type.startsWith("image/"),
        ),
      );
    }
  };

  const removeImage = (index: number) => {
    const next = images.filter((_, i) => i !== index);
    onChange(next);
  };

  const canUploadMore = images.length < maxImages;

  return (
    <div className={cn("space-y-3", className)} data-ocid="image_uploader">
      {/* Existing images */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((blob, i) => (
            <div
              key={blob.getDirectURL()}
              className="relative aspect-square rounded-lg overflow-hidden bg-muted border border-border"
            >
              <img
                src={blob.getDirectURL()}
                alt={`Listing ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 p-0.5 rounded-full bg-foreground/60 text-background hover:bg-foreground/80 transition-colors"
                aria-label={`Remove image ${i + 1}`}
                data-ocid={`image_uploader.remove_button.${i + 1}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* In-progress uploads */}
      {uploading.filter((u) => !u.done).length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {uploading
            .filter((u) => !u.done)
            .map((u) => (
              <div
                key={u.id}
                className="relative aspect-square rounded-lg overflow-hidden bg-muted border border-border"
              >
                <img
                  src={u.previewUrl}
                  alt={u.name}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-end p-2">
                  <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all"
                      style={{ width: `${u.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Upload zone */}
      {canUploadMore && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-smooth",
            dragOver
              ? "border-accent bg-accent/5"
              : "border-border hover:border-primary/50 hover:bg-muted/30",
          )}
          data-ocid="image_uploader.dropzone"
        >
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Drop files here
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              or click to browse — {images.length}/{maxImages} uploaded
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
            data-ocid="image_uploader.upload_button"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose files
          </Button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
