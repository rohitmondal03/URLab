"use client";

import * as React from "react";
import { Loader, LoaderIcon, UploadIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { deleteUsersAvatarMutation, uploadUsersAvatarMutation } from "@/tanstack/mutations";
import Image from "next/image";
import { usersQuery } from "@/tanstack/queries";

type TProfilePicUploadDialogProps = {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProfilePicUploadDialog({ isOpen, onOpenChange }: TProfilePicUploadDialogProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isLoading, setLoading] = React.useState(false);
  const uploadAvatarMutation = uploadUsersAvatarMutation();
  const deleteAvatarMutation = deleteUsersAvatarMutation();

  const onUpload: NonNullable<FileUploadProps["onUpload"]> = React.useCallback(
    async (files, { onProgress, onSuccess, onError }) => {
      try {
        // Process each file individually
        const uploadPromises = files.map(async (file) => {
          try {
            // Simulate file upload with progress
            const totalChunks = 10;
            let uploadedChunks = 0;

            // Simulate chunk upload with delays
            for (let i = 0; i < totalChunks; i++) {
              // Simulate network delay (100-300ms per chunk)
              await new Promise((resolve) =>
                setTimeout(resolve, Math.random() * 200 + 100),
              );

              // Update progress for this specific file
              uploadedChunks++;
              const progress = (uploadedChunks / totalChunks) * 100;
              onProgress(file, progress);
            }

            // Simulate server processing delay
            await new Promise((resolve) => setTimeout(resolve, 500));
            onSuccess(file);
          } catch (error) {
            onError(
              file,
              error instanceof Error ? error : new Error("Upload failed"),
            );
          }
        });

        // Wait for all uploads to complete
        await Promise.all(uploadPromises);
      } catch (error) {
        // This handles any error that might occur outside the individual upload processes
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

  // To call profile pic upload server action
  const handleUploadProfilePic = async () => {

    setLoading(true);

    uploadAvatarMutation.mutate({ file: files[0] }, {
      onError: (error) => {
        toast.error("Error while uploading your Profile Picture", {
          description: error.message,
        })
      },
      onSuccess: () => {
        toast.success("Profile Picture uploaded successfully !!", {
          icon: "🥳"
        })
      },
      onSettled: () => {
        setLoading(false);
      }
    })
  }

  // To delete users profile picture
  const deleteProfilePic = async () => {
    setLoading(true);

    deleteAvatarMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Profile Picture deleted successfully !!", {
          icon: "🥳"
        })
      },
      onError: (error) => {
        toast.error("Error while deleting your Profile Picture", {
          description: error.message,
          icon: "😢"
        })
      },
      onSettled: () => {
        setLoading(false);
      }
    })
  }

  // fetch user's data
  const { data: usersData } = useQuery(usersQuery.default());

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Manage your Profile Picture from here
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center mx-auto size-32 rounded-2xl border-2">
          {usersData?.avatarUrl ? (
            <Image
              src={usersData?.avatarUrl as string}
              height={500}
              width={500}
              className="size-32 rounded-2xl object-cover"
              alt="users-avatar"
            />
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              No Profile pic uploaded
            </p>
          )}
        </div>
        <FileUpload
          value={files}
          onValueChange={setFiles}
          onUpload={onUpload}
          onFileReject={onFileReject}
          maxFiles={1}
          className="w-full max-w-md"
        >
          <FileUploadDropzone>
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="flex items-center justify-center rounded-full border p-2.5">
                <UploadIcon className="size-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-sm">
                Drag & drop file here
              </p>
              <p className="text-muted-foreground text-xs">
                Or click to browse
              </p>
            </div>
            <FileUploadTrigger asChild>
              <Button variant="outline" size="sm" className="mt-2 w-fit">
                Browse file
              </Button>
            </FileUploadTrigger>
          </FileUploadDropzone>
          <FileUploadList>
            {files.map((file, index) => (
              <FileUploadItem key={index} value={file} className="flex-col">
                <div className="flex w-full items-center gap-2">
                  <FileUploadItemPreview />
                  <FileUploadItemMetadata />
                  <FileUploadItemDelete asChild>
                    <Button variant="ghost" size="icon" className="size-7">
                      <XIcon />
                    </Button>
                  </FileUploadItemDelete>
                </div>
                <FileUploadItemProgress />
              </FileUploadItem>
            ))}
          </FileUploadList>
        </FileUpload>
        <DialogFooter>
          <Button
            onClick={handleUploadProfilePic}
            disabled={files.length === 0 || isLoading}
          >
            {isLoading ? <LoaderIcon className="animate-spin" /> : "Upload"}
          </Button>
          <Button
            variant="destructive"
            onClick={deleteProfilePic}
            disabled={isLoading}
          >
            {isLoading ? <LoaderIcon className="animate-spin" /> : "Delete Profile Pic"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}