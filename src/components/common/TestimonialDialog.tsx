import { FormType } from "@/utils/schemas/createFormSchema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { TextForm } from "./TextForm";
import { VideoForm } from "./VideoForm";

interface TestimonialDialogProps {
  children: React.ReactNode;
  accepts: FormType[];
  buttonColor: string;
}

export function TestimonialDialog({ children, accepts, buttonColor }: TestimonialDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="h-screen max-h-screen max-w-full overflow-y-auto sm:h-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create your own testimonial</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from
            our servers.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Tabs defaultValue="account" className="h-full">
            <TabsList className={`grid w-full ${accepts.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
              {accepts.includes(FormType.TEXT) ? <TabsTrigger value="text">Text</TabsTrigger> : null}
              {accepts.includes(FormType.VIDEO) ? <TabsTrigger value="video">Vídeo</TabsTrigger> : null}
            </TabsList>

            <TabsContent value="text">
              <TextForm buttonColor={buttonColor} />
            </TabsContent>
            <TabsContent value="video">
              <VideoForm buttonColor={buttonColor} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
