import {Link} from "react-router-dom";
import React, {useState} from "react"

export default function Header() {

    const [navbarOpen,
        setNavbarOpen] = useState(false)

    const handleToggle = () => {
        setNavbarOpen(prev => !prev)
    }

    return (
        <header>
            <span onClick={handleToggle}>{navbarOpen
                    ? "exit..."
                    : "Hamburger"}</span>
            <nav  onClick={handleToggle} className={`menuNav ${navbarOpen
                    ? " showMenu"
                    : ""}`}>
                <ul className="removeListDecoration">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/search">Search movies</Link>
                    </li>
                    <li>
                        <Link to="/booking">Booking</Link>
                    </li>
                </ul>
                <div className={"menuNavBackground"}></div>
            </nav>
        </header>
    );
}