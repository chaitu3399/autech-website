"use client";

import { useLang } from "@/components/language-provider";
import { useCareersForm } from "@/lib/hooks/useCareersForm";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Reveal from "@/components/ui/Reveal";

export default function CareersApply() {
  const { t } = useLang();
  const { form, sent, onChange, submit } = useCareersForm();

  return (
    <Section id="apply" variant="white" testId="careers-apply">
      <Container>
        <SectionHeader titleA={t.careers.form_title} />
        <Reveal delay={100}>
          <form data-testid="careers-form" onSubmit={submit} className="surface-form bg-page">
          <div className="grid md:grid-cols-2 grid-section">
            <Field id="careers-first" label={t.careers.form.first}>
              <Input id="careers-first" name="firstName" required autoComplete="given-name" value={form.first} onChange={onChange("first")} />
            </Field>
            <Field id="careers-last" label={t.careers.form.last}>
              <Input id="careers-last" name="lastName" required autoComplete="family-name" value={form.last} onChange={onChange("last")} />
            </Field>
            <Field id="careers-email" label={t.careers.form.email}>
              <Input id="careers-email" name="email" type="email" required autoComplete="email" spellCheck={false} value={form.email} onChange={onChange("email")} />
            </Field>
            <Field id="careers-phone" label={t.careers.form.phone}>
              <Input id="careers-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" value={form.phone} onChange={onChange("phone")} />
            </Field>
            <Field id="careers-city" label={t.careers.form.city}>
              <Input id="careers-city" name="address-level2" required autoComplete="address-level2" value={form.city} onChange={onChange("city")} />
            </Field>
            <Field id="careers-state" label={t.careers.form.state}>
              <Input id="careers-state" name="address-level1" required autoComplete="address-level1" value={form.state} onChange={onChange("state")} />
            </Field>
            <div className="md:col-span-2">
              <Field id="careers-experience" label={t.careers.form.experience}>
                <Input id="careers-experience" name="experience" value={form.experience} onChange={onChange("experience")} />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field id="careers-certs" label={t.careers.form.certs}>
                <Input id="careers-certs" name="certs" value={form.certs} onChange={onChange("certs")} />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field id="careers-vehicles" label={t.careers.form.vehicle_types}>
                <Input id="careers-vehicles" name="vehicleTypes" value={form.vehicle_types} onChange={onChange("vehicle_types")} />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field id="careers-message" label={t.careers.form.message_label}>
                <Textarea id="careers-message" name="message" rows={4} placeholder={t.careers.form.message} value={form.message} onChange={onChange("message")} />
              </Field>
            </div>
          </div>
          <div className="mt-[var(--stack-lg)] space-y-3">
            <label className="flex items-start gap-3 text-body-sm text-muted cursor-pointer">
              <input type="checkbox" name="mvr" checked={form.mvr} onChange={onChange("mvr")} className="mt-1 accent-[var(--autech-burnt)]" />
              <span>{t.careers.form.mvr_ack}</span>
            </label>
            <label className="flex items-start gap-3 text-body-sm text-muted cursor-pointer">
              <input type="checkbox" name="sida" checked={form.sida} onChange={onChange("sida")} className="mt-1 accent-[var(--autech-burnt)]" />
              <span>{t.careers.form.sida_ack}</span>
            </label>
            <label className="flex items-start gap-3 text-body-sm text-primary cursor-pointer">
              <input required type="checkbox" name="compliance" checked={form.compliance} onChange={onChange("compliance")} className="mt-1 accent-[var(--autech-burnt)]" />
              <span className="font-semibold">{t.careers.form.compliance_ack}</span>
            </label>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 mt-[var(--stack-lg)]">
            <div aria-live="polite" className="min-h-[1.5rem]">
              {sent ? (
                <p className="text-accent font-semibold text-body">{t.careers.form.success}</p>
              ) : (
                <span className="label-pill text-faint">*</span>
              )}
            </div>
            <Button type="submit" variant="accent" showArrow className="w-full sm:w-auto justify-center" testId="careers-submit">
              {t.careers.form.submit}
            </Button>
          </div>
          </form>
        </Reveal>
      </Container>
    </Section>
  );
}
