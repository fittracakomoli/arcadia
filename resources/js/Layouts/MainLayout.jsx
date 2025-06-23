import Navbar from "@/Layouts/Navbar";

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar/>

            <main>
                {children}
            </main>
        </div>
    );
}
