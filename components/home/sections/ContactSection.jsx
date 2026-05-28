import { ArrowUpRight } from "lucide-react";

export default function ContactSection({ t, form, sent, onChange, submitContact }) {
  return (
    <section id="contact" data-testid="contact-section" className="py-24 md:py-32 bg-white dash-guides">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[#C8370B]">+</span>
            <span className="label-pill text-[#151515]/60">{t.contact.label}</span>
          </div>
          <h2 className="font-display text-[9vw] md:text-[5.5vw] lg:text-[4.4vw] leading-[0.95] text-[#151515]">
            {t.contact.title_a}
            <br />
            <span className="text-[#C8370B]">{t.contact.title_b}</span>
          </h2>
          <p className="text-[#151515]/70 mt-6 max-w-md leading-relaxed">{t.contact.body}</p>
          <div className="mt-10 space-y-5">
            {t.contact.info.map((i, idx) => (
              <div key={idx} className="flex items-start justify-between border-b border-[#151515]/10 pb-4">
                <span className="label-pill text-[#151515]/50">{i.k}</span>
                <span className="font-display text-base md:text-lg text-[#151515] text-right">{i.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-7">
          <form
            data-testid="contact-form"
            onSubmit={submitContact}
            className="bg-[#F6F6F6] border border-[#151515]/8 p-7 md:p-10 rounded-sm"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <input
                required
                value={form.first}
                onChange={onChange("first")}
                className="autech-input"
                placeholder={t.contact.form.first}
              />
              <input
                required
                value={form.last}
                onChange={onChange("last")}
                className="autech-input"
                placeholder={t.contact.form.last}
              />
              <input
                value={form.company}
                onChange={onChange("company")}
                className="autech-input"
                placeholder={t.contact.form.company}
              />
              <input
                value={form.phone}
                onChange={onChange("phone")}
                className="autech-input"
                placeholder={t.contact.form.phone}
              />
              <input
                required
                type="email"
                value={form.email}
                onChange={onChange("email")}
                className="autech-input md:col-span-2"
                placeholder={t.contact.form.email}
              />
              <select value={form.type} onChange={onChange("type")} className="autech-input md:col-span-2">
                {t.contact.form.type_options.map((o, i) => (
                  <option key={i} value={i === 0 ? "" : o} disabled={i === 0}>
                    {o}
                  </option>
                ))}
              </select>
              <textarea
                value={form.message}
                onChange={onChange("message")}
                rows={4}
                className="autech-input md:col-span-2 resize-none"
                placeholder={t.contact.form.message}
              />
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4 mt-8">
              {sent ? (
                <div className="text-[#C8370B] font-semibold">{t.contact.form.success}</div>
              ) : (
                <span className="label-pill text-[#151515]/40">* Required fields</span>
              )}
              <button data-testid="contact-submit" type="submit" className="btn-primary">
                <span>{t.contact.form.submit}</span>
                <span className="arrow-pill">
                  <ArrowUpRight size={16} color="#fff" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
