"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Ecg from "@/components/fx/Ecg";
import { clusters } from "@/data/clusters";

const YEARS = [
  "1st year",
  "2nd year",
  "3rd year",
  "4th year",
  "Intern",
  "Postgraduate",
  "Other",
];

const inputCls =
  "w-full rounded-xl border border-ash bg-soot/70 px-4 py-3.5 text-bone placeholder:text-gauze/60 outline-none transition-colors focus:border-fever";
const labelCls = "chart-label mb-2 block text-gauze";

type Fields = {
  name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
};

export default function RegisterForm() {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    phone: "",
    college: "",
    year: YEARS[0],
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const set =
    (key: keyof Fields) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  const toggleInterest = (slug: string) =>
    setInterests((list) =>
      list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug],
    );

  function validate(): boolean {
    const next: Partial<Fields> = {};
    if (fields.name.trim().length < 2) next.name = "Tell us your name";
    if (!/^\S+@\S+\.\S+$/.test(fields.email))
      next.email = "That email does not look right";
    if (!/^[6-9]\d{9}$/.test(fields.phone.trim()))
      next.phone = "Enter a 10-digit mobile number";
    if (fields.college.trim().length < 2)
      next.college = "Which college are you from?";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status !== "idle" || !validate()) return;
    setStatus("sending");
    // Preview mode: nothing is stored yet. Phase 2 wires this to the backend.
    setTimeout(() => setStatus("done"), 900);
  }

  if (status === "done") {
    return (
      <div className="mt-10 rounded-2xl border border-monitor/30 bg-soot/60 p-8 text-center sm:p-10">
        <Ecg className="glow-monitor mx-auto h-8 w-40 text-monitor" />
        <h2 className="display-poster mt-5 text-3xl text-bone">
          Vitals recorded
        </h2>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-gauze">
          You are on the list for Pyrexia 2026. We will reach out the moment
          delegate cards go live.
        </p>
        <p className="chart-label mt-5 text-monitor">
          Preview mode · no payment taken
        </p>
        <Link
          href="/"
          className="chart-label mt-8 inline-block rounded-full border border-bone/25 px-6 py-3 text-bone transition-colors hover:border-fever hover:text-fever"
        >
          Back to the fever
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-10 space-y-6">
      <div>
        <label htmlFor="name" className={labelCls}>
          Full name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          className={inputCls}
          value={fields.name}
          onChange={set("name")}
        />
        {errors.name && (
          <p className="chart-label mt-2 text-fever">{errors.name}</p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@college.edu"
            className={inputCls}
            value={fields.email}
            onChange={set("email")}
          />
          {errors.email && (
            <p className="chart-label mt-2 text-fever">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Mobile
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="10-digit number"
            className={inputCls}
            value={fields.phone}
            onChange={set("phone")}
          />
          {errors.phone && (
            <p className="chart-label mt-2 text-fever">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="college" className={labelCls}>
            College / Institution
          </label>
          <input
            id="college"
            type="text"
            placeholder="Where you study"
            className={inputCls}
            value={fields.college}
            onChange={set("college")}
          />
          {errors.college && (
            <p className="chart-label mt-2 text-fever">{errors.college}</p>
          )}
        </div>
        <div>
          <label htmlFor="year" className={labelCls}>
            Year
          </label>
          <select
            id="year"
            className={inputCls}
            value={fields.year}
            onChange={set("year")}
          >
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <span className={labelCls}>What pulls you in? (optional)</span>
        <div className="flex flex-wrap gap-2.5 pt-1">
          {clusters.map((cluster) => {
            const active = interests.includes(cluster.slug);
            return (
              <button
                key={cluster.slug}
                type="button"
                onClick={() => toggleInterest(cluster.slug)}
                aria-pressed={active}
                className={`chart-label rounded-full border px-4 py-2.5 transition-colors ${
                  active
                    ? "border-fever bg-fever/10 text-fever"
                    : "border-ash text-gauze hover:border-bone/40 hover:text-bone"
                }`}
              >
                {cluster.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-fever px-8 py-4 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-amber disabled:opacity-60"
        >
          {status === "sending" ? "Recording vitals..." : "Join the list"}
        </button>
        <p className="chart-label text-gauze">
          Preview form · payments arrive in the next phase
        </p>
      </div>
    </form>
  );
}
