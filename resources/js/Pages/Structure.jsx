import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

// Komponen Kartu Anggota (Reusable)
const MemberCard = ({ image, name, position }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform duration-300 hover:-translate-y-2 flex flex-col items-center h-full">
        <img
            src={
                image ||
                `https://ui-avatars.com/api/?name=${name.replace(
                    /\s/g,
                    "+"
                )}&background=random&size=128`
            }
            alt={`Foto ${name}`}
            className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-gray-200"
        />
        <h3 className="text-xl font-bold text-primary flex-grow">{name}</h3>
        <p className="text-gray-500">{position}</p>
    </div>
);

// Komponen Section (Reusable)
const DepartmentSection = ({ title, members }) => (
    <div className="text-center">
        <h3 className="text-2xl font-bold text-secondary mb-8 pb-2 border-b-2 border-secondary inline-block">
            {title}
        </h3>
        <div className="flex flex-wrap gap-8 justify-center">
            {members.map((member) => (
                <div key={member.id} className="w-full sm:w-64">
                    <MemberCard
                        name={member.name}
                        position={member.position}
                        image={
                            member.photo_path
                                ? `/storage/${member.photo_path}`
                                : null
                        }
                    />
                </div>
            ))}
        </div>
    </div>
);

export default function Structure({
    pengurusHarian = {},
    divisi = {},
    settings,
}) {
    // Tentukan urutan untuk SEMUA grup Pengurus Harian
    const dailyBoardOrder = ["BPH", "Sekretaris", "Bendahara", "PSDO"];
    const dailyBoardGroups = dailyBoardOrder
        .map((key) => ({ key, members: pengurusHarian[key] }))
        .filter((group) => group.members && group.members.length > 0);

    // Tentukan urutan untuk Divisi
    const divisionOrder = [
        "Ekonomi Kreatif",
        "Internal",
        "Eksternal",
        "Sosial Masyarakat",
        "Komunikasi Informasi",
    ];
    const divisionGroups = divisionOrder
        .map((key) => ({ key, members: divisi[key] }))
        .filter((group) => group.members && group.members.length > 0);

    // Fungsi untuk memberikan nama judul yang lebih deskriptif
    const getTitle = (key) => {
        const titles = {
            BPH: "Pimpinan",
            PSDO: "Biro Pengembangan Sumber Daya Organisasi",
            "Ekonomi Kreatif": "Divisi Ekonomi Kreatif",
            Internal: "Divisi Internal",
            Eksternal: "Divisi Eksternal",
            "Sosial Masyarakat": "Divisi Sosial Masyarakat",
            "Komunikasi Informasi": "Divisi Komunikasi dan Informasi",
        };
        return titles[key] || key;
    };

    return (
        <MainLayout>
            <Head title="Struktur Organisasi" />

            {/* Header Section */}
            <section className="pt-44 pb-16 bg-primary text-white text-center">
                <div className="max-w-screen-xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold">
                        Struktur Organisasi
                    </h1>
                    <p className="text-lg md:text-xl mt-4">
                        Kabinet {settings.cabinet_name} {settings.period}
                    </p>
                </div>
            </section>

            {/* Pengurus Harian Section (Gabungan) */}
            {dailyBoardGroups.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="max-w-screen-xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-primary">
                                Pengurus Harian
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Motor Penggerak Internal Kabinet
                            </p>
                        </div>
                        <div className="space-y-16">
                            {dailyBoardGroups.map((group) => (
                                <DepartmentSection
                                    key={group.key}
                                    title={getTitle(group.key)}
                                    members={group.members}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Divisi Section */}
            {divisionGroups.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-screen-xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-primary">
                                Divisi-Divisi
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Eksekutor Program Kerja Unggulan
                            </p>
                        </div>
                        <div className="space-y-16">
                            {divisionGroups.map((group) => (
                                <DepartmentSection
                                    key={group.key}
                                    title={getTitle(group.key)}
                                    members={group.members}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}
