"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { CAREERS_HERO_IMG } from "@/components/shared/constants";

export default function CareersSections() {
  const { t, lang } = useLang();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    experience: "",
    certs: "",
    vehicle_types: "",
    message: "",
    mvr: false,
    sida: false,
    compliance: false,
  });

  const onChange = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((p) => ({ ...p, [k]: v }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.compliance) return;
    setSent(true);
    setTimeout(() => setSent(false), 6000);
    setForm({
      first: "",
      last: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      experience: "",
      certs: "",
      vehicle_types: "",
      message: "",
      mvr: false,
      sida: false,
      compliance: false,
    });
  };

  return (
    <main data-testid="careers-page" className="bg-[#F6F6F6] pt-28">
      <section className="px-5 md:px-10">
        <div className="max-w-[1440px] mx-auto">
          <Link
            href="/"
            data-testid="back-to-home"
            className="inline-flex items-center gap-2 label-pill text-[#151515]/60 hover:text-[#C8370B] mb-8"
          >
            <ArrowLeft size={14} /> {lang === "es" ? "Volver al inicio" : "Back to home"}
          </Link>
          <h1 className="font-display text-[12vw] md:text-[8vw] lg:text-[6.6vw] leading-[0.92] text-[#151515]">
            {t.careers.title_a}
            <br />
            <span className="text-[#C8370B]">{t.careers.title_b}</span>
          </h1>
          <p className="text-base md:text-lg text-[#151515]/70 max-w-2xl mt-8 leading-relaxed">{t.careers.sub}</p>
        </div>
      </section>
      <section className="px-5 md:px-10 mt-12">
        <div className="max-w-[1440px] mx-auto relative noise-bg rounded-sm overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CAREERS_HERO_IMG}
            alt="Autech mobile technician at work"
            className="w-full h-72 md:h-[420px] object-cover"
          />
        </div>
      </section>
      <section className="py-20 md:py-24">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#C8370B]">+</span>
              <span className="label-pill text-[#151515]/60">{t.careers.perks_title}</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#151515] leading-[0.95]">{t.careers.perks_title}</h2>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-3">
              {t.careers.perks.map((p, i) => (
                <li key={i} className="flex items-start gap-4 py-4 border-b border-[#151515]/10">
                  <span className="font-mono text-xs text-[#C8370B] pt-1">0{i + 1}</span>
                  <span className="text-[#151515] flex-1">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#C8370B]">+</span>
            <span className="label-pill text-[#151515]/60">{t.careers.reqs_title}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[#151515] leading-[0.95] mb-12">
            {t.careers.reqs_title}
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {t.careers.reqs.map((g, i) => (
              <div key={i} className="border border-[#151515]/8 rounded-sm p-6 bg-[#F6F6F6]">
                <div className="font-display text-lg text-[#151515] mb-4">{g.t}</div>
                <ul className="space-y-2">
                  {g.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-[#151515]/80">
                      <Check size={14} color="#C8370B" className="mt-1 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="apply" className="py-24 md:py-32 bg-[#151515] relative overflow-hidden mt-16">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#F66234]">+</span>
            <span className="label-pill text-white/60">{t.careers.form_title}</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-white leading-[0.95] mb-10">{t.careers.form_title}</h2>
          <form
            data-testid="careers-form"
            onSubmit={submit}
            className="bg-[#191919] border border-white/8 p-7 md:p-10 rounded-sm"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <input
                required
                value={form.first}
                onChange={onChange("first")}
                className="autech-input-dark"
                placeholder={t.careers.form.first}
              />
              <input
                required
                value={form.last}
                onChange={onChange("last")}
                className="autech-input-dark"
                placeholder={t.careers.form.last}
              />
              <input
                required
                type="email"
                value={form.email}
                onChange={onChange("email")}
                className="autech-input-dark"
                placeholder={t.careers.form.email}
              />
              <input
                required
                value={form.phone}
                onChange={onChange("phone")}
                className="autech-input-dark"
                placeholder={t.careers.form.phone}
              />
              <input
                required
                value={form.city}
                onChange={onChange("city")}
                className="autech-input-dark"
                placeholder={t.careers.form.city}
              />
              <input
                required
                value={form.state}
                onChange={onChange("state")}
                className="autech-input-dark"
                placeholder={t.careers.form.state}
              />
              <input
                value={form.experience}
                onChange={onChange("experience")}
                className="autech-input-dark md:col-span-2"
                placeholder={t.careers.form.experience}
              />
              <input
                value={form.certs}
                onChange={onChange("certs")}
                className="autech-input-dark md:col-span-2"
                placeholder={t.careers.form.certs}
              />
              <input
                value={form.vehicle_types}
                onChange={onChange("vehicle_types")}
                className="autech-input-dark md:col-span-2"
                placeholder={t.careers.form.vehicle_types}
              />
              <textarea
                rows={4}
                value={form.message}
                onChange={onChange("message")}
                className="autech-input-dark md:col-span-2 resize-none"
                placeholder={t.careers.form.message}
              />
            </div>
            <div className="mt-8 space-y-3">
              <label className="flex items-start gap-3 text-sm text-white/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.mvr}
                  onChange={onChange("mvr")}
                  className="mt-1 accent-[#C8370B]"
                />
                <span>{t.careers.form.mvr_ack}</span>
              </label>
              <label className="flex items-start gap-3 text-sm text-white/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.sida}
                  onChange={onChange("sida")}
                  className="mt-1 accent-[#C8370B]"
                />
                <span>{t.careers.form.sida_ack}</span>
              </label>
              <label className="flex items-start gap-3 text-sm text-white/90 cursor-pointer">
                <input
                  required
                  type="checkbox"
                  checked={form.compliance}
                  onChange={onChange("compliance")}
                  className="mt-1 accent-[#C8370B]"
                />
                <span className="font-semibold">{t.careers.form.compliance_ack}</span>
              </label>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4 mt-10">
              {sent ? (
                <div className="text-[#F66234] font-semibold">{t.careers.form.success}</div>
              ) : (
                <span className="label-pill text-white/40">*</span>
              )}
              <button
                data-testid="careers-submit"
                type="submit"
                className="btn-primary"
                style={{ background: "#C8370B", borderColor: "#C8370B" }}
              >
                <span>{t.careers.form.submit}</span>
                <span className="arrow-pill" style={{ background: "#151515" }}>
                  <ArrowUpRight size={16} color="#fff" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
