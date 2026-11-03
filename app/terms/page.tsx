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
      <p>This is a summary, not the terms themselves. The numbered sections below are what applies.</p>
      <ul>
        <li>O’Smash is an app for arranging badminton coaching. We are not your coach.</li>
        <li>
          Payment, cancellation and refunds are covered by the O’Smash{" "}
          <Link href="/refund-policy">Refund and Cancellation Policy</Link>, which forms part of these terms. Payments
          are processed by a third-party payment gateway, not by O’Smash.
        </li>
        <li>
          If the player is under 18, a linked parent must agree to these terms for them and is responsible for paying
          their fees.
        </li>
        <li>Check in only to a session you are at, and only for yourself or your own child.</li>
        <li>
          We have zero tolerance for objectionable content and abuse. Report it in the app and we review it within 24
          hours.
        </li>
      </ul>

      <h2>1. What O’Smash is, and what it is not</h2>
      <p>
        <strong>What O’Smash does.</strong> O’Smash is a mobile application for organising badminton coaching. Coaches
        and academies use it to schedule sessions, manage their players, record attendance and collect monthly fees.
        Players use it to find an academy or coach near them, ask to join, see their sessions, check in and pay.
      </p>
      <p>
        <strong>O’Smash does not coach you.</strong> The coaching is provided by your coach or academy. We do not employ
        coaches, we do not set their prices, and nobody from O’Smash is present at your session. Your arrangement about
        lessons is with your coach, not with us.
      </p>
      <p>
        <strong>We do not verify or endorse coaches.</strong> Coaches are independent. Being listed near a place in
        O’Smash is not a recommendation. Each coach is responsible for holding any qualification, licence, insurance or
        clearance the law requires of them, as section 7 sets out.
      </p>
      <p>
        <strong>Who we are.</strong> These terms are a contract between you and OC Global Technology Sdn. Bhd., a
        company registered in Malaysia, of 21 City Plaza, Jalan Tebrau, Kampung Wadi Hana, 80300 Johor Bahru, Johor,
        Malaysia. In these terms, “O’Smash”, “we”, “us” and “our” mean that company.
      </p>
      <p>
        <strong>Accepting these terms.</strong> Using O’Smash means you accept these terms.
      </p>

      <h2>2. Words we use</h2>
      <p>
        <strong>Session.</strong> A coaching session at a set date, time and training location, created in O’Smash by a
        coach.
      </p>
      <p>
        <strong>Coach.</strong> A coach account: an Owner, a sub coach or a solo coach. Where a rule applies to only one
        of these, it says so.
      </p>
      <p>
        <strong>Owner.</strong> The coach who runs an academy. The Owner manages the academy’s players, coaches, monthly
        price, merchant account and plan.
      </p>
      <p>
        <strong>Sub coach.</strong> A coach who coaches within an Owner’s academy. A sub coach may create, edit,
        reschedule and cancel the academy’s sessions, and take attendance on their own sessions. A sub coach does not
        set prices, manage the plan or invite other users.
      </p>
      <p>
        <strong>Solo coach.</strong> A coach who works alone, with their own players and no sub coaches.
      </p>
      <p>
        <strong>Academy.</strong> A coaching business on O’Smash, run by an Owner. An academy, not O’Smash, is
        responsible for the coaches it engages.
      </p>
      <p>
        <strong>Player.</strong> A person who attends sessions arranged through O’Smash.
      </p>
      <p>
        <strong>Parent.</strong> A player aged 18 or over who is linked to the account of a player under 18, as their
        parent or guardian.
      </p>
      <p>
        <strong>Invitation.</strong> An email an Owner sends so that a player or coach can join their academy.
      </p>
      <p>
        <strong>Join request.</strong> A request a player or coach sends to join an academy or solo coach, which the
        Owner or solo coach accepts or declines.
      </p>
      <p>
        <strong>Session QR.</strong> The code a coach shows at a session, which players scan to check in.
      </p>
      <p>
        <strong>Monthly price.</strong> The amount an academy or solo coach charges a player for a month of coaching.
      </p>
      <p>
        <strong>Payment gateway.</strong> The third-party payment service provider we appoint to process payments,
        currently Fiuu (Razer Merchant Services).
      </p>

      <h2>3. Who can use O’Smash</h2>
      <p>
        <strong>Age.</strong> Coaches must be 18 or older. Players of any age may sign up; a player under 18 may use
        O’Smash only with a linked parent who has agreed to these terms on their behalf.
      </p>
      <p>
        <strong>Roles.</strong> O’Smash has two kinds of account, coach and player. A coach is an Owner, a sub coach or
        a solo coach. A parent is a player account.
      </p>
      <p>
        <strong>If the player is under 18.</strong> A person under 18 cannot enter into these terms on their own; under
        Malaysian law a contract made by a minor is void. A player under 18 must link a parent before they can join a
        coach. If you are that parent, you accept these terms on the player’s behalf, you are responsible for what the
        player does in O’Smash, and you are the only one who can pay for their coaching.
      </p>
      <p>
        <strong>How you accept.</strong> You accept these terms and the <Link href="/privacy">Privacy Notice</Link>{" "}
        when you create your account, including an account created by accepting an invitation.
      </p>

      <h2>4. Your account</h2>
      <p>
        <strong>One account, your own details.</strong> Register once, using your own name, email address, phone number
        and date of birth, and keep them accurate.
      </p>
      <p>
        <strong>Keeping your account secure.</strong> You are responsible for keeping your account credentials secure.
        Choose a password you do not use for any other service, keep it confidential, and do not let anyone else use your
        account. For your protection we may end a sign-in and ask you to sign in again, require a password reset, or ask
        you to confirm a change to your account details.
      </p>
      <p>
        <strong>Tell us if something is wrong.</strong> Contact us at{" "}
        <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a> as soon as you can if you believe your
        password is known to someone else, that someone has used your account, or that your device is lost or stolen.
      </p>
      <p>
        <strong>What you are responsible for.</strong> You are responsible for activity on your account that results
        from something you did or failed to do, for example sharing your password. You are not responsible for activity
        arising from a weakness in O’Smash itself, from a failure on our side, or from anything you told us about
        promptly. Nothing in this section affects your rights under the Consumer Protection Act 1999.
      </p>

      <h2>5. Joining a coach, and how sessions work</h2>
      <p>
        <strong>Asking to join.</strong> A player can find academies and solo coaches near a chosen place and ask to
        join, or scan the QR an academy shows. A coach can ask to join an academy with its join code or QR. The Owner or
        solo coach accepts or declines each request. An academy’s join code and QR do not expire, and the Owner can
        change them.
      </p>
      <p>
        <strong>Invitations.</strong> An Owner can also invite a player or coach by email. An invitation expires 7 days
        after it is sent, and can be accepted only by the account it was sent to. Do not share, forward or transfer an
        invitation. An invitation to a player under 18 is accepted or declined by a linked parent.
      </p>
      <p>
        <strong>An Owner warrants that they may invite you.</strong> By inviting someone, an Owner confirms that the
        person has agreed to be invited and that the details entered about them are accurate.
      </p>
      <p>
        <strong>Full academies.</strong> Each plan has a limit on players and coaches. If an academy is full when your
        request or invitation is accepted, you cannot join until a place frees.
      </p>
      <p>
        <strong>Coaches create sessions.</strong> Sessions are created by the Owner or a sub coach, who sets the date,
        time and training location and chooses the players on it.
      </p>
      <p>
        <strong>Players do not book sessions.</strong> O’Smash does not give players a way to book a session or to
        decline being added to one. Your coach adds you. A player whose monthly fee is unpaid cannot be added to a
        session. If you cannot attend, speak to your coach.
      </p>
      <p>
        <strong>Leaving.</strong> A player aged 18 or over can leave an academy from Settings. A parent can take a child
        out of an academy. A sub coach can leave an academy. Leaving takes you off upcoming sessions; your history is
        kept.
      </p>
      <p>
        <strong>Checking in.</strong> At the session, your coach shows the session QR and you scan it in the app. A
        parent may scan it to check in their own child. The code changes about every 30 seconds and works only for that
        session around its start time. If you check in without a connection, the check-in is sent when your phone is
        back online. If you have no phone, your coach marks you on the roster. Where the roster and a check-in differ,
        the coach’s roster mark is the record.
      </p>
      <p>
        <strong>Your check-in is personal.</strong> Check in only to a session you are actually at, and only for
        yourself or your own child. Do not photograph the session QR and send it to anyone, and do not ask anyone to
        check in for you. If someone checks in with your account, our records will show you as present at a session you
        did not attend.
      </p>

      <h2>6. Paying for coaching, and refunds</h2>
      <p>
        <strong>The Refund and Cancellation Policy forms part of these terms.</strong> Coach plans, monthly fees,
        cancellation and refunds are governed by the O’Smash{" "}
        <Link href="/refund-policy">Refund and Cancellation Policy</Link>, which is incorporated into and forms part of
        these terms. By accepting these terms you accept that policy.
      </p>
      <p>
        <strong>Monthly fees.</strong> Your academy or solo coach sets its monthly price, and the app shows it to you
        before you pay. You pay first, and the payment covers one calendar month. A player aged 18 or over pays for
        themselves; for a player under 18, only a linked parent pays, and the child cannot reach payment. The fee is paid
        to the academy, not to O’Smash.
      </p>
      <p>
        <strong>Coach plans.</strong> A coach can use O’Smash on the Free plan, or pay O’Smash monthly for a plan with
        higher limits.
      </p>
      <p>
        <strong>How payments are made.</strong> Payments are processed by a licensed third-party payment gateway. You
        enter your payment details directly into the gateway’s own page; your full payment credentials are not
        transmitted to, processed by, or stored on O’Smash systems at any point. The methods the gateway supports may
        change from time to time.
      </p>
      <p>
        <strong>Which document applies.</strong> Where these terms and the Refund and Cancellation Policy differ on
        payment, cancellation or refunds, that policy applies. Nothing in either document excludes, restricts or
        modifies any right, guarantee or remedy you have under the Consumer Protection Act 1999.
      </p>

      <h2>7. Rules for coaches and academies</h2>
      <p>
        <strong>You are the one providing the coaching.</strong> You are responsible for the standard and safety of your
        sessions, for supervising them, for the venue, for your own conduct, and for holding any qualification, licence,
        insurance or clearance the law requires of you, including any clearance required to work with children.
      </p>
      <p>
        <strong>Only invite people who have agreed to be invited.</strong> You are responsible for the accuracy of the
        details you enter about another person, and for having their permission to enter them.
      </p>
      <p>
        <strong>Your prices and merchant details.</strong> You set your monthly price and are responsible for it. The
        merchant details you send so that your academy can receive fees must be true, complete and your own. You can
        add players and coaches only once your monthly price is set and your merchant account is active.
      </p>
      <p>
        <strong>Use what you are given only for coaching.</strong> Where you are given access to another person’s
        details through O’Smash, use them only to deliver and run that person’s coaching.
      </p>
      <p>
        <strong>Do not record attendance you know or suspect to be false,</strong> whether by marking the roster or
        otherwise, and do not ask another person to do so.
      </p>

      <h2>8. Rules for everyone</h2>
      <p>
        <strong>Use O’Smash for what it is for.</strong> Use O’Smash only to arrange, attend, record and pay for badminton
        coaching. Hold one account, in your own name, with accurate details, and in the role that actually applies to
        you.
      </p>
      <p>You must not:</p>
      <ul>
        <li>
          <strong>Attendance.</strong> Check in to a session you are not at; check in for someone other than yourself or
          your own child; send the session QR to someone who is not there; or otherwise cause attendance to be recorded
          for a session that was not attended.
        </li>
        <li>
          <strong>Attendance records.</strong> Record attendance you know or suspect to be false, or ask another person
          to do so.
        </li>
        <li>
          <strong>Codes and invitations.</strong> Share, forward or transfer an invitation, a sign-in code or a child’s
          link QR; use one that was not meant for you; or attempt to guess, generate or test codes.
        </li>
        <li>
          <strong>Impersonation.</strong> Hold yourself out as a coach, academy or parent you are not; use the name or
          identity of a real coach or academy without their authority; or claim a qualification, licence or clearance to
          work with children that you do not hold.
        </li>
        <li>
          <strong>Account sharing.</strong> Let another person use your account, use another person’s account, or
          register on behalf of someone else.
        </li>
        <li>
          <strong>Other people’s accounts and data.</strong> Access, or try to access, another person’s account,
          attendance or payment record, or our administration portal.
        </li>
        <li>
          <strong>Misuse of details you were given.</strong> Use a player’s or parent’s details for anything other than
          delivering their coaching, including contacting them for an unrelated purpose, marketing to them, disclosing
          them, or keeping them after your connection ends.
        </li>
        <li>
          <strong>Automated access.</strong> Use any automated tool, script, crawler or bot to access O’Smash;
          bulk-download or enumerate profiles, photographs, academies, rosters, sessions or payment data; create an
          account by automated means; or work around any rate limit or access control.
        </li>
        <li>
          <strong>Photographs.</strong> Upload a photograph that is not of you, a photograph of another person without
          their permission, or a photograph of a child unless you are that child’s parent.
        </li>
        <li>
          <strong>Objectionable content.</strong> Post or send anything abusive, hateful, threatening, sexual, violent,
          discriminatory or illegal, in names, photos, logos, messages or anywhere else in the app. We have zero
          tolerance for objectionable content and abusive users: we remove the content and suspend or close the account
          that posted it.
        </li>
        <li>
          <strong>Harassment and integrity.</strong> Harass, threaten or abuse any user, or interfere with the
          operation, security or integrity of O’Smash, including its attendance and payment records.
        </li>
      </ul>
      <p>
        <strong>Security reports.</strong> If you find a security weakness, tell us at{" "}
        <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a> rather than exploiting it or publishing it.
        We will not treat a good-faith report as a breach of these terms.
      </p>

      <h2>9. Reporting and blocking</h2>
      <p>
        <strong>Report.</strong> Tap Report on an academy, or chat with support in the app, to tell us about content or
        a user. We review every report within 24 hours.
      </p>
      <p>
        <strong>Block.</strong> Tap Block to stop seeing an academy or coach. We are told when you block, so we can
        check it too.
      </p>
      <p>
        <strong>We rely on reports.</strong> O’Smash does not monitor sessions, messages or user conduct. We act on what
        users tell us and on our own records.
      </p>

      <h2>10. Keeping children safe</h2>
      <p>
        <strong>Who is responsible.</strong> A coach or academy who delivers coaching to a player under 18 is
        responsible for that player’s safety during a session, for supervision at the venue, and for holding every
        qualification, licence, insurance and clearance to work with children that Malaysian law requires. O’Smash is
        not present at sessions and does not supervise them.
      </p>
      <p>
        <strong>Parent consent.</strong> A player under 18 can join a coach only after a parent has linked to them and
        agreed. No one may try to get around this, for example by entering a false date of birth.
      </p>
      <p>
        <strong>Contact outside O’Smash.</strong> A coach or academy may use a player’s or parent’s contact details only
        to arrange and deliver that player’s coaching. Where the player is under 18, communication should be with the
        parent.
      </p>
      <p>
        <strong>Absolute prohibitions.</strong> No user may use O’Smash, or information obtained through it, to groom,
        sexually exploit, abuse, endanger or make unwanted contact with a child, or to arrange contact with a child
        outside the coaching arranged through O’Smash.
      </p>
      <p>
        <strong>Reporting a concern.</strong> Anyone with a concern about the safety of a child in connection with
        O’Smash should email <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a> immediately, marking
        the message URGENT — CHILD SAFETY, with as much detail as possible. If a child is in immediate danger, contact
        the police first on 999 and tell us as well.
      </p>
      <p>
        <strong>What we do on a credible report.</strong> We treat child-safety reports as our highest priority. We will
        acknowledge one within one business day, pause new payments and settlements for the account concerned while we
        look into it, preserve that account’s records, and, where we hold a reasonable belief that a child has been
        harmed or is at risk, report the matter to the Royal Malaysia Police or the Department of Social Welfare. We may
        do so without notifying the person reported where notifying them would put a child at risk or prejudice an
        investigation.
      </p>
      <p>
        <strong>What we do not do.</strong> We do not monitor sessions, and nobody from O’Smash attends them. We do not
        verify a coach’s identity, qualifications or clearances. Parents and players should satisfy themselves about a
        coach before a first session.
      </p>
      <p>
        <strong>Cooperation.</strong> Every user must cooperate with a child-safety investigation and must not destroy,
        alter or conceal relevant records.
      </p>

      <h2>11. Photos, profiles and intellectual property</h2>
      <p>
        <strong>What belongs to us.</strong> O’Smash, the O’Smash name and logo, the app, its source code, screens,
        layout, text, graphics and illustrations belong to OC Global Technology Sdn. Bhd. or are licensed to it. We grant
        you a personal, non-exclusive, non-transferable, revocable licence to use O’Smash on a device you control, for the
        purposes described in these terms. You may not copy, modify, translate, reverse-engineer, decompile, resell, rent
        or create derivative works from O’Smash, extract data from it by automated means, or use the O’Smash name, logo
        or branding without our written permission.
      </p>
      <p>
        <strong>What belongs to you.</strong> You keep ownership of the profile photograph, academy logo and text you
        submit, such as your profile details, your academy’s name and your messages to our team.
      </p>
      <p>
        <strong>The permission you give us.</strong> You give us a non-exclusive, royalty-free permission to store, host,
        copy, resize, re-encode and display that material only so that O’Smash can operate, for example showing your
        profile photograph alongside your name to your coach, or your academy’s name and logo to players looking for a
        coach. We do not sell it, license it to anyone else, or use it in advertising. How long we keep it is set out in
        the Privacy Notice.
      </p>
      <p>
        <strong>What you promise about what you upload.</strong> You promise that you own the photograph or logo you
        upload or have permission to use it, and that it does not infringe anyone else’s rights. Do not upload a
        photograph of another person without their permission. If the photograph is of a child, only that child’s parent
        may upload it.
      </p>
      <p>
        <strong>Removing content and copyright complaints.</strong> You can replace your profile photograph at any time.
        Our staff may remove a photograph or logo that breaks these terms. If you want other material removed, or if you
        believe material on O’Smash infringes your copyright, tell us at{" "}
        <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a> with enough detail to identify it, and we
        will remove it where we are able to.
      </p>
      <p>
        <strong>Feedback.</strong> If you send us a suggestion about O’Smash, we may use it without any obligation to
        you.
      </p>
      <p>
        <strong>Your personal information.</strong> How we collect and handle personal information is described in the
        O’Smash <Link href="/privacy">Privacy Notice</Link>, which forms part of your agreement with us.
      </p>
      <p>
        <strong>Open-source components.</strong> O’Smash is built using open-source software provided by third parties,
        which remains the property of its authors. We credit the following: Feather icons, © Cole Bemis, used under the
        MIT licence; and Material Design Icons by Pictogrammers, used under the Apache Licence, Version 2.0.
      </p>

      <h2>12. What we are, and are not, responsible for</h2>
      <p>
        Read this section carefully. It sets out what each of us is responsible for, and the things we cannot and do not
        limit.
      </p>
      <p>
        <strong>What each of us is responsible for.</strong> We are responsible for O’Smash: the app and the tools in it.
        Your coach or academy is responsible for the coaching: its standard, its safety, supervision at the venue, and
        their own conduct and qualifications.
      </p>
      <p>
        <strong>What we do not limit.</strong> Nothing in these terms limits or excludes anything that cannot lawfully be
        limited or excluded. In particular, nothing here excludes, restricts or modifies: any right, guarantee or remedy
        you have under the Consumer Protection Act 1999, including the statutory guarantees in respect of services,
        which under section 6 of that Act cannot be contracted out of; liability for death or personal injury caused by
        our negligence; liability for fraud or fraudulent misrepresentation; or any other liability that cannot be
        excluded under Malaysian law.
      </p>
      <p>
        <strong>Badminton is a physical activity.</strong> You take part at your own risk, and you are responsible for
        being fit enough to do so and for telling your coach about any condition or injury that affects you. If the
        player is under 18, their parent is responsible for this.
      </p>
      <p>
        <strong>What we are not responsible for.</strong> Subject to the paragraphs above and to the Refund and
        Cancellation Policy, we are not responsible for the standard, safety or outcome of coaching, for a dispute
        between users, or for loss caused by information that you or another user entered incorrectly.
      </p>
      <p>
        <strong>Indirect loss.</strong> Subject to the paragraphs above, we are not liable for indirect or consequential
        loss, or for loss of profit, opportunity, goodwill or data.
      </p>
      <p>
        <strong>Changes to O’Smash.</strong> We may change, suspend or withdraw features of O’Smash, and carry out
        maintenance. We will not materially reduce the core functionality without giving notice under section 15.
      </p>
      <p>
        <strong>If you break these terms</strong> and that causes us loss or a claim from someone else, you agree to
        cover our reasonable losses and costs. This is limited to loss we suffer because you broke these terms, and is
        never wider than Malaysian law allows against a consumer.
      </p>
      <p>
        <strong>Fairness.</strong> We have written this section to be fair and no wider than is reasonable. If a court
        finds any part of it unfair under Part IIIA of the Consumer Protection Act 1999, or otherwise unenforceable, that
        part is severed and the rest continues to apply.
      </p>

      <h2>13. Ending, suspending or closing an account</h2>
      <p>
        <strong>Closing your account.</strong> You may delete your account at any time from Settings in the app, or by
        telling us at <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>. An Owner whose academy has
        other members closes the academy first, from Edit profile. Closing your account does not affect anything owed
        before it closed. What happens to your information afterwards is set out in the{" "}
        <Link href="/privacy">Privacy Notice</Link>.
      </p>
      <p>
        <strong>What we may do if these terms are broken.</strong> Where we reasonably believe that these terms have
        been broken, or that O’Smash is being used unlawfully or in a way that puts a person at risk, we may take one or
        more of the following steps, choosing what is proportionate:
      </p>
      <ul>
        <li>
          <strong>Warn.</strong> Notify you of the breach and require it to stop.
        </li>
        <li>
          <strong>Remove content.</strong> Remove a profile photograph, academy logo or other material you have
          submitted.
        </li>
        <li>
          <strong>Correct records.</strong> Correct or reverse an attendance record we find to be inaccurate, and refund
          or adjust a payment recorded on it.
        </li>
        <li>
          <strong>Restrict access.</strong> Suspend or restrict access to your account or to particular features, for
          as long as is necessary.
        </li>
        <li>
          <strong>Terminate.</strong> End your right to use O’Smash by written notice.
        </li>
        <li>
          <strong>Report.</strong> Report the matter to the police or another authority where the law requires it, or
          where we hold a reasonable belief that a child is at risk.
        </li>
      </ul>
      <p>
        <strong>How we exercise these rights.</strong> We will normally take the least serious step that addresses the
        matter, and escalate only if the breach continues or recurs. We will tell you what we have done and why, and give
        you a reasonable opportunity to respond, unless doing so would put a person at risk, prejudice an investigation,
        or breach a legal obligation. We may go straight to suspension or termination where the matter involves
        objectionable content or abuse, the safety of a child, fraud including false attendance or payment fraud,
        impersonation, or a serious risk to other users.
      </p>
      <p>
        <strong>Grounds.</strong> Serious or repeated breach of section 7, 8 or 10; dishonesty in connection with a
        payment or an attendance record; conduct that endangers a child; providing false information about your identity,
        your age or your entitlement to coach; or a legal obligation on us.
      </p>
      <p>
        <strong>Ending without breach.</strong> We may end this agreement, or withdraw O’Smash, on at least 30 days’
        written notice.
      </p>
      <p>
        <strong>Payments already made.</strong> Refunds are dealt with in the Refund and Cancellation Policy, and your
        rights under the Consumer Protection Act 1999 are not affected.
      </p>
      <p>
        <strong>What survives.</strong> The clauses on payments already made, refunds, intellectual property, liability
        and governing law survive the end of this agreement.
      </p>

      <h2>14. If something goes wrong</h2>
      <p>
        <strong>Tell us.</strong> Chat with support in the app, from Settings, or email{" "}
        <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>. Tell us the session date, the coach’s or
        player’s name, and what happened; our records are organised by session, so that is what lets us investigate. We
        aim to reply within two business days, and within one business day for a child-safety concern.
      </p>
      <p>
        <strong>If your complaint is about coaching,</strong> such as the standard of a session, a coach not turning up,
        or how a coach behaved, speak to your coach or academy first, then tell us, so that we can act on our side.
        Requests about a payment taken in error do not require this; ask us directly, as the Refund and Cancellation
        Policy explains.
      </p>
      <p>
        <strong>If you cannot sign in,</strong> you may report a concern to us directly by email.
      </p>
      <p>
        <strong>Your right to go to court is not restricted.</strong> We may suggest mediation, but nothing in these
        terms requires you to use it, prevents you from bringing proceedings, limits the time in which you may bring
        them, or requires you to bring a claim anywhere other than the Malaysian courts. You may also bring a claim to
        the Tribunal for Consumer Claims Malaysia, which hears consumer claims up to RM50,000.
      </p>
      <p>
        <strong>Governing law.</strong> These terms are governed by the laws of Malaysia, and the Malaysian courts have
        non-exclusive jurisdiction.
      </p>

      <h2>15. Changes to these terms</h2>
      <p>
        We may change these terms. If a change materially affects you, we will tell you before it takes effect and give
        you at least 30 days’ notice, by email or in the app. If you do not accept a change, you may close your account
        before it takes effect. We will not treat continued use alone as acceptance of a material change. Each version
        carries the date shown at the top of this page, and the current version is always available from the app.
      </p>

      <h2>16. How to contact us, and other terms</h2>
      <p>
        <strong>Contact.</strong> OC Global Technology Sdn. Bhd., 21 City Plaza, Jalan Tebrau, Kampung Wadi Hana, 80300
        Johor Bahru, Johor, Malaysia. Email <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>.
        Everyone signed in can also chat with support in the app, from Settings; our team replies there.
      </p>
      <p>
        <strong>Notices.</strong> We contact you using the email address on your account, by push notification, and
        through messages in the app. Please keep your details up to date. Messages we send from a no-reply address are
        not monitored.
      </p>
      <p>
        <strong>App stores.</strong> If you obtained O’Smash from an app store, that store’s own terms also apply to your
        download and use of the app. Where those terms and these differ about your download, the store’s terms apply to
        the download.
      </p>
      <p>
        <strong>Transfer.</strong> You may not transfer your rights under these terms. We may transfer ours to another
        company, for example if our business is sold, provided your rights are not reduced. We will tell you if we do.
      </p>
      <p>
        <strong>Other.</strong> If any part of these terms is found to be unenforceable, the rest continues to apply. If
        we do not enforce a term straight away, we do not lose the right to enforce it later. These terms, together with
        the O’Smash Privacy Notice and the O’Smash Refund and Cancellation Policy, are the whole agreement between you
        and us about O’Smash. Where these terms and the Refund and Cancellation Policy differ on payment, cancellation or
        refunds, that policy applies. A person who is not a party to these terms has no right to enforce them under the
        Contracts (Rights of Third Parties) Act 2001.
      </p>
    </LegalPage>
  );
}
