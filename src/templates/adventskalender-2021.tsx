import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { navigate } from 'gatsby-link'
import Layout from 'components/Layout'
import Content, { HTMLContent } from 'components/Content'
import { Helmet } from 'react-helmet'

function encode(data: any) {
    return Object.keys(data)
        .map(
            (key) =>
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&')
}

export const Adventskalender2021PageTemplate = ({
    title,
    content,
    contentComponent,
}: {
    title: any
    content: any
    contentComponent: any
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
                        <div>
                            <br />
                            <h2 className="title is-size-2">
                                Einreicheformular
                            </h2>
                            <form
                                name="adventskalender-2021"
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
                                    value="adventskalender-2021"
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
                                        Name*
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
                                        Email*
                                    </label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type={'email'}
                                            name={'email'}
                                            onChange={handleChange}
                                            id={'email'}
                                            required={true}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label
                                        className="label"
                                        htmlFor={'beitrag'}
                                    >
                                        Beitrag*
                                    </label>
                                    <div className="control">
                                        <textarea
                                            className="textarea"
                                            name={'beitrag'}
                                            onChange={handleChange}
                                            id={'beitrag'}
                                            required={true}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <button className="button" type="submit">
                                        Beitrag einreichen
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

const Adventskalender2021Page = ({ data }: { data: any }) => {
    const { mdx: post } = data

    return (
        <Layout>
            <Helmet>
                <title>
                    Adventskalender 2021 - Schweizerischer Blindenbund
                    Regionalgruppe Zürich
                </title>
                <meta
                    name="description"
                    content="Adventskalender 2021 der Regionalgruppe Zürich des Blindenbundes."
                />
                <meta property="og:title" content="Adventskalender 2021" />
                <meta
                    property="og:description"
                    content="Adventskalender 2021 der Regionalgruppe Zürich des Blindenbundes."
                />
                <meta
                    property="og:url"
                    content="https://www.rgz-blind.ch/projekte/adventskalender2021/"
                />
            </Helmet>
            <Adventskalender2021PageTemplate
                contentComponent={HTMLContent}
                title={post.frontmatter.title}
                content={post.body}
            />
        </Layout>
    )
}

export default Adventskalender2021Page

export const Adventskalender2021PageQuery = graphql`
    query Adventskalender2021Page($id: String!) {
        mdx(id: { eq: $id }) {
            body
            frontmatter {
                title
            }
        }
    }
`
