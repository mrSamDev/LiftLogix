import { useState, useRef, useEffect } from "react";

type Action = {
  label: string;
  onClick: () => void;
  isDangerous?: boolean;
};

type ActionsDropdownProps = {
  actions: Action[];
};

export function ActionsDropdown({ actions }: ActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  if (actions.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="font-bold uppercase underline transition-all hover:no-underline focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Actions
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 border-4 border-black bg-white">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick();
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left font-bold uppercase tracking-tight transition-all hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                index !== actions.length - 1 ? "border-b-4 border-black" : ""
              } ${action.isDangerous ? "text-red-500" : ""}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
