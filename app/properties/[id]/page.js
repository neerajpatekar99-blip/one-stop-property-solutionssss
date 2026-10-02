import { redirect, notFound } from "next/navigation";
import { findPropertyById } from "@/data/properties";

export default function PropertyDetailRedirect({ params }) {
  const property = findPropertyById(params.id);
  if (!property) notFound();
  redirect(`/property/${property.slug}`);
}
