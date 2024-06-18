import { TestimonialDialog } from "@/components/common/TestimonialDialog";
import { TextForm } from "@/components/common/TextForm";
import { auth, signOut } from "@/lib/auth";

export default async function TestimonialPage() {
  // const session = await auth();

  // console.log("session: ", session);

  return (
    <main>
      {/* <TextForm /> */}
      <TestimonialDialog />

      {/* <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button variant={"secondary"}>Sign Out</Button>
        </form> */}
    </main>
  );
}
