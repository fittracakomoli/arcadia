import { Head, usePage, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Sidebar from "@/Layouts/Sidebar";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Pagination from "@/Components/Pagination";

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
const PlusIcon = () => (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
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

// --- Komponen Modal Berita ---
const NewsModal = ({ isOpen, onClose, newsToEdit }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        content: "",
        category: "",
        image: null,
        _method: "POST",
    });
    const isEditMode = Boolean(newsToEdit);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            setData({
                title: newsToEdit.title,
                content: newsToEdit.content,
                category: newsToEdit.category,
                image: null,
                _method: "PATCH",
            });
            setImagePreview(
                newsToEdit.image_path
                    ? `/storage/${newsToEdit.image_path}`
                    : null
            );
        } else {
            reset();
            setImagePreview(null);
        }
    }, [newsToEdit, isOpen]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        const url = isEditMode
            ? route("admin.news.update", newsToEdit.id)
            : route("admin.news.store");
        post(url, {
            onSuccess: () => {
                reset();
                onClose();
            },
            forceFormData: true,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                        {isEditMode ? "Edit Berita" : "Buat Berita Baru"}
                    </h3>
                    <button onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <form
                    onSubmit={submit}
                    className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
                >
                    {/* Form fields... */}
                    <div>
                        <InputLabel htmlFor="title" value="Judul Berita" />
                        <TextInput
                            id="title"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            required
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="category" value="Kategori" />
                        <TextInput
                            id="category"
                            value={data.category}
                            onChange={(e) =>
                                setData("category", e.target.value)
                            }
                            required
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.category}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="content" value="Isi Berita" />
                        <textarea
                            id="content"
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm h-40"
                        ></textarea>
                        <InputError message={errors.content} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="image" value="Gambar Sampul" />
                        <input
                            id="image"
                            type="file"
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
                        />
                        <InputError message={errors.image} className="mt-2" />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="mt-4 h-40 w-auto object-cover rounded-md"
                            />
                        )}
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg text-gray-600 bg-gray-200 hover:bg-gray-300"
                        >
                            Batal
                        </button>
                        <PrimaryButton disabled={processing}>
                            {processing ? "Menyimpan..." : "Simpan"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- [BARU] Komponen Modal Konfirmasi Hapus ---
const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    processing,
    itemName,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-left">
                <h3 className="text-lg font-bold text-gray-900">
                    Konfirmasi Hapus
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                    Apakah Anda yakin ingin menghapus berita: <br />
                    <span className="font-medium text-gray-800">
                        "{itemName}"
                    </span>
                    ?
                    <br />
                    <br />
                    Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={processing}
                        className="px-4 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 font-medium disabled:opacity-50"
                    >
                        Batal
                    </button>
                    <PrimaryButton
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800 focus:ring-red-500"
                        disabled={processing}
                    >
                        {processing ? "Menghapus..." : "Ya, Hapus"}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

// --- Komponen Card Berita ---
const NewsCard = ({ newsItem, onEdit, onDelete }) => {
    const imageUrl = newsItem.image_path
        ? `/storage/${newsItem.image_path}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              newsItem.title
          )}&background=EBF4FF&color=1E40AF&size=400`;
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            <img
                src={imageUrl}
                alt={`Gambar untuk ${newsItem.title}`}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
                <div className="mb-3">
                    <span className="inline-block bg-blue-100 text-primary text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
                        {newsItem.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 h-14">
                        {newsItem.title}
                    </h3>
                </div>
                <div className="text-sm text-gray-500 mt-auto pt-3 border-t">
                    <p>Penulis: {newsItem.user.name}</p>
                    <p>
                        Terbit:{" "}
                        {new Date(newsItem.published_at).toLocaleDateString(
                            "id-ID"
                        )}
                    </p>
                </div>
                <div className="mt-4 flex justify-end gap-3">
                    <button
                        onClick={() => onEdit(newsItem)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(newsItem)}
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Komponen Utama Halaman Manajemen Berita ---
export default function NewsList({ news }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newsToEdit, setNewsToEdit] = useState(null);
    const [newsToDelete, setNewsToDelete] = useState(null); // State untuk item yang akan dihapus

    // Gunakan useForm untuk mendapatkan state 'processing' saat menghapus
    const { delete: destroy, processing: isDeleting } = useForm();

    const openModalForEdit = (newsItem) => {
        setNewsToEdit(newsItem);
        setIsModalOpen(true);
    };

    const openModalForAdd = () => {
        setNewsToEdit(null);
        setIsModalOpen(true);
    };

    // Fungsi ini sekarang hanya membuka modal konfirmasi
    const handleDeleteClick = (newsItem) => {
        setNewsToDelete(newsItem);
    };

    // Fungsi ini yang akan menjalankan aksi hapus
    const confirmDelete = () => {
        if (!newsToDelete) return;
        destroy(route("admin.news.destroy", newsToDelete.id), {
            preserveScroll: true,
            onSuccess: () => setNewsToDelete(null), // Tutup modal setelah berhasil
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Manajemen Berita" />
            <Notification />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <NewsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                newsToEdit={newsToEdit}
            />
            <DeleteConfirmationModal
                isOpen={Boolean(newsToDelete)}
                onClose={() => setNewsToDelete(null)}
                onConfirm={confirmDelete}
                processing={isDeleting}
                itemName={newsToDelete?.title}
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
                        Manajemen Berita
                    </h2>
                    <button
                        onClick={openModalForAdd}
                        className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
                    >
                        <PlusIcon />
                        <span>Buat Berita</span>
                    </button>
                </header>

                <main className="p-6">
                    {news.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {news.data.map((item) => (
                                    <NewsCard
                                        key={item.id}
                                        newsItem={item}
                                        onEdit={openModalForEdit}
                                        onDelete={handleDeleteClick} // Panggil fungsi untuk membuka modal
                                    />
                                ))}
                            </div>
                            <div className="mt-8 flex justify-center">
                                <Pagination links={news.links} />
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-lg shadow">
                            <h3 className="text-xl font-semibold text-gray-700">
                                Belum Ada Berita
                            </h3>
                            <p className="text-gray-500 mt-2">
                                Klik tombol "Buat Berita" untuk menambahkan
                                berita pertama Anda.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
