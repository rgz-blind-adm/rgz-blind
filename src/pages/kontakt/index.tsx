import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'
import { Helmet } from 'react-helmet'

function encode(data: any) {
    return Object.keys(data)
        .map(
            (key) =>
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&')
}

export default class Index extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = { isValidated: false }
    }

    handleChange = (e: any) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e: any) => {
        e.preventDefault()
        const form = e.target
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
                'form-name': form.getAttribute('name'),
                ...this.state,
            }),
        })
            .then(() => navigate(form.getAttribute('action')))
            .catch((error) => alert(error))
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <title>
                        Kontakt - Schweizerischer Blindenbund Regionalgruppe
                        Zürich
                    </title>
                    <meta
                        name="description"
                        content="Kontakt aufnehmen mit der Regionalgruppe Zürich."
                    />
                    <meta property="og:title" content="Kontakt" />
                    <meta
                        property="og:description"
                        content={`Kontakt aufnehmen mit der Regionalgruppe Zürich.`}
                    />
                    <meta
                        property="og:url"
                        content={`https://www.rgz-blind.ch/kontakt/`}
                    />
                </Helmet>
                <section className="section">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-10 is-offset-1">
                                <div className="content">
                                    <h1 className="title is-size-1">Kontakt</h1>
                                    <p>
                                        Um mit uns in Kontakt zu treten,
                                        verwenden Sie bitte das nachstehende
                                        Formular. Wir melden uns dann bei Ihnen.
                                    </p>
                                    <h2>Kontaktformular</h2>
                                    <form
                                        name="Kontaktformular"
                                        method="post"
                                        action="/kontakt/danke/"
                                        data-netlify="true"
                                        data-netlify-honeypot="bot-field"
                                        onSubmit={this.handleSubmit}
                                    >
                                        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                                        <input
                                            type="hidden"
                                            name="form-name"
                                            value="Kontaktformular"
                                        />
                                        <div hidden>
                                            <label>
                                                Nicht ausfüllen:{' '}
                                                <input
                                                    name="bot-field"
                                                    onChange={this.handleChange}
                                                />
                                            </label>
                                        </div>
                                        <div className="field">
                                            <label
                                                className="label"
                                                htmlFor={'name'}
                                            >
                                                Vor- und Nachname*
                                            </label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type={'text'}
                                                    name={'name'}
                                                    onChange={this.handleChange}
                                                    id={'name'}
                                                    required={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label
                                                className="label"
                                                htmlFor={'email'}
                                            >
                                                Email*
                                            </label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type={'email'}
                                                    name={'email'}
                                                    onChange={this.handleChange}
                                                    id={'email'}
                                                    required={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label
                                                className="label"
                                                htmlFor={'nachricht'}
                                            >
                                                Nachricht*
                                            </label>
                                            <div className="control">
                                                <textarea
                                                    className="textarea"
                                                    name={'nachricht'}
                                                    onChange={this.handleChange}
                                                    id={'nachricht'}
                                                    required={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <button
                                                className="button"
                                                type="submit"
                                            >
                                                Abschicken
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }
}
