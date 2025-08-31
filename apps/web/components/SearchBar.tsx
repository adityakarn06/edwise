import { ChevronDown, Search } from "lucide-react";

export default function SearchBar({ 
    showOptions = false,
    placeholder,
    searchValue, 
    onSearchChange 
}: { 
    showOptions?: boolean;
    placeholder: string;
    searchValue: string;
    onSearchChange: (value: string) => void;
}) {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    };

    return (
        <div className="flex items-center justify-between bg-white/90 rounded-lg p-4">
            {showOptions && (
                <div className="flex items-center border-r pr-2">
                    <span className="text-black/80 text-sm whitespace-nowrap mr-1">All Categories</span>
                    <span><ChevronDown className="h-5 w-5 text-black/80" /></span>
                </div>    
            )}
            
            <div className="flex items-center w-full relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchValue}
                    className="bg-transparent text-black/80 placeholder:text-black/50 focus:outline-none w-full pl-8"
                    onChange={handleSearch}
                />
                <span className="absolute left-2">
                    <Search className="h-4 w-4 text-black/60" />
                </span>
                <button
                 onClick={() => onSearchChange(searchValue)}
                 className="absolute right-2 px-4 py-2 rounded-md text-white/80 hover:text-white/90 bg-black/90 transition-colors">
                    Search
                </button>
            </div>
        </div>
    );
}