import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import Sidebar from "@/Layouts/Sidebar";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextArea from "@/Components/TextArea";

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
        className="w-4 h-4"
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
const TrashIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
        />
    </svg>
);

export default function Organization({ settings, flash }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        organization_name: settings.organization_name || "",
        cabinet_name: settings.cabinet_name || "",
        period: settings.period || "",
        logo_horizontal: null,
        logo_vertical: null,
        logo_full: null,
        cover_photo: null,
        headline: settings.headline || "",
        tagline: settings.tagline || "",
        definition: settings.definition || "",
        video_profile_link: settings.video_profile_link || "",
        vision: settings.vision || "",
        mission: settings.mission || [],
        name_philosophy: settings.name_philosophy || "",
        logo_philosophy: settings.logo_philosophy || [],
        address: settings.address || "",
        email: settings.email || "",
        phone: settings.phone || "",
        contacts: settings.contacts || [],
        google_maps_link: settings.google_maps_link || "",
    });

    const [logoHorizontalPreview, setLogoHorizontalPreview] = useState(
        settings.logo_horizontal_path
            ? `/storage/${settings.logo_horizontal_path}`
            : null
    );
    const [logoVerticalPreview, setLogoVerticalPreview] = useState(
        settings.logo_vertical_path
            ? `/storage/${settings.logo_vertical_path}`
            : null
    );
    const [logoFullPreview, setLogoFullPreview] = useState(
        settings.logo_full_path ? `/storage/${settings.logo_full_path}` : null
    );
    const [coverPhotoPreview, setCoverPhotoPreview] = useState(
        settings.cover_photo_path
            ? `/storage/${settings.cover_photo_path}`
            : null
    );

    const handleFileChange = (e, field, setPreview) => {
        const file = e.target.files[0];
        setData(field, file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleAddItem = (field, newItem) =>
        setData(field, [...data[field], newItem]);
    const handleRemoveItem = (field, index) =>
        setData(
            field,
            data[field].filter((_, i) => i !== index)
        );
    const handleItemChange = (field, index, value) => {
        const updatedItems = [...data[field]];
        updatedItems[index] = value;
        setData(field, updatedItems);
    };
    const handlePhilosophyChange = (index, key, value) => {
        const updatedItems = [...data.logo_philosophy];
        updatedItems[index][key] = value;
        setData("logo_philosophy", updatedItems);
    };
    const handleContactChange = (index, key, value) => {
        const updatedContacts = [...data.contacts];
        updatedContacts[index][key] = value;
        setData("contacts", updatedContacts);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.organization.update"), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Pengaturan Organisasi" />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <div className="lg:ml-72">
                <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-20">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-600"
                    >
                        <MenuIcon />
                    </button>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Pengaturan Organisasi
                    </h2>
                </header>
                <main className="p-6">
                    {flash?.success && (
                        <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-200 rounded-lg">
                            {flash.success}
                        </div>
                    )}
                    <form
                        onSubmit={submit}
                        className="bg-white rounded-lg shadow p-6 space-y-8"
                    >
                        {/* Section: Informasi Umum */}
                        <div className="space-y-6 p-6 border rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900">
                                Informasi Umum
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel
                                        htmlFor="organization_name"
                                        value="Nama Organisasi"
                                    />
                                    <TextInput
                                        id="organization_name"
                                        value={data.organization_name}
                                        onChange={(e) =>
                                            setData(
                                                "organization_name",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        message={errors.organization_name}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="cabinet_name"
                                        value="Nama Kabinet"
                                    />
                                    <TextInput
                                        id="cabinet_name"
                                        value={data.cabinet_name}
                                        onChange={(e) =>
                                            setData(
                                                "cabinet_name",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        message={errors.cabinet_name}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="period"
                                        value="Periode"
                                    />
                                    <TextInput
                                        id="period"
                                        value={data.period}
                                        onChange={(e) =>
                                            setData("period", e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        message={errors.period}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
                                <div>
                                    <InputLabel
                                        htmlFor="logo_horizontal"
                                        value="Logo Horizontal"
                                    />
                                    <input
                                        id="logo_horizontal"
                                        type="file"
                                        onChange={(e) =>
                                            handleFileChange(
                                                e,
                                                "logo_horizontal",
                                                setLogoHorizontalPreview
                                            )
                                        }
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
                                    />
                                    <InputError
                                        message={errors.logo_horizontal}
                                        className="mt-2"
                                    />
                                    {logoHorizontalPreview && (
                                        <img
                                            src={logoHorizontalPreview}
                                            alt="Preview Logo Horizontal"
                                            className="mt-4 h-24 w-full object-contain rounded-md border p-1"
                                        />
                                    )}
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="logo_vertical"
                                        value="Logo Vertikal"
                                    />
                                    <input
                                        id="logo_vertical"
                                        type="file"
                                        onChange={(e) =>
                                            handleFileChange(
                                                e,
                                                "logo_vertical",
                                                setLogoVerticalPreview
                                            )
                                        }
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
                                    />
                                    <InputError
                                        message={errors.logo_vertical}
                                        className="mt-2"
                                    />
                                    {logoVerticalPreview && (
                                        <img
                                            src={logoVerticalPreview}
                                            alt="Preview Logo Vertikal"
                                            className="mt-4 h-24 w-full object-contain rounded-md border p-1"
                                        />
                                    )}
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="logo_full"
                                        value="Logo Full"
                                    />
                                    <input
                                        id="logo_full"
                                        type="file"
                                        onChange={(e) =>
                                            handleFileChange(
                                                e,
                                                "logo_full",
                                                setLogoFullPreview
                                            )
                                        }
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
                                    />
                                    <InputError
                                        message={errors.logo_full}
                                        className="mt-2"
                                    />
                                    {logoFullPreview && (
                                        <img
                                            src={logoFullPreview}
                                            alt="Preview Logo Full"
                                            className="mt-4 h-24 w-full object-contain rounded-md border p-1"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* COVER PHOTO SECTION */}
                            <div className="pt-4 border-t">
                                <InputLabel
                                    htmlFor="cover_photo"
                                    value="Foto Sampul"
                                />
                                <input
                                    id="cover_photo"
                                    type="file"
                                    onChange={(e) =>
                                        handleFileChange(
                                            e,
                                            "cover_photo",
                                            setCoverPhotoPreview
                                        )
                                    }
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
                                />
                                <InputError
                                    message={errors.cover_photo}
                                    className="mt-2"
                                />
                                {coverPhotoPreview && (
                                    <img
                                        src={coverPhotoPreview}
                                        alt="Preview Sampul"
                                        className="mt-4 h-32 w-full object-cover rounded-md border p-1"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Section: Branding & Identitas */}
                        <div className="space-y-6 p-6 border rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900">
                                Branding & Identitas
                            </h3>
                            <div>
                                <InputLabel
                                    htmlFor="headline"
                                    value="Headline"
                                />
                                <TextInput
                                    id="headline"
                                    value={data.headline}
                                    onChange={(e) =>
                                        setData("headline", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.headline}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="tagline" value="Tagline" />
                                <TextInput
                                    id="tagline"
                                    value={data.tagline}
                                    onChange={(e) =>
                                        setData("tagline", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.tagline}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="definition"
                                    value="Definisi"
                                />
                                <TextArea
                                    id="definition"
                                    value={data.definition}
                                    onChange={(e) =>
                                        setData("definition", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.definition}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="video_profile_link"
                                    value="Link Video Profil (YouTube/Vimeo)"
                                />
                                <TextInput
                                    id="video_profile_link"
                                    type="text"
                                    value={data.video_profile_link}
                                    onChange={(e) =>
                                        setData(
                                            "video_profile_link",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.video_profile_link}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        {/* Section: Visi & Misi */}
                        <div className="space-y-6 p-6 border rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900">
                                Visi & Misi
                            </h3>
                            <div>
                                <InputLabel htmlFor="vision" value="Visi" />
                                <TextArea
                                    id="vision"
                                    value={data.vision}
                                    onChange={(e) =>
                                        setData("vision", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.vision}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel value="Misi" />
                                <div className="space-y-3 mt-1">
                                    {data.mission.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <TextInput
                                                value={item}
                                                onChange={(e) =>
                                                    handleItemChange(
                                                        "mission",
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveItem(
                                                        "mission",
                                                        index
                                                    )
                                                }
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                                            >
                                                <TrashIcon />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleAddItem("mission", "")
                                        }
                                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                                    >
                                        <PlusIcon /> Tambah Poin Misi
                                    </button>
                                </div>
                                <InputError
                                    message={errors.mission}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        {/* Section: Filosofi */}
                        <div className="space-y-6 p-6 border rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900">
                                Filosofi
                            </h3>
                            <div>
                                <InputLabel
                                    htmlFor="name_philosophy"
                                    value="Filosofi Nama"
                                />
                                <TextArea
                                    id="name_philosophy"
                                    value={data.name_philosophy}
                                    onChange={(e) =>
                                        setData(
                                            "name_philosophy",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.name_philosophy}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                {/* GANTI BAGIAN INI */}
                                <InputLabel value="Filosofi Logo" />
                                <div className="space-y-4 mt-1">
                                    {data.logo_philosophy.map((item, index) => (
                                        <div
                                            key={index}
                                            className="p-4 border rounded-md space-y-3 relative"
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveItem(
                                                        "logo_philosophy",
                                                        index
                                                    )
                                                }
                                                className="absolute top-2 right-2 p-1 text-red-600 hover:bg-red-100 rounded-full"
                                            >
                                                <TrashIcon />
                                            </button>
                                            <TextInput
                                                placeholder="Judul Poin (e.g., Bentuk Perisai)"
                                                value={item.title}
                                                onChange={(e) =>
                                                    handlePhilosophyChange(
                                                        index,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full"
                                            />
                                            <TextArea
                                                placeholder="Penjelasan untuk poin ini..."
                                                value={item.description}
                                                onChange={(e) =>
                                                    handlePhilosophyChange(
                                                        index,
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleAddItem("logo_philosophy", {
                                                title: "",
                                                description: "",
                                            })
                                        }
                                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                                    >
                                        <PlusIcon /> Tambah Poin Filosofi
                                    </button>
                                </div>
                                <InputError
                                    message={errors.logo_philosophy}
                                    className="mt-2"
                                />
                                {/* SAMPAI SINI */}
                            </div>
                        </div>

                        {/* Section: Detail Kontak */}
                        <div className="space-y-6 p-6 border rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900">
                                Detail Kontak
                            </h3>
                            <div>
                                <InputLabel htmlFor="address" value="Alamat" />
                                <TextArea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.address}
                                    className="mt-2"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Email Utama"
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="phone"
                                        value="Telepon Utama"
                                    />
                                    <TextInput
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        message={errors.phone}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="google_maps_link"
                                    value="Link Google Maps (Embed URL)"
                                />
                                <TextInput
                                    id="google_maps_link"
                                    type="url"
                                    value={data.google_maps_link}
                                    onChange={(e) =>
                                        setData(
                                            "google_maps_link",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.google_maps_link}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel value="Kontak Tambahan" />
                                <div className="space-y-4 mt-1">
                                    {data.contacts.map((contact, index) => (
                                        <div
                                            key={index}
                                            className="p-4 border rounded-md space-y-3 relative"
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveItem(
                                                        "contacts",
                                                        index
                                                    )
                                                }
                                                className="absolute top-2 right-2 p-1 text-red-600 hover:bg-red-100 rounded-full"
                                            >
                                                <TrashIcon />
                                            </button>
                                            <TextInput
                                                placeholder="Keterangan (e.g., Ketua Himpunan)"
                                                value={contact.title}
                                                onChange={(e) =>
                                                    handleContactChange(
                                                        index,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full"
                                            />
                                            <TextInput
                                                placeholder="Nama Lengkap"
                                                value={contact.name}
                                                onChange={(e) =>
                                                    handleContactChange(
                                                        index,
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full"
                                            />
                                            <TextInput
                                                placeholder="Nomor Telepon"
                                                value={contact.phone_number}
                                                onChange={(e) =>
                                                    handleContactChange(
                                                        index,
                                                        "phone_number",
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleAddItem("contacts", {
                                                title: "",
                                                name: "",
                                                phone_number: "",
                                            })
                                        }
                                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                                    >
                                        <PlusIcon /> Tambah Kontak
                                    </button>
                                </div>
                                <InputError
                                    message={errors.contacts}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <PrimaryButton disabled={processing}>
                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan Pengaturan"}
                            </PrimaryButton>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}
