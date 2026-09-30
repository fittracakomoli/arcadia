import { Head, usePage, useForm, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Sidebar from "@/Layouts/Sidebar";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

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

// --- Komponen Modal (sekarang bisa untuk Tambah dan Edit) ---
const UserModal = ({ isOpen, onClose, userToEdit }) => {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "moderator",
    });

    const isEditMode = Boolean(userToEdit);

    useEffect(() => {
        if (isEditMode) {
            setData({
                name: userToEdit.name,
                email: userToEdit.email,
                role: userToEdit.role,
                password: "",
                password_confirmation: "",
            });
        } else {
            reset();
        }
    }, [userToEdit, isOpen]);

    const submit = (e) => {
        e.preventDefault();
        const onSuccess = () => {
            reset();
            onClose();
        };

        if (isEditMode) {
            patch(route("admin.users.update", userToEdit.id), { onSuccess });
        } else {
            post(route("admin.users.store"), { onSuccess });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                        {isEditMode ? "Edit Pengguna" : "Tambah Pengguna Baru"}
                    </h3>
                    <button onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <form onSubmit={submit} className="p-6 space-y-4">
                    {/* Form fields (Name, Email, Role) */}
                    <div>
                        <InputLabel htmlFor="name" value="Nama" />
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
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="role" value="Role" />
                        <select
                            id="role"
                            value={data.role}
                            onChange={(e) => setData("role", e.target.value)}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        >
                            <option value="moderator">Moderator</option>
                            <option value="admin">Admin</option>
                        </select>
                        <InputError message={errors.role} className="mt-2" />
                    </div>
                    {/* Password fields with placeholder for edit mode */}
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder={
                                isEditMode
                                    ? "Kosongkan jika tidak ingin diubah"
                                    : ""
                            }
                            required={!isEditMode}
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Konfirmasi Password"
                        />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required={!isEditMode}
                            className="mt-1 block w-full"
                        />
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

// --- Komponen Utama Halaman Manajemen Admin ---
export default function Admin({ users }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);

    const openModalForEdit = (user) => {
        setUserToEdit(user);
        setIsModalOpen(true);
    };

    const openModalForAdd = () => {
        setUserToEdit(null);
        setIsModalOpen(true);
    };

    const handleDelete = (user) => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus ${user.name}?`)) {
            router.delete(route("admin.users.destroy", user.id), {
                preserveScroll: true, // Agar halaman tidak scroll ke atas setelah aksi
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Manajemen Admin" />
            <Notification />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                userToEdit={userToEdit}
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
                        Manajemen Admin
                    </h2>
                    {auth.user.role === "admin" && (
                        <button
                            onClick={openModalForAdd}
                            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
                        >
                            <PlusIcon />
                            <span>Tambah Admin</span>
                        </button>
                    )}
                </header>

                <main className="p-6">
                    <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
                        <table className="w-full min-w-max text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-4">Nama</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Role</th>
                                    {auth.user.role === "admin" && (
                                        <th className="p-4">Aksi</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="p-4 font-medium">
                                            {user.name}
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            {user.email}
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                                    user.role === "admin"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-blue-100 text-blue-700"
                                                }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        {auth.user.role === "admin" && (
                                            <td className="p-4 space-x-4">
                                                {auth.user.id !== user.id ? (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                openModalForEdit(
                                                                    user
                                                                )
                                                            }
                                                            className="text-blue-600 hover:underline font-medium"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    user
                                                                )
                                                            }
                                                            className="text-red-600 hover:underline font-medium"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </>
                                                ) : (
                                                    <span className="text-gray-400">
                                                        -
                                                    </span>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}
