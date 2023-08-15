import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { navigate } from 'gatsby-link'
import Layout from '../components/Layout'
import { useState } from 'react'
import Content, { HTMLContent } from '../components/Content'
import { PhotoGallery } from '../components/PhotoGallery'

function encode(data: any) {
    return Object.keys(data)
        .map(
            (key) =>
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&')
}

export const AktivitaetPostTemplate = ({
    content,
    contentComponent,
    title,
    date,
    anmeldeformularanzeigen,
    photogallery,
    helmet,
}: {
    content: any
    contentComponent?: any
    title: any
    date: any
    anmeldeformularanzeigen: any
    photogallery?: any
    helmet?: any
}) => {
    const PostContent = contentComponent || Content
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
            {helmet || ''}
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <PostContent content={content} />
                        <PhotoGallery photogallery={photogallery} />
                        {anmeldeformularanzeigen && !istArchiviert && (
                            <div>
                                <br />
                                <h2 className="title is-size-2">
                                    Anmeldeformular
                                </h2>
                                <form
                                    name={date + '-' + title}
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
                                        <label
                                            className="label"
                                            htmlFor={'name'}
                                        >
                                            Name
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
                                        <label
                                            className="label"
                                            htmlFor={'email'}
                                        >
                                            Email
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
                                                required={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <button
                                            className="button"
                                            type="submit"
                                        >
                                            Anmelden
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

const AktivitaetPost = ({ data }: { data: any }) => {
    const { mdx: post } = data

    return (
        <Layout>
            <AktivitaetPostTemplate
                content={post.body}
                contentComponent={HTMLContent}
                helmet={
                    <Helmet titleTemplate="%s - Schweizerischer Blindenbund Regionalgruppe Zürich">
                        <title>{`${post.frontmatter.title}`}</title>
                        <meta
                            name="description"
                            content={`${post.frontmatter.seodescription}`}
                        />
                        <meta
                            property="og:title"
                            content={post.frontmatter.title}
                        />
                        <meta
                            property="og:description"
                            content={`${post.frontmatter.seodescription}`}
                        />
                        <meta
                            property="og:url"
                            content={
                                `https://www.rgz-blind.ch` +
                                `${post.fields.slug}`
                            }
                        />
                    </Helmet>
                }
                title={post.frontmatter.title}
                date={post.frontmatter.date}
                photogallery={post.frontmatter.photogallery}
                anmeldeformularanzeigen={
                    post.frontmatter.anmeldeformularanzeigen
                }
            />
        </Layout>
    )
}

export default AktivitaetPost

export const pageQuery = graphql`
    query AktivitaetPostByID($id: String!) {
        mdx(id: { eq: $id }) {
            id
            body
            fields {
                slug
            }
            frontmatter {
                date(formatString: "DD.MM.YYYY")
                title
                seodescription
                anmeldeformularanzeigen
                photogallery {
                    bild {
                        alt
                        image {
                            childImageSharp {
                                gatsbyImageData(
                                    width: 600
                                    quality: 92
                                    formats: [AUTO, WEBP, AVIF]
                                    placeholder: TRACED_SVG
                                )
                            }
                        }
                    }
                }
            }
        }
    }
`
