/* eslint-disable @next/next/no-img-element */
import { CreateFormValues } from "@/utils/schemas/createFormSchema";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Control, useWatch } from "react-hook-form";

interface FormReviewCardWrapperProps {
  control: Control<CreateFormValues>;
}

export function FormReviewCardWrapper({ control }: FormReviewCardWrapperProps) {
  const watched = useWatch({
    control,
    name: ["customButtonMessage", "customColor", "headline", "customMessage", "logoImgFile"],
  });

  const [customButtonMessage = "", customColor = "", headline = "", customMessage = "", logoImgFile] =
    watched;

  const logoImgUrl = logoImgFile ? URL.createObjectURL(logoImgFile) : "";

  return (
    <div className="rounded-lg bg-gray-100 p-4">
      <h3 className="mb-4 text-lg font-medium">Preview</h3>

      <Card>
        {logoImgUrl ? (
          <CardHeader>
            <div className="flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                <img src={logoImgUrl} alt="card_logo" className="h-full w-full select-none object-cover" />
              </div>
            </div>
          </CardHeader>
        ) : (
          <div className="pt-6" />
        )}

        <CardContent className="space-y-2">
          <p className="text-center text-2xl">{headline}</p>
          <p className="text-center">{customMessage}</p>
        </CardContent>

        <CardFooter>
          <Button className="w-full" type="button" style={{ backgroundColor: customColor }}>
            {customButtonMessage}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
