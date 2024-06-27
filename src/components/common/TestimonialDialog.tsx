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
}

export function TestimonialDialog({ children }: TestimonialDialogProps) {
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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="video">Vídeo</TabsTrigger>
            </TabsList>

            <TabsContent value="text">
              <TextForm />
            </TabsContent>
            <TabsContent value="video">
              <VideoForm />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
