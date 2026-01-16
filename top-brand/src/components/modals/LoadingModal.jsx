import React from "react";

const LoadingModal = ({
  text = "Please wait...",
  subText,
  size = "md", // sm | md | lg
}) => {
  const sizeMap = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-14 h-14 border-4",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col items-center gap-4 min-w-[280px]"
    >
      {/* Spinner */}
      <div
        className={`animate-spin rounded-full border-gray-300 border-t-black ${sizeMap[size]}`}
      />

      {/* Main text */}
      <p className="text-gray-900 font-semibold text-base text-center">
        {text}
      </p>

      {/* Optional subtext */}
      {subText && (
        <p className="text-gray-500 text-sm text-center">
          {subText}
        </p>
      )}
    </div>
  );
};

export default LoadingModal;
