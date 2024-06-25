import { ReviewCard } from "@/components/common/ReviewCard";
import { TestimonialDialog } from "@/components/common/TestimonialDialog";
import { TextForm } from "@/components/common/TextForm";
import { auth, signOut } from "@/lib/auth";

export default async function TestimonialPage() {
  // const session = await auth();

  // console.log("session: ", session);

  return (
    <main className="mx-auto w-full max-w-screen-lg">
      {/* <TestimonialDialog /> */}
      {/* <header className="z-10 flex h-16 w-full items-center border-b bg-white">Logo</header> */}

      <div className="flex h-screen items-center justify-center">
        <div className="min-w-[28rem] max-w-lg">
          <ReviewCard
            headline="Headline"
            customMessage="Custom Message"
            customColor="#000000"
            customButtonMessage="Button"
          />
        </div>
      </div>

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
