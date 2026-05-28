import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";
import { SiteScaffold } from "@/components/site-ui";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Autech LLC — Soporte Técnico de Flotas Sin Fronteras",
  description:
    "Autech LLC es una red móvil de mecánicos certificados especializada en flotas comerciales, vehículos pesados y generadores industriales. Servicio in situ desde el Caribe hasta los EE.UU.",
  keywords: [
    "mecánico móvil",
    "flotas comerciales",
    "generadores industriales",
    "mantenimiento preventivo",
    "mobile fleet mechanic",
    "commercial truck repair",
    "NASTF",
    "heavy duty diesel",
    "Puerto Rico",
    "Florida",
  ],
  authors: [{ name: "Autech LLC" }],
  openGraph: {
    type: "website",
    title: "Autech LLC — Mobile Fleet Mechanics",
    description:
      "Soporte técnico de flotas sin fronteras. Red móvil certificada para vehículos comerciales y generadores industriales.",
    locale: "es_PR",
    alternateLocale: "en_US",
    images: ["https://customer-assets.emergentagent.com/job_147afd9a-d9b2-4013-8897-cdb34863bb32/artifacts/wp2s29lw_autech_logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autech LLC — Mobile Fleet Mechanics",
    description: "Soporte técnico de flotas sin fronteras. Red móvil certificada.",
  },
  icons: {
    icon: "https://customer-assets.emergentagent.com/job_147afd9a-d9b2-4013-8897-cdb34863bb32/artifacts/wp2s29lw_autech_logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${archivo.variable} ${jetBrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutomotiveBusiness",
              name: "Autech LLC",
              description: "Mobile fleet service network for commercial vehicles and industrial generators.",
              url: "https://autechsys.com",
              telephone: "+1-787-000-0000",
              email: "service@autechsys.com",
              areaServed: ["US", "PR"],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Aguada",
                addressRegion: "PR",
                addressCountry: "US",
              },
            }),
          }}
        />
        <LanguageProvider>
          <SiteScaffold>{children}</SiteScaffold>
        </LanguageProvider>
      </body>
    </html>
  );
}
