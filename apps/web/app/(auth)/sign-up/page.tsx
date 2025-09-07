"use client"
import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Gift } from "lucide-react";

function SignUpContent() {
    const searchParams = useSearchParams();
    const referralCode = searchParams.get('ref');
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        referralCode: referralCode || ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (referralCode) {
            setFormData(prev => ({ ...prev, referralCode }));
        }
    }, [referralCode]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            setIsLoading(false);
            return;
        }

        try {
            // Create account
            const signupResponse = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    referralCode: formData.referralCode
                }),
            });

            const signupData = await signupResponse.json();

            if (signupResponse.ok) {
                toast.success("Account created successfully! Signing you in...");
                
                // Sign in the user
                const result = await signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
                });

                if (result?.error) {
                    toast.error("Account created but sign in failed. Please try signing in manually.");
                    router.push("/sign-in");
                } else {
                    if (formData.referralCode) {
                        toast.success("Welcome! You've been referred by a friend.");
                    }
                    router.push("/dashboard");
                }
            } else {
                toast.error(signupData.error || "Failed to create account");
            }
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const callbackUrl = formData.referralCode 
                ? `/dashboard?ref=${encodeURIComponent(formData.referralCode)}` 
                : "/dashboard";
            await signIn("google", { callbackUrl });
        } catch (error) {
            toast.error("Google sign up failed");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black/90 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white/90">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        <span className="mr-2">Or</span>
                        <Link href="/sign-in" className="font-medium text-white/80 hover:text-white/90">
                            sign in to your existing account
                        </Link>
                    </p>
                    
                    {formData.referralCode && (
                        <div className="mt-4 p-3 bg-green-500/10 border border-green-400/20 rounded-lg">
                            <div className="flex items-center gap-2 text-green-400">
                                <Gift className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                    You've been invited by a friend! Your referrer will get instant rewards when you sign up.
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="mt-1 relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Full name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1 relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="mt-1 relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password (min. 6 characters)"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="mt-1 relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="referralCode" className="block text-sm font-medium text-gray-300">
                                Referral Code (Optional)
                            </label>
                            <input
                                id="referralCode"
                                name="referralCode"
                                type="text"
                                className="mt-1 relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Enter referral code (e.g., EDWABC123)"
                                value={formData.referralCode}
                                onChange={handleChange}
                            />
                            {formData.referralCode && (
                                <p className="text-xs text-green-400 mt-1">
                                    Your referrer will get instant credits when you sign up!
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Creating account..." : "Create Account"}
                        </button>
                    </div>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-black text-gray-400">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={handleGoogleSignUp}
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-white hover:bg-gray-700"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span className="ml-2">Sign up with Google</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function SignUp() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black/90"><div className="text-white">Loading...</div></div>}>
            <SignUpContent />
        </Suspense>
    );
}