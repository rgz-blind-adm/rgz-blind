import React, { useState } from 'react'
import useDarkMode from 'use-dark-mode'
import sun from '../img/sun.svg'
import moon from '../img/moon.svg'

const AccessibilityBar = () => {
    // Instantiate with the default behavior, in this case, it defaults to light-mode
    // This places "light-mode" class on document.body, as outlined in my gatsby-config.js
    const darkMode = useDarkMode(false)

    const [iconAlt, setIconAlt] = useState(
        darkMode.value ? 'Dunkelmodus deaktivieren' : 'Dunkelmodus aktivieren'
    )
    const [icon, setIcon] = useState(darkMode.value ? sun : moon)

    // Custom function that handles the toggling
    // When called, it replaces the class on document.body and holds it in localStorage
    const handleTheme = () => {
        if (!darkMode.value) {
            darkMode.enable()
            setIcon(sun)
            setIconAlt('Dunkelmodus deaktivieren')
        } else {
            darkMode.disable()
            setIcon(moon)
            setIconAlt('Dunkelmodus aktivieren')
        }
    }

    return (
        <button className="navbar-item dark-mode-toggle">
            <img
                src={icon}
                title={iconAlt}
                alt={iconAlt}
                style={{ width: '88px' }}
                onClick={handleTheme}
            />
        </button>
    )
}

export default AccessibilityBar
