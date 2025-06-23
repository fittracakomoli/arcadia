import Navbar from "@/Layouts/Navbar";
import Footer from "@/Layouts/Footer";

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main>{children}</main>

            <Footer />
        </div>
    );
}
