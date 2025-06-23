import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

// --- DATA PENGURUS KABINET ARCADIA ---
// Ganti data di bawah ini dengan nama, jabatan, dan path foto yang sesuai.

// 1. KETUA & WAKIL KETUA
const leadershipData = [
    {
        name: "Ketua Himpunan",
        position: "Ketua Umum",
        image: "https://source.unsplash.com/random/400x400?leader,portrait,male",
    },
    {
        name: "Wakil Ketua Himpunan",
        position: "Wakil Ketua Umum",
        image: "https://source.unsplash.com/random/400x400?leader,portrait,female",
    },
];

// 2. PENGURUS HARIAN
const sekretarisData = [
    {
        name: "Sekretaris Umum",
        position: "Sekretaris Umum",
        image: "https://source.unsplash.com/random/400x400?secretary,portrait,female",
    },
    {
        name: "Sekretaris 1",
        position: "Sekretaris 1",
        image: "https://source.unsplash.com/random/400x400?professional,portrait,female",
    },
    {
        name: "Sekretaris 2",
        position: "Sekretaris 2",
        image: "https://source.unsplash.com/random/400x400?student,portrait,male",
    },
];

const bendaharaData = [
    {
        name: "Bendahara Umum",
        position: "Bendahara Umum",
        image: "https://source.unsplash.com/random/400x400?finance,portrait,female",
    },
    {
        name: "Bendahara 1",
        position: "Bendahara 1",
        image: "https://source.unsplash.com/random/400x400?person,portrait,female",
    },
    {
        name: "Bendahara 2",
        position: "Bendahara 2",
        image: "https://source.unsplash.com/random/400x400?person,portrait,male",
    },
];

const psdoData = [
    {
        name: "Kepala Biro",
        position: "Kepala Biro",
        image: "https://source.unsplash.com/random/400x400?manager,portrait,male",
    },
    {
        name: "Sekretaris Biro",
        position: "Kepala Biro",
        image: "https://source.unsplash.com/random/400x400?manager,portrait,male",
    },
    ...Array.from({ length: 4 }, (_, i) => ({
        name: `Anggota PSDO ${i + 1}`,
        position: "Anggota",
        image: `https://source.unsplash.com/random/400x400?student,portrait,${
            i % 2 === 0 ? "male" : "female"
        }`,
    })),
];

