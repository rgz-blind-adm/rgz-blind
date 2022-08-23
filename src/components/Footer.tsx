import React from 'react'
import { Link } from 'gatsby'

import letterZ from '../img/letter_Z.svg'

const Footer = class extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="content has-text-centered">
                    <div className="container">
                        <div
                            style={{ maxWidth: '100vw' }}
                            className="columns is-vcentered"
                        >
                            <div className="column is-4">
                                <section className="menu">
                                    <ul className="menu-list">
                                        <li>
                                            <Link
                                                to="/"
                                                className="navbar-item"
                                            >
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="navbar-item"
                                                to="/aktivitaeten/"
                                            >
                                                Aktivitäten
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="navbar-item"
                                                to="/projekte/"
                                            >
                                                Projekte
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="navbar-item"
                                                to="/vorstand/"
                                            >
                                                Vorstand
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="navbar-item"
                                                to="/ueberuns/"
                                            >
                                                Über uns
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="navbar-item"
                                                to="/netzwerk/"
                                            >
                                                Netzwerk
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="navbar-item"
                                                to="/kontakt/"
                                            >
                                                Kontakt
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="navbar-item"
                                                to="/mitglied-werden/"
                                            >
                                                Mitglied werden
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="navbar-item"
                                                to="/spenden/"
                                            >
                                                Spenden
                                            </Link>
                                        </li>
                                    </ul>
                                </section>
                            </div>
                            <div className="column has-text-centered">
                                <Link to="/" title="Zur Startseite gehen">
                                    <img
                                        src={letterZ}
                                        alt="Logo Regionalgruppe Zürich"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content has-text-centered">
                    <p>
                        © RGZ - Schweizerischer Blindenbund 2022 |{' '}
                        <Link className="impressum" to="/impressum/">
                            Impressum
                        </Link>
                    </p>
                </div>
            </footer>
        )
    }
}

export default Footer
