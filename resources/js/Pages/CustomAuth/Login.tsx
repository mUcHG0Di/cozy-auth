import { FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        agreedToTerms: false,
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
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between"></div>
                            <div className="flex items-center">
                                <input
                                    id="agreedToTerms"
                                    name="agreedToTerms"
                                    type="checkbox"
                                    onChange={(e) => setData('agreedToTerms', e.target.value)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <label htmlFor="agreedToTerms" className="ml-2 block text-base">
                                    Agreed to terms
                                </label>
                            </div>
                    </div>

                    <div>
                        <PrimaryButton className="w-full" disabled={processing || data.agreedToTerms != true}>
                            <span className='w-full text-center'>Log in</span>
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
