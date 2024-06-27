import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const Divider = () => <div className="h-px bg-gray-200 dark:bg-gray-700" />;

export default function DashboardPage() {
  return (
    <main>
      <section className="mx-auto max-w-screen-lg space-y-4 pt-4">
        <h1 className="text-3xl font-bold">Forms</h1>

        <Divider />

        <div>
          <Link href={"/dashboard/create"}>
            <Button>Create Form</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
