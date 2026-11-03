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
        This policy explains how payments in O’Smash are billed, how to cancel a plan, and when we refund. It forms part
        of the O’Smash <Link href="/terms">Terms of Use</Link>. Where the two differ on refunds or cancellation, this
        policy applies.
      </p>

      <h2>1. What this policy covers</h2>
      <p>O’Smash takes two kinds of payment, both through Fiuu (Razer Merchant Services), our payment gateway.</p>
      <p>
        <strong>Plans.</strong> A coach or academy pays O’Smash monthly for a paid plan. Sections 3 to 7 cover plans.
        In those sections, “you” means the coach or academy holding the plan.
      </p>
      <p>
        <strong>Monthly fees.</strong> A player, or a parent for a player under 18, pays an academy or solo coach a
        monthly fee for coaching, in the app. The money goes to the academy, not to O’Smash. Section 8 covers monthly
        fees. In that section, “you” means the person who pays.
      </p>
      <p>
        <strong>What it does not cover.</strong> It does not cover the standard, conduct or cancellation of the coaching
        itself. That is between the academy and its players.
      </p>

      <h2>2. Who we are</h2>
      <p>
        O’Smash is operated by OC Global Technology Sdn. Bhd., a company incorporated in Malaysia, of 21 City Plaza,
        Jalan Tebrau, Kampung Wadi Hana, 80300 Johor Bahru, Johor, Malaysia. “We”, “us” and “our” mean that company. You
        can reach us at <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>.
      </p>

      <h2>3. Plans: what you are buying</h2>
      <p>
        <strong>A right to use the software.</strong> A plan is a right to use O’Smash for a monthly billing period. It
        is not a purchase of coaching, and not a purchase of a fixed number of sessions.
      </p>
      <p>
        <strong>Plans.</strong> O’Smash is offered on a Free plan and on paid plans. A solo coach can be on Free or Pro.
        An academy can be on Free, Pro or Plus. The Free plan supports a limited number of active players and coaches;
        paid plans raise those limits. The plan, the limits and the price that apply to you are the ones shown to you in
        the app when you pay, and those are the terms of your plan.
      </p>
      <p>
        <strong>Currency and tax.</strong> Prices are shown and charged in Malaysian Ringgit. The amount taken from you,
        and any tax or charge applied to the transaction, are determined at checkout by the payment gateway and by your
        bank or card issuer.
      </p>

      <h2>4. Plans: billing and renewal</h2>
      <p>
        <strong>Billed in advance.</strong> Paid plans are billed in advance for the whole month. You pay the first
        month on the payment gateway’s page, which saves your card for the renewals.
      </p>
      <p>
        <strong>Automatic renewal.</strong> Plans renew automatically each month from the saved card until you move to
        Free. We send a reminder 3 days before each renewal.
      </p>
      <p>
        <strong>Access is tied to the month.</strong> Your access is tied to the month you have paid for, not to how
        much of it you use.
      </p>

      <h2>5. Plans: upgrading and downgrading</h2>
      <p>
        <strong>Free to Pro or Plus.</strong> Takes effect once you pay at checkout.
      </p>
      <p>
        <strong>Pro to Plus.</strong> Takes effect immediately and charges your saved card the full Plus price. We do not
        prorate. If the card is refused, your plan stays as it was and nothing is charged.
      </p>
      <p>
        <strong>Plus to Pro.</strong> Takes effect immediately, once you confirm. Pro is billed from your next renewal.
        We do not refund or credit the difference for the current month.
      </p>
      <p>
        <strong>Any plan to Free.</strong> Takes effect immediately, once you confirm, and billing stops. We do not refund
        the rest of the current month.
      </p>
      <p>
        <strong>Fitting the lower plan.</strong> You can move to a lower plan only once your active coaches and players
        fit within its limits. The app tells you how many to remove first. Nothing is deleted by a downgrade.
      </p>
      <p>
        <strong>Paused coaches.</strong> When you upgrade, coaches who were paused are reactivated into the free places,
        the longest paused first.
      </p>

      <h2>6. Plans: cancelling</h2>
      <p>
        <strong>How to cancel.</strong> You may cancel at any time, for any reason, by moving to Free in the app under
        Plan and billing, or by emailing <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>. No reason
        is required and there is no cancellation fee.
      </p>
      <p>
        <strong>What cancellation does.</strong> Cancelling moves you to Free at once. Billing stops and you are not
        charged again.
      </p>
      <p>
        <strong>Your data afterwards.</strong> Your academy, its players and its records stay on the Free plan, so you
        can return to a paid plan at any time. If you close the academy or delete your account, your information is
        handled as the <Link href="/privacy">Privacy Notice</Link> describes.
      </p>

      <h2>7. Plans: refunds</h2>
      <p>
        <strong>The general position.</strong> We do not refund the unused part of a month when you cancel or move to a
        lower plan, and we do not prorate. We also do not refund for non-use, for lighter use than you expected, or for a
        change of mind after a renewal you were reminded of.
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
          the unused part of the month, prorated, if we make a material adverse change during a month and you cancel
          because of it;
        </li>
        <li>
          the month in question, where the service was materially unavailable for a prolonged time through our fault
          and we cannot put it right.
        </li>
      </ul>
      <p>
        <strong>How to ask.</strong> Chat with support in the app, from Settings, or email{" "}
        <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>, with the account name and the date of the
        charge, as soon as you reasonably can. We will look into it and reply. Approved refunds are returned to the
        original payment method through the payment gateway; we deduct no charge of our own. Asking promptly helps us
        investigate, but it is not a deadline on your legal rights and does not shorten any time limit the law gives
        you.
      </p>

      <h2>8. Monthly fees</h2>
      <p>
        <strong>What you are paying for.</strong> Your academy or solo coach sets its monthly price, and the app shows it
        to you before you pay. The fee pays the academy for a month of coaching. A player aged 18 or over pays for
        themselves; for a player under 18, only a linked parent pays.
      </p>
      <p>
        <strong>Paid in advance.</strong> You pay before you train. A payment covers one calendar month, starting on the
        later of the payment date and the due date. The next fee is due the day after that month ends. You can pay from
        3 days before the due date.
      </p>
      <p>
        <strong>How you can pay.</strong> By online banking (FPX), card, e-wallet or DuitNow QR, on the payment
        gateway’s page. Cash is not accepted in the app.
      </p>
      <p>
        <strong>Reminders.</strong> We remind you 3 days before the due date, on the due date, and when the fee becomes
        overdue, 7 days after the due date.
      </p>
      <p>
        <strong>If a fee is not paid.</strong> From the due date, the player cannot be added to a session and is taken
        off sessions that have not started. Once the payment clears, they go back on those sessions.
      </p>
      <p>
        <strong>Price changes.</strong> A new monthly price applies from the next due date. An amount already due or
        overdue stays as it was.
      </p>
      <p>
        <strong>No double charge.</strong> The app refuses a second payment while one is in progress or the month is
        already paid, so two parents cannot pay for the same month.
      </p>
      <p>
        <strong>Late confirmations.</strong> A payment the gateway has not confirmed after 30 minutes is replaced if you
        pay again. If the first payment is then confirmed as well, we refund it.
      </p>
      <p>
        <strong>Refunds for coaching.</strong> The fee pays the academy for coaching, so a refund for the coaching itself,
        for example a missed or cancelled month, is between you and the academy, on the academy’s terms. Ask the academy
        first. We make approved refunds through the payment gateway.
      </p>
      <p>
        <strong>When we will refund.</strong> We will refund a duplicate payment, and a payment taken in error, in full.
      </p>
      <p>
        <strong>What a refund does.</strong> A full refund removes the refunded month from the player’s cover. A partial
        refund does not. If a refund leaves a gap before a month that is already paid, a payment for the gap covers only
        the gap, and is charged by the day.
      </p>
      <p>
        <strong>Leaving.</strong> If a player leaves or is removed from an academy, any unpaid fee stops being due.
      </p>

      <h2>9. The Free plan</h2>
      <p>
        The Free plan is provided as it is, with no fee, no minimum term and no refund, because nothing is paid for it.
        We may change, limit or withdraw it on reasonable notice. That does not affect a paid plan you have already
        bought.
      </p>

      <h2>10. Failed and declined payments</h2>
      <p>
        <strong>A failed payment is not a refund.</strong> If a payment does not complete, no money leaves your account,
        so there is nothing to return.
      </p>
      <p>
        <strong>If a plan renewal fails,</strong> we tell you by email and your plan shows Payment failed, with a 3-day
        grace period. We retry the card once a day during it, and your access continues. You can pay now or move to Free
        at any time during the grace period.
      </p>
      <p>
        <strong>If it is still unpaid when the grace period ends,</strong> the academy moves to the Free plan. Players are
        kept, coaches are paused, and their sessions go back to the Owner. Paying for a plan again reactivates the
        coaches.
      </p>
      <p>
        <strong>If a fee payment fails,</strong> the fee stays as it was and you can try again. A payment your bank is
        still processing stays in progress until the gateway confirms it as paid or failed.
      </p>
      <p>
        <strong>If a payment succeeds but the app does not update shortly afterwards,</strong> do not pay again. Chat with
        support or email us first.
      </p>

      <h2>11. What the payment gateway handles, and what we handle</h2>
      <p>
        <strong>The payment gateway.</strong> Payments are processed by Fiuu, a third-party payment service provider. You
        enter your payment details into its page; your full payment credentials never reach O’Smash and we do not store
        them. It handles taking the payment, settling monthly fees to the academy, and the mechanics and timing of paying
        a refund out.
      </p>
      <p>
        <strong>What we handle.</strong> We decide what a plan costs and whether a plan refund is due. We make refunds
        through the gateway, and a payment counts only once the gateway confirms it to us.
      </p>
      <p>
        <strong>Timing is not ours to control.</strong> A refund goes back to the card or method you paid with. Once we
        make it, it can take several days to settle, and how quickly it reaches your statement is set by the gateway and
        your bank.
      </p>

      <h2>12. Disputes and chargebacks</h2>
      <p>
        <strong>Tell us first.</strong> If you disagree with a decision, reply and tell us why. We will look at it again,
        and it is usually faster than a bank dispute.
      </p>
      <p>
        <strong>A chargeback is decided by your bank.</strong> You may raise a chargeback with your bank or card issuer
        and nothing here limits that right. The outcome and the timing are determined by your bank and the card scheme
        under their own rules, not by us. Our part is to respond with the records we hold.
      </p>
      <p>
        <strong>Both at once.</strong> If an amount is both refunded by us and reversed by your bank, we may recover the
        duplicated amount as a debt.
      </p>
      <p>
        <strong>Your legal routes are not restricted.</strong> Nothing in this policy requires you to exhaust any step
        before going to court or to a tribunal, and nothing in it shortens a time limit the law gives you.
      </p>

      <h2>13. When we may decline, suspend or reverse</h2>
      <p>
        We may decline a refund that falls outside section 7 or 8 where the law does not otherwise require one, and we
        will say why in writing. We may suspend or end a plan for non-payment, or for a material breach of the Terms of
        Use that is not put right within a reasonable period after we have asked, and in that case no refund is due. We
        may reverse a refund issued in error, on notice.
      </p>

      <h2>14. Changes to this policy and to prices</h2>
      <p>
        <strong>Changes to this policy.</strong> We may change this policy as O’Smash develops. Where a change materially
        affects you we will give reasonable notice beforehand, by email or in the app.
      </p>
      <p>
        <strong>Plan prices.</strong> A change to a plan price takes effect from your next renewal after that notice. It
        never applies to a month you have already paid for.
      </p>
      <p>
        <strong>If you do not accept a change,</strong> you may move to Free before it takes effect, and the prorated
        refund in section 7 applies.
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
        Malaysia. Email <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>. We aim to reply within two
        business days.
      </p>
    </LegalPage>
  );
}
