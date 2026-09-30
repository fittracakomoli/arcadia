import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import Sidebar from "@/Layouts/Sidebar";

// Ikon untuk tombol menu mobile
const MenuIcon = () => (
    <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
        />
    </svg>
);

// --- Komponen Utama Dashboard ---
export default function Dashboard() {
    const { auth, stats } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Dashboard" />
            {/* Panggil komponen Sidebar di sini */}
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="lg:ml-72">
                <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-20">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-600"
                    >
                        <MenuIcon />
                    </button>
                    <h2 className="text-xl font-semibold text-gray-800 hidden lg:block">
                        Dashboard
                    </h2>
                    <div className="text-right inline-flex items-center gap-2 bg-primary px-4 py-2 rounded-lg font-semibold">
                        <span className="font-semibold text-white">
                            {auth.user.name}
                        </span>
                    </div>
                </header>

                <main className="p-6">
                    <div className=" bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Selamat Datang, {auth.user.name}!
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Anda telah berhasil login ke dashboard HIMA ILKOM
                            Arcadia. Dari sini Anda dapat mengelola konten
                            website.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-gray-500 text-sm font-medium">
                                Admin Terdaftar
                            </h3>
                            <p className="text-3xl font-bold text-primary mt-2">
                                {stats.admins}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-gray-500 text-sm font-medium">
                                Total Berita Dibuat
                            </h3>
                            <p className="text-3xl font-bold text-primary mt-2">
                                {stats.news}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-gray-500 text-sm font-medium">
                                Jumlah Anggota
                            </h3>
                            <p className="text-3xl font-bold text-primary mt-2">
                                {stats.members}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-gray-500 text-sm font-medium">
                                Jumlah Kegiatan
                            </h3>
                            <p className="text-3xl font-bold text-primary mt-2">
                                {stats.activities}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-gray-500 text-sm font-medium">
                                Jumlah Agenda
                            </h3>
                            <p className="text-3xl font-bold text-primary mt-2">
                                {stats.agendas}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-gray-500 text-sm font-medium">
                                Total Foto Kegiatan
                            </h3>
                            <p className="text-3xl font-bold text-primary mt-2">
                                {stats.photos}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-gray-500 text-sm font-medium">
                                Total Pesan Masuk
                            </h3>
                            <p className="text-3xl font-bold text-primary mt-2">
                                {stats.messages}
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
