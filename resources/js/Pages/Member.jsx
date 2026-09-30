import { Head, useForm, usePage } from "@inertiajs/react";
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
const TrashIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
    </svg>
);

// --- Komponen Modal Anggota ---
const MemberModal = ({ isOpen, onClose, memberToEdit }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        position: "",
        division: "",
        period: new Date().getFullYear().toString(),
        photo: null,
        social_media: [{ platform: "Instagram", url: "" }],
        _method: "POST",
    });
    const isEditMode = Boolean(memberToEdit);
    const [photoPreview, setPhotoPreview] = useState(null);

    useEffect(() => {
        if (isOpen) {
            if (isEditMode) {
                setData({
                    name: memberToEdit.name,
                    position: memberToEdit.position,
                    division: memberToEdit.division,
                    period: memberToEdit.period,
                    photo: null,
                    social_media: memberToEdit.social_media || [
                        { platform: "Instagram", url: "" },
                    ],
                    _method: "PUT",
                });
                setPhotoPreview(
                    memberToEdit.photo_path
                        ? `/storage/${memberToEdit.photo_path}`
                        : null
                );
            } else {
                reset();
                setPhotoPreview(null);
            }
        }
    }, [isOpen, memberToEdit]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setData("photo", file);
        if (file) setPhotoPreview(URL.createObjectURL(file));
    };

    const handleSocialChange = (index, field, value) => {
        const updatedSocials = [...data.social_media];
        updatedSocials[index][field] = value;
        setData("social_media", updatedSocials);
    };

    const addSocialField = () => {
        setData("social_media", [
            ...data.social_media,
            { platform: "", url: "" },
        ]);
    };

    const removeSocialField = (index) => {
        setData(
            "social_media",
            data.social_media.filter((_, i) => i !== index)
        );
    };

    const submit = (e) => {
        e.preventDefault();
        const url = isEditMode
            ? route("admin.members.update", memberToEdit.id)
            : route("admin.members.store");
        post(url, {
            onSuccess: () => onClose(),
            forceFormData: true,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                        {isEditMode ? "Edit Anggota" : "Tambah Anggota Baru"}
                    </h3>
                    <button onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <form
                    onSubmit={submit}
                    className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
                >
                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="name" value="Nama Lengkap" />
                            <TextInput
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                className="mt-1 block w-full"
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="position" value="Jabatan" />
                            <TextInput
                                id="position"
                                value={data.position}
                                onChange={(e) =>
                                    setData("position", e.target.value)
                                }
                                required
                                className="mt-1 block w-full"
                            />
                            <InputError
                                message={errors.position}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="division" value="Divisi" />
                            <select
                                name="division"
                                id="division"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                value={data.division}
                                onChange={(e) =>
                                    setData("division", e.target.value)
                                }
                                required
                            >
                                <option value="">Pilih Divisi</option>
                                <option value="BPH">BPH</option>
                                <option value="Sekretaris">Sekretaris</option>
                                <option value="Bendahara">Bendahara</option>
                                <option value="PSDO">PSDO</option>
                                <option value="Ekonomi Kreatif">
                                    Ekonomi Kreatif
                                </option>
                                <option value="Internal">Internal</option>
                                <option value="Eksternal">Eksternal</option>
                                <option value="Sosial Masyarakat">
                                    Sosial Masyarakat
                                </option>
                                <option value="Komunikasi Informasi">
                                    Komunikasi Informasi
                                </option>
                            </select>
                            <InputError
                                message={errors.division}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="period" value="Periode" />
                            <TextInput
                                id="period"
                                value={data.period}
                                onChange={(e) =>
                                    setData("period", e.target.value)
                                }
                                required
                                className="mt-1 block w-full"
                            />
                            <InputError
                                message={errors.period}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div>
                        <InputLabel htmlFor="photo" value="Foto" />
                        <input
                            id="photo"
                            type="file"
                            onChange={handlePhotoChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
                        />
                        <InputError message={errors.photo} className="mt-2" />
                        {photoPreview && (
                            <img
                                src={photoPreview}
                                alt="Preview"
                                className="mt-4 h-40 w-auto object-cover rounded-md"
                            />
                        )}
                    </div>
                    <div>
                        <InputLabel value="Media Sosial" />
                        {data.social_media.map((social, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 mt-2"
                            >
                                <TextInput
                                    value={social.platform}
                                    onChange={(e) =>
                                        handleSocialChange(
                                            index,
                                            "platform",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Platform (e.g., Instagram)"
                                    className="w-1/3"
                                />
                                <TextInput
                                    value={social.url}
                                    onChange={(e) =>
                                        handleSocialChange(
                                            index,
                                            "url",
                                            e.target.value
                                        )
                                    }
                                    placeholder="URL/Link"
                                    className="flex-grow"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeSocialField(index)}
                                    className="p-2 text-red-500 hover:bg-red-100 rounded-full"
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addSocialField}
                            className="mt-2 text-sm text-blue-600 hover:underline"
                        >
                            + Tambah Link
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

// --- Komponen Card Anggota ---
const MemberCard = ({ member, onEdit, onDelete }) => (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
        <img
            src={
                member.photo_path
                    ? `/storage/${member.photo_path}`
                    : "https://via.placeholder.com/80"
            }
            alt={member.name}
            className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-grow">
            <h4 className="font-bold text-lg text-primary">{member.name}</h4>
            <p className="text-gray-600">{member.position}</p>
        </div>
        <div className="flex flex-col gap-2">
            <button
                onClick={() => onEdit(member)}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
                Edit
            </button>
            <button
                onClick={() => onDelete(member)}
                className="text-sm font-medium text-red-600 hover:text-red-800"
            >
                Hapus
            </button>
        </div>
    </div>
);

// --- Komponen Utama Halaman Manajemen Anggota ---
export default function Member({ members }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [memberToEdit, setMemberToEdit] = useState(null);
    const [memberToDelete, setMemberToDelete] = useState(null);
    const { delete: destroy, processing: isDeleting } = useForm();

    const openModalForAdd = () => {
        setMemberToEdit(null);
        setIsModalOpen(true);
    };
    const openModalForEdit = (member) => {
        setMemberToEdit(member);
        setIsModalOpen(true);
    };
    const handleDeleteClick = (member) => setMemberToDelete(member);
    const confirmDelete = () => {
        if (!memberToDelete) return;
        destroy(route("admin.members.destroy", memberToDelete.id), {
            preserveScroll: true,
            onSuccess: () => setMemberToDelete(null),
        });
    };

    const memberDivisions = Object.keys(members);

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Manajemen Anggota" />
            <Notification />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <MemberModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                memberToEdit={memberToEdit}
            />
            {/* Delete Confirmation Modal can be reused or created similarly */}

            <div className="lg:ml-72">
                <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-20">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-600"
                    >
                        <MenuIcon />
                    </button>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Manajemen Anggota
                    </h2>
                    <button
                        onClick={openModalForAdd}
                        className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
                    >
                        <PlusIcon />
                        <span>Tambah Anggota</span>
                    </button>
                </header>

                <main className="p-6">
                    {memberDivisions.length > 0 ? (
                        <div className="space-y-8">
                            {memberDivisions.map((division) => (
                                <section key={division}>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-primary">
                                        {division}
                                    </h3>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {members[division].map((member) => (
                                            <MemberCard
                                                key={member.id}
                                                member={member}
                                                onEdit={openModalForEdit}
                                                onDelete={handleDeleteClick}
                                            />
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-lg shadow">
                            <h3 className="text-xl font-semibold text-gray-700">
                                Belum Ada Anggota
                            </h3>
                            <p className="text-gray-500 mt-2">
                                Klik tombol "Tambah Anggota" untuk menambahkan
                                data pertama Anda.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
