import { Head, Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
};

export default function ReadNews() {
    // Ambil data dari props (Inertia)
    const { news } = usePage().props;
    const data = news;

    // Gambar fallback jika tidak ada image_path
    const imageUrl = data.image_path
        ? data.image_path.startsWith("http")
            ? data.image_path
            : `/storage/${data.image_path}`
        : "/assets/IMG_5460.jpg";

    return (
        <MainLayout>
            <Head title={data.title + " - HIMA ILKOM Arcadia 2025"} />
            <section className="pt-36 pb-8 bg-primary text-white text-center">
                <div className="max-w-screen-md mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
                        {data.title}
                    </h1>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-sm text-gray-200">
                        <span className="bg-secondary px-3 py-1 rounded-full">
                            {data.category}
                        </span>
                        <span className="font-semibold">
                            {formatDate(data.published_at)}
                        </span>
                        <span>oleh {data.user.name}</span>
                    </div>
                </div>
            </section>
            <section className="bg-white py-8">
                <div className="max-w-screen-md mx-auto px-4">
                    <img
                        src={imageUrl}
                        alt={data.title}
                        className="rounded-lg shadow-md w-full mb-8 object-cover"
                    />
                    <article
                        className="prose prose-lg max-w-none text-gray-800 text-justify"
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                    <div className="mt-8">
                        <Link
                            href={route("news.index")}
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
