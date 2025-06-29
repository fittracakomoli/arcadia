import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // State untuk dropdown
    const { url, props } = usePage(); // Dapatkan URL dan props
    const { settings } = props; // <-- 1. Ambil settings dari props

    // Daftar link navigasi untuk memudahkan pengelolaan
    const navLinks = [
        { href: route("home"), label: "Beranda" },
        {
            label: "Tentang",
            dropdown: [
                { href: route("about"), label: "Tentang Hima Ilkom" },
                {
                    href: route("structure.index"),
                    label: "Struktur Organisasi",
                },
                {
                    href: route("underbow"),
                    label: "Kenali Underbow",
                },
            ],
        },
        { href: route("activity.index"), label: "Aktivitas" },
        { href: route("news.index"), label: "Berita" },
        { href: route("contact"), label: "Kontak" },
    ];

    return (
        // Navbar dengan efek blur modern dan border bawah yang rapi
        <nav className="bg-white backdrop-blur-md w-full fixed top-0 start-0 z-50 p-4 md:py-0 shadow-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                <Link
                    href={route("home")}
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    {settings.logo_horizontal_path ? (
                        <img
                            src={`/storage/${settings.logo_horizontal_path}`}
                            className="h-12"
                            alt={`${
                                settings.organization_name || "Arcadia"
                            } Logo`}
                        />
                    ) : (
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary">
                            {settings.organization_name || "Nama Organisasi"}
                        </span>
                    )}
                </Link>

                {/* Daftar Link Navigasi */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="navbar-default"
                    aria-expanded={isMenuOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div
                    className={`
                        fixed top-0 right-0 h-screen w-1/2 bg-white p-5 transition-transform duration-300 ease-in-out z-50
                        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
                        md:relative md:translate-x-0 md:h-auto md:w-auto md:bg-transparent md:shadow-none md:p-0 md:block
                    `}
                    id="navbar-slide"
                >
                    <div className="flex justify-end mb-4 md:hidden">
                        <button onClick={() => setIsMenuOpen(false)}>
                            <svg
                                className="w-6 h-6 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
                        {navLinks.map((link) => {
                            let isActive;
                            if (link.dropdown) {
                                // LOGIKA YANG DIPERBAIKI:
                                // Cek apakah path URL saat ini diawali dengan salah satu path dari item dropdown.
                                isActive = link.dropdown.some((item) => {
                                    const itemPath = new URL(item.href)
                                        .pathname;
                                    // Item dropdown tidak mungkin '/', jadi pengecekan startWith sudah aman.
                                    return url.startsWith(itemPath);
                                });
                            } else {
                                // Logika untuk link biasa (sudah benar)
                                const linkPath = new URL(link.href).pathname;
                                isActive =
                                    linkPath === "/"
                                        ? url === linkPath
                                        : url.startsWith(linkPath);
                            }

                            if (link.dropdown) {
                                return (
                                    <li
                                        key={link.label}
                                        className="py-2 md:py-0 relative"
                                        onMouseEnter={() =>
                                            window.innerWidth >= 768 &&
                                            setOpenDropdown(link.label)
                                        }
                                        onMouseLeave={() =>
                                            window.innerWidth >= 768 &&
                                            setOpenDropdown(null)
                                        }
                                    >
                                        <button
                                            onClick={() =>
                                                setOpenDropdown(
                                                    openDropdown === link.label
                                                        ? null
                                                        : link.label
                                                )
                                            }
                                            className={`flex py-2 px-3 md:h-16 md:mt-10 md:px-3 rounded md:p-0 transition-colors duration-200 ${
                                                isActive
                                                    ? "text-primary relative after:content-[''] after:absolute after:w-full after:h-1 after:bottom-0 after:left-0 after:bg-secondary after:origin-left after:scale-x-100"
                                                    : "text-primary relative after:content-[''] after:absolute after:w-full after:h-1 after:bottom-0 after:left-0 after:bg-secondary after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                                            }`}
                                        >
                                            {link.label}
                                            <svg
                                                className={`w-2.5 h-2.5 m-1.5 transition-transform ${
                                                    openDropdown === link.label
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="m1 1 4 4 4-4"
                                                />
                                            </svg>
                                        </button>
                                        {openDropdown === link.label && (
                                            <ul className="ps-1 md:ps-0 md:absolute md:top-full md:bg-white md:shadow-lg md:rounded-md md:border md:w-60">
                                                {link.dropdown.map((item) => (
                                                    <li key={item.label}>
                                                        <Link
                                                            href={item.href}
                                                            onClick={() =>
                                                                setIsMenuOpen(
                                                                    false
                                                                )
                                                            }
                                                            className="block px-8 py-4 text-sm text-third hover:text-secondary"
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                );
                            }

                            return (
                                <li key={link.label} className="py-2 md:py-0">
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block py-2 px-3 md:h-16 md:mt-10 md:px-3 rounded md:p-0 transition-colors duration-200 ${
                                            isActive
                                                ? "text-primary relative after:content-[''] after:absolute after:w-full after:h-1 after:bottom-0 after:left-0 after:bg-secondary after:origin-left after:scale-x-100"
                                                : "text-primary relative after:content-[''] after:absolute after:w-full after:h-1 after:bottom-0 after:left-0 after:bg-secondary after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                                        }`}
                                        aria-current={
                                            isActive ? "page" : undefined
                                        }
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
