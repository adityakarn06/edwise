
interface FeatureComponentProps {
    icon: React.ReactNode;
    heading: string;
    feature: string;
    onClickFn?: () => void;
}

export default function FeatureComponent({icon, heading, feature, onClickFn}: FeatureComponentProps) {
    return (
        <div onClick={onClickFn} className="flex flex-col gap-2 items-center justify-center p-5 sm:p-6 md:p-8 border border-white/10 cursor-pointer bg-white/6 rounded-lg text-white/90 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10 transition-all">
            <div className="mb-1 sm:mb-2">
                {icon}
            </div>
            <div className="mb-1 sm:mb-2">
                <h2 className="text-white/90 text-base sm:text-lg md:text-xl font-medium text-center">
                    {heading}
                </h2>
            </div>
            <div>
                <p className="px-1 sm:px-2 text-center text-xs sm:text-sm md:text-base font-light text-white/60">
                    {feature}
                </p>
            </div>
        </div>
    )
}