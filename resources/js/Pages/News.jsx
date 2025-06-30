import { Head, Link, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { useState, useEffect, useRef } from "react";
import Pagination from "@/Components/Pagination";
import { useDebounce } from "use-debounce";

// Fungsi untuk memformat tanggal
const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
};

// Komponen Kartu Berita (Reusable)
const NewsCard = ({
    image_path,
    category,
    published_at,
    title,
    excerpt,
    slug,
}) => {
    const imageUrl = image_path
        ? `/storage/${image_path}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              title
          )}&background=EBF4FF&color=1E40AF&size=400`;

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2">
            <img
                src={imageUrl}
                alt={`Gambar untuk ${title}`}
                className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                    <span className="text-white bg-secondary px-4 text-xs py-1 rounded-full">
                        {category}
                    </span>
                    <span>{formatDate(published_at)}</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2 flex-grow line-clamp-2 h-14">
                    {title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {excerpt}
                </p>
                <Link
                    href={route("news.show", slug)}
                    className="text-secondary font-semibold hover:underline mt-auto"
                >
                    Baca Selengkapnya &rarr;
                </Link>
            </div>
        </div>
    );
};

export default function News({ newsData, filters, settings }) {
    console.log("ISI newsData:", newsData);
    console.log("ISI filters:", filters);
    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const [sortBy, setSortBy] = "newest";
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
    const isInitialMount = useRef(true);

    useEffect(() => {
        // Mencegah request ulang saat halaman pertama kali dimuat
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Mempersiapkan parameter untuk dikirim ke server
        const query = { sort: sortBy };
        if (debouncedSearchTerm) {
            query.search = debouncedSearchTerm;
        }

        // Mengambil data baru dari server saat filter berubah
        router.get(route("news.index"), query, {
            preserveState: true,
            replace: true,
        });
    }, [debouncedSearchTerm, sortBy]);

    return (
        <MainLayout>
            <Head title="Berita" />

            {/* Header Section */}
            <section className="pt-36 pb-16 bg-primary text-white text-center">
                <div className="max-w-screen-xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold">
                        Berita & Informasi
                    </h1>
                    <p className="text-lg md:text-xl mt-4">
                        Kumpulan Informasi dan Kabar Terbaru dari Kami
                    </p>
                </div>
            </section>

            {/* Search Section */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-4">
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
                    </div>
                </div>
            </section>

            {/* News Grid Section */}
            <section className="py-16 bg-white">
                <div className="max-w-screen-xl mx-auto px-4">
                    {/* Pengecekan data yang lebih aman */}
                    {newsData && newsData.data && newsData.data.length > 0 ? (
                        <>
                            <div className="flex flex-wrap justify-center gap-8">
                                {newsData.data.map((news) => (
                                    <div
                                        key={news.id}
                                        className="w-full md:w-1/2 lg:w-96"
                                    >
                                        <NewsCard {...news} />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-12 flex justify-center">
                                <Pagination links={newsData.links} />
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16 col-span-full">
                            <h3 className="text-xl font-semibold text-gray-700">
                                Tidak Ada Berita
                            </h3>
                            <p className="text-gray-500 mt-2">
                                Saat ini belum ada berita yang dipublikasikan
                                atau tidak ada yang cocok dengan pencarian Anda.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
