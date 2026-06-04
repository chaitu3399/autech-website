"use client";

import { useState } from "react";

const INITIAL = { first: "", last: "", company: "", phone: "", email: "", type: "", message: "" };

export function useContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState(INITIAL);

  const onChange = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm(INITIAL);
  };

  return { form, sent, onChange, submit };
}
