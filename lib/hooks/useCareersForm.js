"use client";

import { useState } from "react";

const INITIAL = {
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
};

export function useCareersForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState(INITIAL);

  const onChange = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.compliance) return;
    setSent(true);
    setTimeout(() => setSent(false), 6000);
    setForm(INITIAL);
  };

  return { form, sent, onChange, submit };
}
