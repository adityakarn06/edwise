import Sidebar from "@/components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen w-screen">
            <Sidebar />
            <div className="flex-1 h-screen flex flex-col overflow-hidden">
                {children}
            </div>
        </div>
    );
}

export default Layout;