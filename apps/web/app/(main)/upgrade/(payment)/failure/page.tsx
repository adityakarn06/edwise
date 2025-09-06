"use client";

import { useRouter } from "next/navigation";

export default function PaymentFailurePage() {
    const router = useRouter();

    const handleTryAgain = () => {
        router.push('/upgrade');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg text-center max-w-md w-full border border-white/20">
                <h1 className="text-3xl font-bold mb-6 text-red-400">Payment Failed</h1>
                <p className="mb-4 text-gray-300 text-lg">Unfortunately, your payment could not be processed at this time.</p>
                <p className="mb-6 text-gray-300">If you believe this is an error, please try again or contact support.</p>
                <button
                    onClick={handleTryAgain}
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full font-medium"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}