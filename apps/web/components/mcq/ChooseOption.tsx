import { WandSparkles } from "lucide-react";
import Image from "next/image";

export default function ChooseComponent({
  heading,
  description,
  thumbnail,
  onClick,
}: {
  heading: string;
  description: string;
  thumbnail: string;
  onClick: () => void;
}) {
  return (
    <div className="w-[45%] bg-[#0D0E10] flex flex-col gap-2 p-6 rounded-xl border border-white/20">
      <h1 className="text-xl">{heading}</h1>
      <p className="text-white/70">{description}</p>
      <Image
        src={thumbnail}
        alt="thumbnail"
        width={400}
        height={200}
        className="w-full h-auto object-cover"
      />
      <button
        onClick={onClick}
        className="w-full border border-white/20 flex items-center justify-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-white/10 transition"
      >
        <WandSparkles className="h-4 w-4" />
        <span>Create Exam</span>
      </button>
    </div>
  );
}
