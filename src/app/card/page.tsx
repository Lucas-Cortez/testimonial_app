import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function CardPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-slate-100" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <p className="text-center text-2xl">Headline</p>
          <p className="text-center">Custom Text</p>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full">Registry review</Button>
      </CardFooter>
    </Card>
  );
}
