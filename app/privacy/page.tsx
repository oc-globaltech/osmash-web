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
        O’Smash is a mobile app for organising badminton coaching in Malaysia. Coaches and academies use it to schedule
        sessions, manage their players and take monthly fees. Players and their parents use it to find a coach, see
        sessions, check in and pay.
      </p>
      <p>
        This notice explains what personal information O’Smash collects, why, who else receives it, how long it is kept,
        and what you can ask us to do about it. It is written to serve as the written notice required by section 7 of
        the Personal Data Protection Act 2010.
      </p>

      <h2>What you should know first</h2>
      <ul>
        <li>
          <strong>We hold information about children.</strong> A player under 18 must link a parent, who agrees before
          the child can join a coach. Section 8 is written for parents.
        </li>
        <li>
          <strong>Your payment details never reach us.</strong> Payments are handled by Fiuu, our payment gateway.
        </li>
        <li>
          <strong>We do no tracking.</strong> There is no analytics, advertising or crash reporting in O’Smash, and we do
          not store your location.
        </li>
        <li>
          <strong>You can delete your account from the app.</strong> You have 30 days to change your mind. Sections 13
          and 18 set out what is kept and for how long.
        </li>
      </ul>

      <h2>1. About this notice</h2>
      <p>
        <strong>Who is responsible for your personal data.</strong> OC Global Technology Sdn. Bhd. is the data user
        responsible for the personal data described in this notice. Our address is 21 City Plaza, Jalan Tebrau, Kampung
        Wadi Hana, 80300 Johor Bahru, Johor, Malaysia.
      </p>
      <p>
        <strong>What it covers.</strong> The O’Smash app for iOS and Android, the service behind it, and the
        administration portal used by O’Smash staff. Read it together with the{" "}
        <Link href="/terms">Terms of Use</Link> and the{" "}
        <Link href="/refund-policy">Refund and Cancellation Policy</Link>.
      </p>

      <h2>2. Who we are</h2>
      <p>
        In this notice, “O’Smash”, “we”, “us” and “our” mean OC Global Technology Sdn. Bhd. “You” means any person whose
        personal information we hold. Under the Personal Data Protection Act 2010 we are the data user and you are a
        data subject. You can reach us at <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>.
      </p>

      <h2>3. Words we use</h2>
      <p>
        <strong>Coach.</strong> A coach account. In the app an Owner runs an academy, a Sub coach coaches in one, and a
        Solo coach works alone.
      </p>
      <p>
        <strong>Player.</strong> A player account. A <strong>parent</strong> is a player aged 18 or over who is linked to
        a child’s player account.
      </p>
      <p>
        <strong>Session.</strong> A coaching session at a set date, time and training location.
      </p>
      <p>
        <strong>Session QR.</strong> The code a coach shows at a session. Players scan it to check in.
      </p>

      <h2>4. How your information reaches us</h2>
      <p>
        <strong>You give it to us.</strong> Coaches and players create their own accounts. A player under 18 signs up
        themselves and then links a parent.
      </p>
      <p>
        <strong>A coach may enter some of it.</strong> An Owner can invite a player or coach by email, or find a player
        by their exact email address or phone number. The Owner then sees only the player’s name and whether the account
        belongs to an adult or a child.
      </p>
      <p>
        <strong>A parent may enter some of it.</strong> A linked parent can edit their child’s name and date of birth.
      </p>

      <h2>5. Information we collect</h2>
      <p>
        <strong>Account details.</strong> Your role, full name, email address, phone number, date of birth and a
        password, and the version of this notice and the Terms of Use you accepted, with the time. Passwords are never
        stored in a readable form; we store only a one-way hash.
      </p>
      <p>
        <strong>Profile photograph and academy logo.</strong> Images you choose to upload. Both are optional.
      </p>
      <p>
        <strong>Academy details.</strong> For an Owner or solo coach: the academy name, its training locations, its
        monthly price, and its players and coaches.
      </p>
      <p>
        <strong>Merchant details.</strong> So that your academy can receive fees, an Owner or solo coach sends us the
        business name, SSM registration number if there is one, bank name, account holder name and account number, a
        contact phone and email, and photos of the SSM certificate and of a bank statement. We use them to register the
        academy with Fiuu.
      </p>
      <p>
        <strong>Parent links and consent.</strong> Who is linked to whom, the relationship the parent names, and the
        parent’s agreement, with the version of the consent text and the time.
      </p>
      <p>
        <strong>Sessions and attendance.</strong> The sessions you are on, and whether you were checked in, when, and
        whether by scanning the session QR or by your coach marking the roster.
      </p>
      <p>
        <strong>Payment records.</strong> For plans and monthly fees: the amount, the date, whether the payment
        succeeded, any refund, and the references issued by Fiuu. For a saved card, a card reference: Fiuu’s token, the
        card brand and the last four digits.
      </p>
      <p>
        <strong>Notifications.</strong> The notices we send you, which notification categories you switched off, and a
        device token so that push notifications reach your phone.
      </p>
      <p>
        <strong>Support messages.</strong> The messages you send us and our replies, with the academy, and for a parent
        the child, that you were viewing.
      </p>
      <p>
        <strong>Audit log.</strong> A record of each change made in the app or the admin portal and who made it,
        including sign-ins, failed sign-ins and check-ins, so that a dispute can be checked.
      </p>
      <p>
        <strong>Security records.</strong> Your network address, held briefly, to limit repeated sign-in and code
        attempts.
      </p>
      <p>
        <strong>What you must give us.</strong> Your name, email address, phone number, date of birth and a password are
        required to create an account. We use your date of birth to check that coaches are 18 or over and to know which
        players need a parent. Merchant details are required before an academy can take fees. A photograph is optional.
      </p>
      <p>
        <strong>The camera.</strong> The camera is used only to scan QR codes, such as a session QR or a child’s link
        QR, and to take a photo you choose to upload. Scanning happens on your phone and no image or video is sent to us.
      </p>
      <p>
        <strong>Location.</strong> When you look for academies near a place, your phone rounds the location to about 1
        km before sending it. We use it for that search only; it is never stored or logged.
      </p>

      <h2>6. How we use your information</h2>
      <p>
        The Personal Data Protection Act 2010 is built on consent, with limited exceptions where processing is necessary
        for a contract or to meet a legal obligation. We do not rely on “legitimate interests”, which is not a basis
        under Malaysian law. We use your information:
      </p>
      <ul>
        <li>to create and run your account, sign you in, and send the codes and invitations that let you join a coach;</li>
        <li>to list academies near a place, handle join requests, schedule sessions, manage rosters and record attendance;</li>
        <li>to take plan payments and monthly fees, and keep the records the law requires;</li>
        <li>to resolve disputes about attendance or payment;</li>
        <li>to send you notifications and answer your support messages;</li>
        <li>to protect accounts by limiting repeated sign-in and code attempts.</li>
      </ul>
      <p>
        <strong>We do not profile you.</strong> No decision that affects you is made by automated means without human
        involvement. The figures in the app are simple totals of sessions and payments.
      </p>

      <h2>7. Payment information</h2>
      <p>
        <strong>How payments are taken.</strong> Payments go through Fiuu (Razer Merchant Services), a licensed payment
        gateway, on its own payment page. Coach plans are paid by card, which Fiuu saves for the monthly renewal.
        Monthly fees can be paid by online banking (FPX), card, e-wallet or DuitNow QR. The methods may change without a
        change to this notice.
      </p>
      <p>
        <strong>What Fiuu receives.</strong> You enter your payment details into Fiuu’s page. We give Fiuu your name,
        email address, mobile number and the amount so that it can process the payment.
      </p>
      <p>
        <strong>What we receive.</strong> Fiuu returns the references, the amount, the method type, whether the payment
        succeeded and the time, and for a saved card the card reference described in section 5. A payment counts only
        when Fiuu’s verified server notice confirms it.
      </p>
      <p>
        <strong>What never reaches us.</strong> Your full card number, security code, online banking credentials and
        wallet sign-in are never sent to, processed by or stored on O’Smash systems.
      </p>
      <p>
        <strong>Fees go to the academy.</strong> A monthly fee settles to the academy’s own merchant account with Fiuu.
        Billing, cancellation and refunds are covered by the{" "}
        <Link href="/refund-policy">Refund and Cancellation Policy</Link>.
      </p>

      <h2>8. Children and parents</h2>
      <p>This section is written for parents.</p>
      <p>
        <strong>Consent.</strong> A person under 18 cannot give valid consent to the use of their personal information.
        Under regulation 3(2) of the Personal Data Protection Regulations 2013, consent for a data subject under 18 must
        be given by a parent, guardian or person with parental responsibility.
      </p>
      <p>
        <strong>How a parent links.</strong> A parent is a player account aged 18 or over. The parent scans the child’s
        link QR, or approves a request sent by email, and agrees to the consent text. We record the parent, the child,
        the text version and the time. Until a parent is linked, the child can use only their account, parent linking,
        notices and the list of training locations, and cannot join a coach.
      </p>
      <p>
        <strong>What a parent can do.</strong> See the child’s profile, academies, sessions and attendance; receive the
        child’s notices; pay the child’s fees; approve an academy’s invitation; check the child in; edit the child’s
        name and date of birth; take the child out of an academy; and delete the child’s account. A parent cannot read
        the child’s support chat or change the child’s notification settings.
      </p>
      <p>
        <strong>When the child turns 18,</strong> the parent link ends and the player manages their own account and
        payments.
      </p>
      <p>
        <strong>What you can ask for.</strong> You can see everything we hold about your child, have it corrected, and
        ask us to delete it. Email <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a> with your child’s name and
        their academy.
      </p>

      <h2>9. If you are a coach or academy</h2>
      <p>
        <strong>You see other people’s information.</strong> Use it only to run their coaching. Do not use it to contact
        them for anything else, to market to them, or after your connection with them ends.
      </p>
      <p>
        <strong>Invite only people who agree.</strong> Keep what you enter about them accurate, and tell us if you learn
        that something is wrong.
      </p>
      <p>
        <strong>You may have your own obligations.</strong> Where you decide for yourself what is collected about your
        players and why, you may have duties of your own under the Personal Data Protection Act 2010.
      </p>

      <h2>10. How we share your information</h2>
      <p>
        <strong>Inside O’Smash.</strong> The Owner and coaches of an academy see its players within their roles; a sub
        coach sees the details of players on their own sessions. Players on the same group session see each other’s
        first names. A player sees their own records, and a parent sees their linked children’s. An academy or solo
        coach’s name and training locations are shown to players looking for a coach. O’Smash staff can see and correct
        account, academy, payment and support records, the consent record and the audit log, to provide support.
      </p>
      <p>
        <strong>Outside O’Smash.</strong> We share personal information only with the service providers in section 11,
        and only as far as they need it.
      </p>
      <p>
        <strong>We do not sell your personal information,</strong> trade it, or share it with advertisers.
      </p>
      <p>
        <strong>Where the law requires it.</strong> We may disclose information where the law requires it, or where it
        is necessary to establish, exercise or defend a legal claim.
      </p>

      <h2>11. Service providers we use</h2>
      <ul>
        <li>
          <strong>Fiuu (Razer Merchant Services).</strong> Processes payments and registers academies as merchants.
          Receives your name, email address, mobile number and the amount, and an academy’s merchant details.
        </li>
        <li>
          <strong>Laravel Cloud.</strong> Runs the service and its database, and so holds the information in this
          notice.
        </li>
        <li>
          <strong>Cloudflare.</strong> Delivers the service over the network and stores uploaded images.
        </li>
        <li>
          <strong>ZeptoMail.</strong> Sends our emails. Receives your email address and the message.
        </li>
        <li>
          <strong>Firebase Cloud Messaging and Apple Push Notification service.</strong> Deliver push notifications.
          Receive your device token and the notice.
        </li>
      </ul>
      <p>
        <strong>Our email contains no tracking.</strong> We send transactional email only, and it carries no tracking
        pixels.
      </p>

      <h2>12. Where your information is stored</h2>
      <p>
        The service, its database and uploaded images are hosted in Singapore, outside Malaysia. Some providers in
        section 11 may process information in other countries. Section 129 of the Personal Data Protection Act 2010
        governs transfers out of Malaysia, and we transfer information only where that section permits it.
      </p>

      <h2>13. How long we keep your information</h2>
      <p>
        We keep personal information only for as long as it is needed for its purpose, as section 10 of the Personal
        Data Protection Act 2010 requires. Nothing below is deleted while your account, the academy or the parent link
        is still active.
      </p>
      <ul>
        <li>
          <strong>Account details</strong> are kept while your account is open, then handled as section 18 describes.
        </li>
        <li>
          <strong>Sessions, attendance, payment records, monthly fees, notifications and the audit log</strong> are
          deleted 7 years after they end: after the player leaves the academy, or after the academy closes. Payment
          records are kept for that time because Malaysian tax and company law require it.
        </li>
        <li>
          <strong>Parent links and consent records</strong> are deleted 7 years after the link stops being active.
        </li>
        <li>
          <strong>Profile photographs</strong> are deleted when you replace them, or 30 days after you delete your
          account.
        </li>
        <li>
          <strong>Your saved card reference</strong> is kept until you replace the card, and removed 30 days after you
          delete your account.
        </li>
        <li>
          <strong>Support messages</strong> are kept while your account exists, and lose your name and contact details
          30 days after you delete it.
        </li>
        <li>
          <strong>Invitations</strong> are deleted 30 days after they expire, are declined or are revoked.
        </li>
        <li>
          <strong>One-time codes, sign-ins and device tokens</strong> are deleted 30 days after they are used, expire or
          are revoked. One-time codes expire after 10 minutes, and invitations after 7 days.
        </li>
      </ul>

      <h2>14. How we protect your information</h2>
      <p>
        <strong>Passwords and codes.</strong> Passwords and one-time codes are stored only as one-way hashes. A code
        expires after 10 minutes and stops working after 5 wrong tries.
      </p>
      <p>
        <strong>Signing in.</strong> The app holds a sign-in token in your phone’s secure storage. It lasts 30 days and
        renews while you use the app. Signing out, resetting your password or deleting your account cancels all of your
        tokens.
      </p>
      <p>
        <strong>Rate limits.</strong> We limit how often sign-in, code and payment requests can be made, to make
        guessing attacks impractical.
      </p>
      <p>
        <strong>Access control.</strong> What you can see and do is restricted by your role. Staff use a separate admin
        portal with two-factor sign-in, and every change they make is logged.
      </p>
      <p>
        <strong>Payments.</strong> Card details are handled entirely by Fiuu. Payment confirmations from Fiuu are
        checked before we act on them.
      </p>
      <p>
        <strong>If something goes wrong.</strong> If a security incident affects your personal information, we will act
        on it and, where the law requires, notify the Personal Data Protection Commissioner and the people affected.
      </p>

      <h2>15. Information stored on your phone</h2>
      <p>
        The app stores your sign-in token, copies of screens you have opened so they load quickly, a check-in waiting to
        be sent while you are offline, and your language and theme choices. Signing out removes your sign-in token.
        Uninstalling the app removes the rest.
      </p>

      <h2>16. Cookies</h2>
      <p>
        The app does not use cookies; it signs in with a token. Fiuu’s payment page may set its own cookies to complete
        a payment. The admin portal sets one strictly necessary cookie to keep a member of staff signed in. We use no
        advertising cookies, tracking pixels, web beacons, device fingerprinting or cross-app tracking.
      </p>

      <h2>17. Your privacy rights</h2>
      <p>
        Under the Personal Data Protection Act 2010 you have rights over your personal information. Email{" "}
        <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>, or chat with support in the app. We answer access
        and correction requests within 21 days, at no charge.
      </p>
      <ul>
        <li>
          <strong>See what we hold about you.</strong> The app shows only part of it, so a full response is prepared by
          a person.
        </li>
        <li>
          <strong>Correct something that is wrong.</strong> You can change some details yourself in the app; we correct
          the rest on request.
        </li>
        <li>
          <strong>Withdraw your consent.</strong> You may do so at any time. We may then be unable to keep providing
          the service.
        </li>
        <li>
          <strong>Limit how we use your information.</strong> On request, considered case by case.
        </li>
        <li>
          <strong>Delete your account.</strong> See section 18.
        </li>
      </ul>
      <p>
        A parent may use these rights for a player under 18. If you are unhappy with how we have handled your
        information, tell us first so we can put it right. You may also complain to the Personal Data Protection
        Commissioner (Jabatan Perlindungan Data Peribadi Malaysia).
      </p>

      <h2>18. Deleting your account</h2>
      <p>
        <strong>How.</strong> In the app, go to Settings and choose Delete account. You can also email{" "}
        <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a>. A parent can delete a linked child’s account.
      </p>
      <p>
        <strong>What happens at once.</strong> You are signed out on every device. A player leaves every academy; a
        coach comes off their upcoming sessions.
      </p>
      <p>
        <strong>When you cannot delete yet.</strong> An Owner whose academy has other members closes the academy first.
        The last parent linked to a child under 18 can delete their account only once another parent is linked.
      </p>
      <p>
        <strong>Changing your mind.</strong> For 30 days you can sign in to restore your account. After that it cannot
        be restored.
      </p>
      <p>
        <strong>After 30 days.</strong> We remove your name, photograph, password, saved card and notification choices.
        We keep your email address, phone number and date of birth with the closed record, so that we recognise the
        account and you can sign up again with them. We clear those 7 years after deletion.
      </p>
      <p>
        <strong>What survives.</strong> Session, attendance, payment and consent records are kept for the periods in
        section 13, so that the law and any dispute can be answered.
      </p>
      <p>
        <strong>Legal holds.</strong> We will not erase information while we must preserve it for actual or reasonably
        expected legal proceedings, a regulatory request or a criminal investigation. Information held by Fiuu is
        subject to Fiuu’s own retention rules.
      </p>

      <h2>19. Marketing</h2>
      <p>
        <strong>We do not send marketing.</strong> Every message from us is about your account, your sessions, your
        payments or a support request. If we introduce marketing, we will ask for your consent first. We will not treat
        your use of O’Smash, or your acceptance of this notice, as that consent.
      </p>

      <h2>20. Notifications</h2>
      <p>
        O’Smash sends notices in the app, by push notification and by email, about your sessions, check-ins, invites,
        payments and support replies. You can switch notification categories off in Settings. Security and account
        emails, such as sign-in codes, are always sent. We do not send SMS or WhatsApp messages.
      </p>

      <h2>21. What we do not do</h2>
      <ul>
        <li>No analytics, telemetry or crash reporting services.</li>
        <li>No advertising, and no sharing with advertisers or ad networks.</li>
        <li>No cross-app or cross-site tracking, and no information from data brokers.</li>
        <li>No storing of your location.</li>
        <li>No profiling or automated decision-making.</li>
        <li>No sale, rental or licensing of personal information.</li>
      </ul>
      <p>
        <strong>One thing outside our control.</strong> The makers of your phone’s operating system may collect
        diagnostic information at the system level, if you allowed it in your settings. We neither receive nor control
        it.
      </p>

      <h2>22. Changes to this notice</h2>
      <p>
        We may update this notice. Where a change materially affects you, we will tell you before it takes effect, by
        email or in the app. Each version carries the date at the top of this page.
      </p>

      <h2>23. How to contact us</h2>
      <p>
        OC Global Technology Sdn. Bhd., 21 City Plaza, Jalan Tebrau, Kampung Wadi Hana, 80300 Johor Bahru, Johor,
        Malaysia. Email <a href="mailto:support@osmash.ocgt.app">support@osmash.ocgt.app</a> for anything in this notice. We aim to
        reply within two business days. This notice is governed by the laws of Malaysia.
      </p>
    </LegalPage>
  );
}
