import React from 'react';

const ConfirmModal = ({
  isOpen = false,
  title = "Are you sure?",
  message = "",
  onCancel = () => {},
  onConfirm = () => {},
  cancelText = "Cancel",
  confirmText = "Confirm",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center">
      {/* Dim overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onCancel} // click outside closes modal
      />
      {/* Modal */}
      <div className="relative z-10 max-w-md w-full rounded-2xl bg-white p-8 shadow-xl animate-fadeIn">
        <h2 className="text-2xl font-bold text-[#00281A] mb-3 font-aptos text-center">
          {title}
        </h2>
        <p className="mb-6 text-gray-700 font-aptos text-center">{message}</p>
        <div className="flex justify-center gap-3">
          <button
            className="bg-[#98C1A9] hover:bg-[#98C1A9]/90 text-white min-w-[170px] text-center py-2 rounded-2xl text-[20px] cursor-pointer"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className="bg-[#98C1A9] hover:bg-[#98C1A9]/90 text-white min-w-[170px] text-center py-2 rounded-2xl text-[20px] cursor-pointer"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
