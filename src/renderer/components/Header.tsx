import { useState} from 'react';
import { IoDocumentOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";

const Header = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <header className="app-header">
                <h1 className="app-title">My TODO App</h1>
                <div className="app-icons">
                    <IoDocumentOutline 
                        size={32}
                        className="app-icon"
                        onClick={toggleDrawer}
                    />
                </div>
            </header>
        </>
    )


}

export default Header;