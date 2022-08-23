import React from 'react'
import useDarkMode from 'use-dark-mode'
import banner from '../img/banner-rgz.svg'
import bannerDark from '../img/banner-rgz_dark.svg'
import { Link } from 'gatsby'

const Banner = () => {
    const darkMode = useDarkMode()

    return (
        <div className="container">
            <div className="columns">
                <div className="column" style={{ textAlign: 'right' }}>
                    <Link to="/" title="Zur Startseite gehen">
                        <img
                            src={darkMode.value ? bannerDark : banner}
                            alt="Banner RGZ"
                            style={{ height: '140px' }}
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Banner
