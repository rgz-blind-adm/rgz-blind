import React from 'react'
import useDarkMode from 'use-dark-mode'
import home from '../img/home.svg'
import homeDark from '../img/home_dark.svg'
import { Link } from 'gatsby'

const HomeLogo = () => {
    const darkMode = useDarkMode()

    return (
        <Link to="/" className="navbar-item" title="Zur Startseite gehen">
            <img
                src={darkMode.value ? homeDark : home}
                alt="Startseite"
                style={{ width: '88px' }}
            />
        </Link>
    )
}

export default HomeLogo
