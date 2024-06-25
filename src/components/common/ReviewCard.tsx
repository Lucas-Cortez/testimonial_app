/* eslint-disable @next/next/no-img-element */
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface ReviewCardProps {
  headline: string;
  customMessage: string;
  customColor: string;
  customButtonMessage: string;
  logoImgUrl?: string;
}

export function ReviewCard({
  customButtonMessage,
  customColor,
  headline,
  customMessage,
  logoImgUrl,
}: ReviewCardProps) {
  return (
    <Card>
      {logoImgUrl ? (
        <CardHeader>
          <div className="flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-slate-100">
              <img src={logoImgUrl} alt="user photo" className="h-full w-full select-none object-cover" />
            </div>
          </div>
        </CardHeader>
      ) : (
        <div className="pt-6" />
      )}

      <CardContent>
        <div className="space-y-2">
          <p className="text-center text-2xl">{headline}</p>
          <p className="text-center">{customMessage}</p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" type="button" style={{ backgroundColor: customColor }}>
          {customButtonMessage}
        </Button>

        <p>Powered by Pampa</p>
      </CardFooter>
    </Card>
  );
}
