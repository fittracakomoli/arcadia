import { Head, useForm } from "@inertiajs/react"; // <-- Ganti import
import MainLayout from "@/Layouts/MainLayout";
import InputError from "@/Components/InputError"; // <-- Tambahkan ini jika belum ada

export default function Contact() {
    // Gunakan useForm untuk manajemen state, error, dan status pengiriman
    const { data, setData, post, processing, errors, wasSuccessful, reset } =
        useForm({
            name: "",
            email: "",
            subject: "",
            body: "", // <-- Ganti 'message' menjadi 'body' agar sesuai dengan database
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("contact.send"), {
            onSuccess: () => reset(), // Reset form setelah berhasil
        });
    };

    return (
        <MainLayout>
            <Head title="Kontak - HIMA ILKOM Arcadia 2025" />
            <section className="pt-36 pb-8 bg-primary text-white text-center">
                <div className="max-w-screen-md mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
                        Kontak Kami
                    </h1>
                    <p className="text-lg md:text-xl mt-4">
                        Hubungi HIMA ILKOM Arcadia untuk pertanyaan, saran, atau
                        kerjasama.
                    </p>
                </div>
            </section>
            <section className="py-16 bg-white">
                <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-12">
                    {/* Form Kontak */}
                    <div>
                        <h2 className="text-2xl font-bold text-primary mb-6">
                            Formulir Pesan
                        </h2>
                        {wasSuccessful ? (
                            <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-green-700">
                                Pesan Anda telah terkirim. Terima kasih! Kami
                                akan segera meresponnya.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block mb-2 font-semibold text-gray-700">
                                        Nama
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 font-semibold text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 font-semibold text-gray-700">
                                        Subjek
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={data.subject}
                                        onChange={(e) =>
                                            setData("subject", e.target.value)
                                        }
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                    <InputError
                                        message={errors.subject}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 font-semibold text-gray-700">
                                        Pesan
                                    </label>
                                    <textarea
                                        name="body" // <-- Ganti 'message' menjadi 'body'
                                        value={data.body}
                                        onChange={(e) =>
                                            setData("body", e.target.value)
                                        }
                                        required
                                        rows={5}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                    <InputError
                                        message={errors.body}
                                        className="mt-2"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition disabled:opacity-50"
                                    disabled={processing} // <-- Nonaktifkan tombol saat mengirim
                                >
                                    {processing ? "Mengirim..." : "Kirim Pesan"}
                                </button>
                            </form>
                        )}
                    </div>
                    {/* Info Kontak dengan Ikon */}
                    <div>
                        <h2 className="text-2xl font-bold text-primary mb-6">
                            Informasi Kontak
                        </h2>
                        <div className="mb-8 space-y-4 text-gray-700">
                            {/* Alamat */}
                            <div className="flex items-start gap-3">
                                <span className="inline-flex items-center justify-center bg-primary text-white rounded-full w-10 h-10">
                                    {/* Map Pin Icon */}
                                    <svg
                                        class="w-6 h-6 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                        />
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <span className="font-semibold">
                                        Alamat:
                                    </span>
                                    <br />
                                    Jl. Pendidikan No. 123, Kota Ilmu, Indonesia
                                </div>
                            </div>
                            {/* Email */}
                            <div className="flex items-start gap-3">
                                <span className="inline-flex items-center justify-center bg-primary text-white rounded-full w-10 h-10">
                                    {/* Email Icon */}
                                    <svg
                                        class="w-6 h-6 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-width="2"
                                            d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <span className="font-semibold">
                                        Email:
                                    </span>
                                    <br />
                                    hima.ilkom@arcadia.ac.id
                                </div>
                            </div>
                            {/* Telepon */}
                            <div className="flex items-start gap-3">
                                <span className="inline-flex items-center justify-center bg-primary text-white rounded-full w-10 h-10">
                                    {/* Phone Icon */}
                                    <svg
                                        class="w-6 h-6 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <span className="font-semibold">
                                        Telepon:
                                    </span>
                                    <br />
                                    0812-3456-7890
                                </div>
                            </div>
                            {/* Kontak Ketua Himpunan */}
                            <div className="flex items-start gap-3">
                                <span className="inline-flex items-center justify-center bg-primary text-white rounded-full w-10 h-10">
                                    {/* User Icon */}
                                    <svg
                                        class="w-6 h-6 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-width="2"
                                            d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <span className="font-semibold">
                                        Ketua Himpunan:
                                    </span>
                                    <br />
                                    Andi Pratama
                                    <br />
                                    0813-1234-5678
                                </div>
                            </div>
                            {/* Kontak Kerjasama */}
                            <div className="flex items-start gap-3">
                                <span className="inline-flex items-center justify-center bg-primary text-white rounded-full w-10 h-10">
                                    {/* Handshake Icon */}
                                    <svg
                                        class="w-6 h-6 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M3 19V6a1 1 0 0 1 1-1h4.032a1 1 0 0 1 .768.36l1.9 2.28a1 1 0 0 0 .768.36H16a1 1 0 0 1 1 1v1M3 19l3-8h15l-3 8H3Z"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <span className="font-semibold">
                                        Kontak Kerjasama:
                                    </span>
                                    <br />
                                    Budi Santoso
                                    <br />
                                    0822-9876-5432
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Google Maps Section */}
            <section className="py-0 bg-gray-50">
                <div className="max-w-screen-xl mx-auto px-4 pb-16">
                    <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                        Lokasi Kami
                    </h2>
                    <div className="rounded-lg overflow-hidden shadow-md">
                        <iframe
                            title="Lokasi HIMA ILKOM Arcadia"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d344.94586278628657!2d110.39396708393603!3d-7.0513197233489775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708bdbb1512c33%3A0x2c62649d51c1add5!2sPKM%20FMIPA!5e1!3m2!1sid!2sid!4v1750829550377!5m2!1sid!2sid"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
