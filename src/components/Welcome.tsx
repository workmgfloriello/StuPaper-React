export default function Welcome() {
return (
  <div className="flex w-full items-center justify-between px-8 py-6 transition-colors">
    <div className="flex flex-col">
      <h1 className="text-[2rem] font-bold text-gray-900 dark:text-[#cccccc]">
        Buongiorno, Mario
      </h1>

      <p className="mt-1 text-base text-gray-500 dark:text-[#9d9d9d]">
        Ecco cosa ti aspetta oggi
      </p>
    </div>

    <p className="text-base font-semibold text-indigo-600 dark:text-[#4daafc]">
      Università degli Studi di Bari (UNIBA)
    </p>
  </div>
);
}
