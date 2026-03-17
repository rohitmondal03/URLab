export function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 bg-zinc-100 border border-zinc-400 rounded-full px-4 py-1.5">
      <span className="text-xs">{label} :</span>
      <span className="text-xs font-semibold text-foreground">{value}</span>
    </div>
  );
}