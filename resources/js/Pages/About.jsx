import { Head, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

export default function About() {
    const { settings } = usePage().props;
    return (
        <MainLayout>
            <Head title="Tentang" />

            <section className="pt-36 pb-16 bg-white">
                <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-5 gap-12 items-center">
                    {/* Kolom Kiri: Konten Teks (lebar 3/5) */}
                    <div className="md:col-span-3 text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
                            Mengenal{" "}
                            {settings.organization_name || "Organisasi Kami"}
                        </h1>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                {settings.definition ||
                                    "Definisi organisasi belum ditambahkan."}
                            </p>
                        </div>
                    </div>

                    {/* Kolom Kanan: Logo (lebar 2/5) */}
                    <div className="md:col-span-2 flex justify-center items-center order-first md:order-last">
                        {/* Ganti src dengan path logo Anda */}
                        <img
                            src={
                                settings.logo_full_path
                                    ? `/storage/${settings.logo_full_path}`
                                    : "https://via.placeholder.com/320"
                            }
                            alt={
                                "Logo " +
                                (settings.organization_name || "Organisasi")
                            }
                            className="h-56 md:h-80 object-contain"
                        />
                    </div>
                </div>
            </section>
            <section className="py-16 bg-gray-50">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary">
                            Visi & Misi
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Landasan Gerak dan Arah{" "}
                            {settings.organization_name || "Organisasi"} Kabinet{" "}
                            {settings.cabinet_name || ""}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Kolom Visi */}
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-primary mb-4">
                                Visi
                            </h3>
                            <p className="text-gray-700 leading-relaxed italic">
                                {settings.vision || "Visi belum ditambahkan."}
                            </p>
                        </div>
                        {/* Kolom Misi */}
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-primary mb-4">
                                Misi
                            </h3>
                            {settings.mission && settings.mission.length > 0 ? (
                                <ul className="space-y-4">
                                    {settings.mission.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start"
                                        >
                                            <svg
                                                className="w-6 h-6 text-secondary flex-shrink-0 mr-3 mt-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                            <span className="text-gray-700">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">
                                    Misi belum ditambahkan.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-white">
                <div className="max-w-screen-xl mx-auto px-4 items-center">
                    {/* Kolom Kiri: Teks Penjelasan */}
                    <div className="text-left">
                        <h2 className="text-3xl font-bold text-primary mb-4">
                            {settings.cabinet_name || "Filosofi Nama Kabinet"}
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                {settings.name_philosophy ||
                                    "Filosofi nama kabinet belum ditambahkan."}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-gray-50">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-primary">
                            Filosofi Logo
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Makna di Balik Setiap Elemen Visual Kabinet{" "}
                            {settings.cabinet_name || ""}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Kolom Kiri: Logo */}
                        <div className="flex justify-center items-center p-8">
                            <img
                                src={
                                    settings.logo_vertical_path
                                        ? `/storage/${settings.logo_vertical_path}`
                                        : "https://via.placeholder.com/256"
                                }
                                alt={`Logo Kabinet ${
                                    settings.cabinet_name || ""
                                }`}
                                className="h-64 md:h-80 object-contain"
                            />
                        </div>
                        {/* Kolom Kanan: Penjelasan Filosofi */}
                        <div className="space-y-6">
                            {settings.logo_philosophy &&
                            settings.logo_philosophy.length > 0 ? (
                                settings.logo_philosophy.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start"
                                    >
                                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
                                            {index + 1}
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-bold text-primary">
                                                {item.title}
                                            </h4>
                                            <p className="text-gray-600 mt-1">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">
                                    Filosofi logo belum ditambahkan.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
