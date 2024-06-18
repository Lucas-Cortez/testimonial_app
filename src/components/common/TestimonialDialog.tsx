import { Button } from "../ui/button";
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

export function TestimonialDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent className="h-screen overflow-auto sm:h-auto">
        <DialogHeader>
          <DialogTitle>Create your own testimonial</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from
            our servers.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="account" className="">
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
      </DialogContent>
    </Dialog>
  );
}
