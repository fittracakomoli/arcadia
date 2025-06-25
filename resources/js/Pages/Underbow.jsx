import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

// Contoh data underbow, silakan sesuaikan nama, deskripsi, dan logo sesuai kebutuhan
const underbows = [
    {
        name: "Al - Husna",
        description:
            "Wadah pengembangan minat dan bakat mahasiswa di bidang olahraga futsal. Rutin mengadakan latihan, sparing, dan mengikuti turnamen antar kampus.",
        logo: "/assets/AL-HUSNA.png",
        instagram: "https://instagram.com/alhusna_ilkom",
    },
    {
        name: "BSO Kewirausahaan",
        description:
            "Wadah pengembangan minat dan bakat mahasiswa di bidang olahraga futsal. Rutin mengadakan latihan, sparing, dan mengikuti turnamen antar kampus.",
        logo: "/assets/BSO-KWU.png",
        instagram: "https://instagram.com/bsokwuilkom",
    },
    {
        name: "I - Secret",
        description:
            "Wadah pengembangan minat dan bakat mahasiswa di bidang olahraga futsal. Rutin mengadakan latihan, sparing, dan mengikuti turnamen antar kampus.",
        logo: "/assets/I-SECRET.png",
        instagram: "https://instagram.com/isecret_ilkom",
    },
    {
        name: "PALATIKOM",
        description:
            "Wadah pengembangan minat dan bakat mahasiswa di bidang olahraga futsal. Rutin mengadakan latihan, sparing, dan mengikuti turnamen antar kampus.",
        logo: "/assets/PALATIKOM.png",
        instagram: "https://instagram.com/palatikom_ilkom",
    },
    {
        name: "SCREENSHOT",
        description:
            "Wadah pengembangan minat dan bakat mahasiswa di bidang olahraga futsal. Rutin mengadakan latihan, sparing, dan mengikuti turnamen antar kampus.",
        logo: "/assets/SCREENSHOT.png",
        instagram: "https://instagram.com/screenshot_ilkom",
    },
];

export default function Underbow() {
    return (
        <MainLayout>
            <Head title="Kenali Underbow - HIMA ILKOM Arcadia 2025" />
            <section className="pt-36 pb-12 bg-primary text-white text-center">
                <div className="max-w-screen-md mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Kenali Underbow HIMA ILKOM
                    </h1>
                    <p className="text-lg md:text-xl">
                        Underbow adalah unit atau komunitas di bawah naungan
                        HIMA ILKOM yang mewadahi minat, bakat, dan pengembangan
                        diri mahasiswa.
                    </p>
                </div>
            </section>
            <section className="py-16 bg-white">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-10">
                        {underbows.map((u, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-50 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition w-full md:w-[45%] lg:w-[30%]"
                            >
                                <img
                                    src={u.logo}
                                    alt={`Logo ${u.name}`}
                                    className="w-24 h-24 object-contain mb-4"
                                />
                                <h3 className="text-xl font-bold text-primary mb-2">
                                    {u.name}
                                </h3>
                                <p className="text-gray-700 text-sm mb-4">
                                    {u.description}
                                </p>
                                <a
                                    href={u.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold hover:from-pink-600 hover:to-yellow-600 transition"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>
                                    Instagram
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
