import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import { AdventskalenderTuerchen } from '../components/AdventskalenderTuerchen'

export const Adventskalender2020PageTemplate = ({
    tuerchen,
}: {
    tuerchen: any
}) => {
    return (
        <section className="section">
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <h1>Adventskalender 2020</h1>
                        <div
                            className="tile is-ancestor"
                            style={{ flexWrap: 'wrap' }}
                        >
                            {tuerchen.map(({ node: tor }: { node: any }) => (
                                <AdventskalenderTuerchen
                                    key={tor.frontmatter.tag}
                                    bild={tor.frontmatter.bild}
                                    link={tor.fields.slug}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Adventskalender2020Page = ({ data }: { data: any }) => {
    return (
        <Layout>
            <Helmet>
                <title>
                    RGZ Adventskalender 2020 - Schweizerischer Blindenbund
                    Regionalgruppe Zürich
                </title>
                <meta name="description" content="RGZ Adventskalender 2020" />
                <meta property="og:title" content="RGZ Adventskalender 2020" />
                <meta
                    property="og:description"
                    content="RGZ Adventskalender 2020"
                />
                <meta
                    property="og:url"
                    content="https://www.rgz-blind.ch/projekte/adventskalender/"
                />
            </Helmet>
            <Adventskalender2020PageTemplate tuerchen={data.tuerchen.edges} />
        </Layout>
    )
}

export default Adventskalender2020Page

export const Adventskalender2020PageQuery = graphql`
    query Adventskalender2020Page($id: String!) {
        index: mdx(id: { eq: $id }) {
            body
            frontmatter {
                title
            }
        }
        tuerchen: allMdx(
            sort: { order: ASC, fields: [frontmatter___tag] }
            filter: {
                frontmatter: { templateKey: { eq: "adventskalender-tuerchen" } }
            }
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        tag
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
    }
`
