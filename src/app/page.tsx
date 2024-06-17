import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main>
      <Input name="name" placeholder="John Doe" />
      <Button variant={"secondary"}>Create testimonial</Button>
    </main>
  );
}
