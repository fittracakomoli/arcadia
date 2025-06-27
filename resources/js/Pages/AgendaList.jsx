import { Head, useForm, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Sidebar from "@/Layouts/Sidebar";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Pagination from "@/Components/Pagination";

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

// --- Komponen Modal Agenda ---
const AgendaModal = ({ isOpen, onClose, agendaToEdit }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        image: null,
        _method: "POST",
    });
    const isEditMode = Boolean(agendaToEdit);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            setData({
                name: agendaToEdit.name,
                description: agendaToEdit.description || "",
                image: null,
                _method: "PUT",
            });
            setImagePreview(
                agendaToEdit.image_path
                    ? `/storage/${agendaToEdit.image_path}`
                    : null
            );
        } else {
            reset();
            setImagePreview(null);
        }
    }, [agendaToEdit, isOpen]);

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
            ? route("admin.agendas.update", agendaToEdit.id)
            : route("admin.agendas.store");
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
                        {isEditMode ? "Edit Agenda" : "Buat Agenda Baru"}
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
                        <InputLabel htmlFor="name" value="Nama Agenda" />
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
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm h-32"
                        ></textarea>
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="image" value="Gambar" />
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
                    Apakah Anda yakin ingin menghapus agenda: <br />
                    <span className="font-medium text-gray-800">
                        "{itemName}"
                    </span>
                    ?<br />
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

// --- Komponen Card Agenda ---
const AgendaCard = ({ agenda, onEdit, onDelete }) => {
    const imageUrl = agenda.image_path
        ? `/storage/${agenda.image_path}`
        : "https://via.placeholder.com/400x200.png?text=Arcadia";
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            <img
                src={imageUrl}
                alt={agenda.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {agenda.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 flex-grow">
                    {agenda.description?.substring(0, 100)}
                    {agenda.description?.length > 100 ? "..." : ""}
                </p>
                <div className="mt-auto flex justify-end gap-3 pt-3 border-t">
                    <button
                        onClick={() => onEdit(agenda)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(agenda)}
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Komponen Utama Halaman Manajemen Agenda ---
export default function AgendaList({ agendas }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [agendaToEdit, setAgendaToEdit] = useState(null);
    const [agendaToDelete, setAgendaToDelete] = useState(null);

    const { delete: destroy, processing: isDeleting } = useForm();

    const openModalForEdit = (agendaItem) => {
        setAgendaToEdit(agendaItem);
        setIsModalOpen(true);
    };

    const openModalForAdd = () => {
        setAgendaToEdit(null);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (agendaItem) => {
        setAgendaToDelete(agendaItem);
    };

    const confirmDelete = () => {
        if (!agendaToDelete) return;
        destroy(route("admin.agendas.destroy", agendaToDelete.id), {
            preserveScroll: true,
            onSuccess: () => setAgendaToDelete(null),
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Manajemen Agenda" />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <AgendaModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                agendaToEdit={agendaToEdit}
            />
            <DeleteConfirmationModal
                isOpen={Boolean(agendaToDelete)}
                onClose={() => setAgendaToDelete(null)}
                onConfirm={confirmDelete}
                processing={isDeleting}
                itemName={agendaToDelete?.name}
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
                        Manajemen Agenda
                    </h2>
                    <button
                        onClick={openModalForAdd}
                        className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
                    >
                        <PlusIcon />
                        <span>Tambah Agenda</span>
                    </button>
                </header>

                <main className="p-6">
                    {agendas.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {agendas.data.map((item) => (
                                    <AgendaCard
                                        key={item.id}
                                        agenda={item}
                                        onEdit={openModalForEdit}
                                        onDelete={handleDeleteClick}
                                    />
                                ))}
                            </div>
                            <div className="mt-8 flex justify-center">
                                <Pagination links={agendas.links} />
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-lg shadow">
                            <h3 className="text-xl font-semibold text-gray-700">
                                Belum Ada Agenda
                            </h3>
                            <p className="text-gray-500 mt-2">
                                Klik tombol "Tambah Agenda" untuk menambahkan
                                data pertama Anda.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
