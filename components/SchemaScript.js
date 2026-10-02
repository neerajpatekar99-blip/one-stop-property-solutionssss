import Script from "next/script";

export function SchemaScript({ schema }) {
  if (!schema) return null;
  
  return (
    <Script
      id={`schema-${Math.random()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
      strategy="afterInteractive"
    />
  );
}

export default SchemaScript;
