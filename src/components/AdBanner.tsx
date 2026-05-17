export default function AdBanner({ slot }: { slot?: string }) {
  return (
    <div className="w-full bg-white/5 border border-dashed border-white/10 rounded-xl py-12 flex flex-col items-center justify-center text-center my-8">
      <span className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Publicidad / AdSense</span>
      <div className="p-4 bg-white/5 rounded text-gray-600 text-sm">
        {slot || "Espacio reservado para banner de AdSense"}
      </div>
    </div>
  );
}
