import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

// --- DATA PROGRAM KERJA TERDEKAT ---
// Ganti data di bawah ini dengan detail acara unggulan Anda.
const featuredEvent = {
    date: "2025-09-06",
    title: "Interface 2025",
    category: "Program Kerja Unggulan",
    description:
        "Interface ILKOM 2025 merupakan wadah bagi mahasiswa baru untuk mengenal lingkungan kampus khususnya di Jurusan Ilmu Komputer.",
    image: "assets/IMG_5460.jpg",
};

// --- DATA SELURUH PROGRAM KERJA ---
// Isi dengan semua program kerja selama satu periode.
const allEventsData = [
    {
        date: "2025-03-10",
        title: "Rapat Kerja Awal Periode",
        description:
            "Penetapan dan sinkronisasi seluruh program kerja Kabinet Arcadia untuk satu periode ke depan.",
        image: "assets/IMG_5460.jpg",
    },
    {
        date: "2025-04-22",
        title: "Upgrading Pengurus",
        description:
            "Kegiatan untuk meningkatkan soft skills dan kekompakan seluruh pengurus HIMA ILKOM.",
        image: "assets/IMG_5460.jpg",
    },
    {
        date: "2025-07-15",
        title: "Seminar Nasional: AI & Masa Depan",
        description:
            "Seminar akbar yang membahas tren terkini dalam Kecerdasan Buatan dengan pembicara ahli.",
        image: "assets/IMG_5460.jpg",
    },
    {
        date: "2025-08-01",
        title: "Arcadia Coding Competition 2025",
        description:
            "Kompetisi pemrograman tahunan untuk mengasah kemampuan problem-solving dan algoritma mahasiswa.",
        image: "assets/IMG_5460.jpg",
    },
    {
        date: "2025-08-17",
        title: "Pengabdian Masyarakat: Digitalisasi Desa",
        description:
            "Kegiatan sosial untuk membantu masyarakat desa dalam memanfaatkan teknologi digital.",
        image: "assets/IMG_5460.jpg",
    },
    {
        date: "2025-09-06",
        title: "Interface 2025",
        description:
            "Penyambutan dan pengenalan lingkungan kampus untuk mahasiswa baru Ilmu Komputer.",
        image: "assets/IMG_5460.jpg",
    },
    {
        date: "2025-11-20",
        title: "Studi Banding Antar Universitas",
        description:
            "Kunjungan ke himpunan mahasiswa lain untuk bertukar pikiran, pengalaman, dan menjalin relasi.",
        image: "assets/IMG_5460.jpg",
    },
];

const agendaData = [
    {
        title: "Rapat Internal Mingguan",
        description:
            "Koordinasi rutin setiap hari Senin untuk sinkronisasi progres dan rencana antar divisi.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
            </svg>
        ),
    },
    {
        title: "Kajian Keilmuan",
        description:
            "Diskusi dan bedah topik teknologi terkini yang diadakan setiap dua minggu sekali.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
            </svg>
        ),
    },
    {
        title: "Kelas Minat Bakat",
        description:
            "Sesi latihan rutin untuk cabang olahraga, seni, dan e-sports setiap akhir pekan.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                />
            </svg>
        ),
    },
    {
        title: "Kelas Minat Bakat",
        description:
            "Sesi latihan rutin untuk cabang olahraga, seni, dan e-sports setiap akhir pekan.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                />
            </svg>
        ),
    },
];

// Fungsi untuk memformat tanggal
const formatDate = (dateString) => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
};

export default function Activity() {
    return (
        <MainLayout>
            <Head title="Aktivitas - HIMA ILKOM Arcadia 2025" />

            <section className="pt-36 pb-16 bg-white">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-primary">
                            Program Kerja Terdekat
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Jangan lewatkan acara unggulan kami berikutnya!
                        </p>
                    </div>

                    {/* Banner Container */}
                    <div
                        className="relative rounded-lg shadow-xl overflow-hidden bg-cover bg-center text-white p-8 md:p-12 flex flex-col justify-center"
                        style={{
                            backgroundImage: `url(${featuredEvent.image})`,
                            minHeight: "400px",
                        }}
                    >
                        {/* Gradient Overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

                        {/* Banner Content */}
                        <div className="relative z-10">
                            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-secondary self-start">
                                {featuredEvent.category}
                            </span>
                            <h3 className="text-4xl md:text-5xl font-bold mt-4 mb-2">
                                {featuredEvent.title}
                            </h3>
                            <p className="text-lg font-semibold text-gray-200 mb-4">
                                {formatDate(featuredEvent.date)}
                            </p>
                            <p className="text-gray-300 leading-relaxed max-w-3xl mb-6">
                                {featuredEvent.description}
                            </p>
                            <button className="mt-2 bg-secondary hover:bg-yellow-500 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md">
                                Lihat Info Selengkapnya
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-gray-50">
                <div className="max-w-screen-lg mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary">
                            Linimasa Program Kerja
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Jejak langkah Kabinet Arcadia selama satu periode.
                        </p>
                    </div>
                    <div className="relative">
                        {/* Vertical line */}
                        <div
                            className="absolute left-4 top-0 h-full w-0.5 bg-gray-300"
                            aria-hidden="true"
                        ></div>

                        <div className="space-y-8">
                            {allEventsData.map((event, index) => {
                                const isCompleted =
                                    new Date(event.date) < new Date();
                                const statusText = isCompleted
                                    ? "Terlaksana"
                                    : "Akan Datang";
                                const statusColor = isCompleted
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800";
                                const dotColor = isCompleted
                                    ? "bg-green-500"
                                    : "bg-secondary";

                                return (
                                    <div key={index} className="relative pl-12">
                                        {/* Dot on the timeline */}
                                        <div
                                            className={`absolute left-4 top-5 w-4 h-4 rounded-full transform -translate-x-1/2 border-4 border-gray-50 ${dotColor}`}
                                        ></div>

                                        {/* Card content */}
                                        <div className="bg-white p-4 rounded-lg shadow-md flex items-start space-x-4">
                                            <img
                                                src={event.image}
                                                alt={`Visual untuk ${event.title}`}
                                                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md flex-shrink-0"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-xs md:text-sm font-semibold text-gray-500">
                                                            {formatDate(
                                                                event.date
                                                            )}
                                                        </p>
                                                        <h3 className="text-lg md:text-xl font-bold text-primary mt-1">
                                                            {event.title}
                                                        </h3>
                                                    </div>
                                                    <span
                                                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor} flex-shrink-0 ml-2`}
                                                    >
                                                        {statusText}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700 mt-2 text-sm md:text-base">
                                                    {event.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-white">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary">
                            Agenda Rutin
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Kegiatan reguler untuk pengembangan dan kebersamaan
                            anggota.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        {agendaData.map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 p-6 rounded-lg shadow-md flex items-start space-x-4 transition-transform duration-300 hover:-translate-y-2 w-full md:w-[45%] lg:w-[30%]"
                            >
                                <div className="flex-shrink-0 bg-secondary text-white p-4 rounded-full">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-primary">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mt-1">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
