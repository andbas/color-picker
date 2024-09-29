import Link from "next/link";

export const metadata = {
  title: "GetColor.io - Privacy and Legal",
  description: "List of privacy and legal documents for GetColor.io",
};

export default function LegalPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Privacy and Legal</h1>
      <ul className="flex flex-col gap-2">
        <li className="hover:underline">
          <Link href="/legal/terms-of-service">Terms of Service</Link>
        </li>
        <li className="hover:underline">
          <Link href="/legal/privacy-policy">Privacy Policy</Link>
        </li>
        <li className="hover:underline">
          <Link href="/legal/cookie-policy">Cookie Policy</Link>
        </li>
      </ul>
    </>
  );
}
