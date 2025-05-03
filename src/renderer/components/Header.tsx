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
                        <p>
                            Create and manage your tasks with ease.
                        </p>
                        <ul className='drawer-list'>
                            <li>
                                <b>Add tasks</b>: Type a task and click the "Add" button or press "Enter". 
                            </li>
                            <li>
                                <b>Reorder tasks</b>: Drag and drop tasks to prioritize them. 
                            </li>
                            <li>
                                <b>Mark as complete</b>: Click the checkbox to mark a task as done. 
                            </li>
                            <li>
                                <b>Delete tasks</b>: Click the trash icon to remove a task.
                            </li>
                        </ul>
                    </div>
                </>
            )}

        </>
    )
}

export default Header;