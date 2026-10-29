/** Serialises structured data; `<` is escaped so the payload can never close the script tag. */
export function JsonLdScript({ data }: { data: Record<string, unknown> | ReadonlyArray<Record<string, unknown>> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
