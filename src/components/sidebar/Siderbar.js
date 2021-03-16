import React from 'react'
import "./_sidebar.scss"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/action/auth.action';
import {
    MdSubscriptions,
    MdExitToApp,
    MdThumbUp,
    MdHistory,
    MdLibraryBooks,
    MdHome
} from "react-icons/md"

// import logout 

export default function Siderbar({ sidebar, handleToggleSidebar }) {
    const dispatch = useDispatch();

    const logouthandler = () => {
        dispatch(logout());
    }

    return (
        <nav className={sidebar ? "sidebar open" : "sidebar"}
            onClick={() => handleToggleSidebar(false)}>
            <Link to="/">
                <li>
                    <MdHome size={23} />
                    <span>Home</span>
                </li>
            </Link>

            <Link to="/trending">
                <li>
                    <MdThumbUp size={23} />
                    <span>Treanding</span>
                </li>
            </Link>

            <Link to="/feed/subscription">
                <li>
                    <MdSubscriptions size={23} />
                    <span>Subscriptions</span>
                </li>
            </Link>


            <li>
                <MdHistory size={23} />
                <span>History</span>
            </li>
            <li>
                <MdLibraryBooks size={23} />
                <span>Library</span>
            </li>
            <hr />

            <li onClick={logouthandler}>
                <MdExitToApp size={23} />
                <span>Log Out</span>
            </li>

            <hr />
        </nav>
    )
}
