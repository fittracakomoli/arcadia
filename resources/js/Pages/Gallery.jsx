import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Sidebar from "@/Layouts/Sidebar";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

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
const TrashIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
        />
    </svg>
);

// --- Komponen Modal Upload Foto ---
const UploadModal = ({ isOpen, onClose }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        category: "",
        caption: "",
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (!isOpen) {
            reset();
            setImagePreview(null);
        }
    }, [isOpen]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.gallery.store"), {
            onSuccess: () => onClose(),
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Upload Foto Baru</h3>
                    <button onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <form onSubmit={submit} className="p-6 space-y-4">
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
                            placeholder="Contoh: Kegiatan, Rapat, dll."
                        />
                        <InputError
                            message={errors.category}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="caption"
                            value="Keterangan (Opsional)"
                        />
                        <TextInput
                            id="caption"
                            value={data.caption}
                            onChange={(e) => setData("caption", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.caption} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="image" value="File Gambar" />
                        <input
                            id="image"
                            type="file"
                            onChange={handleImageChange}
                            required
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
                            {processing ? "Mengunggah..." : "Upload"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- Komponen Modal Konfirmasi Hapus ---
const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    processing,
    item,
}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-left">
                <h3 className="text-lg font-bold text-gray-900">
                    Konfirmasi Hapus
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                    Apakah Anda yakin ingin menghapus foto ini?
                </p>
                <img
                    src={`/storage/${item?.image_path}`}
                    alt="Konfirmasi hapus"
                    className="mt-4 h-40 w-auto object-cover rounded-md mx-auto"
                />
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={processing}
                        className="px-4 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 font-medium"
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

// --- Komponen Utama Halaman Manajemen Galeri ---
export default function Gallery({ galleries }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [photoToDelete, setPhotoToDelete] = useState(null);

    const { delete: destroy, processing: isDeleting } = useForm();

    const handleDeleteClick = (photo) => {
        setPhotoToDelete(photo);
    };

    const confirmDelete = () => {
        if (!photoToDelete) return;
        destroy(route("admin.gallery.destroy", photoToDelete.id), {
            preserveScroll: true,
            onSuccess: () => setPhotoToDelete(null),
        });
    };

    const galleryCategories = Object.keys(galleries);

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Manajemen Galeri" />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <UploadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <DeleteConfirmationModal
                isOpen={Boolean(photoToDelete)}
                onClose={() => setPhotoToDelete(null)}
                onConfirm={confirmDelete}
                processing={isDeleting}
                item={photoToDelete}
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
                        Manajemen Galeri
                    </h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
                    >
                        <PlusIcon />
                        <span>Upload Foto</span>
                    </button>
                </header>

                <main className="p-6">
                    {galleryCategories.length > 0 ? (
                        <div className="space-y-10">
                            {galleryCategories.map((category) => (
                                <section key={category}>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-primary">
                                        {category}
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                        {galleries[category].map((photo) => (
                                            <div
                                                key={photo.id}
                                                className="relative group rounded-lg overflow-hidden shadow-lg"
                                            >
                                                <img
                                                    src={`/storage/${photo.image_path}`}
                                                    alt={photo.caption || ""}
                                                    className="w-full h-48 object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                photo
                                                            )
                                                        }
                                                        className="p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                                {photo.caption && (
                                                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                                                        <p className="text-white text-xs truncate">
                                                            {photo.caption}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-lg shadow">
                            <h3 className="text-xl font-semibold text-gray-700">
                                Galeri Masih Kosong
                            </h3>
                            <p className="text-gray-500 mt-2">
                                Klik tombol "Upload Foto" untuk menambahkan
                                gambar pertama Anda.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
