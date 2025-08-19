import Sidebar from "@/components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen w-screen">
            <div className="w-[18%]">
                <Sidebar />
            </div>
            <div className="w-[82%] h-screen flex flex-col">
                {children}
            </div>
        </div>
    );
}

export default Layout;