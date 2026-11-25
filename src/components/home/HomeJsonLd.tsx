import { COMPANY_NAME, SHARE_DESCRIPTION, SITE_URL, SUPPORT_EMAIL } from "@/components/shared/osmash";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const PUBLISHER = { "@id": ORGANIZATION_ID };

// No ratings, reviews or offers: the app is not released yet.
const HOME_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: COMPANY_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo-symbol.png`,
      email: SUPPORT_EMAIL,
      address: { "@type": "PostalAddress", addressCountry: "MY" },
    },
    {
      "@type": "MobileApplication",
      "@id": `${SITE_URL}/#app`,
      name: "O'Smash",
      url: SITE_URL,
      applicationCategory: "SportsApplication",
      operatingSystem: "iOS, Android",
      description: SHARE_DESCRIPTION,
      publisher: PUBLISHER,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "O'Smash",
      url: SITE_URL,
      publisher: PUBLISHER,
    },
  ],
};

// JSON.stringify does not escape "<", so a "</script>" in any value could end the tag early.
const SERIALIZED_STRUCTURED_DATA = JSON.stringify(HOME_STRUCTURED_DATA).replace(/</g, "\\u003c");

export function HomeJsonLd() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: SERIALIZED_STRUCTURED_DATA }} />
  );
}
