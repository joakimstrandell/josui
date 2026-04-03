import { createFileRoute } from "@tanstack/react-router";
import { Page, PageSection } from "@josui/react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <Page>
      <PageSection paddingSize="sm" className="my-auto">
        <div className="copy copy-lg">
          <h1 className="max-w-[25ch]">Independent Product Design &amp; Engineering Studio</h1>

          <p className="copy-lg">
            Awkward Group AB is a production studio and consultancy operated by Joakim Strandell in
            Stockholm, Sweden. The company functions as a venture lab for digital products, while
            providing specialized expertise in UX/UI design, modern web engineering, and AI
            integration.
          </p>

          <p>
            For consulting inquiries, portfolio, and case studies:{" "}
            <a href="https://www.joakimstrandell.com">www.joakimstrandell.com</a>
          </p>
        </div>
      </PageSection>
    </Page>
  );
}
