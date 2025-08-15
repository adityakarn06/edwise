import Image from "next/image";

export default function HeroImage() {
    return (
        <div className="w-full flex items-center justify-center relative">
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-[40%] h-6 bg-white/60 blur-2xl rounded-full"></div>
            <Image
            src={"/dashboardImage.png"}
            alt="dashboard-image"
            width={1200}
            height={800}
            className="relative z-10 rounded-2xl border border-white/20"
            /> 
        </div>
    )
}