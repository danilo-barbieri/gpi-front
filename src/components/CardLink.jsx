import { Link } from "react-router-dom"

export default function CardLink({ title, description, to, buttonText, icon }) {
  return (
    <div className="bg-black border border-white p-6 rounded-xl shadow-md transition duration-300 hover:bg-white hover:text-black group text-white flex flex-col justify-between">
      <div>
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>

      <Link
        to={to}
        className="mt-6 self-start bg-white text-black px-4 py-2 rounded-md font-semibold transition group-hover:bg-black group-hover:text-white border border-black group-hover:border-white"
      >
        {buttonText}
      </Link>
    </div>
  )
}
