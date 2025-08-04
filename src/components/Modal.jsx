export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full relative">
        <h2 className="text-lg font-bold text-white mb-4">{title}</h2>
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-red-500"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
