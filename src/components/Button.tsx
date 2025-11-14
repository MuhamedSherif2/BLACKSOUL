import type { IconType } from "react-icons"
import { Link } from "react-router-dom"

interface IProp {
    icon: IconType,
    className?: string,
    link: string,
    name: string
}

const Button = ({ icon: Icon, className, link, name }: IProp) => {
    return (
        <Link to={link} target="_blank" className={`text-white flex items-center justify-center p-2 rounded-full  hover:bg-[#D7D7D7] hover:text-black transition duration-500 gap-3 ${className}`}>
            <Icon className="text-[22px] mb-1" />
            <p className="text-sm">{name}</p>
        </Link>
    )
}

export default Button