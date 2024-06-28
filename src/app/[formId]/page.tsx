import { ReviewCard } from "@/components/common/ReviewCard";
import { db } from "@/lib/db";
import { FormType } from "@/utils/schemas/createFormSchema";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

interface TestimonialProps {
  params: { formId: string };
}

export default async function Testimonial(props: TestimonialProps) {
  const data = await db.form.findUnique({
    where: { formId: props.params.formId },
    include: { accepts: true },
  });

  if (!data) {
    notFound();
  }

  return (
    <main className="mx-auto flex h-screen w-full max-w-screen-lg items-center justify-center">
      <div className="min-w-[28rem] max-w-lg">
        <ReviewCard
          headline={data.headline}
          customMessage={data.customMessage}
          customColor={data.customColor}
          customButtonMessage={data.customButtonMessage}
          logoImgUrl={data.logoImgUrl}
          accepts={data.accepts.map((item) => item.value as FormType)}
        />
      </div>
    </main>
  );
}
