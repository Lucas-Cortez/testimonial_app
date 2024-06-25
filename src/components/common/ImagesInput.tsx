/* eslint-disable @next/next/no-img-element */
"use client";

import { Trash, Upload, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChangeEventHandler, MouseEventHandler, useRef, useState } from "react";

interface ImagesInputProps {}

export function ImagesInput({}: ImagesInputProps) {
  const [images, setImages] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadLocalFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const fileList = e.target?.files;

    if (!fileList || !fileList.length) return;

    const files = Array.from(fileList);

    console.log(files);

    setImages((prev) => [...prev, ...files]);
  };

  const clearImages: MouseEventHandler<HTMLSpanElement> = () => {
    if (inputRef.current) inputRef.current.value = "";
    setImages([]);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="testimonialPhotos">Images</Label>

        <div className="flex items-center gap-2">
          <div>
            <Input
              name="testimonialPhotos"
              id="testimonialPhotos"
              type="file"
              accept="image/*"
              multiple={true}
              onChange={uploadLocalFile}
              ref={inputRef}
              className="sr-only hidden"
            />
            <Button variant={"outline"} type="button" onClick={() => inputRef.current?.click()}>
              Load images
              <Upload className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {!!images.length && (
            <Button size={"icon"} variant={"ghost"} onClick={clearImages}>
              <Trash size={16} />
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {images.map((image) => (
          <div
            key={image.name}
            className="relative flex aspect-square h-16 w-16 items-center justify-center overflow-hidden rounded-md border-2 border-gray-200 bg-slate-100"
          >
            <img
              src={URL.createObjectURL(image)}
              alt="user_photo"
              className="h-full w-full select-none object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
