import HomePage from "@/components/pages/HomePage";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const initialService = params?.service ?? null;
  const initialIndustry = params?.industry ?? null;

  return <HomePage initialService={initialService} initialIndustry={initialIndustry} />;
}
