export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        bg-white 
        text-black 
        font-semibold 
        py-2 px-4 
        rounded 
        transition 
        duration-300
        hover:bg-black 
        hover:text-white
      "
    >
      {children}
    </button>
  )
}
