import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { useState, useEffect } from "react"; // Impor useState dan useEffect

export default function Home({ settings, latestNews = [], galleries = [] }) {
    // Mendapatkan daftar kategori unik dari data gambar
    const categories = [
        "Semua",
        ...new Set(galleries.map((image) => image.category)),
    ];

    // State untuk kategori aktif dan gambar yang akan ditampilkan
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [filteredImages, setFilteredImages] = useState(galleries);

    // Efek untuk memfilter gambar saat kategori aktif berubah
    useEffect(() => {
        if (activeCategory === "Semua") {
            setFilteredImages(galleries);
        } else {
            setFilteredImages(
                galleries.filter((image) => image.category === activeCategory)
            );
        }
    }, [activeCategory, galleries]);

    return (
        <MainLayout>
            <Head
                title={`${settings.cabinet_name} ${settings.period}`}
            />

            {/* Hero Section Start */}
            <section className="relative pt-36 pb-24 md:pt-72 md:pb-48 flex items-center justify-center text-center text-white">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    // Ganti URL ini dengan gambar Anda sendiri, misalnya '/assets/hero-image.jpg'
                    style={{
                        backgroundImage: `url(/storage/${settings.cover_photo_path})`,
                    }}
                ></div>

                {/* Overlay Gelap */}
                {/* Ini membantu agar teks lebih mudah dibaca di atas gambar */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Konten Teks */}
                <div className="relative z-10 p-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                        {settings.headline}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 max-w-screen-lg mx-auto">
                        {settings.tagline}
                    </p>
                    <div className="flex gap-4 items-center justify-center">
                        <Link
                            href="/about/hima-ilkom"
                            className="inline-block bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-lg text-md transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Lebih Dekat
                        </Link>
                        <Link
                            href="/about/hima-ilkom"
                            className="inline-block bg-transparent border border-white hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-lg text-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-secondary"
                        >
                            Kerja Sama
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-screen-xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-primary mb-12">
                        Kolaborasi Aktif Underbow
                    </h2>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-16">
                        {/* Ganti src dengan path logo Anda. Ukuran ideal adalah SVG atau PNG transparan. */}
                        <img
                            src="/assets/AL-HUSNA.png"
                            alt="Logo Mitra Satu"
                            className="h-16 md:h-20 transition duration-300 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                        />
                        <img
                            src="/assets/PALATIKOM.png"
                            alt="Logo Mitra Dua"
                            className="h-16 md:h-20 transition duration-300 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                        />
                        <img
                            src="/assets/I-SECRET.png"
                            alt="Logo Mitra Tiga"
                            className="h-16 md:h-20 transition duration-300 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                        />
                        <img
                            src="/assets/BSO-KWU.png"
                            alt="Logo Mitra Empat"
                            className="h-16 md:h-20 transition duration-300 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                        />
                        <img
                            src="/assets/SCREENSHOT.png"
                            alt="Logo Mitra Lima"
                            className="h-16 md:h-20 transition duration-300 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                        />
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary">
                            Berita & Informasi Terkini
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Ikuti perkembangan terbaru dari kegiatan dan
                            pencapaian kami.
                        </p>
                    </div>

                    {/* Bagian Berita menjadi dinamis */}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {latestNews.map((news) => (
                            <article
                                key={news.id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2"
                            >
                                <Link href={route("news.show", news.slug)}>
                                    <img
                                        src={`/storage/${news.image_path}`}
                                        alt={news.title}
                                        className="w-full h-48 object-cover"
                                    />
                                </Link>
                                <div className="p-6">
                                    <span className="text-sm font-semibold text-secondary">
                                        {news.category}
                                    </span>
                                    <h3 className="mt-2 text-xl font-bold text-primary hover:text-secondary transition-colors">
                                        <Link
                                            href={route("news.show", news.slug)}
                                        >
                                            {news.title}
                                        </Link>
                                    </h3>
                                    <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                                        {news.excerpt}
                                    </p>
                                    <div className="mt-4">
                                        <Link
                                            href={route("news.show", news.slug)}
                                            className="text-primary font-semibold hover:text-secondary transition-colors"
                                        >
                                            Baca Selengkapnya &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-16 bg-gray-50">
                <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    {/* Kolom Kiri: Teks Penjelasan */}
                    <div className="text-left">
                        <h2 className="text-3xl font-bold text-primary mb-4">
                            Tentang {settings.organization_name}
                        </h2>
                        <p className="text-xl font-semibold text-gray-700 mb-4">
                            Kabinet {settings.cabinet_name} {settings.period}
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {settings.definition}
                        </p>
                        <Link
                            href="/about"
                            className="inline-block bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-lg text-md transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Baca Selengkapnya
                        </Link>
                    </div>

                    {/* Kolom Kanan: Gambar Logo */}
                    <div className="flex justify-center items-center order-first md:order-last">
                        {/* Ganti src dengan path logo HIMA ILKOM Anda */}
                        <img
                            src={`/storage/${settings.logo_full_path}`}
                            alt="Logo HIMA ILKOM"
                            className="h-48 md:h-64 object-contain"
                        />
                    </div>
                </div>
            </section>
            <section className="py-16">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-primary">
                            Galeri Kegiatan
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Momen-momen berharga dari berbagai acara yang telah
                            kami selenggarakan.
                        </p>
                    </div>

                    {/* Tombol Filter Kategori */}
                    {galleries.length > 0 && (
                        <div className="flex justify-center flex-wrap gap-2 mb-12">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                                        activeCategory === category
                                            ? "bg-primary text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Grid Galeri menjadi dinamis */}
                    {galleries.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {filteredImages.map((image) => (
                                <div
                                    key={image.id}
                                    className="relative aspect-square rounded-lg overflow-hidden group"
                                >
                                    <img
                                        src={`/storage/${image.image_path}`}
                                        alt={
                                            image.caption ||
                                            `Galeri ${image.category}`
                                        }
                                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {image.category}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">
                            Galeri kegiatan akan segera diperbarui.
                        </p>
                    )}
                </div>
            </section>
            <section className="py-16 bg-gray-50">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary">
                            Video Profil Kabinet {settings.cabinet_name}
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Kenali kami lebih dekat melalui video profil singkat
                            ini.
                        </p>
                    </div>

                    {/* Container untuk membuat video responsif */}
                    <div className="max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden shadow-2xl">
                        {/* 
                          Ganti 'dQw4w9WgXcQ' dengan ID video YouTube Anda.
                          Contoh: jika URL video adalah https://www.youtube.com/watch?v=abcdef123, maka ID-nya adalah 'abcdef123'.
                        */}
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${settings.video_profile_link}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
