import * as api from "@/lib/api";
import CarsPageClient from "./page-client";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function CarsPage() {
  // Fetch cars from Supabase
  const cars = await api.getCars().catch(() => []);

  return <CarsPageClient cars={cars} />;
}
