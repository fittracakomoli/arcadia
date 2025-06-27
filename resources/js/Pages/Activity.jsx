import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

// Fungsi untuk memformat tanggal
const formatDateRange = (start, end) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const startDate = new Date(start).toLocaleDateString("id-ID", options);

    if (
        end &&
        new Date(end).toDateString() !== new Date(start).toDateString()
    ) {
        const endDate = new Date(end).toLocaleDateString("id-ID", options);
        return `${startDate} - ${endDate}`;
    }
    return startDate;
};

export default function Activity({
    featuredActivity,
    allActivities,
    agendas = [],
}) {
    return (
        <MainLayout>
            <Head title="Aktivitas - HIMA ILKOM Arcadia 2025" />

            {featuredActivity && (
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
                        <div
                            className="relative rounded-lg shadow-xl overflow-hidden bg-cover bg-center text-white p-8 md:p-12 flex flex-col justify-center"
                            style={{
                                backgroundImage: `url(${
                                    featuredActivity.image_path
                                        ? `/storage/${featuredActivity.image_path}`
                                        : "/assets/IMG_5460.jpg"
                                })`,
                                minHeight: "400px",
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                            <div className="relative z-10">
                                <span className="text-sm font-semibold px-3 py-1 rounded-full bg-secondary self-start">
                                    Program Kerja Unggulan
                                </span>
                                <h3 className="text-4xl md:text-5xl font-bold mt-4 mb-2">
                                    {featuredActivity.name}
                                </h3>
                                <p className="text-lg font-semibold text-gray-200 mb-4">
                                    {formatDateRange(
                                        featuredActivity.start_date,
                                        featuredActivity.end_date
                                    )}
                                </p>
                                <p className="text-gray-300 leading-relaxed max-w-3xl mb-6">
                                    {featuredActivity.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Bagian Linimasa Program Kerja */}
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
                    {allActivities && allActivities.length > 0 ? (
                        <div className="relative">
                            <div
                                className="absolute left-4 top-0 h-full w-0.5 bg-gray-300"
                                aria-hidden="true"
                            ></div>
                            <div className="space-y-8">
                                {allActivities.map((activity) => {
                                    const isCompleted =
                                        new Date(activity.start_date) <
                                        new Date();
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
                                        <div
                                            key={activity.id}
                                            className="relative pl-12"
                                        >
                                            <div
                                                className={`absolute left-4 top-5 w-4 h-4 rounded-full transform -translate-x-1/2 border-4 border-gray-50 ${dotColor}`}
                                            ></div>
                                            <div className="bg-white p-4 rounded-lg shadow-md flex items-start space-x-4">
                                                <img
                                                    src={
                                                        activity.image_path
                                                            ? `/storage/${activity.image_path}`
                                                            : "/assets/IMG_5460.jpg"
                                                    }
                                                    alt={`Visual untuk ${activity.name}`}
                                                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md flex-shrink-0"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="text-xs md:text-sm font-semibold text-gray-500">
                                                                {formatDateRange(
                                                                    activity.start_date,
                                                                    activity.end_date
                                                                )}
                                                            </p>
                                                            <h3 className="text-lg md:text-xl font-bold text-primary mt-1">
                                                                {activity.name}
                                                            </h3>
                                                        </div>
                                                        <span
                                                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor} flex-shrink-0 ml-2`}
                                                        >
                                                            {statusText}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-700 mt-2 text-sm md:text-base">
                                                        {activity.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">
                            Belum ada program kerja yang ditambahkan.
                        </p>
                    )}
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
                    {agendas && agendas.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-8">
                            {agendas.map((agenda) => (
                                <div
                                    key={agenda.id}
                                    className="bg-gray-50 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 flex flex-col w-full sm:w-96"
                                >
                                    <img
                                        src={
                                            agenda.image_path
                                                ? `/storage/${agenda.image_path}`
                                                : "https://via.placeholder.com/400x200.png?text=Arcadia"
                                        }
                                        alt={agenda.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6 flex-grow">
                                        <h3 className="text-xl font-bold text-primary">
                                            {agenda.name}
                                        </h3>
                                        <p className="text-gray-600 mt-2">
                                            {agenda.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">
                            Belum ada agenda rutin yang ditambahkan.
                        </p>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
