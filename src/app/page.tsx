import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <p>Landing Page</p>

      <Link href={"/dashboard"}>
        <Button variant={"secondary"}>Testimonial</Button>
      </Link>
    </main>
  );
}
