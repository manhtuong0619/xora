export function BlinkingCursor() {
  return (
    <span
      aria-hidden
      className="pointer-events-none ml-px inline-block w-0.5 -translate-y-px align-middle text-black/55 animate-blink-cursor"
    >
      |
    </span>
  );
}
