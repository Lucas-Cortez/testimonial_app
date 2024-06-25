import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main>
      <section className="mx-auto max-w-screen-lg pt-4">
        <Link href={"/dashboard/create"}>
          <Button>Create Form</Button>
        </Link>
      </section>
    </main>
  );
}
