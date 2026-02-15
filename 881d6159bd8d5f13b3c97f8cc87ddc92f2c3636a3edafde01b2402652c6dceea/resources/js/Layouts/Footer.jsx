import { Link, usePage } from "@inertiajs/react";

export default function Footer() {
    const { props } = usePage(); // Dapatkan URL dan props
    const { settings } = props; // <-- 1. Ambil settings dari props

    return (
        <footer className="bg-primary text-white">
            <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex py-8 justify-center flex-col md:flex-row md:justify-between items-center">
                    <div className="flex justify-center flex-col items-center md:items-start">
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
                        <p className="mt-6 max-w-xs text-center md:text-start text-sm text-gray-300">
                            {settings.address || "Alamat belum ditambahkan."}
                        </p>
                    </div>
                    <div className="py-8 md:py-0 flex flex-col items-center md:items-end">
                        <h2 className="font-semibold">
                            STAY CONNECTED WITH US
                        </h2>
                        <div className="flex mt-4 space-x-4">
                            <a
                                href={`mailto:${settings.email}`}
                                target="_blank"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white hover:text-secondary"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                                    <path d="M3 7l9 6l9 -6"></path>
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/himailkomunnes"
                                target="_blank"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white hover:text-secondary"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
                                    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                    <path d="M16.5 7.5v.01"></path>
                                </svg>
                            </a>
                            <a
                                href="https://www.tiktok.com/@himailkomunnes"
                                target="_blank"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white hover:text-secondary"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z"></path>
                                </svg>
                            </a>
                            <a
                                href="https://x.com/HimaIlkomUnnes"
                                target="_blank"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white hover:text-secondary"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                                </svg>
                            </a>
                            <a
                                href="https://www.youtube.com/@himailkomunnes271"
                                target="_blank"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white hover:text-secondary"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z"></path>
                                    <path d="M10 9l5 3l-5 3z"></path>
                                </svg>
                            </a>
                            <a
                                href="https://whatsapp.com/channel/0029VaIyoADDjiOTrsQtcV2f"
                                target="_blank"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white hover:text-secondary"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
                                    <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="py-6 border-t border-white border-opacity-50">
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
