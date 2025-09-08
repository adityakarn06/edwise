import { ArrowUpRight } from "lucide-react";
import ChooseComponent from "./ChooseOption";
import { useState } from "react";

enum OptionType {
  PDF = "pdf",
  YOUTUBE = "youtube",
}

export default function ExamHomepage() {
  const [selectedOption, setSelectedOption] = useState<OptionType>(OptionType.PDF);

  const onOptionClickHandler = (option: OptionType) => {
    setSelectedOption(option);
  }

  return (
    <div className="flex flex-col h-full w-full bg-[#131313] text-white/90 p-8 overflow-scroll">
      <h2 className="text-xl md:text-xl font-semibold">
        Lets test your knowledge with MCQs
      </h2>
      <p className="text-md text-white/70 mt-2">
        Explore our tools that you can use to generate exam, analyse result and
        more
      </p>
      <div className="flex mt-6 gap-6 w-full">
        <ChooseComponent
          onClick={() => onOptionClickHandler(OptionType.PDF)}
          heading="Generate from your PDFs"
          description="Upload your study materials and get customized MCQ questions based on the content"
          thumbnail="/pdfExamGeneratorThumbnail.png"
        />
        <ChooseComponent
          onClick={() => onOptionClickHandler(OptionType.YOUTUBE)}
          heading="Generate from youtube videos"
          description="Transform educational videos into interactive MCQ tests to reinforce your learning"
          thumbnail="/pdfExamGeneratorThumbnail.png"
        />
      </div>
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h1>Exam History</h1>
          <button className="border border-white/20 flex items-center justify-center gap-2 py-2 px-4 rounded-xl">
            <span>See All</span>
            <ArrowUpRight className="h-5 w-5" />
          </button>
        </div>
        <div className="w-full h-[200px] bg-[#0D0E10] flex items-center justify-center rounded-xl border border-white/20">
          Nothing to show here yet
        </div>
      </div>
    </div>
  );
}
