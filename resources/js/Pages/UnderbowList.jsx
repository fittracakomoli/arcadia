import { useState, useEffect } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import Sidebar from "@/Layouts/Sidebar";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextArea from "@/Components/TextArea";
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

// --- Komponen Modal ---
const UnderbowModal = ({ isOpen, onClose, itemToEdit }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        logo: null,
        social_media: [],
        _method: "POST",
    });
    const isEditMode = Boolean(itemToEdit);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (isOpen) {
            if (isEditMode) {
                setData({
                    name: itemToEdit.name,
                    description: itemToEdit.description,
                    social_media:
                        itemToEdit.social_media &&
                        itemToEdit.social_media.length > 0
                            ? itemToEdit.social_media
                            : [{ platform: "", url: "" }],
                    logo: null,
                    _method: "PUT",
                });
                setImagePreview(
                    itemToEdit.logo_path
                        ? `/storage/${itemToEdit.logo_path}`
                        : null
                );
            } else {
                reset({
                    name: "",
                    description: "",
                    logo: null,
                    social_media: [{ platform: "", url: "" }],
                    _method: "POST",
                });
                setImagePreview(null);
            }
        }
    }, [itemToEdit, isOpen]);

    const handleSocialMediaChange = (index, field, value) => {
        const updated = [...data.social_media];
        updated[index][field] = value;
        setData("social_media", updated);
    };

    const addSocialMedia = () =>
        setData("social_media", [
            ...data.social_media,
            { platform: "", url: "" },
        ]);
    const removeSocialMedia = (index) =>
        setData(
            "social_media",
            data.social_media.filter((_, i) => i !== index)
        );
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("logo", file);
        if (file) setImagePreview(URL.createObjectURL(file));
    };

    const submit = (e) => {
        e.preventDefault();
        const url = isEditMode
            ? route("admin.underbow.update", itemToEdit.id)
            : route("admin.underbow.store");
        post(url, { onSuccess: () => onClose(), forceFormData: true });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                        {isEditMode ? "Edit Underbow" : "Tambah Underbow Baru"}
                    </h3>
                    <button onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <form
                    onSubmit={submit}
                    className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
                >
                    <div>
                        <InputLabel htmlFor="name" value="Nama Underbow" />
                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="description" value="Deskripsi" />
                        <TextArea
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            required
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="logo" value="Logo" />
                        <input
                            id="logo"
                            type="file"
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
                        />
                        <InputError message={errors.logo} className="mt-2" />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="mt-4 h-24 w-auto object-cover rounded-md"
                            />
                        )}
                    </div>
                    <div>
                        <InputLabel value="Sosial Media" />
                        <div className="space-y-4 mt-2">
                            {data.social_media.map((social, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-3 border rounded-lg"
                                >
                                    <TextInput
                                        placeholder="Platform (cth: Instagram)"
                                        value={social.platform}
                                        className="flex-1"
                                        onChange={(e) =>
                                            handleSocialMediaChange(
                                                index,
                                                "platform",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <TextInput
                                        placeholder="URL Lengkap"
                                        type="url"
                                        value={social.url}
                                        className="flex-1"
                                        onChange={(e) =>
                                            handleSocialMediaChange(
                                                index,
                                                "url",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSocialMedia(index)}
                                        className="p-2 text-red-500 hover:text-red-700"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addSocialMedia}
                            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                        >
                            + Tambah Sosial Media
                        </button>
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

// --- Komponen Modal Konfirmasi Hapus ---
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
                    Anda yakin ingin menghapus:{" "}
                    <span className="font-medium text-gray-800">
                        "{itemName}"
                    </span>
                    ?
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
                        className="bg-red-600 hover:bg-red-700"
                        disabled={processing}
                    >
                        {processing ? "Menghapus..." : "Ya, Hapus"}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

// --- Komponen Card ---
const UnderbowCard = ({ item, onEdit, onDelete }) => {
    const imageUrl = item.logo_path
        ? `/storage/${item.logo_path}`
        : "https://via.placeholder.com/150";
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="p-5 flex items-center gap-5 flex-grow">
                <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded-full bg-gray-100 flex-shrink-0"
                />
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">
                        {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                        {item.description}
                    </p>
                </div>
            </div>
            <div className="mt-auto flex justify-end gap-3 p-3 border-t bg-gray-50">
                <button
                    onClick={() => onEdit(item)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(item)}
                    className="text-sm font-medium text-red-600 hover:text-red-800"
                >
                    Hapus
                </button>
            </div>
        </div>
    );
};

// --- Komponen Utama ---
export default function UnderbowList({ underbows }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const { delete: destroy, processing: isDeleting } = useForm();

    const openModalForEdit = (item) => {
        setItemToEdit(item);
        setIsModalOpen(true);
    };
    const openModalForAdd = () => {
        setItemToEdit(null);
        setIsModalOpen(true);
    };
    const handleDeleteClick = (item) => {
        setItemToDelete(item);
    };
    const confirmDelete = () => {
        if (!itemToDelete) return;
        destroy(route("admin.underbow.destroy", itemToDelete.id), {
            preserveScroll: true,
            onSuccess: () => setItemToDelete(null),
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Manajemen Underbow" />
            <Notification />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <UnderbowModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                itemToEdit={itemToEdit}
            />
            <DeleteConfirmationModal
                isOpen={Boolean(itemToDelete)}
                onClose={() => setItemToDelete(null)}
                onConfirm={confirmDelete}
                processing={isDeleting}
                itemName={itemToDelete?.name}
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
                        Manajemen Underbow
                    </h2>
                    <button
                        onClick={openModalForAdd}
                        className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
                    >
                        <PlusIcon />
                        <span>Tambah Underbow</span>
                    </button>
                </header>

                <main className="p-6">
                    {underbows.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {underbows.data.map((item) => (
                                    <UnderbowCard
                                        key={item.id}
                                        item={item}
                                        onEdit={openModalForEdit}
                                        onDelete={handleDeleteClick}
                                    />
                                ))}
                            </div>
                            <div className="mt-8 flex justify-center">
                                <Pagination links={underbows.links} />
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-lg shadow">
                            <h3 className="text-xl font-semibold text-gray-700">
                                Belum Ada Data Underbow
                            </h3>
                            <p className="text-gray-500 mt-2">
                                Klik tombol "Tambah Underbow" untuk menambahkan
                                data.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
