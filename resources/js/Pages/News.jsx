import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { useState, useEffect } from "react";

// --- DATA BERITA (DUMMY) ---
// Ganti dengan data berita asli Anda.
const allNewsData = [
    {
        id: 1,
        title: "HIMA ILKOM Arcadia Sukses Gelar Seminar Nasional AI",
        category: "Akademik",
        date: "2025-07-16",
        image: "/assets/IMG_5460.jpg",
        excerpt:
            "Seminar yang dihadiri ratusan peserta ini membahas dampak dan masa depan Kecerdasan Buatan di berbagai industri.",
        href: "/news/1",
    },
    {
        id: 2,
        title: "Tim E-Sports ILKOM Juarai Kompetisi Tingkat Universitas",
        category: "Prestasi",
        date: "2025-06-20",
        image: "/assets/IMG_5460.jpg",
        excerpt:
            "Tim 'Arcadia Knights' berhasil membawa pulang piala setelah mengalahkan tim dari fakultas teknik di babak final.",
        href: "/news/2",
    },
    {
        id: 3,
        title: "Program Pengabdian Masyarakat di Desa Cipta Karya",
        category: "Sosial",
        date: "2025-05-30",
        image: "/assets/IMG_5460.jpg",
        excerpt:
            "Mahasiswa memberikan pelatihan digital marketing kepada para pelaku UMKM untuk meningkatkan perekonomian desa.",
        href: "/news/3",
    },
    {
        id: 4,
        title: "Workshop UI/UX Design Penuh Antusiasme",
        category: "Pelatihan",
        date: "2025-04-15",
        image: "/assets/IMG_5460.jpg",
        excerpt:
            "Workshop ini bertujuan untuk membekali mahasiswa dengan keterampilan desain antarmuka yang relevan dengan industri.",
        href: "/news/4",
    },
    {
        id: 5,
        title: "Upgrading Pengurus: Memperkuat Solidaritas Kabinet",
        category: "Internal",
        date: "2025-03-25",
        image: "/assets/IMG_5460.jpg",
        excerpt:
            "Seluruh pengurus HIMA ILKOM Arcadia mengikuti kegiatan upgrading untuk meningkatkan kekompakan dan skill organisasi.",
        href: "/news/5",
    },
    {
        id: 6,
        title: "Kunjungan Industri ke Perusahaan Teknologi Terkemuka",
        category: "Akademik",
        date: "2025-02-18",
        image: "/assets/IMG_5460.jpg",
        excerpt:
            "Mahasiswa mendapatkan wawasan langsung mengenai dunia kerja dan teknologi yang diterapkan di industri saat ini.",
        href: "/news/6",
    },
    {
        id: 7,
        title: "HIMA ILKOM Gelar Turnamen Catur Online",
        category: "Kompetisi",
        date: "2025-01-20",
        image: "/assets/IMG_5460.jpg",
        excerpt:
            "Turnamen catur online pertama yang diadakan berhasil menarik puluhan peserta dari berbagai angkatan.",
        href: "/news/7",
    },
];

// Fungsi untuk memformat tanggal
const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
};

// Komponen Kartu Berita (Reusable)
const NewsCard = ({ image, category, date, title, excerpt, href }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2">
        <img
            src={image}
            alt={`Gambar untuk ${title}`}
            className="w-full h-48 object-cover"
        />
        <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span>{category}</span>
                <span>{formatDate(date)}</span>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2 flex-grow">
                {title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">{excerpt}</p>
            <Link
                href={href}
                className="text-secondary font-semibold hover:underline mt-auto"
            >
                Baca Selengkapnya &rarr;
            </Link>
        </div>
    </div>
);

// Komponen Paginasi (Reusable)
const Pagination = ({
    itemsPerPage,
    totalItems,
    currentPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex justify-center items-center space-x-2 mt-12">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Sebelumnya
            </button>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                        currentPage === number
                            ? "bg-primary text-white border-primary z-10"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                >
                    {number}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Berikutnya
            </button>
        </nav>
    );
};

export default function News() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredNews, setFilteredNews] = useState(allNewsData);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("newest");
    const ITEMS_PER_PAGE = 6;

    useEffect(() => {
        let results = allNewsData.filter(
            (news) =>
                news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                news.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Sorting logic
        if (sortBy === "newest") {
            results = results.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
        } else if (sortBy === "oldest") {
            results = results.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
        } else if (sortBy === "az") {
            results = results.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "za") {
            results = results.sort((a, b) => b.title.localeCompare(a.title));
        }

        setFilteredNews([...results]);
        setCurrentPage(1);
    }, [searchTerm, sortBy]);

    // Logika untuk menentukan berita mana yang akan ditampilkan di halaman saat ini
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentNews = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <MainLayout>
            <Head title="Berita - HIMA ILKOM Arcadia 2025" />

            {/* Header Section */}
            <section className="pt-36 pb-16 bg-primary text-white text-center">
                <div className="max-w-screen-xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold">
                        Berita & Informasi
                    </h1>
                    <p className="text-lg md:text-xl mt-4">
                        Kumpulan kabar terbaru dari HIMA ILKOM Arcadia
                    </p>
                </div>
            </section>

            {/* Search Section */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-4">
                        {/* Input Pencarian */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Cari berita berdasarkan judul atau kategori..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-4 ps-6 text-md text-gray-900 border border-gray-300 rounded-full shadow-sm focus:ring-primary focus:border-primary"
                            />
                            <div className="absolute inset-y-0 end-0 flex items-center pe-5">
                                <svg
                                    className="w-5 h-5 text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                        </div>
                        {/* Dropdown Sortir */}
                        <div className="flex items-center gap-2 w-full md:w-1/4">
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full rounded-full bg-primary text-white p-4 text-sm"
                            >
                                <option value="newest">Tanggal Terbaru</option>
                                <option value="oldest">Tanggal Terlama</option>
                                <option value="az">Judul A-Z</option>
                                <option value="za">Judul Z-A</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* News Grid Section */}
            <section className="py-16 bg-white">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentNews.length > 0 ? (
                            currentNews.map((news) => (
                                <NewsCard key={news.id} {...news} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 col-span-full">
                                Tidak ada berita yang cocok dengan pencarian
                                Anda.
                            </p>
                        )}
                    </div>
                    {/* Kontrol Paginasi */}
                    <Pagination
                        itemsPerPage={ITEMS_PER_PAGE}
                        totalItems={filteredNews.length}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </section>
        </MainLayout>
    );
}
