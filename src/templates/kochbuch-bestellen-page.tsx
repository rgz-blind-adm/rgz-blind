import React from 'react'
import { graphql } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'
import { navigate } from 'gatsby-link'
import { Helmet } from 'react-helmet'
import { useState } from 'react'

function encode(data: any) {
    return Object.keys(data)
        .map(
            (key) =>
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&')
}

export const KochbuchBestellenPageTemplate = ({
    content,
    contentComponent,
}: {
    content: any
    contentComponent?: any
}) => {
    const PageContent = contentComponent || Content
    const [formState, setFormState] = useState({})

    function handleChange(e: any) {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        const form = e.target
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
                'form-name': form.getAttribute('name'),
                ...formState,
            }),
        })
            .then(() => navigate(form.getAttribute('action')))
            .catch((error) => alert(error))
    }

    return (
        <section className="section">
            <div className="container">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <PageContent className="content" content={content} />
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <div className="content">
                            <h2>Bestellformular</h2>

                            <form
                                name="Kochbuch bestellen 2021"
                                method="post"
                                action="/kontakt/danke/"
                                data-netlify="true"
                                data-netlify-honeypot="bot-field"
                                onSubmit={handleSubmit}
                            >
                                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                                <input
                                    type="hidden"
                                    name="form-name"
                                    value="contact"
                                />
                                <div hidden>
                                    <label>
                                        Nicht ausfüllen:{' '}
                                        <input
                                            name="bot-field"
                                            onChange={handleChange}
                                        />
                                    </label>
                                </div>
                                <div className="field">
                                    <label className="label" htmlFor={'name'}>
                                        Vor- und Nachname*
                                    </label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type={'text'}
                                            name={'name'}
                                            onChange={handleChange}
                                            id={'name'}
                                            required={true}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label" htmlFor={'email'}>
                                        Email
                                    </label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type={'email'}
                                            name={'email'}
                                            onChange={handleChange}
                                            id={'email'}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label
                                        className="label"
                                        htmlFor={'strasseMitNr'}
                                    >
                                        Strasse mit Nummer*
                                    </label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type={'text'}
                                            name={'strasseMitNr'}
                                            onChange={handleChange}
                                            id={'strasseMitNr'}
                                            required={true}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label" htmlFor={'plzOrt'}>
                                        PLZ und Ort*
                                    </label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type={'text'}
                                            name={'plzOrt'}
                                            onChange={handleChange}
                                            id={'plzOrt'}
                                            required={true}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label
                                        className="label"
                                        htmlFor={
                                            'anzahlSchwarzschriftexemplare'
                                        }
                                    >
                                        Anzahl Schwarzschriftexemplare*
                                    </label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type={'number'}
                                            name={
                                                'anzahlSchwarzschriftexemplare'
                                            }
                                            onChange={handleChange}
                                            id={'anzahlSchwarzschriftexemplare'}
                                            required={true}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label
                                        className="label"
                                        htmlFor={
                                            'anzahlBlindenschriftexemplare'
                                        }
                                    >
                                        Anzahl Blindenschriftexemplare*
                                    </label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type={'number'}
                                            name={
                                                'anzahlBlindenschriftexemplare'
                                            }
                                            onChange={handleChange}
                                            id={'anzahlBlindenschriftexemplare'}
                                            required={true}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label
                                        className="label"
                                        htmlFor={'bemerkung'}
                                    >
                                        Bemerkung
                                    </label>
                                    <div className="control">
                                        <textarea
                                            className="textarea"
                                            name={'bemerkung'}
                                            onChange={handleChange}
                                            id={'bemerkung'}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <button className="button" type="submit">
                                        Kochbuch bestellen
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const KochbuchBestellenPage = ({ data }: { data: any }) => {
    const { mdx: post } = data

    return (
        <Layout>
            <Helmet>
                <title>
                    Kochbuch bestellen - Schweizerischer Blindenbund
                    Regionalgruppe Zürich
                </title>
                <meta
                    name="description"
                    content="Auf dieser Seite können Sie das Kochbuch 2021 der Regionalgruppe Zürich des Schweizerischen Blindenbunds bestellen."
                />
                <meta property="og:title" content="Kochbuch bestellen" />
                <meta
                    property="og:description"
                    content="Auf dieser Seite können Sie das Kochbuch 2021 der Regionalgruppe Zürich des Schweizerischen Blindenbunds bestellen."
                />
                <meta
                    property="og:url"
                    content="https://www.rgz-blind.ch/kochbuch-bestellen/"
                />
            </Helmet>
            <KochbuchBestellenPageTemplate
                contentComponent={HTMLContent}
                content={post.body}
            />
        </Layout>
    )
}

export default KochbuchBestellenPage

export const pageQuery = graphql`
    query KochbuchBestellenPageTemplate($id: String!) {
        mdx(id: { eq: $id }) {
            body
            frontmatter {
                title
            }
        }
    }
`
