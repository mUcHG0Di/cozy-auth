import { FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('custom.auth.login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <form onSubmit={submit}>
                <div className='rounded-sm shadow-sm flex flex-col h-[280px] justify-around'>
                    <div>
                        <h2 className='text-2xl text-center'>Log in to your account</h2>
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Email"
                        />
                        {errors.email && (
                            <div className="mt-2 text-sm text-red-600">
                                { errors.email }
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password"
                        />
                        {errors.password && (
                            <div className="mt-2 text-sm text-red-600">
                                { errors.password }
                            </div>
                        )}
                    </div>

                    <div>
                        <PrimaryButton className="w-full" disabled={processing}>
                            <span className='w-full text-center'>Log in</span>
                        </PrimaryButton>
                    </div>

                    <div className='text-sm'>
                        Don't have an account yet? <a
                            href={route('custom.auth.signup')}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Sign up
                        </a>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
