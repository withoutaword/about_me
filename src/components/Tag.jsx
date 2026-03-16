export default function Tag({ name }) {
  return (
    <span className="text-xs bg-gray-600 px-2 py-1 rounded mr-2">
      #{name}
    </span>
  );
}