import { useState} from 'react';
import { IoDocumentOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaGithub } from "react-icons/fa";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    
    const toggleDrawer = () => {
        if (open) {
            setOpen(false);
            setTimeout(() => {
                setShowDrawer(false);
            }, 200);
        } else {
            setShowDrawer(true);
            setTimeout(() => setOpen(true), 0);
        }
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
                    <a 
                    href="https://github.com/ryo-furukawa-1122/My-TODO-App" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title='GitHub Repository'
                    >
                        <FaGithub 
                            size={32}
                            className="app-icon"
                            color="#fff"
                        />
                    </a>
                </div>
            </header>

            {showDrawer && (
                <>
                    <div className={`overlay ${open ? 'open' : ''}`} onClick={toggleDrawer}></div>
                    
                    <div className={`drawer ${open ? 'open' : ''}`}>
                        <button onClick={toggleDrawer} className="drawer-close">
                            <IoMdClose size={24} 
                                color="#7873f5"
                            />
                        </button>
                        <h2 className='drawer-title'>Manual</h2>
                        <ul className='drawer-list'>
                            <li>Type your new task</li>
                            <li>Click the add button or press the enter key</li>
                            <li>Click the task to check it off</li>
                            <li>Click the task to uncheck it</li>
                            <li>You can delete the task by clicking the trash button</li>
                            <li>You can reorder the tasks by dragging and dropping them</li>
                        </ul>
                    </div>
                </>
            )}

        </>
    )
}

export default Header;