// 3. DIVISI-DIVISI
const divisionsData = [
    {
        name: "Divisi Ekonomi Kreatif",
        members: [
            {
                name: "Kepala Divisi",
                position: "Kepala Divisi",
                image: "https://source.unsplash.com/random/400x400?creative,portrait,female",
            },
            {
                name: "Bendahara Divisi",
                position: "Bendahara Divisi",
                image: "https://source.unsplash.com/random/400x400?creative,finance,male",
            },
            {
                name: "Sekretaris Divisi",
                position: "Sekretaris Divisi",
                image: "https://source.unsplash.com/random/400x400?creative,secretary,female",
            },
            ...Array.from({ length: 3 }, (_, i) => ({
                name: `Anggota Ekokre ${i + 1}`,
                position: "Anggota",
                image: `https://source.unsplash.com/random/400x400?creative,person,${
                    i % 2 === 0 ? "female" : "male"
                }`,
            })),
        ],
    },
    {
        name: "Divisi Internal",
        members: [
            {
                name: "Kepala Divisi",
                position: "Kepala Divisi",
                image: "https://source.unsplash.com/random/400x400?community,portrait,male",
            },
            {
                name: "Wakil Kepala Divisi",
                position: "Wakil Kepala Divisi",
                image: "https://source.unsplash.com/random/400x400?community,portrait,female",
            },
            {
                name: "Sekretaris Divisi",
                position: "Sekretaris Divisi",
                image: "https://source.unsplash.com/random/400x400?community,secretary,male",
            },
            ...Array.from({ length: 7 }, (_, i) => ({
                name: `Anggota Internal ${i + 1}`,
                position: "Anggota",
                image: `https://source.unsplash.com/random/400x400?friendly,person,${
                    i % 2 === 0 ? "male" : "female"
                }`,
            })),
        ],
    },
    {
        name: "Divisi Eksternal",
        members: [
            {
                name: "Kepala Divisi",
                position: "Kepala Divisi",
                image: "https://source.unsplash.com/random/400x400?relations,portrait,female",
            },
            {
                name: "Wakil Kepala Divisi",
                position: "Wakil Kepala Divisi",
                image: "https://source.unsplash.com/random/400x400?relations,portrait,male",
            },
            {
                name: "Sekretaris Divisi",
                position: "Sekretaris Divisi",
                image: "https://source.unsplash.com/random/400x400?relations,secretary,female",
            },
            ...Array.from({ length: 6 }, (_, i) => ({
                name: `Anggota Eksternal ${i + 1}`,
                position: "Anggota",
                image: `https://source.unsplash.com/random/400x400?professional,person,${
                    i % 2 === 0 ? "female" : "male"
                }`,
            })),
        ],
    },
    {
        name: "Divisi Sosial Masyarakat",
        members: [
            {
                name: "Kepala Divisi",
                position: "Kepala Divisi",
                image: "https://source.unsplash.com/random/400x400?social,portrait,male",
            },
            {
                name: "Wakil Kepala Divisi",
                position: "Wakil Kepala Divisi",
                image: "https://source.unsplash.com/random/400x400?social,portrait,female",
            },
            {
                name: "Sekretaris Divisi",
                position: "Sekretaris Divisi",
                image: "https://source.unsplash.com/random/400x400?social,secretary,male",
            },
            ...Array.from({ length: 4 }, (_, i) => ({
                name: `Anggota Sosmas ${i + 1}`,
                position: "Anggota",
                image: `https://source.unsplash.com/random/400x400?volunteer,person,${
                    i % 2 === 0 ? "male" : "female"
                }`,
            })),
        ],
    },
    {
        name: "Divisi Komunikasi dan Informasi",
        members: [
            {
                name: "Kepala Divisi",
                position: "Kepala Divisi",
                image: "https://source.unsplash.com/random/400x400?media,portrait,female",
            },
            {
                name: "Wakil Kepala Divisi",
                position: "Wakil Kepala Divisi",
                image: "https://source.unsplash.com/random/400x400?media,portrait,male",
            },
            {
                name: "Sekretaris Divisi",
                position: "Sekretaris Divisi",
                image: "https://source.unsplash.com/random/400x400?media,secretary,female",
            },
            ...Array.from({ length: 7 }, (_, i) => ({
                name: `Anggota Kominfo ${i + 1}`,
                position: "Anggota",
                image: `https://source.unsplash.com/random/400x400?tech,person,${
                    i % 2 === 0 ? "female" : "male"
                }`,
            })),
        ],
    },
];

// Komponen Kartu Anggota (Reusable)
const MemberCard = ({ image, name, position }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform duration-300 hover:-translate-y-2 flex flex-col items-center">
        <img
            src={image}
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
            {members.map((member, index) => (
                <div key={index} className="w-72">
                    <MemberCard {...member} />
                </div>
            ))}
        </div>
    </div>
);

export default function Structure() {
    return (
        <MainLayout>
            <Head title="Struktur Organisasi - HIMA ILKOM Arcadia 2025" />

            {/* Header Section */}
            <section className="pt-44 pb-16 bg-primary text-white text-center">
                <div className="max-w-screen-xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold">
                        Struktur Organisasi
                    </h1>
                    <p className="text-lg md:text-xl mt-4">
                        Kabinet Arcadia 2025
                    </p>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="flex justify-center gap-8 flex-wrap">
                        {leadershipData.map((member, index) => (
                            <div
                                key={index}
                                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                            >
                                <MemberCard {...member} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pengurus Harian Section */}
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
                        <DepartmentSection
                            title="Sekretaris"
                            members={sekretarisData}
                        />
                        <DepartmentSection
                            title="Bendahara"
                            members={bendaharaData}
                        />
                        <DepartmentSection
                            title="Biro Pengembangan Sumber Daya Organisasi"
                            members={psdoData}
                        />
                    </div>
                </div>
            </section>

            {/* Divisi Section */}
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
                        {divisionsData.map((dept, index) => (
                            <DepartmentSection
                                key={index}
                                title={dept.name}
                                members={dept.members}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
