import { ReactElement } from "react";

export default function SidebarItem({text, icon, onClickFn}: {
    text: string;
    icon: ReactElement;
    onClickFn?: () => void;
}) {
    return <div onClick={onClickFn} className="flex py-2 my-2 max-w-48 pl-4 item-center cursor-pointer rounded-md text-white/80 hover:bg-white/10 hover:text-white/90 transition-all">
        <div className="rounded p-1.5 bg-white/10 mr-2">
            {icon} 
        </div>
        <div className="text-base">
            {text}
        </div>
    </div>
}