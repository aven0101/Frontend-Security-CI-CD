"use client";

import { useState, useEffect } from "react";
import { billingAPI } from "@/utils/api";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import AddPaymentModal from "./AddPaymentModal";

type Card = {
  id: string;
  name: string;
  last4: string;
  exp: string;
  cvvMasked: string;
  brand: "visa" | "mastercard" | "regular";
};

const BillingInfo = () => {
  const [cards, setCards] = useState<Card[]>([]);
  // Fetch payment methods from API on mount
  useEffect(() => {
    async function fetchCards() {
      const { success, message } = await billingAPI.getPaymentMethods();
      let paymentMethods = [];
      if (success && message && typeof message === 'object' && Array.isArray(message.paymentMethods)) {
        paymentMethods = message.paymentMethods;
      } else if (success && Array.isArray(message)) {
        paymentMethods = message;
      }
      if (paymentMethods.length > 0) {
        const apiCards = paymentMethods.map((item: any, idx: number) => {
          let exp = "";
          if (item.cardExpMonth && item.cardExpYear) {
            const year = String(item.cardExpYear);
            exp = `${item.cardExpMonth}/${year.length === 4 ? year.slice(2) : year}`;
          }
          return {
            id: item.id || String(idx + 1),
            name: item.cardHolderName || "",
            last4: item.cardLastFour || "",
            exp,
            cvvMasked: "***",
            brand: (item.cardBrand as Card['brand']) || "regular",
            isDefault: item.isDefault === 1 || item.isDefault === true,
          };
        });
        setCards(apiCards);
        // Set selectedId to the default card's id
        const defaultCard = paymentMethods.find((item: any) => item.isDefault === 1 || item.isDefault === true);
        setSelectedId(defaultCard ? defaultCard.id : null);
      } else {
        setCards([]);
        setSelectedId(null);
      }
    }
    fetchCards();
  }, []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  


  // Set default payment method handler
  const setDefaultPaymentMethod = async (id: string) => {
    const { success, message } = await billingAPI.setDefaultPaymentMethod(id);
    if (success) {
      setSelectedId(id);
      // Optionally update cards to reflect new default (if you want to show a visual indicator)
      toast.success('Default payment method updated');
    } else {
      toast.error(typeof message === 'string' ? message : 'Failed to set default card');
    }
  };

  // Confirmation modal state for removal
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; cardId: string | null }>(
    { open: false, cardId: null }
  );

  // Trigger remove confirmation
  const requestRemove = (id: string) => {
    setConfirmModal({ open: true, cardId: id });
  };

  // Remove card handler (confirmed)
  const handleConfirmRemove = async () => {
    if (!confirmModal.cardId) return;
    const id = confirmModal.cardId;
    const { success, message } = await billingAPI.deletePaymentMethod(id);
    if (success) {
      setCards((prev) => prev.filter((c) => c.id !== id));
      if (selectedId === id) setSelectedId(null);
      toast.success('Card removed');
    } else {
      toast.error(typeof message === 'string' ? message : 'Failed to remove card');
    }
    setConfirmModal({ open: false, cardId: null });
  };

  return (
    <div className="w-full">
     <Toaster position="top-right" containerClassName="!z-[99999999]" />
      {/* Heading */}
      <div className=" mb-6">
        <h2 className="font-bold text-4xl text-[#97C1A9]">
          Billing Info
        </h2>
      </div>

      {/* Current plan overview wrapper */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 relative">
        <div className="comingSoon flex items-center justify-center absolute top-0 left-0 w-[100%] h-[100%] bg-black/40 rounded-2xl">
          <p className="text-white text-6xl font-bold">Coming Soon</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[#97C1A9] font-semibold text-2xl">
            Current Plan Overview
          </h3>
          <button className="h-[54px] cursor-pointer rounded-2xl px-9 py-3 bg-[#97C1A9] text-white border-none">
            Upgrade Plan
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-gray-100 rounded-xl p-6 h-[120px] flex flex-col justify-between">
            <div className="text-gray-500 text-lg">Plan Name</div>
            <div className="text-[#97C1A9] text-2xl font-normal">Pro</div>
          </div>
          <div className="bg-gray-100 rounded-xl p-6 h-[120px] flex flex-col justify-between">
            <div className="text-gray-500 text-lg">Status</div>
            <div className="text-[#97C1A9] text-2xl font-normal">Active</div>
          </div>
          <div className="bg-gray-100 rounded-xl p-6 h-[120px] flex flex-col justify-between">
            <div className="text-gray-500 text-lg">Renewal Date</div>
            <div className="text-[#97C1A9] text-2xl font-normal">May 28, 2025</div>
          </div>
          <div className="bg-gray-100 rounded-xl p-6 h-[120px] flex flex-col justify-between">
            <div className="text-gray-500 text-lg">Storage Limit</div>
            <div className="text-[#97C1A9] text-2xl font-normal">1Tb shared space</div>
          </div>
        </div>
      </div>

      {/* Cards container */}
      <div className="mt-5 max-w-full">
        {/* first row: up to 3 cards */}
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
          {cards.length > 0 && cards.map((card) => (
            <div key={card.id} className="bg-[url(/dashboard/card-background.png)] bg-cover bg-no-repeat p-4 flex flex-col gap-5 rounded-3xl w-full shadow-[0_0_6px_0_#00000040]">
              <div className="row1 flex items-start justify-between">
                <Image src={`/dashboard/${card.brand}.png`} alt={`${card.brand} card`} width={500} height={500} className="w-20 h-auto object-cover" />
                <div className="flex items-center gap-3">
                  <span className="text-lg text-[#98C1A9] underline cursor-pointer">Edit</span>
                  <span className="text-lg text-[#98C1A9] underline cursor-pointer" onClick={() => requestRemove(card.id)}>Remove</span>
                </div>
              </div>
              <div className="row2">
                <span className="text-white text-[20px] font-semibold">{card.name}</span>
              </div>
              <div className="row3">
                <span className="text-white text-[20px] font-semibold">**** **** **** {card.last4}</span>
              </div>
              <div className="row4 flex items-center justify-between">
                <div className="flex items-center gap-15">
                  <span className="text-white text-[20px] font-semibold">{card.exp}</span>
                  <span className="text-white text-[20px] font-semibold">{card.cvvMasked}</span>
                </div>
                <div className="">
                  <button
                    onClick={() => setDefaultPaymentMethod(card.id)}
                    aria-label={`Select card ${card.id}`}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedId === card.id ? "bg-[#98C1A9] border-none" : "bg-white border border-[#98C1A9]"
                      }`}
                  >
                    {selectedId === card.id && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="rounded-3xl min-h-[238px] w-full shadow-[0_0_6px_0_#00000040] cursor-pointer flex items-center justify-center" onClick={() => setShowAddModal(true)}>
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="34" width="4" height="72" rx="2" fill="#98C1A9" />
              <rect x="72" y="34" width="5" height="72" rx="2.5" transform="rotate(90 72 34)" fill="#98C1A9" />
            </svg>
          </div>
        </div>
      </div>

      <AddPaymentModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={(card) => {
          // map incoming minimal CardData to local Card shape
          const newCard: Card = {
            id: String(Date.now()),
            name: card.name || 'New Card',
            last4: card.number.replace(/\s+/g, '').slice(-4).padStart(4, '0'),
            exp: card.exp || '00/00',
            cvvMasked: card.cvv ? card.cvv[0] + '**' : '***',
            brand: (card.brand as Card['brand']) || 'regular',
          };
          setCards((s) => [...s, newCard]);
          // Do NOT set as selected by default
        }}
      />

      {/* Custom Confirmation Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
          {/* Dim overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          {/* Modal */}
          <div className="relative z-10 max-w-md w-full rounded-2xl bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-[#00281A] mb-3 font-aptos">Are you sure?</h2>
            <p className="mb-8 text-gray-700 font-aptos">Are you sure you want to remove this card?</p>
            <div className="flex justify-end gap-3">
              <button
                className="w-[120px] min-h-[45px] rounded-full bg-[#98C1A9] text-white font-bold flex items-center justify-center text-[0.95rem] px-4"
                onClick={() => setConfirmModal({ open: false, cardId: null })}
              >
                Cancel
              </button>
              <button
                className="w-[120px] min-h-[45px] rounded-full bg-[#98C1A9] text-white font-bold flex items-center justify-center text-[0.95rem] px-4"
                onClick={handleConfirmRemove}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingInfo;
