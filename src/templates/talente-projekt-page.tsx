import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from 'components/Layout'
import { Helmet } from 'react-helmet'

const TalenteProjektPage = ({ data }: { data: any }) => {
    const { edges: talente } = data.allMdx

    return (
        <Layout>
            <Helmet>
                <title>
                    Talente und Aktivitäten - Schweizerischer Blindenbund
                    Regionalgruppe Zürich
                </title>
                <meta
                    name="description"
                    content="Talente und Aktivitäten der Mitglieder der Regionalgruppe Zürich des Schweizerischen Blindenbunds."
                />
                <meta property="og:title" content="Talente und Aktivitäten" />
                <meta
                    property="og:description"
                    content="Talente und Aktivitäten der Mitglieder der Regionalgruppe Zürich des Schweizerischen Blindenbunds."
                />
                <meta
                    property="og:url"
                    content="https://www.rgz-blind.ch/projekte/talente-projekt/"
                />
            </Helmet>
            <section className="section">
                <div className="container content">
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <h1 className="title is-size-1">
                                Talente und Aktivitäten
                            </h1>
                            {talente &&
                                talente.map(
                                    ({ node: talent }: { node: any }) => (
                                        <div className="column" key={talent.id}>
                                            <Link to={talent.fields.slug}>
                                                <h4 className="title is-size-4">
                                                    {talent.frontmatter.title}
                                                </h4>
                                            </Link>
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default TalenteProjektPage

export const talenteProjektQuery = graphql`
    query talenteProjektQuery {
        allMdx(
            sort: { order: ASC, fields: [frontmatter___title] }
            filter: { frontmatter: { templateKey: { eq: "talent-item" } } }
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`
