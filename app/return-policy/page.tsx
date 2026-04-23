import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Return Policy | NoKasa",
  description: "NoKasa's return policy for clothing pickup services.",
};

export default function ReturnPolicyPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20 transition-colors duration-500">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p className="text-[11px] font-black text-brand uppercase tracking-[0.4em] mb-4">Legal</p>
            <h1
              className="text-[44px] md:text-[56px] font-black text-gray-950 dark:text-gray-100 leading-[1.1] tracking-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Return Policy
            </h1>
            <p className="text-gray-400 text-[14px] font-medium">Last updated: March 2026</p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">

            <section>
              <h2 className="text-[20px] font-black text-gray-900 dark:text-gray-100 mb-3">Overview</h2>
              <p>
                At NoKasa, our service involves the pickup, segregation, and responsible redistribution of pre-owned clothing. Because we deal in used garments that are processed and sent onward to recycling or resale partners, our return policy differs from a traditional e-commerce return policy. Please read this page carefully.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-black text-gray-900 dark:text-gray-100 mb-3">1. Clothes Submitted for Pickup</h2>
              <p>
                Once our delivery agent has collected your clothes and you have received your rewards, the transaction is considered complete. We are unable to return clothes that have already been collected and processed.
              </p>
              <p className="mt-3">
                We strongly recommend reviewing your items before handing them over. Only submit clothes you are certain you wish to part with.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-black text-gray-900 dark:text-gray-100 mb-3">2. Cancelling a Scheduled Pickup</h2>
              <p>
                You may cancel or reschedule a pickup at any time before the delivery agent arrives at your location. To cancel, use the NoKasa app or contact our support team at{" "}
                <a href="mailto:support@nokasa.co" className="text-brand hover:underline">support@nokasa.co</a>{" "}
                or call us at{" "}
                <a href="tel:+916363005509" className="text-brand hover:underline">+91 6363 005 509</a>.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-black text-gray-900 dark:text-gray-100 mb-3">3. Rewards and Credits</h2>
              <p>
                If you believe there was an error in the rewards calculated for your pickup, please contact us within 7 days of the pickup date. We will review the case and, if an error is confirmed, issue a correction to your account.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-black text-gray-900 dark:text-gray-100 mb-3">4. Items Collected in Error</h2>
              <p>
                If our agent accidentally collected an item that was not intended for pickup (e.g., placed in the pile by mistake), please contact us immediately at{" "}
                <a href="mailto:support@nokasa.co" className="text-brand hover:underline">support@nokasa.co</a>. We will make every effort to retrieve and return the item, but cannot guarantee recovery once items have entered our processing facility.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-black text-gray-900 dark:text-gray-100 mb-3">5. Contact Us</h2>
              <p>For any queries related to this policy, reach out to our support team:</p>
              <ul className="list-none mt-3 space-y-2">
                <li>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Email: </span>
                  <a href="mailto:support@nokasa.co" className="text-brand hover:underline">support@nokasa.co</a>
                </li>
                <li>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Phone: </span>
                  <a href="tel:+916363005509" className="text-brand hover:underline">+91 6363 005 509</a>
                </li>
              </ul>
            </section>

          </div>
        </div>
      </Container>
    </main>
  );
}
