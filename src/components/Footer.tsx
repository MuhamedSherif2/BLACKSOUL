import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa6";
import Button from "./Button";


const Footer = () => {
    return (
        <footer className="py-7 bg-gray-900 text-gray-300 text-center">
            <div className="container mx-auto flex flex-col sm:flex-row justify-center gap-10 items-center">
                <Button icon={FaInstagram} link={'https://www.instagram.com/blvcksoul.eg?igsh=eHdvZ3hncTdtMjZ3'} name="Instagram" />
                <Button icon={FaWhatsapp} link={'http://wa.me/201113356149'} name="Whatsapp" />
                <Button icon={FaTiktok} link={'https://www.tiktok.com/@blavesoul?_r=1&_t=ZS-91JwyWnBH8L'} name="Tiktok" />
            </div>
        </footer>
    )
}

export default Footer;