import { Link, usePage } from "@inertiajs/react";

// --- Komponen Ikon (SVG) ---
const HomeIcon = () => (
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
            d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
        />
    </svg>
);
const AdminIcon = () => (
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
            stroke-linecap="square"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
    </svg>
);
const OrganizationIcon = () => (
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
            d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"
        />
    </svg>
);
const NewspaperIcon = () => (
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
            d="M19 7h1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h11.5M7 14h6m-6 3h6m0-10h.5m-.5 3h.5M7 7h3v3H7V7Z"
        />
    </svg>
);
const MembersIcon = () => (
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
            d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
        />
    </svg>
);
const CalendarIcon = () => (
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
            d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
        />
    </svg>
);
const ImageIcon = () => (
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
            d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
        />
    </svg>
);
const MessageIcon = () => (
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
            d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-8.029-4.46a2 2 0 0 0-1.942 0L3 8m18 0-9 6.5L3 8"
        />
    </svg>
);
const CogIcon = () => (
    <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
);
const LogoutIcon = () => (
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
            d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
        />
    </svg>
);

export default function Sidebar({ isOpen, setIsOpen }) {
    const { url } = usePage();
    const navLinks = [
        {
            href: route("admin.dashboard"),
            routeName: "admin.dashboard",
            label: "Dashboard",
            icon: <HomeIcon />,
        },
        {
            href: route("admin.users.index"),
            routeName: "admin.users.*",
            label: "Manajemen Admin",
            icon: <AdminIcon />,
        },
        {
            href: route("admin.organization.index"),
            routeName: "admin.organization.*",
            label: "Manajemen Organisasi",
            icon: <OrganizationIcon />,
        },
        {
            href: route("admin.underbow.index"),
            routeName: "admin.underbow.*",
            label: "Manajemen Underbow",
            icon: <OrganizationIcon />,
        },
        {
            href: route("admin.news.index"),
            routeName: "admin.news.*",
            label: "Manajemen Berita",
            icon: <NewspaperIcon />,
        },
        {
            href: route("admin.members.index"),
            routeName: "admin.members.*",
            label: "Manajemen Anggota",
            icon: <MembersIcon />,
        },
        {
            href: route("admin.activities.index"),
            routeName: "admin.activities.*",
            label: "Manajemen Kegiatan",
            icon: <CalendarIcon />,
        },
        {
            href: route("admin.agendas.index"),
            routeName: "admin.agendas.*",
            label: "Manajemen Agenda",
            icon: <CalendarIcon />,
        },
        {
            href: route("admin.gallery.index"),
            routeName: "admin.gallery.*",
            label: "Manajemen Galeri",
            icon: <ImageIcon />,
        },
        {
            href: route("admin.messages.index"),
            routeName: "admin.messages.*",
            label: "Manajemen Pesan",
            icon: <MessageIcon />,
        },
    ];

    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden ${
                    isOpen ? "block" : "hidden"
                }`}
                onClick={() => setIsOpen(false)}
            ></div>
            <aside
                className={`fixed top-0 left-0 h-full w-72 bg-primary text-white flex flex-col z-40 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="p-4 flex items-center justify-center border-b border-white">
                    <Link href="/">
                        <img
                            src="/assets/logo-horizontal-white.png"
                            alt="Arcadia Logo"
                            className="h-10"
                        />
                    </Link>
                </div>
                <nav className="flex-grow mt-4 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors ${
                                route().current(link.routeName)
                                    ? "bg-secondary font-semibold"
                                    : "hover:bg-secondary"
                            }`}
                        >
                            {link.icon}
                            <span>{link.label}</span>
                        </Link>
                    ))}
                    <div className="mt-2 border-t border-white pt-2">
                        <Link
                            key={route("profile.edit")}
                            href={route("profile.edit")}
                            className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors ${
                                route().current("profile.*")
                                    ? "bg-secondary font-semibold"
                                    : "hover:bg-secondary"
                            }`}
                        >
                            <CogIcon />
                            <span>Pengaturan Akun</span>
                        </Link>
                        <Link
                            href={route("logout")}
                            method="post"
                            className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors hover:bg-secondary"
                        >
                            <LogoutIcon />
                            <span>Logout</span>
                        </Link>
                    </div>
                </nav>
            </aside>
        </>
    );
}
