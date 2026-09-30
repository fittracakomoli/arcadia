import { Link } from "@inertiajs/react";

export default function Pagination({ links, className = "" }) {
    // Jangan tampilkan pagination jika hanya ada 1 halaman
    if (links.length <= 3) {
        return null;
    }

    return (
        <nav className={className}>
            <ul className="inline-flex items-center -space-x-px">
                {links.map((link, index) => {
                    // Tentukan style berdasarkan status link (aktif, non-aktif, biasa)
                    const linkClassName = `
                        px-3 py-2 leading-tight border border-gray-300
                        ${
                            link.active
                                ? "bg-primary text-white"
                                : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        }
                        ${!link.url ? "cursor-not-allowed text-gray-400" : ""}
                        ${index === 0 ? "rounded-l-lg" : ""}
                        ${index === links.length - 1 ? "rounded-r-lg" : ""}
                    `;

                    // Render link sebagai tombol non-aktif jika tidak ada URL
                    if (!link.url) {
                        return (
                            <li key={index}>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className={linkClassName}
                                />
                            </li>
                        );
                    }

                    // Render link normal menggunakan Inertia Link
                    return (
                        <li key={index}>
                            <Link
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={linkClassName}
                                preserveScroll
                            />
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
