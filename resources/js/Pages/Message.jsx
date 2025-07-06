import { Head, useForm, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Sidebar from "@/Layouts/Sidebar";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

function Notification() {
    const { flash } = usePage().props;
    const [show, setShow] = useState(!!(flash.success || flash.error));
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        let timer, progressTimer;
        if (flash.success || flash.error) {
            setShow(true);
            setProgress(100);

            // Progress bar animation
            let width = 100;
            progressTimer = setInterval(() => {
                width -= 2;
                setProgress(width);
                if (width <= 0) clearInterval(progressTimer);
            }, 60);

            // Hide after 3s
            timer = setTimeout(() => setShow(false), 3000);
        }
        return () => {
            clearTimeout(timer);
            clearInterval(progressTimer);
        };
    }, [flash.success, flash.error]);

    if (!show) return null;

    return (
        <div
            className={`fixed top-6 right-6 z-50 min-w-[260px] px-6 py-3 rounded shadow-lg text-white flex items-center gap-3 transition
            ${flash.success ? "bg-green-600" : "bg-red-600"}`}
        >
            {/* Icon */}
            <span className="text-2xl">
                {flash.success ? (
                    // Checklist icon
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                ) : (
                    // Cross icon
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                )}
            </span>
            <span className="flex-1">{flash.success || flash.error}</span>
            {/* Progress bar */}
            <span
                className="absolute left-0 bottom-0 h-1 rounded-b bg-white/60 transition-all"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}

// --- Ikon ---
const MenuIcon = () => (
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
            d="M4 6h16M4 12h16M4 18h16"
        />
    </svg>
);
const CloseIcon = () => (
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
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);
const TrashIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
    </svg>
);

// --- Komponen Modal Pesan ---
const MessageModal = ({ message, onClose }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        reply_body: "",
    });

    if (!message) return null;

    const submitReply = (e) => {
        e.preventDefault();
        post(route("admin.messages.reply", message.id), {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = () => {
        if (confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
            router.delete(route("admin.messages.destroy", message.id), {
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start p-4 pt-16">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold truncate">
                        {message.subject}
                    </h3>
                    <button onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                    {/* Detail Pengirim */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p>
                            <strong>Dari:</strong> {message.name} (
                            {message.email})
                        </p>
                        <p>
                            <strong>Diterima:</strong>{" "}
                            {new Date(message.created_at).toLocaleString()}
                        </p>
                    </div>
                    {/* Isi Pesan */}
                    <div className="whitespace-pre-wrap text-gray-800">
                        {message.body}
                    </div>
                    {/* Form Balasan */}
                    <form onSubmit={submitReply} className="pt-6 border-t">
                        <InputLabel
                            htmlFor="reply_body"
                            value="Tulis Balasan"
                            className="font-bold text-lg"
                        />
                        <textarea
                            id="reply_body"
                            value={data.reply_body}
                            onChange={(e) =>
                                setData("reply_body", e.target.value)
                            }
                            className="mt-2 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm h-40"
                            required
                        ></textarea>
                        <InputError
                            message={errors.reply_body}
                            className="mt-2"
                        />
                        <div className="mt-4 flex justify-between items-center">
                            <PrimaryButton disabled={processing}>
                                {processing ? "Mengirim..." : "Kirim Balasan"}
                            </PrimaryButton>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="text-red-600 hover:text-red-800 text-sm font-medium inline-flex items-center gap-1"
                            >
                                <TrashIcon /> Hapus Pesan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// --- Komponen Utama Halaman Pesan ---
export default function Message({ messages }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleRowClick = (message) => {
        setSelectedMessage(message);
        // Jika belum dibaca, kirim request untuk menandainya sebagai sudah dibaca
        if (!message.is_read) {
            router.patch(
                route("admin.messages.update", message.id),
                { is_read: true },
                {
                    preserveScroll: true, // Agar halaman tidak scroll ke atas
                }
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Pesan Masuk" />
            <Notification />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <MessageModal
                message={selectedMessage}
                onClose={() => setSelectedMessage(null)}
            />

            <div className="lg:ml-72">
                <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-20">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-600"
                    >
                        <MenuIcon />
                    </button>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Pesan Masuk
                    </h2>
                </header>

                <main className="p-6">
                    <div className="bg-white rounded-lg shadow overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Pengirim
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Subjek
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.data.map((message) => (
                                    <tr
                                        key={message.id}
                                        onClick={() => handleRowClick(message)}
                                        className={`bg-white border-b hover:bg-gray-50 cursor-pointer ${
                                            !message.is_read
                                                ? "font-bold text-gray-900"
                                                : ""
                                        }`}
                                    >
                                        <td className="px-6 py-4 flex items-center gap-2">
                                            {!message.is_read && (
                                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                            )}
                                            {message.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {message.subject}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(
                                                message.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {messages.data.length === 0 && (
                            <p className="text-center text-gray-500 py-12">
                                Tidak ada pesan masuk.
                            </p>
                        )}
                    </div>
                    {/* Tambahkan Paginasi jika diperlukan */}
                </main>
            </div>
        </div>
    );
}
