"use client";

import { useLang } from "@/components/language-provider";
import { useContactForm } from "@/lib/hooks/useContactForm";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Reveal from "@/components/ui/Reveal";

export default function Contact() {
  const { t } = useLang();
  const { form, sent, onChange, submit } = useContactForm();

  return (
    <Section id="contact" variant="white" testId="contact-section">
      <Container className="grid grid-section lg:grid-cols-12">
        <Reveal className="lg:col-span-5 min-w-0">
          <SectionHeader
            animate={false}
            label={t.contact.label}
            titleA={t.contact.title_a}
            titleB={t.contact.title_b}
            className="!mb-[var(--stack-md)]"
          />
          <p className="text-body text-muted max-w-md">{t.contact.body}</p>
          <dl className="mt-[var(--stack-lg)] space-y-4">
            {t.contact.info.map((i, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 border-b border-default pb-4"
              >
                <dt className="label-pill text-faint">{i.k}</dt>
                <dd className="text-display-card text-primary sm:text-right break-words">{i.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7 min-w-0">
          <form data-testid="contact-form" onSubmit={submit} className="surface-form bg-page" autoComplete="on">
            <div className="grid sm:grid-cols-2 grid-section">
              <Field id="contact-first" label={t.contact.form.first}>
                <Input id="contact-first" name="firstName" required autoComplete="given-name" value={form.first} onChange={onChange("first")} />
              </Field>
              <Field id="contact-last" label={t.contact.form.last}>
                <Input id="contact-last" name="lastName" required autoComplete="family-name" value={form.last} onChange={onChange("last")} />
              </Field>
              <Field id="contact-company" label={t.contact.form.company}>
                <Input id="contact-company" name="organization" autoComplete="organization" value={form.company} onChange={onChange("company")} />
              </Field>
              <Field id="contact-phone" label={t.contact.form.phone}>
                <Input id="contact-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={onChange("phone")} />
              </Field>
              <div className="sm:col-span-2">
                <Field id="contact-email" label={t.contact.form.email}>
                  <Input id="contact-email" name="email" type="email" required autoComplete="email" spellCheck={false} value={form.email} onChange={onChange("email")} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field id="contact-type" label={t.contact.form.type}>
                  <Select id="contact-type" name="inquiryType" value={form.type} onChange={onChange("type")}>
                    {t.contact.form.type_options.map((o, i) => (
                      <option key={i} value={i === 0 ? "" : o} disabled={i === 0}>
                        {o}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field id="contact-message" label={t.contact.form.message_label}>
                  <Textarea id="contact-message" name="message" rows={4} placeholder={t.contact.form.message} value={form.message} onChange={onChange("message")} />
                </Field>
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 mt-[var(--stack-lg)]">
              <div aria-live="polite" className="min-h-[1.5rem]">
                {sent ? (
                  <p className="text-accent font-semibold text-body">{t.contact.form.success}</p>
                ) : (
                  <span className="label-pill text-faint">* {t.contact.form.required_note}</span>
                )}
              </div>
              <Button type="submit" variant="primary" showArrow className="w-full sm:w-auto justify-center" testId="contact-submit">
                {t.contact.form.submit}
              </Button>
            </div>
          </form>
        </Reveal>
      </Container>
    </Section>
  );
}
