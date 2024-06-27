import { ReviewCard } from "@/components/common/ReviewCard";

interface TestimonialPageProps {
  params: {
    formId: string;
  };
}

export default async function TestimonialPage({ params: { formId } }: TestimonialPageProps) {
  return (
    <main className="flex h-[calc(100vh_-_4rem)] w-full max-w-screen-lg items-center justify-center">
      <div className="min-w-[28rem] max-w-lg">
        <ReviewCard
          headline="Headline"
          customMessage="Custom Message"
          customColor="#000000"
          customButtonMessage="Button"
        />
      </div>
    </main>
  );
}
