import { Head, useForm } from "@inertiajs/react"; // <-- Ganti import
import MainLayout from "@/Layouts/MainLayout";
import InputError from "@/Components/InputError"; // <-- Tambahkan ini jika belum ada

export default function Contact({ settings, numphone }) {
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
            <Head title="Kontak" />
            <section className="pt-40 pb-8 bg-gray-50 text-center">
                <div className=" mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary">
                        Kontak Kami
                    </h1>
                    <p className="text-base md:text-lg font-light mt-2 text-gray-600">
                        Hubungi kami untuk pertanyaan, saran, atau kerjasama.
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
                                    {(
                                        <a
                                            target="_blank"
                                            className="hover:underline"
                                            href={`mailto:${settings.email}`}
                                        >
                                            {settings.email}
                                        </a>
                                    ) || "Email belum ditambahkan."}
                                </div>
                            </div>
                            {/* Alamat */}
                            <div className="flex items-start gap-3">
                                <span className="inline-flex items-center justify-center bg-primary text-white rounded-full w-10 h-10 p-2">
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
                                    {settings.address ||
                                        "Alamat belum ditambahkan."}
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

                                    {(
                                        <a
                                            target="_blank"
                                            className="hover:underline"
                                            href={`https://wa.me/62${settings.phone}`}
                                        >
                                            {`0${settings.phone}`}
                                        </a>
                                    ) || "Telepon belum ditambahkan."}
                                </div>
                            </div>
                            {/* Kontak Ketua Himpunan */}
                            {settings.contacts &&
                                settings.contacts.length > 0 &&
                                settings.contacts.map((contact, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="inline-flex items-center justify-center bg-primary text-white rounded-full w-10 h-10 flex-shrink-0">
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                        </span>
                                        <div>
                                            <span className="font-semibold">
                                                {contact.title || "Kontak"}:
                                            </span>
                                            <br />
                                            {contact.name ||
                                                "Nama belum diatur"}
                                            <br />
                                            {(
                                                <a
                                                    target="_blank"
                                                    className="hover:underline"
                                                    href={`https://wa.me/62${contact.phone_number}`}
                                                >
                                                    {`0${contact.phone_number}`}
                                                </a>
                                            ) || "Telepon belum ditambahkan."}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* Google Maps Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-screen-xl mx-auto px-4 pb-16">
                    <h2 className="text-2xl font-bold text-primary mb-10 text-center">
                        Sekretariat {settings.organization_name || "Organisasi"}
                    </h2>
                    {settings.google_maps_link ? (
                        <div className="rounded-lg overflow-hidden shadow-md">
                            <iframe
                                title="Lokasi HIMA ILKOM Arcadia"
                                src={settings.google_maps_link}
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-10">
                            Peta lokasi belum ditambahkan.
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
