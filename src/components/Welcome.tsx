export default function Welcome() {
  return (
    <div className="flex w-full items-center justify-between px-8 py-6">
  <div className="flex flex-col">
    <h1 className="text-[2rem] font-bold text-gray-900">
      Buongiorno, Mario
    </h1>

    <p className="mt-1 text-base text-gray-500">
      Ecco cosa ti aspetta oggi
    </p>
  </div>

  <p className="text-base font-semibold text-indigo-600">
    Università degli Studi di Bari (UNIBA)
  </p>
</div>
  );
}
