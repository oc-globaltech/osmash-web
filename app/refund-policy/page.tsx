import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "../legal";

export const metadata: Metadata = { title: "Refund and Cancellation Policy — O'Smash" };

// From OSMASH-Refund-Policy.pdf (9 Sep 2026), with the plan and fee rules brought up to the spec in osmash-api and
// osmash-expo docs/Spec (DEC-038, DEC-040, DEC-041, DEC-064; SRS FR-024, FR-038). Pending legal review.
export default function RefundPolicy() {
  return (
    <LegalPage title="Refund and Cancellation Policy">
      <p>
        This policy explains how payments in O’Smash are billed, how to cancel, and when we refund. It forms part of the{" "}
        <Link href="/terms">Terms of Use</Link>. Where the two differ on payment, cancellation or refunds, this policy
        applies.
      </p>

      <h2>1. What this policy covers</h2>
      <p>O’Smash takes two kinds of payment, both through Fiuu (Razer Merchant Services):</p>
      <ul>
        <li>
          <strong>Plans.</strong> A coach or academy pays O’Smash monthly to use a paid plan.
        </li>
        <li>
          <strong>Monthly fees.</strong> A player, or a parent for a child under 18, pays an academy or solo coach for a
          month of coaching. The money goes to the academy, not to O’Smash.
        </li>
      </ul>
      <p>“You” means the person who pays.</p>

      <h2>2. Who we are</h2>
      <p>
        O’Smash is operated by OC Global Technology Sdn. Bhd., a company incorporated in Malaysia, of 21 City Plaza,
        Jalan Tebrau, Kampung Wadi Hana, 80300 Johor Bahru, Johor, Malaysia. “We”, “us” and “our” mean that company.
        You can reach us at <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>.
      </p>

      <h2>3. Plans: what you are buying</h2>
      <p>
        <strong>A right to use the software.</strong> A plan is a right to use O’Smash for a month. It is not a purchase
        of coaching.
      </p>
      <p>
        <strong>Plans.</strong> A solo coach can be on Free or Pro. An academy can be on Free, Pro or Plus. Paid plans
        raise the limits on players and coaches. The limits and the price that apply are the ones shown in the app when
        you pay.
      </p>
      <p>
        <strong>Currency.</strong> Prices are shown and charged in Malaysian Ringgit. Any charge your bank or card issuer
        adds is decided by them.
      </p>

      <h2>4. Plans: billing and renewal</h2>
      <p>
        <strong>Billed in advance.</strong> You pay for a paid plan on Fiuu’s payment page, and Fiuu saves your card.
        The plan then renews every month from that card until you move to Free.
      </p>
      <p>
        <strong>Reminder.</strong> We remind you 3 days before each renewal.
      </p>
      <p>
        <strong>Access is tied to the month.</strong> Your access is tied to the month you paid for, not to how much of
        it you use.
      </p>

      <h2>5. Plans: changing plan</h2>
      <ul>
        <li>
          <strong>Free to Pro or Plus</strong> starts once you pay at checkout.
        </li>
        <li>
          <strong>Pro to Plus</strong> starts at once and charges your saved card the full Plus price. There is no
          proration. If the card is refused, your plan stays as it was.
        </li>
        <li>
          <strong>Plus to Pro</strong> starts at once. Pro is billed from your next renewal. There is no refund or
          credit for the rest of the month.
        </li>
        <li>
          <strong>Any plan to Free</strong> starts at once and billing stops. There is no refund for the rest of the
          month.
        </li>
      </ul>
      <p>
        You can move to a lower plan only once your active coaches and players fit its limits. The app tells you how
        many to remove first.
      </p>

      <h2>6. Plans: cancelling</h2>
      <p>
        <strong>How to cancel.</strong> Move to Free in the app, under Plan and billing, at any time and for any reason.
        You can also email <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>. There is no cancellation fee.
      </p>
      <p>
        <strong>What cancelling does.</strong> Billing stops at once and you are not charged again. Your academy and its
        records stay, on the Free plan.
      </p>

      <h2>7. Plans: refunds</h2>
      <p>
        <strong>The general position.</strong> We do not refund the rest of a month when you change plan or cancel, and
        we do not prorate. We also do not refund for non-use, lighter use than you expected, or a change of mind after a
        renewal you were reminded of.
      </p>
      <p>
        <strong>When we will refund.</strong> Despite the above, we will refund:
      </p>
      <ul>
        <li>a duplicate charge, in full;</li>
        <li>an amount charged in error or after you cancelled, in full;</li>
        <li>
          the unused part of the month, prorated, if we end or withdraw your plan for any reason other than your breach;
        </li>
        <li>
          the unused part of the month, prorated, if we make a material change for the worse during the month and you
          cancel because of it;
        </li>
        <li>the month in question, if the service was unavailable for a long time through our fault and we cannot put it right.</li>
      </ul>
      <p>
        <strong>How to ask.</strong> Chat with support in the app, or email{" "}
        <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>, with the account name and the date of the charge, as
        soon as you reasonably can. Asking promptly helps us look into it, but it is not a deadline on your legal
        rights.
      </p>

      <h2>8. Monthly fees</h2>
      <p>
        <strong>Paid first.</strong> The academy or solo coach sets the monthly price. You pay before training, and the
        payment covers one calendar month from the later of the payment date and the due date. You can pay from 3 days
        before the due date.
      </p>
      <p>
        <strong>If a fee is not paid.</strong> From the due date the player cannot be added to a session and is taken off
        sessions that have not started. Once the payment clears, they go back on those sessions.
      </p>
      <p>
        <strong>No double charge.</strong> The app refuses a second payment while one is in progress or the month is
        already paid, so two parents cannot pay for the same month.
      </p>
      <p>
        <strong>Late payments.</strong> A payment that Fiuu has not confirmed after 30 minutes is replaced if you pay
        again. If the first one is then confirmed, we refund it.
      </p>
      <p>
        <strong>Other fee refunds.</strong> Your monthly fee pays the academy for coaching, so a refund for the coaching
        itself is between you and the academy, on the academy’s terms. Ask the academy first. We make approved refunds
        through Fiuu, and we refund a payment taken in error.
      </p>
      <p>
        <strong>What a refund does.</strong> A full refund removes the refunded month from the player’s cover. A partial
        refund does not. If a refund leaves a gap before a month that is already paid, a payment for the gap is
        charged by the day.
      </p>
      <p>
        <strong>Leaving.</strong> If a player leaves or is removed from an academy, any unpaid fee stops being due.
      </p>

      <h2>9. The Free plan</h2>
      <p>
        The Free plan has no fee, no minimum term and no refund, because nothing is paid for it. We may change, limit or
        withdraw it on reasonable notice. That does not affect a paid plan you have already bought.
      </p>

      <h2>10. Failed and declined payments</h2>
      <p>
        <strong>A failed payment is not a refund.</strong> If a payment does not complete, no money leaves your
        account, so there is nothing to return.
      </p>
      <p>
        <strong>If a plan renewal fails,</strong> we tell you, you have a 3-day grace period, and we retry the card once
        a day. You can pay now or move to Free during it. If it is still unpaid when the grace period ends, the academy
        moves to Free: players are kept, coaches are paused and their sessions return to the Owner. Paying for a plan
        again reactivates them.
      </p>
      <p>
        <strong>If a fee payment fails,</strong> the fee stays as it was and you can try again. A payment that your bank
        is still processing stays in progress until Fiuu confirms it.
      </p>
      <p>
        <strong>If you paid but the app has not updated,</strong> do not pay again. Chat with support or email us first.
      </p>

      <h2>11. What Fiuu handles, and what we handle</h2>
      <p>
        <strong>Fiuu.</strong> You enter your payment details on Fiuu’s page; your full payment details never reach
        O’Smash. Fiuu takes the payment and pays refunds out.
      </p>
      <p>
        <strong>Us.</strong> We decide what a plan costs and whether a plan refund is due, make refunds through Fiuu, and
        deduct no charge of our own.
      </p>
      <p>
        <strong>Timing.</strong> A refund goes back to the card or method you paid with. It can take several days, and
        how quickly it reaches your statement depends on Fiuu and your bank.
      </p>

      <h2>12. Disputes and chargebacks</h2>
      <p>
        <strong>Tell us first.</strong> If you disagree with a decision, tell us why and we will look at it again. It is
        usually faster than a bank dispute.
      </p>
      <p>
        <strong>A chargeback is decided by your bank.</strong> Nothing here limits your right to raise one. The outcome
        is decided by your bank and the card scheme under their own rules; our part is to respond with our records.
      </p>
      <p>
        <strong>Both at once.</strong> If an amount is both refunded by us and reversed by your bank, we may recover the
        duplicated amount as a debt.
      </p>
      <p>
        <strong>Your legal routes are not restricted.</strong> Nothing in this policy requires you to take any step
        before going to court or a tribunal, or shortens a time limit the law gives you.
      </p>

      <h2>13. When we may decline, suspend or reverse</h2>
      <p>
        We may decline a refund outside section 7 or 8 where the law does not require one, and we will say why in
        writing. We may suspend or end a plan for non-payment, or for a material breach of the Terms of Use not put right
        within a reasonable time after we asked, and then no refund is due. We may reverse a refund made in error, on
        notice.
      </p>

      <h2>14. Changes to this policy and to prices</h2>
      <p>
        <strong>This policy.</strong> Where a change materially affects you, we will give you reasonable notice
        beforehand, by email or in the app.
      </p>
      <p>
        <strong>Plan prices.</strong> A new plan price applies from your next renewal. It never applies to a month you
        have already paid for. If you do not accept it, you may move to Free before it applies.
      </p>
      <p>
        <strong>The version that applies.</strong> The version in force when you paid governs that payment.
      </p>

      <h2>15. Malaysian law</h2>
      <p>
        This policy is governed by the laws of Malaysia. Nothing in it excludes, restricts or modifies any right or
        remedy that cannot lawfully be excluded, including under the Consumer Protection Act 1999 where that Act applies
        to you. Where this policy gives you more than the law requires, this policy applies.
      </p>

      <h2>16. How to contact us</h2>
      <p>
        OC Global Technology Sdn. Bhd., 21 City Plaza, Jalan Tebrau, Kampung Wadi Hana, 80300 Johor Bahru, Johor,
        Malaysia. Email <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>. We aim to reply within two business
        days.
      </p>
    </LegalPage>
  );
}
