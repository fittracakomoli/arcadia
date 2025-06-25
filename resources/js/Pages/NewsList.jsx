import { Head, Link, usePage, useForm, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Sidebar from "@/Layouts/Sidebar";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Pagination from "@/Components/Pagination"; // Komponen paginasi jika ada

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
        _method: "POST", // Untuk menangani update
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
            forceFormData: true, // Penting untuk upload file
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

// --- Komponen Utama Halaman Manajemen Berita ---
export default function NewsList({ news }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newsToEdit, setNewsToEdit] = useState(null);

    const openModalForEdit = (newsItem) => {
        setNewsToEdit(newsItem);
        setIsModalOpen(true);
    };

    const openModalForAdd = () => {
        setNewsToEdit(null);
        setIsModalOpen(true);
    };

    const handleDelete = (newsItem) => {
        if (
            window.confirm(
                `Apakah Anda yakin ingin menghapus berita "${newsItem.title}"?`
            )
        ) {
            router.delete(route("admin.news.destroy", newsItem.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Manajemen Berita" />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <NewsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                newsToEdit={newsToEdit}
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
                    <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
                        <table className="w-full min-w-max text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-4">Judul</th>
                                    <th className="p-4">Kategori</th>
                                    <th className="p-4">Penulis</th>
                                    <th className="p-4">Tanggal Terbit</th>
                                    <th className="p-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {news.data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="p-4 font-medium text-gray-800">
                                            {item.title}
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            {item.category}
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            {item.user.name}
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            {new Date(
                                                item.published_at
                                            ).toLocaleDateString("id-ID")}
                                        </td>
                                        <td className="p-4 space-x-4">
                                            <button
                                                onClick={() =>
                                                    openModalForEdit(item)
                                                }
                                                className="text-blue-600 hover:underline font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item)
                                                }
                                                className="text-red-600 hover:underline font-medium"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination class="mt-6" links={news.links} />
                </main>
            </div>
        </div>
    );
}
