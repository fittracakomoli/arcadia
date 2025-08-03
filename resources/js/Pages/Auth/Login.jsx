import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword, settings }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <Head title="Login" />

            <div className="w-full sm:max-w-md mt-6 px-6 py-8 bg-white shadow-xl rounded-xl overflow-hidden">
                <div className="flex justify-center mb-6">
                    <Link href="/">
                        <img
                            src={`storage/${settings.logo_horizontal_path}`}
                            alt={`Logo ${settings.organization_name}`}
                            className="h-12 w-auto"
                        />
                    </Link>
                </div>
                <h2 className="text-center text-2xl font-bold text-primary">
                    Dashboard Admin
                </h2>
                <p className="mb-6 text-center font-light text-sm text-primary">
                    Silakan masuk untuk melanjutkan
                </p>

                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-2 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-2 block w-full"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6">
                        <PrimaryButton
                            className="w-full justify-center py-3"
                            disabled={processing}
                        >
                            Login
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
