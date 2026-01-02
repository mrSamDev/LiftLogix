type ConfirmationDialogProps = {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDangerous?: boolean;
};

export function ConfirmationDialog({
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isDangerous = false,
}: ConfirmationDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <div className="w-full max-w-md border-4 border-black bg-white">
        <div className="border-b-4 border-black bg-white p-6">
          <h2
            id="dialog-title"
            className="text-2xl font-bold uppercase leading-tight tracking-tight"
          >
            {title}
          </h2>
        </div>

        <div className="p-6">
          <p
            id="dialog-description"
            className="font-mono text-sm font-bold leading-relaxed"
          >
            {description}
          </p>
        </div>

        <div className="flex border-t-4 border-black">
          <button
            onClick={onCancel}
            className="flex-1 border-r-4 border-black bg-white px-6 py-4 font-bold uppercase tracking-tight transition-all hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-6 py-4 font-bold uppercase tracking-tight transition-all focus:outline-none ${
              isDangerous
                ? "bg-red-500 text-white hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0"
                : "bg-lime-400 hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
