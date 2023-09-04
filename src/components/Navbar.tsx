import React from 'react'
import { Link } from 'gatsby'
import AccessibilityBar from './AccessibilityBar'
import HomeLogo from './HomeLogo'
import Banner from './Banner'

interface IState {
    active: boolean
    navBarActiveClass: string
}

const Navbar = class extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            active: false,
            navBarActiveClass: '',
        }
    }

    toggleHamburger = () => {
        // toggle the active boolean in the state
        this.setState(
            {
                active: !this.state.active,
            },
            // after state has been updated,
            () => {
                // set the class in state for the navbar accordingly
                this.state.active
                    ? this.setState({
                          navBarActiveClass: 'is-active',
                      })
                    : this.setState({
                          navBarActiveClass: '',
                      })
            }
        )
    }

    render() {
        return (
            <header>
                <Banner />
                <nav
                    className="navbar"
                    role="navigation"
                    aria-label="main-navigation"
                >
                    <div className="container">
                        <div className="navbar-brand">
                            <HomeLogo />
                            <AccessibilityBar />
                            {/* Hamburger menu */}
                            <div
                                className={`navbar-burger burger ${this.state.navBarActiveClass}`}
                                data-target="navMenu"
                                onClick={() => this.toggleHamburger()}
                            >
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                        <div
                            id="navMenu"
                            className={`navbar-menu ${this.state.navBarActiveClass}`}
                        >
                            <div className="navbar-end has-text-centered">
                                <Link className="navbar-item" to="/aktivitaeten/">
                                    Aktivitäten
                                </Link>
								<Link className="navbar-item" to="/aktivitaeten-archiv/">
                                    Aktivitäten-Archiv
                                </Link>
                                <Link className="navbar-item" to="/projekte/">
                                    Projekte
                                </Link>
                                <Link className="navbar-item" to="/vorstand/">
                                    Vorstand
                                </Link>
                                <Link className="navbar-item" to="/ueberuns/">
                                    Über uns
                                </Link>
                                <Link className="navbar-item" to="/netzwerk/">
                                    Netzwerk
                                </Link>
                                <Link className="navbar-item" to="/externe-angebote/">
                                    Externe Angebote
                                </Link>
                                <Link className="navbar-item" to="/kontakt/">
                                    Kontakt
                                </Link>
                                <Link className="navbar-item" to="/mitglied-werden/">
                                    Mitglied werden
                                </Link>    
                                <Link className="navbar-item" to="/mithilfe/">
                                    Mithilfe
                                </Link>
                                <Link className="navbar-item" to="/spenden/">
                                    Spenden
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Navbar
