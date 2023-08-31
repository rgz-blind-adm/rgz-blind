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
