"use client";

import React from "react";

type Question = { id: string; question: string };

type SelectedQA = { question: string; answer: string };

type Props = {
  open: boolean;
  questions: Question[];
  selected: SelectedQA[];
  onSelectChange: (index: number, question: string) => void;
  onAnswerChange: (index: number, answer: string) => void;
  onClose: () => void; // close + revert from parent if desired
  onSubmit: () => void;
  isSubmitting?: boolean;
};

export default function SecurityQuestionsModal({
  open,
  questions,
  selected,
  onSelectChange,
  onAnswerChange,
  onClose,
  onSubmit,
  isSubmitting = false,
}: Props) {
  if (!open) return null;

  const allFilled = selected.every((q) => q.question && q.answer.trim());

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 max-w-2xl w-full mx-4 rounded-2xl shadow-2xl animate-fadeIn bg-white max-h-[90vh] overflow-y-auto">
        <div className="rounded-2xl bg-white p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#00281A] font-aptos">Setup Security Questions</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Instructions */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Select 3 different security questions</li>
              <li>Provide answers that you will remember</li>
              <li>Answers are case-sensitive</li>
              <li>These questions will be used for account recovery</li>
            </ul>
          </div>

          {/* Security Questions Form */}
          <div className="space-y-6 mb-6">
            {selected.map((sel, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-3">Question {index + 1}</h4>

                {/* Question Dropdown */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Select a security question:</label>
                  <select
                    value={sel.question}
                    onChange={(e) => onSelectChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98C1A9] focus:border-transparent"
                  >
                    <option value="">Select a question...</option>
                    {questions.map((q) => {
                      const isSelectedElsewhere = selected.some((s, i) => i !== index && s.question === q.question);
                      return (
                        <option key={q.id} value={q.question} disabled={isSelectedElsewhere}>
                          {q.question}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Answer Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Your answer:</label>
                  <input
                    type="text"
                    value={sel.answer}
                    onChange={(e) => onAnswerChange(index, e.target.value)}
                    placeholder="Enter your answer..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98C1A9] focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={isSubmitting || !allFilled}
              className={`px-6 py-2 rounded-lg transition-colors ${
                isSubmitting || !allFilled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#98C1A9] hover:bg-[#98C1A9]/90 text-white"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Setting up...
                </div>
              ) : (
                "Setup Security Questions"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
