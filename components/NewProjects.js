"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { onlyProjects as projects } from "@/data/properties";

export default function NewProjects() {
  if (projects.length === 0) return null;

  return (
    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
      {projects.map((project) => (
        <Link 
          key={project.id} 
          href={`/property/${project.slug}`} 
          title={`View Details of ${project.title}`}
          className="group app-panel overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
          itemScope itemType="https://schema.org/RealEstateListing"
        >
          <div className="relative h-56 sm:h-60">
            {project.images && project.images.length > 0 ? (
              <Image src={project.images[0]} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" itemProp="image" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand/10 to-navy-100 text-navy-700">
                    <div className="text-center">
                      <div className="text-xs uppercase tracking-[0.3em] text-brand mb-2">Project Preview</div>
                      <div className="text-sm font-semibold">{project.title}</div>
                    </div>
                  </div>
            )}
            <meta itemProp="url" content={`https://onestoppropertysolution.in/property/${project.slug}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-800/50 via-transparent to-transparent opacity-80" />
            <div className="absolute top-3 left-3">
              <span className="bg-white/95 backdrop-blur-sm text-navy-800 text-[10px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full shadow-sm ring-1 ring-black/5">
                {project.possession}
              </span>
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-1.5 text-navy-400 text-xs mb-2" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <MapPin size={12} className="text-brand shrink-0" />
              <span itemProp="addressLocality">{project.location}</span>
            </div>
            <h3 className="text-lg font-semibold text-navy-800 mb-0.5 font-sans" itemProp="name">{project.title}</h3>
            <p className="text-sm text-navy-500 mb-4">{project.type}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-3" itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <span className="text-brand font-bold tabular-nums" itemProp="price">{project.priceLabel}</span>
              <meta itemProp="priceCurrency" content="INR" />
              <span className="text-xs font-semibold text-navy-600 bg-slate-100 px-3 py-1.5 rounded-lg">{project.availableTypes.join(' & ')}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
