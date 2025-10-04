export default function Header() {
  return (
    <div className="h-12 bg-amber-900 text-white flex items-center justify-between px-4 shadow">
      <div className="flex gap-1 align-middle items-center">
        <button className="mb-4 px-2 bg-blue-500">Open</button>
        <h1 className="font-bold">Tooldicsont</h1>
      </div>
      <div className="w-12 h-3.5 bg-amber-200"></div>
      <div>user</div>
    </div>
  );
}
