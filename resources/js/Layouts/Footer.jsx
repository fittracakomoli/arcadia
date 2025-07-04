import { Link, usePage } from "@inertiajs/react";

export default function Footer() {
    const { props } = usePage(); // Dapatkan URL dan props
    const { settings } = props; // <-- 1. Ambil settings dari props

    return (
        <footer className="bg-primary text-white">
            <div className="max-w-screen-xl px-4 pt-16 pb-6 mx-auto sm:px-6 lg:px-8 lg:pt-24">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        {/* Ganti dengan logo versi terang jika ada */}
                        {settings.logo_horizontal_path ? (
                            <img
                                src={`/storage/${settings.logo_horizontal_path}`}
                                className="h-10 brightness-0 invert"
                                alt={`${
                                    settings.organization_name || "Arcadia"
                                } Logo White`}
                            />
                        ) : (
                            <h2 className="text-2xl font-bold text-white">
                                {settings.organization_name ||
                                    "Nama Organisasi"}
                            </h2>
                        )}
                        <p className="mt-6 max-w-xs text-gray-300">
                            Himpunan Mahasiswa Ilmu Komputer, Fakultas
                            Matematika dan Ilmu Pengetahuan Alam, Universitas
                            Negeri Semarang.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
                        <div className="text-left">
                            <p className="font-medium">Tentang Kami</p>
                            <ul className="mt-8 space-y-4 text-sm">
                                <li>
                                    <Link
                                        href={route("about")}
                                        className="text-gray-300 transition hover:text-white"
                                    >
                                        Tentang Hima Ilkom
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("structure.index")}
                                        className="text-gray-300 transition hover:text-white"
                                    >
                                        Struktur Organisasi
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("underbow")}
                                        className="text-gray-300 transition hover:text-white"
                                    >
                                        Kenali Underbow
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="text-left">
                            <p className="font-medium">Jelajahi</p>
                            <ul className="mt-8 space-y-4 text-sm">
                                <li>
                                    <Link
                                        href={route("activity.index")}
                                        className="text-gray-300 transition hover:text-white"
                                    >
                                        Aktivitas
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("news.index")}
                                        className="text-gray-300 transition hover:text-white"
                                    >
                                        Berita
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="text-left">
                            <p className="font-medium">Kontak</p>
                            <ul className="mt-8 space-y-4 text-sm">
                                <li>
                                    {settings.email ? (
                                        <a
                                            href={`mailto:${settings.email}`}
                                            className="text-gray-300 transition hover:text-white"
                                        >
                                            {settings.email}
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">
                                            Email belum ditambahkan.
                                        </span>
                                    )}
                                </li>
                                <li>
                                    <span className="text-gray-300">
                                        {settings.address ||
                                            "Alamat belum ditambahkan."}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-6 mt-12 border-t border-white">
                    <div className="text-center">
                        <p className="text-sm text-gray-300">
                            &copy; {settings.period || new Date().getFullYear()}{" "}
                            Divisi Komunikasi dan Informasi. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
