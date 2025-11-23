"use client"
import React, { useState, useEffect } from "react";
import { billingAPI } from "@/utils/api";
import toast from "react-hot-toast";
import Image from "next/image";

type CardData = {
  id?: string;
  name: string;
  number: string;
  exp: string;
  cvv: string;
  brand?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (card: CardData) => void;
};

export default function AddPaymentModal({ open, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    if (!open) {
      setName("");
      setNumber("");
      setExp("");
      setCvv("");
    }
  }, [open]);

  if (!open) return null;

  function detectBrand(num: string) {
    const n = num.replace(/\s+/g, '');
    if (/^4/.test(n)) return 'visa';
    if (/^5[1-5]/.test(n)) return 'mastercard';
    return 'regular';
  }

  async function handleSave() {
    if (!number || number.replace(/\s+/g, '').length < 12) {
      toast.error("Please enter a valid card number");
      return;
    }

    // Parse exp to month/year and validate
    let expMonth = "";
    let expYear = "";
    if (exp.includes("/")) {
      [expMonth, expYear] = exp.split("/");
      expMonth = expMonth.trim().padStart(2, '0');
      expYear = expYear.trim();
      if (expYear.length === 2) expYear = "20" + expYear;
    }
    // Validate month
    if (!/^(0[1-9]|1[0-2])$/.test(expMonth)) {
      toast.error("Invalid month format. Please use MM/YY or MM/YYYY.");
      return;
    }
    // Validate year
    if (!/^\d{4}$/.test(expYear)) {
      toast.error("Invalid year format. Please use MM/YY or MM/YYYY.");
      return;
    }
    // Check if card is expired
    const now = new Date();
    const cardDate = new Date(Number(expYear), Number(expMonth) - 1, 1);
    if (cardDate < new Date(now.getFullYear(), now.getMonth(), 1)) {
      toast.error("Card has expired.");
      return;
    }

    const brand = detectBrand(number);
    const payload = {
      cardHolderName: name,
      cardLastFour: number.replace(/\s+/g, '').slice(-4),
      cardBrand: brand,
      cardExpMonth: expMonth,
      cardExpYear: expYear,
      isDefault: true,
      billingAddress: {
        street: "string",
        city: "string",
        state: "string",
        zipCode: "string",
        country: "string"
      }
    };

    const { success, message } = await billingAPI.addPaymentMethod(payload);
    if (success) {
      toast.success('Payment method added');
      onSave({
        id: String(Date.now()),
        name,
        number,
        exp,
        cvv,
        brand,
      });
      onClose();
    } else {
      // Try to parse error message for user-friendly display
      let msg = 'Failed to add payment method';
      try {
        const parsed = typeof message === 'string' ? JSON.parse(message) : message;
        if (Array.isArray(parsed)) {
          msg = parsed.map((e) => e.message).join('\n');
        } else if (parsed.message) {
          msg = parsed.message;
        }
      } catch {}
      toast.error(msg);
    }
  }

  return (
    <>
      <div className="bg-[#3D3D3D69] w-full h-full fixed top-0 left-0 z-[999999]"></div>
      <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-[9999999]">
        <div className="bg-white rounded-[20px] w-full max-w-md p-8 relative">
          {/* Modal Title */}
          <div className='flex justify-between items-center mb-6'>
            <h2 className="text-2xl font-semibold text-[#98C1A9]">
              Add Payment Method
            </h2>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 0.5L0.5 13.5" stroke="#98C1A9" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M0.5 0.5L13.5 13.5" stroke="#98C1A9" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

            </button>
          </div>

          <div className="border-1 border-[#F1F1F1]">
            <div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name on card"
                className="outline-0 w-full px-4 py-3 border-b-1 border-[#F1F1F1] placeholder-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-0 bg-white"
              />
            </div>
            <div className="relative">
              <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Card number"
                className="outline-0 w-full px-4 py-3 border-b-1 border-[#F1F1F1] placeholder-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-0 bg-white"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="bg-[#97C1A9] rounded-md p-2 flex items-center justify-center w-14 h-8">
                  <Image src={`/dashboard/${detectBrand(number)}.png`} alt="brand" width={48} height={20} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12">
              <input
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                placeholder="MM/YY"
                className="outline-0 w-full px-4 py-3 border-r-1 border-[#F1F1F1] placeholder-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-0 bg-white col-span-8"
              />
              <input
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="CVV"
                className="outline-0 w-full px-4 py-3 border-b-1 border-[#F1F1F1] placeholder-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-0 bg-white col-span-4"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSave}
              type="submit"
              className="py-3 bg-[#98C1A9] text-white min-h-[48px] flex items-center justify-center rounded-full hover:bg-[#98C1A9]/90 transition-colors mt-2 cursor-pointer text-center m-auto min-w-[234px]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
