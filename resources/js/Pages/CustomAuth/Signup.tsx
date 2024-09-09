import { FormEventHandler } from 'react';
import { Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        agreed_to_terms: false,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('custom.auth.signup'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Signup" />

            <form onSubmit={handleSubmit}>
            <div className='rounded-sm shadow-sm flex flex-col h-[400px] justify-around'>
                    <div>
                        <h2 className='text-2xl text-center'>Create your account</h2>
                    </div>
                    <div>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Username"
                        />
                        {errors.username && (
                            <div className="errors text-red-500 text-xs mt-1">
                                { errors.username }
                            </div>
                        )}
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
                            <div className="errors text-red-500 text-xs mt-1">
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
                            <div className="errors text-red-500 text-xs mt-1">
                                { errors.password }
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password_confirmation" className="sr-only">Confirm password</label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Confirm password"
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between"></div>
                            <div className="flex items-center">
                                <input
                                    id="agreedToTerms"
                                    name="agreedToTerms"
                                    type="checkbox"
                                    onChange={(e) => setData('agreed_to_terms', !! e.target.value)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <label htmlFor="agreedToTerms" className="ml-2 block text-base">
                                    Agree to terms
                                </label>
                                {errors.agreed_to_terms && (
                                    <div className="block errors text-red-500 text-xs mt-1">
                                        { errors.agreed_to_terms }
                                    </div>
                                )}
                            </div>
                    </div>

                    <div>
                        <PrimaryButton className="w-full" disabled={processing || ! data.agreed_to_terms}>
                            <span className='w-full text-center'>Signup</span>
                        </PrimaryButton>
                    </div>

                    <div className='text-sm'>
                        <p>Already have an account? <Link href={route('custom.auth.login')} className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link></p>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
