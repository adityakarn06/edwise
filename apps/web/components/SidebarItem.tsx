import { ReactElement } from "react";

export default function SidebarItem({text, icon, onClickFn, isCollapsed}: {
    text: string;
    icon: ReactElement;
    onClickFn?: () => void;
    isCollapsed?: boolean;
}) {
    return (
        <div 
            onClick={onClickFn} 
            className={`flex py-2 my-2 items-center cursor-pointer rounded-md text-white/80 hover:bg-white/10 hover:text-white/90 transition-all ${
                isCollapsed ? 'justify-center px-2' : 'pl-4 max-w-48'
            }`}
            title={isCollapsed ? text : undefined}
        >
            <div className={`rounded p-1.5 bg-white/10 ${!isCollapsed ? 'mr-2' : ''}`}>
                {icon} 
            </div>
            {!isCollapsed && (
                <div className="text-base">
                    {text}
                </div>
            )}
        </div>
    );
}