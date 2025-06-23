import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

export default function About() {
    return (
        <MainLayout>
            <Head title="Tentang - HIMA ILKOM Arcadia 2025" />

            <section className="pt-36 pb-16 bg-white">
                <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-5 gap-12 items-center">
                    {/* Kolom Kiri: Konten Teks (lebar 3/5) */}
                    <div className="md:col-span-3 text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
                            Mengenal HIMA ILKOM
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Wadah Aspirasi dan Pengembangan Potensi Mahasiswa
                            Ilmu Komputer.
                        </p>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                Himpunan Mahasiswa Ilmu Komputer (HIMA ILKOM)
                                adalah organisasi kemahasiswaan yang berfungsi
                                sebagai wadah utama bagi seluruh mahasiswa
                                Program Studi Ilmu Komputer di Universitas XYZ.
                                Didirikan dengan semangat kebersamaan dan
                                keinginan untuk maju, HIMA ILKOM bertujuan untuk
                                menampung, menyalurkan, dan memperjuangkan
                                aspirasi mahasiswa dalam berbagai bidang.
                            </p>
                        </div>
                    </div>

                    {/* Kolom Kanan: Logo (lebar 2/5) */}
                    <div className="md:col-span-2 flex justify-center items-center order-first md:order-last">
                        {/* Ganti src dengan path logo Anda */}
                        <img
                            src="/assets/logo.png"
                            alt="Logo HIMA ILKOM"
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
                            Landasan Gerak dan Arah HIMA ILKOM Kabinet Arcadia
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Kolom Visi */}
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-primary mb-4">
                                Visi
                            </h3>
                            <p className="text-gray-700 leading-relaxed italic">
                                "Menjadikan HIMA ILKOM sebagai organisasi yang
                                unggul, inovatif, dan berdampak, serta menjadi
                                rumah yang nyaman bagi seluruh mahasiswa Ilmu
                                Komputer untuk bertumbuh dan berkembang secara
                                holistik."
                            </p>
                        </div>
                        {/* Kolom Misi */}
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-primary mb-4">
                                Misi
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <svg
                                        className="w-6 h-6 text-secondary flex-shrink-0 mr-3 mt-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                    <span className="text-gray-700">
                                        Meningkatkan kualitas akademik dan
                                        non-akademik mahasiswa melalui program
                                        kerja yang edukatif dan relevan.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="w-6 h-6 text-secondary flex-shrink-0 mr-3 mt-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                    <span className="text-gray-700">
                                        Membangun lingkungan internal yang
                                        solid, suportif, dan berasaskan
                                        kekeluargaan.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="w-6 h-6 text-secondary flex-shrink-0 mr-3 mt-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                    <span className="text-gray-700">
                                        Mempererat hubungan dan kolaborasi
                                        dengan alumni, pihak departemen, dan
                                        mitra eksternal.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="w-6 h-6 text-secondary flex-shrink-0 mr-3 mt-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                    <span className="text-gray-700">
                                        Menyelenggarakan kegiatan pengabdian
                                        masyarakat berbasis teknologi untuk
                                        memberikan kontribusi nyata.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-white">
                <div className="max-w-screen-xl mx-auto px-4 items-center">
                    {/* Kolom Kiri: Teks Penjelasan */}
                    <div className="text-left">
                        <h2 className="text-3xl font-bold text-primary mb-4">
                            Arcadia
                        </h2>
                        <p className="text-xl font-semibold text-gray-700 mb-6">
                            Harmoni dalam Keberagaman
                        </p>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                <strong>Arcadia</strong> adalah wilayah
                                mitologis yang digambarkan sebagai tempat yang
                                damai, indah, dan harmonis. Ia sering dikaitkan
                                dengan kebahagiaan, kesederhanaan, dan kehidupan
                                yang ideal.
                            </p>
                            <p>
                                Keselarasan: Arcadia melambangkan harmoni dalam
                                keberagaman. Kabinet ini menjunjung tinggi
                                nilai-nilai toleransi, saling menghormati, dan
                                hidup berdampingan secara damai. Keseimbangan:
                                Arcadia juga mengandung makna keseimbangan.
                                Kabinet ini berupaya untuk menciptakan
                                keseimbangan antara berbagai kepentingan, antara
                                kebutuhan individu dan masyarakat, serta antara
                                kemajuan dan keberlanjutan. Inspirasi: Arcadia
                                menjadi sumber inspirasi bagi kabinet untuk
                                menciptakan lingkungan yang positif, produktif,
                                dan penuh kebahagiaan. Ia mengingatkan akan
                                pentingnya menjaga keindahan alam dan
                                nilai-nilai kemanusiaan. Relevansi: Nama Arcadia
                                sangat cocok untuk kabinet yang memiliki visi
                                untuk menciptakan masyarakat yang adil, makmur,
                                harmonis, dan berkelanjutan.
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
                            Makna di Balik Setiap Elemen Visual Kabinet Arcadia
                        </p>
                    </div>
                    <div className="mb-6">
                        <p className="text-gray-700">
                            <strong>Resonant Harmony</strong> Bentuk pohon yang
                            menjadi representasi bahwa HIMA ILKOM akan terus
                            tumbuh dan mengembangkan potensinya. Terdiri dari
                            banyak bentuk yang memiliki rupa serta ukuran yang
                            beragam namun masih seirama, menggambarkan
                            keberagaman yang ada pada ILKOM.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Kolom Kiri: Logo */}
                        <div className="flex justify-center items-center p-8">
                            <img
                                src="/assets/logo-vertical.png"
                                alt="Logo Kabinet Arcadia"
                                className="h-64 md:h-80 object-contain"
                            />
                        </div>
                        {/* Kolom Kanan: Penjelasan Filosofi */}
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
                                    1
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-primary">
                                        Bentuk Daun
                                    </h4>
                                    <p className="text-gray-600 mt-1">
                                        Tumbuhnya Himpunan Mahasiswa Ilmu
                                        Komputer dan juga Program Studi Ilmu
                                        Komputer
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
                                    2
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-primary">
                                        Bentuk Api
                                    </h4>
                                    <p className="text-gray-600 mt-1">
                                        Semangat membara untuk memajukan Ilmu
                                        Komputer
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
                                    3
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-primary">
                                        Bentuk Hati
                                    </h4>
                                    <p className="text-gray-600 mt-1">
                                        Esensi kekeluargaan Ilmu Komputer yang
                                        selalu ada di dalam
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
                                    4
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-primary">
                                        Simbol Penopang
                                    </h4>
                                    <p className="text-gray-600 mt-1">
                                        Landasan dan penegak bagi Ilmu Komputer
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
