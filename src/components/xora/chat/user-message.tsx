export function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end px-1">
      <div className="max-w-[78%] rounded-[12px_12px_2px_12px] bg-[#0a0a0a] px-3.5 py-2.5 text-[14px] leading-relaxed text-white shadow-[0_4px_24px_-12px_rgba(0,0,0,0.4)]">
        {text}
      </div>
    </div>
  );
}
