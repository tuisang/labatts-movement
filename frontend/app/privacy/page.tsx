import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";

export default function PrivacyPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto py-10">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
          Privacy Policy
        </h1>
        <p className="text-on-surface-variant text-sm mb-10">Last updated: July 2026</p>

        <div className="flex flex-col gap-8 text-sm text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Labatts Movement (&quot;we&quot;,
              &quot;us&quot;) collects, uses, and protects information when you use our website
              and services. We are based in Nairobi, Kenya, and aim to handle personal data in
              line with Kenya&apos;s Data Protection Act, 2019.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">2. Information We Collect</h2>
            <p className="mb-2"><strong className="text-on-surface">Account information:</strong> name and email address, via our authentication provider (Clerk), when you create an account.</p>
            <p className="mb-2"><strong className="text-on-surface">Booking information:</strong> name, phone number, email address, session preferences, and payment method when you book a session or hire equipment.</p>
            <p className="mb-2"><strong className="text-on-surface">Athlete information:</strong> if you use the Parent Portal, you may provide information about an athlete in your care, including their name, age group, and sport. This is information you provide about a minor as their parent or guardian — we do not knowingly collect information directly from children.</p>
            <p className="mb-2"><strong className="text-on-surface">Payment information:</strong> M-Pesa transactions are processed by Safaricom&apos;s Daraja platform. We receive and store a transaction reference and receipt number to confirm payment, but we do not receive or store your M-Pesa PIN or full financial account details.</p>
            <p><strong className="text-on-surface">Chat data:</strong> if you use our &quot;Athlete&quot; AI assistant, your messages and the assistant&apos;s responses are stored to maintain conversation history and are processed by Google&apos;s Gemini API to generate responses.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">3. How We Use Information</h2>
            <p>
              We use the information collected to: provide and manage bookings and sessions;
              track athlete progress for parents and coaches; process payments; communicate with
              you about your bookings; respond to inquiries; operate the AI chat assistant; and
              improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">4. Children&apos;s Data</h2>
            <p>
              Our Services are intended for use by parents, guardians, and adult institutional
              contacts, not by children directly. Information about athletes under 18 is
              provided to us by their parent or legal guardian, who is responsible for the
              accuracy of that information and for authorizing its collection. If you believe a
              child has provided us with personal information directly without appropriate
              parental involvement, please contact us so we can address it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">5. Third-Party Service Providers</h2>
            <p className="mb-2">We rely on the following third parties to operate our Services, each of which processes relevant data as part of providing their service to us:</p>
            <ul className="list-disc list-inside flex flex-col gap-1">
              <li>Clerk — authentication and account management</li>
              <li>Neon — database hosting</li>
              <li>Safaricom Daraja (M-Pesa) — payment processing</li>
              <li>Google Gemini — AI chat assistant responses</li>
              <li>Vercel — website hosting</li>
            </ul>
            <p className="mt-2">
              Some of these providers may process or store data outside Kenya as part of their
              standard infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">6. Data Retention</h2>
            <p>
              We retain booking, athlete, and account information for as long as your account is
              active or as needed to provide the Services, and as required to meet legal,
              accounting, or reporting obligations. You may request deletion of your data as
              described below.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">7. Your Rights</h2>
            <p>
              Subject to applicable law, you may request access to, correction of, or deletion of
              your personal information, or that of an athlete in your care, by contacting us at
              the email below.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">8. Cookies</h2>
            <p>
              We use essential cookies required for authentication and core site functionality.
              We do not currently use advertising or third-party tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">9. Data Security</h2>
            <p>
              We take reasonable technical and organizational measures to protect personal
              information, including encrypted database connections and access controls limiting
              who can view booking, athlete, and payment records. No system can be guaranteed
              100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be
              reflected by updating the &quot;Last updated&quot; date above.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">11. Contact</h2>
            <p>
              For privacy questions or requests, contact us at{" "}
              <a href="mailto:info@tuistech.co.ke" className="text-primary underline">
                info@tuistech.co.ke
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
