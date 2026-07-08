import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";

export default function TermsPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto py-10">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
          Terms of Service
        </h1>
        <p className="text-on-surface-variant text-sm mb-10">Last updated: July 2026</p>

        <div className="flex flex-col gap-8 text-sm text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Labatts Movement website, booking a training session,
              hiring equipment, or otherwise using our services (collectively, the
              &quot;Services&quot;), you agree to be bound by these Terms of Service. If you are
              booking or registering on behalf of a minor (an athlete under 18), you confirm you
              are their parent or legal guardian and are authorized to accept these terms on
              their behalf.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">2. Description of Services</h2>
            <p>
              Labatts Movement provides athletic training programs, coach-led sessions, an
              instructional video library, equipment hire, and related services in Nairobi,
              Kenya, for individual athletes, families, and partner institutions (such as
              schools).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">3. Bookings and Payment</h2>
            <p className="mb-2">
              Sessions may be booked through the website. Depending on the option selected at
              booking, a KSh 1,000 confirmation fee may be collected via M-Pesa to reserve a
              session slot. This fee is separate from, and does not cover, the full cost of the
              session itself, which is payable separately (typically at the session, unless
              otherwise agreed). Alternatively, a booking may be made with payment due entirely
              at the session.
            </p>
            <p className="mb-2">
              M-Pesa payments are processed through Safaricom&apos;s Daraja payment platform. We
              do not store your M-Pesa PIN or full payment credentials; we retain only the
              transaction reference and receipt information needed to confirm and record your
              payment.
            </p>
            <p>
              If you need to cancel or reschedule a booking, please contact us as early as
              possible. The KSh 1,000 confirmation fee is generally non-refundable on less than
              24 hours&apos; notice but can typically be applied toward a rescheduled session at
              our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">4. Institutional Partnerships</h2>
            <p>
              Schools and other institutions may enter into a separate written partnership
              agreement with Labatts Movement, provided at no charge as described in that
              agreement. Institutional agreements are governed by their own specific terms in
              addition to these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">5. Equipment Hire</h2>
            <p>
              Equipment hired through Labatts Movement remains our property. You are responsible
              for the equipment for the duration of the hire period and agree to return it in
              the condition it was provided, ordinary wear and tear excepted. Loss or damage
              beyond ordinary wear and tear may be charged to the hiring party.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">6. Athlete Safety and Assumption of Risk</h2>
            <p>
              Athletic training carries an inherent risk of injury. By booking a session, you
              acknowledge this risk on behalf of yourself or the athlete you are registering.
              Coaches will take reasonable safety precautions, including appropriate warm-ups and
              age-appropriate program design, but Labatts Movement cannot guarantee against
              injury. If an athlete has a pre-existing medical condition relevant to physical
              training, please inform your coach before the session begins.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">7. Accounts</h2>
            <p>
              Certain features (such as the Parent Portal and booking history) require creating
              an account. You are responsible for maintaining the confidentiality of your account
              credentials and for all activity under your account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">8. Limitation of Liability</h2>
            <p>
              To the extent permitted by Kenyan law, Labatts Movement&apos;s liability for any
              claim arising from your use of the Services is limited to the amount you paid for
              the specific session or service giving rise to the claim. We are not liable for
              indirect, incidental, or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">9. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service from time to time. Continued use of the
              Services after changes are posted constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">10. Governing Law</h2>
            <p>
              These Terms are governed by the laws of Kenya. Any disputes will be subject to the
              exclusive jurisdiction of the courts of Kenya.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-on-surface mb-2">11. Contact</h2>
            <p>
              Questions about these Terms can be sent to{" "}
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
