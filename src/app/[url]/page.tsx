interface TestimonialProps {
  params: { url: string };
}

export default async function Testimonial(props: TestimonialProps) {
  console.log(props);

  return <main>Testimonial</main>;
}
