"use client";

import PropertyCard from "@/components/PropertyCard";
import { onlyPlottedDevelopments } from "@/data/properties";

export default function PlottedDevelopments() {
  if (onlyPlottedDevelopments.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
      {onlyPlottedDevelopments.map((property, index) => (
        <PropertyCard key={property.id} property={property} index={index} />
      ))}
    </div>
  );
}
