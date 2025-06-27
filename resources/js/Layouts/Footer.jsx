import { Link } from "@inertiajs/react";

export default function Footer() {
    // Ganti dengan link media sosial Anda
    const socialLinks = [
        {
            href: "/",
            label: "Facebook",
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            href: "/",
            label: "Instagram",
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm6.406-11.845a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            href: "/",
            label: "Twitter",
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="bg-primary text-white">
            <div className="max-w-screen-xl px-4 pt-16 pb-6 mx-auto sm:px-6 lg:px-8 lg:pt-24">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        {/* Ganti dengan logo versi terang jika ada */}
                        <img
                            src="/assets/logo-horizontal.png"
                            className="h-10 brightness-0 invert"
                            alt="Arcadia Logo White"
                        />
                        <p className="mt-6 max-w-xs text-gray-300">
                            Himpunan Mahasiswa Ilmu Komputer, Fakultas
                            Matematika dan Ilmu Pengetahuan Alam, Universitas
                            Negeri Semarang.
                        </p>
                        <ul className="flex gap-6 mt-8">
                            {socialLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        rel="noreferrer"
                                        target="_blank"
                                        className="text-gray-300 transition hover:text-white"
                                    >
                                        <span className="sr-only">
                                            {link.label}
                                        </span>
                                        {link.icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
                        <div className="text-left">
                            <p className="font-medium">Tentang Kami</p>
                            <ul className="mt-8 space-y-4 text-sm">
                                <li>
                                    <Link
                                        href="/"
                                        className="text-gray-300 transition hover:text-white"
                                    >
                                        Tentang Hima Ilkom
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className="text-gray-300 transition hover:text-white"
                                    >
                                        Struktur Organisasi
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="text-left">
                            <p className="font-medium">Jelajahi</p>
                            <ul className="mt-8 space-y-4 text-sm">
                                <li>
                                    <Link
                                        href="/services"
                                        className="text-gray-300 transition hover:text-white"
                                    >
                                        Aktivitas
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className="text-gray-300 transition hover:text-white"
                                    >
                                        Berita
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className="text-gray-300 transition hover:text-white"
                                    >
                                        Komunitas
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="text-left">
                            <p className="font-medium">Kontak</p>
                            <ul className="mt-8 space-y-4 text-sm">
                                <li>
                                    <a
                                        href=""
                                        className="text-gray-300 transition hover:text-white"
                                    >
                                        himailkom@main.unnes.ac.id
                                    </a>
                                </li>
                                <li>
                                    <span className="text-gray-300">
                                        Gedung PKM FMIPA, Kampus Sekaran
                                        Universitas Negeri Semarang
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-6 mt-12 border-t border-white">
                    <div className="text-center">
                        <p className="text-sm text-white">
                            &copy; 2025 Hima Ilkom UNNES. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
