export function InfoCard({ name, range, body }: { name: string; range: string; body: string }) {
  return (
    <article className="surface-card p-4">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-base font-bold text-[#17201C]">{name}</h2>
        <span className="max-w-[52%] rounded-md bg-[#EFF7D7] px-2.5 py-1 text-right text-[11px] font-bold text-[#23483E]">{range}</span>
      </div>
      <p className="mt-3 border-t border-[#E3E8E3] pt-3 text-sm leading-6 text-[#4E5A53]">{body}</p>
    </article>
  );
}
