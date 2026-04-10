"use client";

import * as React from "react";
import { Loader2, UploadCloudIcon, Trash2Icon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
  type FileUploadProps,
} from "@/components/ui/file-upload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteUsersAvatarMutation, uploadUsersAvatarMutation } from "@/tanstack/mutations";
import { usersQuery } from "@/tanstack/queries";
import { cn } from "@/lib/utils";

type TProfilePicUploadDialogProps = {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProfilePicUploadDialog({ isOpen, onOpenChange }: TProfilePicUploadDialogProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isLoading, setLoading] = React.useState(false);
  const uploadAvatarMutation = uploadUsersAvatarMutation();
  const deleteAvatarMutation = deleteUsersAvatarMutation();

  const { data: usersData } = useQuery(usersQuery.default());
  const hasAvatar = React.useMemo(() => !!usersData?.avatarUrl, [usersData]);

  const onUpload: NonNullable<FileUploadProps["onUpload"]> = React.useCallback(
    async (files, { onProgress, onSuccess, onError }) => {
      try {
        const uploadPromises = files.map(async (file) => {
          try {
            const totalChunks = 10;
            let uploadedChunks = 0;
            for (let i = 0; i < totalChunks; i++) {
              await new Promise((resolve) =>
                setTimeout(resolve, Math.random() * 200 + 100),
              );
              uploadedChunks++;
              onProgress(file, (uploadedChunks / totalChunks) * 100);
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
            onSuccess(file);
          } catch (error) {
            onError(file, error instanceof Error ? error : new Error("Upload failed"));
          }
        });
        await Promise.all(uploadPromises);
      } catch (error) {
        console.error("Unexpected error during upload:", error);
      }
    },
    [],
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    });
  }, []);

  // To change profile pic
  const handleUploadProfilePic = async () => {
    setLoading(true);

    uploadAvatarMutation.mutate({ file: files[0] }, {
      onError: (error) => {
        toast.error("Error while uploading your Profile Picture", { description: error.message });
      },
      onSuccess: () => {
        toast.success("Profile Picture uploaded successfully!", { icon: "🥳" });
        setFiles([]);
      },
      onSettled: () => setLoading(false),
    });
  };

  // To delete profile pic
  const deleteProfilePic = async () => {
    setLoading(true);

    deleteAvatarMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Profile Picture removed.", { icon: "🗑️" });
      },
      onError: (error) => {
        toast.error("Error while deleting your Profile Picture", { description: error.message });
      },
      onSettled: () => setLoading(false),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden gap-0">
        {/* Gradient hero header */}
        <div className="relative flex flex-col items-center gap-4 px-6 pt-8 pb-6 b border-zinc-700/50">
          <DialogHeader className="sr-only">
            <DialogTitle>Manage Profile Picture</DialogTitle>
          </DialogHeader>

          {/* Large avatar preview */}
          <Avatar className="size-36">
            <AvatarImage
              src={usersData?.avatarUrl ?? undefined}
              alt={usersData?.name ?? "User"}
              className="object-fill"
            />
            <AvatarFallback className="size-24 text-3xl font-bold bg-zinc-800 text-primary">
              {usersData?.name?.slice(0, 1).toUpperCase() ?? "?"}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <p className="font-semibold text-base">{usersData?.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {hasAvatar ? "Profile picture set" : "No profile picture"}
            </p>
          </div>
        </div>

        {/* Upload area */}
        <div className="px-6 py-5 space-y-4">
          <FileUpload
            value={files}
            onValueChange={setFiles}
            onUpload={onUpload}
            onFileReject={onFileReject}
            maxFiles={1}
            className="w-full"
          >
            <FileUploadDropzone className="border-2 border-dashed border-zinc-400 hover:border-primary transition-all duration-200 rounded-xl py-8">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary">
                  <UploadCloudIcon className="size-6" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-medium text-sm">
                    Drag & drop your photo here
                  </p>
                  <p className="text-muted-foreground text-xs">
                    PNG, JPG, WEBP up to 5MB
                  </p>
                </div>
                <FileUploadTrigger asChild>
                  <Button variant="outline" size="sm" className="mt-1">
                    Browse file
                  </Button>
                </FileUploadTrigger>
              </div>
            </FileUploadDropzone>

            <FileUploadList>
              {files.map((file, index) => (
                <FileUploadItem
                  key={index}
                  value={file}
                  className="flex-col mt-2 bg-zinc-900/50 rounded-lg px-3 py-2 border border-zinc-700/50"
                >
                  <div className="flex w-full items-center gap-2">
                    <FileUploadItemPreview />
                    <FileUploadItemMetadata />
                    <FileUploadItemDelete asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 ml-auto"
                      >
                        <XIcon className="size-4" />
                      </Button>
                    </FileUploadItemDelete>
                  </div>
                  <FileUploadItemProgress />
                </FileUploadItem>
              ))}
            </FileUploadList>
          </FileUpload>

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-1">
            <Button
              onClick={handleUploadProfilePic}
              disabled={files.length === 0 || isLoading}
              className="w-full gap-2"
            >
              {isLoading
                ? <Loader2 className="size-4 animate-spin" />
                : <UploadCloudIcon className="size-4" />
              }
              Upload Photo
            </Button>

            {hasAvatar && (
              <Button
                variant="outline"
                onClick={deleteProfilePic}
                disabled={isLoading}
                className="text-destructive"
              >
                {isLoading
                  ? <Loader2 className="size-4 animate-spin" />
                  : <Trash2Icon className="size-4" />
                }
                Remove current photo
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}