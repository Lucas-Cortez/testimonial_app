"use client";

import { ChangeEventHandler, MouseEventHandler, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Upload, XIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface AvatarPhotoInputProps {}

export function AvatarPhotoInput({}: AvatarPhotoInputProps) {
  const [image, setImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadLocalFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target?.files?.[0];

    if (!file) return;

    setImage(file);

    await fetch("/api/protected");
  };

  const clearImage: MouseEventHandler<HTMLSpanElement> = () => {
    if (inputRef.current) inputRef.current.value = "";
    setImage(null);
  };

  const avatarImgUrl = image ? URL.createObjectURL(image) : "";

  return (
    <div className="">
      <Label htmlFor="userPhoto">User photo</Label>

      <div className="flex items-center gap-2">
        <div className="relative w-16">
          <Avatar className="h-14 w-14">
            <AvatarImage src={avatarImgUrl} alt="profile photo" className="object-cover" />
            <AvatarFallback className="text-xl">CN</AvatarFallback>
          </Avatar>

          {image && (
            <div
              onClick={clearImage}
              className="absolute right-0 top-0 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-white"
            >
              <XIcon size={16} />
            </div>
          )}

          {/* <div className="flex aspect-square h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-slate-100">
            {image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={URL.createObjectURL(image)} alt="user photo" className="w-full select-none" />
            )}
          </div> */}
          {/* {image && <Image src={URL.createObjectURL(image)} width={40} height={40} alt="user photo" />} */}
        </div>

        <div>
          <Input
            name="userPhoto"
            id="userPhoto"
            type="file"
            accept="image/*"
            multiple={false}
            onChange={uploadLocalFile}
            ref={inputRef}
            className="sr-only hidden"
          />
          <Button variant={"outline"} type="button" onClick={() => inputRef.current?.click()}>
            Load image
            <Upload className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
