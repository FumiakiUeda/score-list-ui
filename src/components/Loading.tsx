export function Loading() {
  return (
    <div className="flex justify-center py-20" aria-label="読み込み中">
      <div className="animate-spin h-10 w-10 border-4 border-slate-500 rounded-full border-t-transparent"></div>
    </div>
  );
}
