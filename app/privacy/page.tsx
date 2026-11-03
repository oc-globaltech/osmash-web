import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "../legal";

export const metadata: Metadata = { title: "Privacy Notice — O'Smash" };

// From OSMASH-PRIVACY-POLICY.pdf (9 Sep 2026), with facts brought up to the spec in osmash-api and osmash-expo
// docs/Spec (Privacy-Consent-Retention, Decision-Log to DEC-064, 30 Oct 2026). Pending legal review.
export default function Privacy() {
  return (
    <LegalPage title="Privacy Notice">
      <p>
        O’Smash is a mobile application for organising badminton coaching in Malaysia. Coaches and academies use it to
        schedule sessions, manage their players, record attendance and take monthly fees. Players and their parents use
        it to find a coach, see their sessions, check in by scanning a QR code, and pay.
      </p>
      <p>
        This notice explains what personal information O’Smash collects, why, who else receives it, how long it is kept,
        and what you can ask us to do about it. It is written to serve as the written notice required by section 7 of
        the Personal Data Protection Act 2010.
      </p>

      <h2>What you should know first</h2>
      <ul>
        <li>
          <strong>You sign yourself up.</strong> Coaches, players and parents create their own accounts. A coach can
          also invite you by email, or find your account by your exact email address or phone number.
        </li>
        <li>
          <strong>We hold information about children.</strong> Where a player is under 18, we hold their date of birth
          and the details of the parent linked to them. A parent must agree before the child can join a coach. Section 8
          is written for parents.
        </li>
        <li>
          <strong>Your payment details never reach us.</strong> Payments are handled by Fiuu, a third-party payment
          gateway.
        </li>
        <li>
          <strong>We do no tracking of any kind.</strong> There is no analytics, advertising or crash reporting anywhere
          in O’Smash, and we never store your location. Push notifications are used only to tell you about your account,
          your sessions and your payments.
        </li>
        <li>
          <strong>You can delete your account from the app.</strong> Deletion takes effect immediately, with a 30-day
          period during which you can change your mind. After that it cannot be restored. Sections 13 and 18 set out
          what is kept and for how long.
        </li>
      </ul>

      <h2>1. About this notice</h2>
      <p>
        <strong>Who is responsible for your personal data.</strong> OC Global Technology Sdn. Bhd. is the data user
        responsible for the personal data described in this notice. Our address is 21 City Plaza, Jalan Tebrau, Kampung
        Wadi Hana, 80300 Johor Bahru, Johor, Malaysia.
      </p>
      <p>
        <strong>What this notice covers.</strong> This notice applies to the O’Smash mobile application for iOS and
        Android, the service that supports it, and the administration portal used by O’Smash staff.
      </p>
      <p>
        <strong>What it replaces.</strong> This notice replaces the combined terms and privacy text that appeared in
        earlier versions of the app. It should be read together with the O’Smash{" "}
        <Link href="/terms">Terms of Use</Link> and the O’Smash{" "}
        <Link href="/refund-policy">Refund and Cancellation Policy</Link>.
      </p>

      <h2>2. Who we are</h2>
      <p>
        In this notice, “O’Smash”, “we”, “us” and “our” mean OC Global Technology Sdn. Bhd. “You” means any person whose
        personal information we hold, whether or not you have an O’Smash account.
      </p>
      <p>
        Under the Personal Data Protection Act 2010 we are the data user for the information described here, and you
        are a data subject. You can reach us at{" "}
        <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>.
      </p>

      <h2>3. Words we use</h2>
      <p>
        <strong>Session.</strong> A coaching session at a set date, time and training location, created in O’Smash by a
        coach.
      </p>
      <p>
        <strong>Coach.</strong> A coach account. In the app, an Owner runs an academy, a Sub coach coaches in an
        Owner’s academy, and a Solo coach works alone.
      </p>
      <p>
        <strong>Academy.</strong> A coaching business on O’Smash, run by an Owner. A solo coach’s workspace is treated
        the same way in this notice.
      </p>
      <p>
        <strong>Player.</strong> A player account, for a person who attends sessions.
      </p>
      <p>
        <strong>Parent.</strong> A player aged 18 or over who is linked to the player account of a child under 18.
      </p>
      <p>
        <strong>Invitation.</strong> An email an Owner sends so that a player or coach can join their academy.
      </p>
      <p>
        <strong>Session QR.</strong> The code a coach shows at a session. Players scan it to check in.
      </p>
      <p>
        <strong>Link QR.</strong> The code a player under 18 shows so that a parent can link to them.
      </p>

      <h2>4. How your information reaches us</h2>
      <p>This section comes early because it is the first thing most readers need to know.</p>
      <p>
        <strong>If you are a coach,</strong> you entered your own details when you created your account. If you run an
        academy, you also entered its details, and the merchant details described in section 5.
      </p>
      <p>
        <strong>If you are a player,</strong> you entered your own details when you signed up. If an Owner invited you
        before you had an account, they entered your email address. An Owner can also find your account by your exact
        email address or phone number; they then see only your name and whether the account belongs to an adult or a
        child.
      </p>
      <p>
        <strong>If you are a parent,</strong> you have your own player account. You link to your child by scanning the
        child’s link QR or by approving a request sent to you by email. Once linked, you can edit your child’s name and
        date of birth. Section 8 explains what you can do and ask for.
      </p>

      <h2>5. Information we collect</h2>
      <p>
        <strong>Account details.</strong> Your role, full name, email address, phone number, date of birth and a
        password, collected when you create your account. We also record the version of this notice and the Terms of
        Use you accepted, and when. Passwords are never stored in a readable form; we store only a one-way cryptographic
        hash.
      </p>
      <p>
        <strong>Academy details.</strong> For an Owner or solo coach: the academy name and logo, the training locations
        it uses, its monthly price, and its players and coaches.
      </p>
      <p>
        <strong>Merchant details.</strong> So that an academy can receive the fees its players pay, the Owner or solo
        coach sends us the business name, the SSM registration number if the business is registered, the bank name,
        account holder name and account number, a contact phone number and email address, and photos of the SSM
        certificate and of a bank statement or bank header showing the account. We use them to register the academy
        with Fiuu as a merchant.
      </p>
      <p>
        <strong>Date of birth.</strong> We use it to check that coaches are 18 or over and to identify players under 18,
        who need a linked parent and that parent’s consent.
      </p>
      <p>
        <strong>Parent links and consent.</strong> Which parent is linked to which child, the relationship the parent
        names, and the parent’s agreement, with the version of the consent text and the time.
      </p>
      <p>
        <strong>Profile photograph.</strong> An image you choose to upload. This is optional and O’Smash works fully
        without one.
      </p>
      <p>
        <strong>Join requests and invitations.</strong> Which academies you asked to join or were invited to, and the
        answer.
      </p>
      <p>
        <strong>Session and attendance records.</strong> The sessions you were on, whether you were checked in, when,
        and whether by scanning the session QR or by your coach marking the roster.
      </p>
      <p>
        <strong>Payment records.</strong> For plans and monthly fees: the amount, the date, whether the payment
        succeeded, any refund, and the references issued by our payment gateway. For a saved card, a card reference:
        the gateway’s token, the card brand and the last four digits.
      </p>
      <p>
        <strong>Notifications.</strong> The notices we send you, which notification categories you switched off, and a
        device token so that push notifications reach your phone.
      </p>
      <p>
        <strong>Support messages.</strong> The messages you send us and our replies, with the academy, and for a parent
        the child, that you were viewing when you wrote.
      </p>
      <p>
        <strong>Audit log.</strong> A record of each change made in the app or the admin portal and who made it,
        including sign-ins, sign-outs, failed sign-ins and check-ins, so that a disputed record can be checked. Section
        13 sets out how long we keep it.
      </p>
      <p>
        <strong>Security records.</strong> Your network address, held briefly, to limit repeated sign-in and one-time
        code attempts.
      </p>
      <p>
        <strong>What you must give us.</strong> Your name, email address, phone number, date of birth and a password are
        required; without them we cannot create or operate your account. A player under 18 must link a parent before
        joining a coach. Merchant details are required before an academy can take fees. A profile photograph is
        optional.
      </p>
      <p>
        <strong>The camera.</strong> The camera is used only to scan QR codes, such as a session QR, an academy’s QR or a
        child’s link QR, and to take a photograph you choose to upload. Scanning happens on your device and no image or
        video is sent to us.
      </p>
      <p>
        <strong>Location.</strong> When you look for academies near a place, your phone rounds the location to about 1
        km before sending it. We use it for that search only, and it is never stored or logged. Where the app shows a
        “location” for a session, it is a training location chosen by the coach.
      </p>

      <h2>6. How we use your information</h2>
      <p>
        The Personal Data Protection Act 2010 is built on consent, with limited exceptions where processing is necessary
        for a contract or to meet a legal obligation. We do not rely on “legitimate interests”, which is not a basis
        available under Malaysian law.
      </p>
      <p>
        <strong>To create and operate your account,</strong> sign you in, and send you the one-time codes and invitations
        that let you join a coach. We rely on your consent and on the necessity of doing this to provide O’Smash to you.
      </p>
      <p>
        <strong>To list academies near a place, handle join requests, schedule sessions, manage rosters and record
        attendance,</strong> which is the service itself.
      </p>
      <p>
        <strong>To take plan payments and monthly fees,</strong> and to keep the payment and accounting records the law
        requires us to keep.
      </p>
      <p>
        <strong>To resolve disputes about attendance or payment,</strong> which is why the audit log exists.
      </p>
      <p>
        <strong>To send you notifications and answer your support messages.</strong>
      </p>
      <p>
        <strong>To protect accounts</strong> by limiting repeated sign-in and code attempts.
      </p>
      <p>
        <strong>We do not profile you.</strong> We do not build behavioural profiles, and no decision that affects you
        is made by automated means without human involvement. The figures shown in the app are simple totals of
        sessions and payments.
      </p>

      <h2>7. Payment information</h2>
      <p>
        <strong>How payments are taken.</strong> Payments made through O’Smash are processed by Fiuu (Razer Merchant
        Services), a licensed third-party payment gateway, on its own payment page. Coach plans are paid by card, which
        Fiuu saves so that the plan can renew each month. Monthly fees can be paid by online banking (FPX), card,
        e-wallet or DuitNow QR. The methods available may change from time to time without a change to this notice.
      </p>
      <p>
        <strong>What the gateway receives.</strong> You enter your payment details directly into the gateway’s own
        page. Those details, such as your card number, expiry date and security code, your online banking credentials or
        your wallet sign-in, are collected and held by the gateway. We give the gateway your name, email address, mobile
        number and the amount payable so that it can process and reconcile the payment.
      </p>
      <p>
        <strong>What we receive and store.</strong> The gateway returns to us the payment references, the amount, the
        payment method type, whether the payment succeeded, and the date and time. For a saved card it also returns the
        card reference described in section 5. That is the record we hold. A payment counts only once the gateway’s
        server confirms it to us, and we check that confirmation before acting on it.
      </p>
      <p>
        <strong>What never reaches us.</strong> We do not receive or store full payment credentials. Your full card
        number, card security code, online banking credentials and wallet sign-in details are not transmitted to,
        processed by, or stored on O’Smash systems at any point.
      </p>
      <p>
        <strong>The gateway’s own terms.</strong> The gateway processes your payment information under its own privacy
        terms and its own regulatory obligations, including the payment industry security standards that apply to it.
        We may appoint a different gateway, and will update this notice if we do.
      </p>
      <p>
        <strong>Monthly fees go to the academy.</strong> A monthly fee settles to the academy’s own merchant account
        with the gateway, not to O’Smash. For a player under 18, only a linked parent pays.
      </p>
      <p>
        <strong>Plans, cancellation and refunds.</strong> How plans renew, how to cancel and when we refund are set out
        in the <Link href="/refund-policy">Refund and Cancellation Policy</Link>. Nothing in it affects your rights
        under the Consumer Protection Act 1999.
      </p>

      <h2>8. Children and parents</h2>
      <p>This section is written for parents.</p>
      <p>
        <strong>What we hold about a child.</strong> Where a player is under 18 we hold their name, email address, phone
        number and date of birth, the parents linked to them, the academies they belong to, the sessions they were on,
        whether they checked in, and the fees paid for them.
      </p>
      <p>
        <strong>Consent.</strong> A person under 18 cannot give valid consent to the use of their personal information.
        Under regulation 3(2) of the Personal Data Protection Regulations 2013, consent for a data subject under 18 must
        be given by a parent, guardian or person with parental responsibility.
      </p>
      <p>
        <strong>How you link and agree.</strong> You need your own player account, aged 18 or over. You link to your
        child by scanning the child’s link QR, which lasts 10 minutes, or by approving a request sent to you by email,
        which lasts 7 days. Either way, you are shown the consent text and asked to agree. We record you, your child,
        the version of the text and the time. A child can have more than one parent linked.
      </p>
      <p>
        <strong>Before a parent is linked,</strong> a child can use only their own account, parent linking, notices and
        the list of training locations. They cannot join a coach or be added to a session.
      </p>
      <p>
        <strong>What you can do in the app.</strong> See your child’s profile, academies, sessions and attendance;
        receive your child’s notices; pay your child’s fees; accept or decline an academy’s invitation for your child;
        check your child in; edit your child’s name and date of birth; take your child out of an academy; manage your
        child’s other parents; and delete your child’s account. You cannot read your child’s support chat or change
        their notification settings.
      </p>
      <p>
        <strong>When your child turns 18,</strong> the link ends. We tell you both, and your child then manages their
        own account and pays for themselves.
      </p>
      <p>
        <strong>The last parent.</strong> While your child is under 18, the last parent linked to them cannot be removed,
        and cannot delete their own account, until another parent is linked.
      </p>
      <p>
        <strong>What you can ask for.</strong> You have the right to see everything we hold about your child, to have
        it corrected, and to ask us to delete it. Email{" "}
        <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a> with your child’s name and their academy,
        or chat with support in the app.
      </p>
      <p>
        <strong>If you did not agree</strong> to your child being linked or added, tell us and we will look into it and
        remove the record where that is right.
      </p>

      <h2>9. If you are a coach or academy</h2>
      <p>
        <strong>You see other people’s information.</strong> When players and coaches join your academy, you see
        personal information about them, and where a player is under 18, about their parents too.
      </p>
      <p>
        <strong>Invite only people who agree.</strong> When you invite someone, you are responsible for having their
        agreement. Enter only what is needed, keep it accurate, and tell us if you learn that something is wrong.
      </p>
      <p>
        <strong>Use it only for coaching.</strong> Do not use information you obtained through O’Smash for any purpose
        other than running that person’s coaching.
      </p>
      <p>
        <strong>You may have your own obligations.</strong> Where you or your academy decide for yourselves what is
        collected about your players and why, you may have obligations of your own under the Personal Data Protection
        Act 2010, separately from ours.
      </p>

      <h2>10. How we share your information</h2>
      <p>
        <strong>Inside O’Smash.</strong> What people see differs by role. The Owner of an academy sees its players and
        coaches. A sub coach sees the details of the players on their own sessions. Players on the same group session
        see each other’s first names. A player sees their own records, and a parent sees their linked children’s. An
        Owner who looks up an account by email or phone sees only the name and whether it belongs to an adult or a
        child. An academy’s or solo coach’s name and training locations are shown to players looking for a coach near a
        place. O’Smash staff can see and correct account, academy, payment and support records, and can see the consent
        record and the audit log, to provide support.
      </p>
      <p>
        <strong>Outside O’Smash.</strong> We share personal information only with the service providers listed in
        section 11, and only so far as they need it to provide their service to us.
      </p>
      <p>
        <strong>We do not sell your personal information,</strong> and we do not share it with advertisers. We do share
        it with the providers in section 11; a claim that we never share your information would not be true. What we do
        not do is sell it, trade it, or give it to anyone whose service is not needed to operate O’Smash.
      </p>
      <p>
        <strong>Where the law requires it.</strong> We may disclose information where the law requires it, or where it
        is necessary to establish, exercise or defend a legal claim.
      </p>

      <h2>11. Service providers we use</h2>
      <ul>
        <li>
          <strong>Fiuu (Razer Merchant Services), payment gateway.</strong> Processes payments and holds each academy’s
          merchant account. Receives your name, email address, mobile number and the amount, and an academy’s merchant
          details. Your payment credentials go directly to it and never reach us.
        </li>
        <li>
          <strong>Laravel Cloud, hosting provider.</strong> Runs the service and its database, and therefore holds all
          of the information described in this notice at rest.
        </li>
        <li>
          <strong>Cloudflare, network and file storage provider.</strong> Delivers the service over the network and
          stores uploaded images, such as profile photographs, academy logos and merchant documents.
        </li>
        <li>
          <strong>ZeptoMail, email delivery provider.</strong> Sends one-time codes, invitations and notices. Receives
          your email address and the contents of the message.
        </li>
        <li>
          <strong>Firebase Cloud Messaging and Apple Push Notification service, push providers.</strong> Deliver push
          notifications to your phone. Receive your device token and the contents of the notice.
        </li>
      </ul>
      <p>
        <strong>Our email contains no tracking.</strong> We send transactional email only, and our emails contain no
        tracking pixels, so opening a message from O’Smash tells us nothing.
      </p>

      <h2>12. Where your information is stored</h2>
      <p>
        The service, its database and uploaded images are hosted in Singapore, outside Malaysia. Some of our other
        service providers may process information in other countries. Section 129 of the Personal Data Protection Act
        2010 governs transfers of personal data out of Malaysia, and we transfer information only where that section
        permits it.
      </p>

      <h2>13. How long we keep your information</h2>
      <p>
        We keep personal information only for as long as it is needed for the purpose it was collected for, as section
        10 of the Personal Data Protection Act 2010 requires. Nothing below is deleted while your account, the academy or
        the parent link is still active. The periods below apply to each category.
      </p>
      <p>
        <strong>Account details</strong>, such as your name, email address, phone number and password hash, are kept for
        as long as your account is open, and are handled in accordance with section 18 once it is deleted.
      </p>
      <p>
        <strong>Profile photographs</strong> are deleted when you replace them, and 30 days after you delete your
        account.
      </p>
      <p>
        <strong>Session and attendance records</strong> are kept while the player belongs to the academy and the academy
        is open, and are deleted 7 years after the player leaves or the academy closes.
      </p>
      <p>
        <strong>Payment and fee records</strong>, refunds included, are kept for 7 years after the player leaves or the
        academy closes, because Malaysian tax and company law, including the Income Tax Act 1967 and the Companies Act
        2016, require records to be kept. A saved card reference is kept until the card is replaced, and removed 30 days
        after you delete your account.
      </p>
      <p>
        <strong>Academy records</strong>, including its members, sessions and plan, are deleted 7 years after the
        academy closes.
      </p>
      <p>
        <strong>Parent links and consent records</strong> are kept as proof of consent, and deleted 7 years after the
        link stops being active.
      </p>
      <p>
        <strong>The audit log and in-app notices</strong> are deleted 7 years after the entry was made.
      </p>
      <p>
        <strong>Support messages</strong> are kept while your account exists. 30 days after you delete your account they
        lose your name and contact details.
      </p>
      <p>
        <strong>Invitations</strong> are deleted 30 days after they expire, are declined or are revoked.
      </p>
      <p>
        <strong>One-time codes, sign-in tokens and device tokens</strong> are deleted 30 days after they are used,
        expire or are revoked.
      </p>
      <p>
        <strong>How long codes last.</strong> One-time codes and password-reset codes expire 10 minutes after they are
        issued. Invitations and parent link requests expire after 7 days. A child’s link QR expires after 10 minutes.
      </p>

      <h2>14. How we protect your information</h2>
      <p>
        <strong>Passwords and codes.</strong> Your password is never stored in a readable form; we store only a one-way
        cryptographic hash. One-time codes are also stored as a hash, expire after 10 minutes, and stop working after 5
        wrong tries.
      </p>
      <p>
        <strong>Signing in.</strong> The app holds a sign-in token in your phone’s secure storage (the iOS Keychain or
        Android Keystore). It lasts 30 days and renews while you use the app; after that you must sign in again.
        Signing out, resetting your password or deleting your account cancels all of your tokens on our servers.
      </p>
      <p>
        <strong>Rate limiting.</strong> We limit how often sign-in, one-time-code, password-reset and payment requests
        can be made from the same account or network connection, to make guessing attacks impractical.
      </p>
      <p>
        <strong>Access control.</strong> What you can see and do in O’Smash is restricted by your role. Coaches see only
        their own academy’s players; players see only their own records, and parents their linked children’s. O’Smash
        staff use a separate administration portal that requires two-factor sign-in, and every change they make is
        written to the audit log.
      </p>
      <p>
        <strong>Session QR codes.</strong> A session QR is signed, changes about every 30 seconds, and works only for
        that session around its start time.
      </p>
      <p>
        <strong>Payments.</strong> Payment credentials are handled entirely by the payment gateway and never reach our
        servers. Payment confirmations received from the gateway are verified before we act on them.
      </p>
      <p>
        <strong>If something goes wrong.</strong> If a security incident affects your personal information, we will act
        on it and, where the law requires, notify the Personal Data Protection Commissioner and the people affected.
      </p>

      <h2>15. Information stored on your device</h2>
      <p>
        O’Smash stores the following on your phone: your sign-in token, copies of screens you have opened so that they
        load quickly, a check-in waiting to be sent while you are offline, and your language and theme preferences.
      </p>
      <p>Signing out removes your sign-in token. Uninstalling the app removes the rest.</p>

      <h2>16. Cookies and similar technologies</h2>
      <p>
        <strong>The mobile app does not use cookies.</strong> Signing in to the O’Smash app uses a token issued to your
        device rather than a cookie. When you pay, the payment gateway’s page opens in a secure window; any cookies set
        in that window belong to the gateway and the payment networks and are used solely to complete the payment.
      </p>
      <p>
        <strong>A strictly necessary cookie in the administration portal.</strong> The administration portal is used
        only by O’Smash staff. It sets a session cookie that is strictly necessary to keep a member of staff signed in.
        The cookie performs no analytics, advertising or profiling function.
      </p>
      <p>
        <strong>No advertising or tracking technologies.</strong> We use no advertising cookies, no tracking pixels, no
        web beacons, no device fingerprinting and no cross-site or cross-app tracking of any kind.
      </p>

      <h2>17. Your privacy rights</h2>
      <p>
        Under the Personal Data Protection Act 2010 you have rights over your personal information. Everything in this
        section is handled by a person. Email{" "}
        <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>, or chat with support in the app. We answer
        access and correction requests within 21 days, at no charge.
      </p>
      <p>
        <strong>See what we hold about you.</strong> The app shows only part of it, so a full response is prepared by
        hand.
      </p>
      <p>
        <strong>Correct something that is wrong.</strong> You can change some details yourself in the app. Parent links,
        merchant details, attendance records and payment records are corrected on request.
      </p>
      <p>
        <strong>Withdraw your consent.</strong> You may withdraw consent at any time. We may then be unable to continue
        providing the service to you.
      </p>
      <p>
        <strong>Limit how we use your information.</strong> On request, considered case by case.
      </p>
      <p>
        <strong>Delete your account and your information.</strong> See section 18.
      </p>
      <p>A parent may exercise these rights on behalf of a player under 18. See section 8.</p>
      <p>
        If you are unhappy with how we have handled your information, please tell us first so we can put it right. You
        also have the right to complain to the Personal Data Protection Commissioner (Jabatan Perlindungan Data
        Peribadi Malaysia).
      </p>

      <h2>18. Account and data deletion</h2>
      <p>
        <strong>How to delete your account.</strong> You may delete your account at any time from Settings, using the
        “Delete account” option. You may also ask us to delete it by emailing{" "}
        <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>. A parent can delete a linked child’s
        account.
      </p>
      <p>
        <strong>When you cannot delete yet.</strong> An Owner whose academy has other members must close the academy
        first. The last parent linked to a child under 18 can delete their account only once another parent is linked.
      </p>
      <p>
        <strong>What happens immediately.</strong> When you confirm deletion we sign you out of every device. A player
        leaves every academy they belong to. A coach is taken off their upcoming sessions, and a session left with no
        coach goes back to the Owner. Your account is no longer usable from that moment.
      </p>
      <p>
        <strong>The 30-day grace period.</strong> Your account then enters a 30-day grace period, during which we keep
        your information so that you can recover the account if you deleted it by mistake, and so that any payment
        dispute or refund already in progress can be resolved.
      </p>
      <p>
        <strong>Changing your mind.</strong> To cancel deletion, sign in with your usual email address and password at
        any point within the 30 days. After 30 days the account cannot be restored, by us or by anyone else.
      </p>
      <p>
        <strong>After the 30 days.</strong> We remove your name, photograph, password, saved card and notification
        choices, and your support messages lose your name and contact details. We keep your email address, phone number
        and date of birth with the closed record, so that we recognise the account and so that you can sign up again
        with them. We clear those 7 years after deletion.
      </p>
      <p>
        <strong>What survives deletion.</strong> Some records survive because the law requires it or because we would
        otherwise be unable to answer a claim: session and attendance records, payment and fee records, and consent
        records, each for the period in section 13. They are linked to the anonymised account.
      </p>
      <p>
        <strong>Legal holds.</strong> We will not erase information while we are required to preserve it for actual or
        reasonably anticipated legal proceedings, a regulatory request or a criminal investigation. If that applies to
        you we will tell you, unless we are prohibited from doing so, and we will erase the information as soon as the
        requirement ends.
      </p>
      <p>
        <strong>Information held by the payment gateway</strong> is subject to that provider’s own retention rules. We
        will instruct it to delete what it is permitted to delete.
      </p>
      <p>A parent may request deletion on behalf of a player under 18. See section 8.</p>

      <h2>19. Marketing communications</h2>
      <p>
        <strong>We do not send marketing.</strong> O’Smash sends no promotional or marketing messages through any
        channel. Every message you receive from us relates to your account, your sessions, your payments or a support
        request you have raised.
      </p>
      <p>
        <strong>Service communications.</strong> Those messages are necessary to provide O’Smash to you and to meet our
        obligations. You can switch off categories of notifications, as section 20 explains, but security and account
        emails are always sent while your account is open.
      </p>
      <p>
        <strong>If we introduce marketing in future.</strong> We will ask for your consent beforehand and record it. We
        will not treat your use of O’Smash, or your acceptance of this notice, as consent to marketing. Where you have
        given consent you may withdraw it at any time, at no cost and without giving a reason.
      </p>

      <h2>20. Notifications</h2>
      <p>
        <strong>How we notify you.</strong> O’Smash shows notifications inside the app and sends them as push
        notifications to your phone, covering your sessions, session reminders, check-ins, players and invitations,
        plan and billing, and support replies. Some of them, such as payment receipts and fee reminders, are also sent
        by email.
      </p>
      <p>
        <strong>Your choices.</strong> You can switch each of those six categories on or off in Settings. Security and
        account emails, such as sign-in codes and password resets, are always sent. For a player under 18, emails go to
        the linked parents.
      </p>
      <p>
        <strong>No SMS or WhatsApp.</strong> O’Smash does not send text messages or WhatsApp messages.
      </p>
      <p>
        <strong>Device-level settings.</strong> Your phone’s operating system lets you turn push notifications for
        O’Smash off entirely, and may show its own badges or alerts. Those are governed by your device settings, not by
        O’Smash.
      </p>

      <h2>21. What we do not do</h2>
      <p>The following statements describe how O’Smash is built and operated.</p>
      <ul>
        <li>
          <strong>No analytics or telemetry.</strong> We do not use analytics, product telemetry or crash reporting
          services.
        </li>
        <li>
          <strong>No advertising.</strong> We do not display advertising, and we share no information with advertisers
          or ad networks.
        </li>
        <li>
          <strong>No cross-app or cross-site tracking.</strong> We do not follow you across other applications or
          websites, and we do not obtain information about you from data brokers.
        </li>
        <li>
          <strong>No location storage.</strong> We use an approximate location only for a search you start, and never
          store or log it.
        </li>
        <li>
          <strong>No profiling or automated decision-making.</strong> We do not build behavioural profiles, and no
          decision that affects you is made by automated means without human involvement.
        </li>
        <li>
          <strong>No sale of personal information.</strong> We do not sell, rent or licence personal information to
          anyone.
        </li>
      </ul>
      <p>
        <strong>One matter outside our control.</strong> The suppliers of your mobile operating system may collect
        diagnostic and usage information from your device at the operating-system level where you have enabled that in
        your device settings. That collection is governed by their own privacy terms; we neither receive nor control
        it.
      </p>

      <h2>22. Changes to this notice</h2>
      <p>
        We may update this notice. Where a change materially affects you, we will tell you before it takes effect, by
        email or in the app. Each version carries the date shown at the top of this page. The current version is always
        available from the app.
      </p>

      <h2>23. How to contact us</h2>
      <p>
        OC Global Technology Sdn. Bhd., 21 City Plaza, Jalan Tebrau, Kampung Wadi Hana, 80300 Johor Bahru, Johor,
        Malaysia.
      </p>
      <p>
        Email <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a> for anything in this notice,
        including any request under section 17 or section 18, or chat with support in the app. We aim to reply within
        two business days.
      </p>
      <p>
        You may also complain to the Personal Data Protection Commissioner (Jabatan Perlindungan Data Peribadi
        Malaysia). This notice is governed by the laws of Malaysia.
      </p>
    </LegalPage>
  );
}
