import type { Metadata } from "next";
import Link from "next/link";
import MonitorStrip from "@/components/site/MonitorStrip";
import RegisterForm from "@/components/site/RegisterForm";

export const metadata: Metadata = {
  title: "Pre-register · PYREXIA 2026",
  description:
    "Join the list for Pyrexia 2026 at AIIMS Rishikesh. Be first in line when delegate cards and event registrations open.",
};

export default function RegisterPage() {
  return (
    <>
      <MonitorStrip />
      <main className="mx-auto w-full max-w-2xl px-4 pb-24 pt-24 sm:px-6 sm:pt-28">
        <Link
          href="/"
          className="chart-label text-gauze transition-colors hover:text-fever"
        >
          ← Back to the fever
        </Link>
        <p className="chart-label mt-10 text-monitor">
          Intake · Pre-registration
        </p>
        <h1 className="display-poster mt-3 text-[clamp(2.4rem,9vw,4.2rem)] text-bone">
          Join the list
        </h1>
        <p className="mt-4 leading-relaxed text-gauze">
          Delegate cards and payments go live soon. Drop your details now and
          you will be first in line when registrations open.
        </p>
        <RegisterForm />
      </main>
    </>
  );
}
