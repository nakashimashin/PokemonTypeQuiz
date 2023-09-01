import Link from "next/link"

export default function Top() {
    return (
      <>
        <div className="flex flex-col items-center mt-[280px]">
            <div className="text-[70px] font-bold">ポケモンタイプ相性クイズ</div>
            <div className="mt-1 text-[30px] text-red-500 font-serif">Pokemon type compatibility Quiz</div>
            <div className="flex flex-row justify-around w-[500px] mt-[20px] px-10">
                <Link href="/quiz" className="text-[30px] bg-blue-500 hover:bg-blue-300 rounded font-bold w-[100px] h-[50px] text-center text-white">Start</Link>
                <Link href="" className="text-[30px] bg-blue-500 hover:bg-blue-300 rounded font-bold w-[100px] h-[50px] text-center text-white">Search</Link>
            </div>
        </div>
      </>
    )
  }
  