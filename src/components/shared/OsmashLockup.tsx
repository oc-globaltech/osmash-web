import Image from "next/image";

// No wordmark asset exists: the lockup is the symbol plus the name set in Clash.
export function OsmashLockup() {
  return (
    <span className="osmash-lockup">
      <Image src="/images/logo-symbol.png" alt="" width={38} height={28} className="osmash-lockup_symbol" />
      <span className="osmash-lockup_name">O&apos;Smash</span>
    </span>
  );
}
