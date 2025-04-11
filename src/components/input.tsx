import { useState } from "react";
import { HiPaperAirplane } from "react-icons/hi2";
import { LuLoaderCircle } from "react-icons/lu";

type InputTextProps = {
  handleSubmit: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  loading?: boolean;
};

export const InputText = ({
  handleSubmit,
  inputRef,
  loading,
}: InputTextProps) => {
  const [inputValue, setInputValue] = useState("");

  const onSubmit = () => {
    if (!inputValue.trim()) return;
    handleSubmit();
    setInputValue(""); // เคลียร์ inputValue
    if (inputRef.current) inputRef.current.value = ""; // เคลียร์ input element
  };

  return (
    <div className="flex flex-col bg-white rounded-xl px-4 py-2 mt-[6rem] w-1/2 h-[100px] shadow-md border border-gray-200 justify-between">
      <input
        ref={inputRef}
        type="text"
        placeholder={loading ? "กำลังส่งคำถาม..." : "พิมพ์เมนูที่ต้องการหรือวัตถุดิบที่มีอยู่"}
        className="bg-transparent border-none outline-none text-gray-600 placeholder-gray-400"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
          }
        }}
        disabled = { loading }
      />

      <div className="flex justify-end mt-2">
        {inputValue.trim() && (
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className={`p-2 rounded-full ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-700"
            } text-white flex justify-center items-center`}
          >
            {loading ? (
              <LuLoaderCircle className="animate-spin w-4 h-4 text-white" />
            ) : (
              <HiPaperAirplane className="h-6 w-6 transform -rotate-45" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
