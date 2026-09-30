import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

export default function NotFound() {
    return (
        <MainLayout>
            <Head title="404 - Halaman Tidak Ditemukan" />
            <section className="pt-64 pb-48 flex flex-col justify-center items-center bg-white">
                <h1 className="text-5xl font-extrabold text-primary mb-4">
                    404
                </h1>
                <p className="text-xl text-gray-700 mb-6">
                    Oops! Halaman yang Anda cari tidak ditemukan.
                </p>
                <Link
                    href="/"
                    className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-blue-800 transition"
                >
                    Kembali ke Beranda
                </Link>
            </section>
        </MainLayout>
    );
}
