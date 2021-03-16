import React,{useState} from "react"

import { FaBars } from "react-icons/fa"
import { AiOutlineSearch } from "react-icons/ai"
import { MdNotifications, MdApps } from "react-icons/md"
import {useSelector} from 'react-redux';
import "./_header.scss"
import { useHistory } from "react-router";

const Header = ({ handleToggleSidebar }) => {
    const [search, setSearch] = useState('');
    const {user} = useSelector(state => state.authreducer);

    const history = useHistory();
    const gohome = ()=>{
        history.push('/');
    }

    const handelsearch = (e)=>{
        e.preventDefault();
        history.push(`/search/${search}`);
        setSearch('');
    }

    return (
        <div className="header">
            <FaBars
                size={26}
                className="header__menu"
                onClick={() => handleToggleSidebar()}
            />
            <img
                src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
                alt="yt logo"
                className="header__logo"
                onClick={gohome}
            />

            <form onSubmit={handelsearch}>
                <input type="text" onChange={(e)=> setSearch(e.target.value)} placeholder="Search" />
                <button type="submit">
                    <AiOutlineSearch size={22} />
                </button>
            </form>

            <div className="header__icons">
                <MdNotifications size={28} />
                <MdApps size={28} />
                <p>{user?.name}</p>
                <img
                    src={user?.picture}
                    alt="avatar"
                    className="fluid"
                />
            </div>
        </div>
    )
}

export default Header