"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";

export default function SiteScaffold({ children }) {
  return (
    <div className="min-h-screen bg-offwhite">
      <Navbar />
      {children}
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
