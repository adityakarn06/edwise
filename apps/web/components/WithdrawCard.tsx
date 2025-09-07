"use client"

import { useState } from "react";
import { DollarSign, CreditCard, Smartphone, Landmark } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";

export default function WithdrawCard() {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [accountDetails, setAccountDetails] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) < 100) {
      toast.error("Minimum withdrawal amount is ₹100");
      return;
    }

    if (!accountDetails) {
      toast.error("Please provide account details");
      return;
    }

    setIsWithdrawing(true);

    try {
      const response = await api.post('/referral/withdraw', {
        amount: parseFloat(withdrawAmount),
        paymentMethod,
        accountDetails
      });

      const data = response.data;
      toast.success(data.message);
      setShowWithdrawForm(false);
      setWithdrawAmount("");
      setAccountDetails("");
      // Refresh the page or update stats
      window.location.reload();
    } catch (error: any) {
      console.error('Withdrawal error:', error);
      const errorMessage = error.response?.data?.error || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsWithdrawing(false);
    }
  };

  const paymentMethods = [
    { value: "upi", label: "UPI", icon: <Smartphone className="h-4 w-4" />, placeholder: "Enter UPI ID (e.g., user@paytm)" },
    { value: "Landmark", label: "Landmark Transfer", icon: <Landmark className="h-4 w-4" />, placeholder: "Enter Account Number" },
    { value: "paytm", label: "Paytm", icon: <CreditCard className="h-4 w-4" />, placeholder: "Enter Paytm Number" },
  ];

  const selectedMethod = paymentMethods.find(method => method.value === paymentMethod);

  return (
    <div className="flex flex-col gap-2 items-start justify-start p-5 sm:p-6 border border-white/10 bg-white/6 rounded-lg text-white/90 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10 transition-all">
      <div className="flex items-center gap-3 mb-2">
        <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 text-green-400" />
        <h2 className="text-white/90 text-lg sm:text-xl font-medium">Cash Rewards</h2>
      </div>

      {!showWithdrawForm ? (
        <div className="w-full text-center space-y-4">
          <p className="text-white/60 text-xs sm:text-sm font-light">
            Earn real cash by referring users who upgrade to premium subscriptions.
          </p>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">₹100</div>
            <p className="text-xs sm:text-sm text-white/60 font-light">Per 10 paid referrals</p>
          </div>
          <button
            onClick={() => setShowWithdrawForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors"
          >
            Withdraw Cash
          </button>
        </div>
      ) : (
        <div className="w-full space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/70 mb-2">
              Withdrawal Amount (₹)
            </label>
            <input
              type="number"
              min="100"
              step="50"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Minimum ₹100"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-green-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/70 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.value}
                  onClick={() => setPaymentMethod(method.value)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-colors text-xs sm:text-sm ${
                    paymentMethod === method.value
                      ? 'bg-green-500/20 border-green-400 text-green-400'
                      : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {method.icon}
                  <span>{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/70 mb-2">
              {selectedMethod?.label} Details
            </label>
            <input
              type="text"
              value={accountDetails}
              onChange={(e) => setAccountDetails(e.target.value)}
              placeholder={selectedMethod?.placeholder}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-green-400 text-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowWithdrawForm(false)}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleWithdraw}
              disabled={isWithdrawing}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              {isWithdrawing ? "Processing..." : "Withdraw"}
            </button>
          </div>

          <p className="text-xs text-white/50 text-center font-light">
            Processing time: 2-3 business days. Minimum withdrawal: ₹100
          </p>
        </div>
      )}
    </div>
  );
}