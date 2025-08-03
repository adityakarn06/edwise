
interface FeatureComponentProps {
    icon: React.ReactNode;
    heading: string;
    feature: string;
    onClickFn?: () => void;
}

export default function FeatureComponent({icon, heading, feature, onClickFn}: FeatureComponentProps) {
    return (
        <div onClick={onClickFn} className="flex flex-col gap-2 items-center justify-center p-8 border border-white/10 cursor-pointer bg-white/6 rounded-lg text-white/90 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10 transition-all">
            <div>
                {icon}
            </div>
            <div className="mb-2">
                <h2 className="text-white/90 text-lg font-medium">
                    {heading}
                </h2>
            </div>
            <div>
                <p className="px-2 text-center text-sm font-light text-white/60">
                    {feature}
                </p>
            </div>
        </div>
    )
}