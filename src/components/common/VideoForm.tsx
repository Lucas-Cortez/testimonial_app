import { AvatarPhotoInput } from "@/components/common/AvatarPhotoInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VideoInput } from "./VideoInput";

interface VideoFormProps {
  buttonColor: string;
}

export function VideoForm({ buttonColor }: VideoFormProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <form
        className="flex w-full flex-col space-y-4"
        action={async (formData: FormData) => {
          "use server";

          console.log("VideoForm:", formData);
        }}
      >
        <div className="space-y-2">
          <AvatarPhotoInput />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <span className="text-red-600">*</span>
              <Input id="name" name="name" placeholder="John" />
            </div>

            <div>
              <Label htmlFor="surname">Surname</Label>
              <span className="text-red-600">*</span>
              <Input id="surname" name="surname" placeholder="Doe" />
            </div>
          </div>

          <div>
            <Label htmlFor="email">E-mail</Label>
            <span className="text-red-600">*</span>
            <Input id="email" name="email" placeholder="john@doe.com" />
          </div>

          <div>
            <Label htmlFor="title">Video title</Label>
            <Input id="title" name="title" placeholder="This product is awesome!..." />
          </div>

          <VideoInput />
        </div>

        <div className="flex gap-2">
          <div className="min-w-fit">
            <Checkbox name="terms" id="terms"></Checkbox>
          </div>
          <div>
            <Label htmlFor="terms">
              <p className="leading-normal">
                I give permission to use this testimonial through social channels and other marketing efforts
              </p>
            </Label>
          </div>
        </div>

        <Button style={{ backgroundColor: buttonColor }}>Create testimonial</Button>
      </form>
    </div>
  );
}
