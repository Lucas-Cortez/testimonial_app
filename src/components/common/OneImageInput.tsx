import { ChangeEventHandler, useRef, useState } from "react";
import { Upload, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface OneImageInputProps {
  onValueChange?: (file: File | null) => void;
}

export function OneImageInput({ onValueChange }: OneImageInputProps) {
  const [imgUrlPreview, setImgUrlPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadLocalFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target?.files?.[0];

    if (!file) return;

    onValueChange?.(file);
    setImgUrlPreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    if (inputRef.current) inputRef.current.value = "";
    onValueChange?.(null);
    setImgUrlPreview(null);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        {imgUrlPreview && (
          <div
            onClick={clearImage}
            className="absolute right-0 top-0 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-[1px] bg-white shadow-lg"
          >
            <XIcon size={16} />
          </div>
        )}

        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-slate-100">
          {imgUrlPreview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imgUrlPreview} alt="user photo" className="h-full w-full select-none object-cover" />
          )}
        </div>
      </div>

      <div>
        <Input
          name="logoImgFile"
          id="logoImgFile"
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
  );
}
