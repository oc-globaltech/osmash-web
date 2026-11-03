import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "../legal";

export const metadata: Metadata = { title: "Terms of Use — O'Smash" };

// From OSMASH-TERMS-OF-USE.pdf (9 Sep 2026), with facts brought up to the spec in osmash-api and osmash-expo
// docs/Spec (Decision-Log to DEC-064) and the report and block rules in osmash-api e882ddd (2 Nov 2026).
// Pending legal review.
export default function Terms() {
  return (
    <LegalPage title="Terms of Use">
      <p>
        These terms are the agreement between you and OC Global Technology Sdn. Bhd. for your use of O’Smash. Please
        read them. If you do not accept them, please do not use O’Smash.
      </p>

      <h2>The short version</h2>
      <p>This is a summary, not the terms themselves. The numbered sections are what apply.</p>
      <ul>
        <li>O’Smash is an app for arranging badminton coaching. We are not your coach.</li>
        <li>
          Payments, cancellation and refunds are covered by the{" "}
          <Link href="/refund-policy">Refund and Cancellation Policy</Link>, which forms part of these terms. Payments
          are processed by Fiuu, not by O’Smash.
        </li>
        <li>A player under 18 needs a linked parent, who agrees for them and pays their fees.</li>
        <li>Check in only to a session you are at, and only for yourself or your own child.</li>
        <li>We do not tolerate abuse or objectionable content. Report it and we review it within 24 hours.</li>
      </ul>

      <h2>1. What O’Smash is, and what it is not</h2>
      <p>
        <strong>What O’Smash does.</strong> Coaches and academies use O’Smash to schedule sessions, manage players,
        record attendance and take monthly fees. Players use it to find an academy or coach near them, ask to join, see
        their sessions, check in and pay.
      </p>
      <p>
        <strong>O’Smash does not coach you.</strong> The coaching is provided by your coach or academy. We do not employ
        coaches, we do not set their prices, and nobody from O’Smash is at your session. Your arrangement about lessons
        is with your coach, not with us.
      </p>
      <p>
        <strong>We do not verify or endorse coaches.</strong> Coaches are independent. Each coach is responsible for any
        qualification, licence, insurance or clearance the law requires of them. Being listed in O’Smash is not a
        recommendation.
      </p>
      <p>
        <strong>Who we are.</strong> These terms are a contract between you and OC Global Technology Sdn. Bhd., a
        company registered in Malaysia, of 21 City Plaza, Jalan Tebrau, Kampung Wadi Hana, 80300 Johor Bahru, Johor,
        Malaysia. “O’Smash”, “we”, “us” and “our” mean that company.
      </p>

      <h2>2. Words we use</h2>
      <p>
        <strong>Coach.</strong> A coach account. An <strong>Owner</strong> runs an academy, a <strong>Sub coach</strong>{" "}
        coaches in an Owner’s academy, and a <strong>Solo coach</strong> works alone.
      </p>
      <p>
        <strong>Academy.</strong> A coaching business on O’Smash. An academy, not O’Smash, is responsible for the
        coaches it engages.
      </p>
      <p>
        <strong>Player.</strong> A person who attends sessions arranged through O’Smash. A <strong>parent</strong> is a
        player aged 18 or over who is linked to a child’s player account.
      </p>
      <p>
        <strong>Session.</strong> A coaching session at a set date, time and training location.
      </p>
      <p>
        <strong>Session QR.</strong> The code a coach shows at a session, which players scan to check in.
      </p>
      <p>
        <strong>Monthly price.</strong> The amount an academy or solo coach charges a player for a month of coaching.
      </p>

      <h2>3. Who can use O’Smash</h2>
      <p>
        <strong>Coaches</strong> must be 18 or over. <strong>Players</strong> of any age may sign up.
      </p>
      <p>
        <strong>If the player is under 18.</strong> A person under 18 cannot enter into these terms on their own; under
        Malaysian law a contract made by a minor is void. A player under 18 must link a parent before joining a coach.
        As the parent, you accept these terms for the child, you are responsible for what the child does in O’Smash,
        and you are the one who pays the child’s fees.
      </p>
      <p>
        <strong>How you accept.</strong> You accept these terms and the{" "}
        <Link href="/privacy">Privacy Notice</Link> when you create your account.
      </p>

      <h2>4. Your account</h2>
      <p>
        <strong>One account, your own details.</strong> Register once, with your own name, email address, phone number
        and date of birth, and keep them accurate.
      </p>
      <p>
        <strong>Keep it secure.</strong> Use a password you do not use anywhere else, keep it to yourself, and do not let
        anyone else use your account. For your protection we may end a sign-in and ask you to sign in again, or ask you
        to confirm a change to your details.
      </p>
      <p>
        <strong>Tell us if something is wrong.</strong> Contact us at{" "}
        <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a> as soon as you can if you think someone knows your
        password or has used your account, or your phone is lost or stolen.
      </p>
      <p>
        <strong>What you are responsible for.</strong> Activity on your account that results from something you did or
        failed to do, such as sharing your password. Not activity caused by a weakness in O’Smash, a failure on our side,
        or anything you told us about promptly. Nothing here affects your rights under the Consumer Protection Act
        1999.
      </p>

      <h2>5. Joining a coach, and how sessions work</h2>
      <p>
        <strong>Joining.</strong> A player joins an academy or solo coach by asking to join from the list of academies
        near a place, by scanning the academy’s QR, or by accepting an invitation. The coach accepts or declines a
        request. An invitation expires after 7 days and can be accepted only by the account it was sent to.
      </p>
      <p>
        <strong>Sessions.</strong> Coaches create, edit, reschedule and cancel sessions and choose who is on them.
        Players do not book sessions. If you cannot attend, speak to your coach.
      </p>
      <p>
        <strong>Leaving.</strong> A player aged 18 or over can leave an academy from Settings. A parent can take a child
        out of an academy. A coach can leave an academy they do not own.
      </p>
      <p>
        <strong>Checking in.</strong> At the session, your coach shows the session QR and you scan it. A parent can check
        in their own child. If you have no phone, your coach marks you on the roster, and the coach’s mark is the record.
        A check-in made offline is sent when your phone is back online.
      </p>

      <h2>6. Paying, and refunds</h2>
      <p>
        <strong>The Refund and Cancellation Policy forms part of these terms.</strong> Plans, monthly fees, cancellation
        and refunds are governed by the{" "}
        <Link href="/refund-policy">Refund and Cancellation Policy</Link>. Where these terms and that policy differ on
        payment, cancellation or refunds, that policy applies.
      </p>
      <p>
        <strong>Monthly fees.</strong> The academy or solo coach sets the monthly price, and the app shows it before you
        pay. You pay first, and the payment covers one calendar month. A player who has not paid cannot be added to a
        session. A player aged 18 or over pays for themselves; for a player under 18, only a linked parent pays.
      </p>
      <p>
        <strong>Coach plans.</strong> A coach can use O’Smash on the Free plan, or pay monthly for a plan with higher
        limits.
      </p>
      <p>
        <strong>How payments are made.</strong> Payments go through Fiuu, a licensed payment gateway, on its own payment
        page. Your full payment details never reach O’Smash. Nothing in these terms or that policy excludes, restricts
        or modifies any right you have under the Consumer Protection Act 1999.
      </p>

      <h2>7. Rules for coaches and academies</h2>
      <p>
        <strong>You provide the coaching.</strong> You are responsible for the standard and safety of your sessions, for
        supervising them, for the venue, for your own conduct, and for any qualification, licence, insurance or
        clearance the law requires of you, including any clearance to work with children.
      </p>
      <p>
        <strong>Accurate details.</strong> Keep your academy details, prices and merchant details accurate. Invite only
        people who have agreed to be invited.
      </p>
      <p>
        <strong>Use what you are given only for coaching.</strong> Use another person’s details only to deliver and run
        that person’s coaching.
      </p>
      <p>
        <strong>Attendance.</strong> Do not mark attendance you know or suspect to be false, and do not ask anyone else
        to.
      </p>

      <h2>8. Rules for everyone</h2>
      <p>
        Use O’Smash only to arrange, attend, record and pay for badminton coaching, with one account in your own name
        and the role that applies to you. You must not:
      </p>
      <ul>
        <li>
          <strong>Attendance.</strong> Check in to a session you are not at, check in for someone other than yourself or
          your own child, send the session QR to someone who is not there, or cause attendance to be recorded for a
          session that was not attended.
        </li>
        <li>
          <strong>Codes and invitations.</strong> Share an invitation or a sign-in code, use one that was not sent to
          you, or try to guess or generate codes.
        </li>
        <li>
          <strong>Impersonation.</strong> Pretend to be a coach, academy or parent you are not, or claim a
          qualification, licence or clearance you do not hold.
        </li>
        <li>
          <strong>Accounts.</strong> Let someone else use your account, or use or try to get into another person’s
          account, records or our admin portal.
        </li>
        <li>
          <strong>Other people’s details.</strong> Use a player’s or parent’s details for anything other than their
          coaching, including marketing to them or keeping them after your connection ends.
        </li>
        <li>
          <strong>Automated access.</strong> Use any script, crawler or bot to access O’Smash, collect profiles or
          payment data, create accounts, or get around a rate limit or access control.
        </li>
        <li>
          <strong>Photographs.</strong> Upload a photo that is not of you without permission, or a photo of a child
          unless you are that child’s parent.
        </li>
        <li>
          <strong>Objectionable content and abuse.</strong> Post or send anything abusive, hateful, threatening,
          sexual, violent, discriminatory or illegal, in names, photos, logos, messages or anywhere else in the app, or
          harass any user. We have zero tolerance for objectionable content and abusive users: we remove the content
          and suspend or close the account that posted it.
        </li>
        <li>
          <strong>Integrity.</strong> Interfere with the operation or security of O’Smash, or its attendance and
          payment records.
        </li>
      </ul>
      <p>
        <strong>Security reports.</strong> If you find a security weakness, tell us at{" "}
        <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a> rather than using or publishing it. We will not treat
        a good-faith report as a breach of these terms.
      </p>

      <h2>9. Reporting and blocking</h2>
      <p>
        Tap Report on an academy, or chat with support in the app, to tell us about content or a user. We review every
        report within 24 hours. Tap Block to stop seeing an academy or coach; we are told, so we can check it too.
      </p>
      <p>
        We do not monitor sessions or user conduct. We act on what users tell us and on our own records.
      </p>

      <h2>10. Keeping children safe</h2>
      <p>
        <strong>Who is responsible.</strong> A coach or academy who coaches a player under 18 is responsible for that
        player’s safety at the session, for supervision at the venue, and for every qualification, licence, insurance
        and clearance to work with children that Malaysian law requires. O’Smash does not attend or supervise sessions.
      </p>
      <p>
        <strong>Contact.</strong> Use a player’s or parent’s contact details only to arrange that player’s coaching.
        Where the player is under 18, communicate with the parent.
      </p>
      <p>
        <strong>Absolute prohibitions.</strong> No user may use O’Smash, or information from it, to groom, sexually
        exploit, abuse, endanger or make unwanted contact with a child, or to arrange contact with a child outside the
        coaching arranged through O’Smash.
      </p>
      <p>
        <strong>Reporting a concern.</strong> Email <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a> at once,
        marked URGENT — CHILD SAFETY, with as much detail as you can. If a child is in immediate danger, call the police
        on 999 first, then tell us.
      </p>
      <p>
        <strong>What we do on a credible report.</strong> We acknowledge it within one business day, pause payments to the
        account concerned while we look into it, and keep its records. Where we reasonably believe a child has been harmed or is
        at risk, we report it to the Royal Malaysia Police or the Department of Social Welfare. We may do so without
        telling the person reported, where telling them would put a child at risk or harm an investigation.
      </p>
      <p>
        <strong>What we do not do.</strong> We do not verify a coach’s identity, qualifications or clearances. Parents
        and players should satisfy themselves about a coach before a first session.
      </p>

      <h2>11. Photos, profiles and intellectual property</h2>
      <p>
        <strong>What belongs to us.</strong> O’Smash, its name and logo, the app, its code, screens, text and graphics
        belong to OC Global Technology Sdn. Bhd. or are licensed to it. We give you a personal, non-exclusive,
        non-transferable, revocable licence to use O’Smash on a device you control, for the purposes in these terms. You
        may not copy, modify, reverse-engineer, resell or extract data from O’Smash, or use its name or logo without our
        written permission.
      </p>
      <p>
        <strong>What belongs to you.</strong> You keep ownership of the photos, logos and text you submit. You let us
        store, resize and display them only so that O’Smash can work, for example showing your photo to your coach. We
        do not sell them or use them in advertising.
      </p>
      <p>
        <strong>What you promise.</strong> You own what you upload or have permission to use it, and it does not infringe
        anyone else’s rights.
      </p>
      <p>
        <strong>Removing content.</strong> You can replace or remove your photo at any time. To have other material
        removed, or to report a copyright infringement, tell us at{" "}
        <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>.
      </p>
      <p>
        <strong>Your personal information.</strong> How we handle it is described in the{" "}
        <Link href="/privacy">Privacy Notice</Link>, which forms part of your agreement with us.
      </p>
      <p>
        <strong>Open-source components.</strong> O’Smash uses open-source software, which remains its authors’
        property, including Feather icons (© Cole Bemis, MIT licence) and Material Design Icons (Pictogrammers, Apache
        Licence 2.0).
      </p>

      <h2>12. What we are, and are not, responsible for</h2>
      <p>
        <strong>What each of us is responsible for.</strong> We are responsible for O’Smash: the app and the tools in it.
        Your coach or academy is responsible for the coaching, its standard and safety, supervision at the venue, and
        their own conduct and qualifications.
      </p>
      <p>
        <strong>What we do not limit.</strong> Nothing in these terms limits anything that cannot lawfully be limited.
        In particular, nothing here excludes, restricts or modifies any right, guarantee or remedy you have under the
        Consumer Protection Act 1999, including the guarantees for services that section 6 of that Act protects;
        liability for death or personal injury caused by our negligence; or liability for fraud.
      </p>
      <p>
        <strong>Badminton is a physical activity.</strong> You take part at your own risk. Tell your coach about any
        condition or injury that affects you. For a player under 18, the parent does this.
      </p>
      <p>
        <strong>What we are not responsible for.</strong> Subject to the paragraphs above and to the Refund and
        Cancellation Policy, we are not responsible for the standard, safety or outcome of coaching, for a dispute
        between users, or for loss caused by details entered incorrectly. We are not liable for indirect or
        consequential loss, or for loss of profit, opportunity, goodwill or data.
      </p>
      <p>
        <strong>Changes to O’Smash.</strong> We may change, suspend or withdraw features, and carry out maintenance. We
        will not materially reduce the core features without notice under section 15.
      </p>
      <p>
        <strong>If you break these terms</strong> and that causes us loss or a claim from someone else, you agree to
        cover our reasonable losses and costs. This is never wider than Malaysian law allows against a consumer.
      </p>
      <p>
        <strong>Fairness.</strong> If a court finds any part of this section unfair under Part IIIA of the Consumer
        Protection Act 1999, or otherwise unenforceable, that part is removed and the rest still applies.
      </p>

      <h2>13. Ending, suspending or closing an account</h2>
      <p>
        <strong>Closing your account.</strong> You may delete your account at any time from Settings in the app, or by
        emailing us. An Owner whose academy has other members closes the academy first. What happens to your
        information afterwards is set out in the <Link href="/privacy">Privacy Notice</Link>.
      </p>
      <p>
        <strong>If these terms are broken,</strong> or O’Smash is used unlawfully or in a way that puts a person at risk,
        we may warn you, remove content, correct an attendance or payment record, restrict or suspend your account, end
        your use of O’Smash, or report the matter to the police or another authority. We normally take the least
        serious step that works, tell you what we did and why, and let you respond, unless that would put a person at
        risk, harm an investigation or break the law. We may suspend or close an account at once for objectionable
        content or abuse, fraud, false attendance, impersonation, or a risk to a child.
      </p>
      <p>
        <strong>Ending without breach.</strong> We may end this agreement, or withdraw O’Smash, on at least 30 days’
        written notice.
      </p>
      <p>
        <strong>What survives.</strong> The clauses on payments already made, refunds, intellectual property, liability
        and governing law.
      </p>

      <h2>14. If something goes wrong</h2>
      <p>
        <strong>Tell us.</strong> Chat with support in the app, from Settings, or email{" "}
        <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>. Tell us the session date, the coach’s or player’s
        name and what happened. We aim to reply within two business days, and within one business day for a
        child-safety concern.
      </p>
      <p>
        <strong>If it is about coaching,</strong> such as the standard of a session or how a coach behaved, speak to
        your coach or academy first, then tell us so we can act on our side.
      </p>
      <p>
        <strong>Your right to go to court is not restricted.</strong> We may suggest mediation, but nothing here requires
        it, stops you bringing proceedings, or shortens the time to bring them. You may also bring a claim to the
        Tribunal for Consumer Claims Malaysia.
      </p>
      <p>
        <strong>Governing law.</strong> These terms are governed by the laws of Malaysia, and the Malaysian courts have
        non-exclusive jurisdiction.
      </p>

      <h2>15. Changes to these terms</h2>
      <p>
        If a change materially affects you, we will tell you at least 30 days before it takes effect, by email or in the
        app. If you do not accept it, you may close your account before then. We will not treat continued use alone as
        acceptance of a material change. Each version carries the date at the top of this page.
      </p>

      <h2>16. Contact, and other terms</h2>
      <p>
        <strong>Contact.</strong> OC Global Technology Sdn. Bhd., 21 City Plaza, Jalan Tebrau, Kampung Wadi Hana, 80300
        Johor Bahru, Johor, Malaysia. Email <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>. Anyone signed in
        can also chat with support in the app.
      </p>
      <p>
        <strong>Notices.</strong> We contact you by the email address on your account, by push notification and in the
        app. Keep your details up to date.
      </p>
      <p>
        <strong>App stores.</strong> If you downloaded O’Smash from an app store, that store’s terms also apply to the
        download.
      </p>
      <p>
        <strong>Transfer.</strong> You may not transfer your rights under these terms. We may transfer ours to another
        company, for example if our business is sold, provided your rights are not reduced. We will tell you if we do.
      </p>
      <p>
        <strong>Other.</strong> If any part of these terms is unenforceable, the rest still applies. If we do not
        enforce a term straight away, we can still enforce it later. These terms, the Privacy Notice and the Refund and
        Cancellation Policy are the whole agreement between you and us about O’Smash. A person who is not a party to
        these terms has no right to enforce them under the Contracts (Rights of Third Parties) Act 2001.
      </p>
    </LegalPage>
  );
}
