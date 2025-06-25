import { Head, Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

// Contoh data berita (ganti dengan fetch data asli sesuai kebutuhan)
const dummyNews = {
    id: 1,
    title: "HIMA ILKOM Arcadia Sukses Gelar Seminar Nasional AI",
    category: "Akademik",
    date: "2025-07-16",
    image: "/assets/IMG_5460.jpg",
    content:
        "Seminar Nasional AI yang digelar oleh HIMA ILKOM Arcadia sukses menarik ratusan peserta dari berbagai universitas. Acara ini menghadirkan pembicara-pembicara ternama di bidang kecerdasan buatan dan membahas tren serta tantangan AI di masa depan. Ketua pelaksana, Andi Pratama, menyampaikan harapannya agar seminar ini dapat membuka wawasan mahasiswa mengenai perkembangan teknologi dan peluang karir di bidang AI. <br/> <br/> Selain itu, acara ini juga menjadi ajang networking bagi mahasiswa dan profesional di industri teknologi. Peserta sangat antusias mengikuti sesi tanya jawab dan diskusi panel yang diadakan setelah presentasi. <br/> <br/> Dengan suksesnya acara ini, HIMA ILKOM Arcadia berencana untuk mengadakan seminar serupa di masa mendatang dengan topik-topik yang lebih beragam dan menarik.",
};

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
};

export default function ReadNews() {
    // Ganti dummyNews dengan data berita yang sesuai (misal dari props atau fetch API)
    const news = dummyNews;

    return (
        <MainLayout>
            <Head title={news.title + " - HIMA ILKOM Arcadia 2025"} />
            <section className="pt-36 pb-8 bg-primary text-white text-center">
                <div className="max-w-screen-md mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
                        {news.title}
                    </h1>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-sm text-gray-200">
                        <span className="bg-secondary px-3 py-1 rounded-full">
                            {news.category}
                        </span>
                        <span>{formatDate(news.date)}</span>
                    </div>
                </div>
            </section>
            <section className="bg-white py-8">
                <div className="max-w-screen-md mx-auto px-4">
                    <img
                        src={news.image}
                        alt={news.title}
                        className="rounded-lg shadow-md w-full mb-8 object-cover max-h-96"
                    />
                    <article
                        className="prose prose-lg max-w-none text-gray-800 text-justify"
                        dangerouslySetInnerHTML={{ __html: news.content }}
                    />
                    <div className="mt-8">
                        <Link
                            href="/news"
                            className="inline-block bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition"
                        >
                            &larr; Kembali ke Daftar Berita
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
