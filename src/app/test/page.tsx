import Script from "next/script";

export default function Test() {
  return (
    <main>
      {/* <iframe src="http://localhost:3000/testimonial"></iframe> */}
      {/* <Script
        type="text/javascript"
        src="https://testimonial.to/js/iframeResizer.min.js"
        strategy="beforeInteractive"
      ></Script>
      <iframe
        id="testimonialto-test-prototype-tag-all-light"
        src="https://embed-v2.testimonial.to/w/test-prototype?theme=light&card=small&loadMore=on&initialCount=20&tag=all"
        frameBorder="0"
        scrolling="no"
        width="100%"
      ></iframe>
      <Script id="frame-resize" type="text/javascript">
        {`iFrameResize({log: false, checkOrigin: false}, '#testimonialto-test-prototype-tag-all-light');`}
      </Script>

      <Script async type="text/javascript" src="https://testimonial.to/js/widget-embed.js"></Script>
      <div
        // class="testimonial-to-embed"
        data-url="https://embed-v2.testimonial.to/badge/test-prototype?backgroundColor=8ed1fc&fontColor=000000&fontFamily=Roboto&reviewTerm=review&fontSize=16&reviewTermPlural=reviews&alignment=left"
        data-resize="true"
        data-resize-width="true"
        data-redirect-click="https://testimonial.to/test-prototype/all"
        className="testimonial-to-embed w-fit"
        // style="width:fit-content"
      ></div> */}
      {/* <div
        dangerouslySetInnerHTML={{
          __html: `
          <div style="position: relative; overflow: hidden; width: 100%; padding-top: 56.25%;">
            <iframe
              src="https://www.testimonify.co/testimonials/dc96989e-be18-4502-83fa-c58e3860be44"
              frameborder="0"
              allowfullscreen
              style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%;"
            ></iframe>
          </div>
        `,
        }}
      ></div> */}
    </main>
  );
}
