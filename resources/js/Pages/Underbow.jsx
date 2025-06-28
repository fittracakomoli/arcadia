import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

const InstagramIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
    </svg>
);

export default function Underbow({ settings, underbows }) {
    return (
        <MainLayout>
            <Head title={`Kenali Underbow - ${settings.organization_name}`} />
            <section className="pt-36 pb-12 bg-primary text-white text-center">
                <div className="max-w-screen-md mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                        Kenali Underbow {settings.organization_name}
                    </h1>
                    <p className="text-lg md:text-xl">
                        Underbow adalah unit atau komunitas di bawah naungan{" "}
                        {settings.organization_name} yang mewadahi minat, bakat,
                        dan pengembangan diri mahasiswa.
                    </p>
                </div>
            </section>
            <section className="py-16 bg-white">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-10">
                        {underbows.map((underbow) => (
                            <div
                                key={underbow.id}
                                className="bg-gray-50 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition w-full md:w-[45%] lg:w-[30%]"
                            >
                                <img
                                    src={
                                        underbow.logo_path
                                            ? `/storage/${underbow.logo_path}`
                                            : "https://via.placeholder.com/150"
                                    }
                                    alt={`Logo ${underbow.name}`}
                                    className="w-24 h-24 object-contain mb-4 rounded-full bg-white"
                                />
                                <h3 className="text-xl font-bold text-primary mb-2">
                                    {underbow.name}
                                </h3>
                                <p className="text-gray-700 text-sm mb-4 flex-grow">
                                    {underbow.description}
                                </p>
                                {underbow.social_media &&
                                    underbow.social_media.length > 0 && (
                                        <div className="mt-auto pt-4">
                                            {underbow.social_media.map(
                                                (social, index) => (
                                                    <a
                                                        key={index}
                                                        href={social.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold hover:from-pink-600 hover:to-yellow-600 transition"
                                                    >
                                                        <InstagramIcon />
                                                        {social.platform}
                                                    </a>
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>
                    {underbows.length === 0 && (
                        <div className="text-center py-16">
                            <h3 className="text-xl font-semibold text-gray-700">
                                Data Underbow Belum Tersedia
                            </h3>
                            <p className="text-gray-500 mt-2">
                                Silakan tambahkan data underbow melalui panel
                                admin.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
