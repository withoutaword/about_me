export default function Tag({ name }) {
  return (
    <span className="text-xs bg-[var(--bg-secondary)] text-[var(--text-muted)] px-2 py-1 rounded mr-2">
      #{name}
    </span>
  );
}
