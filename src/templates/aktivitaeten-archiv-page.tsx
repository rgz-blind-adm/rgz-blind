import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'

interface IProps {
    data: any
}

class AktivitaetArchivList extends React.Component<IProps, {}> {
    render() {
        const { data } = this.props
        const { edges: aktivitaeten } = data.aktivitaeten
        const { edges: gruppen } = data.gruppen

        return (
            <Layout>
                <Helmet>
                    <title>
                        Aktivitäten-Archiv - Schweizerischer Blindenbund Regionalgruppe
                        Zürich
                    </title>
                    <meta
                        name="description"
                        content="Aktivitäten-Archiv der Regionalgruppe Zürich des Schweizerischen Blindenbunds."
                    />
                    <meta property="og:title" content="Aktivitäten-Archiv" />
                    <meta
                        property="og:description"
                        content="Aktivitäten-Archiv der Regionalgruppe Zürich des Schweizerischen Blindenbunds."
                    />
                    <meta
                        property="og:url"
                        content="https://www.rgz-blind.ch/aktivitaeten-archiv/"
                    />
                </Helmet>
                <section className="section">
                    <div className="container content">
                        <div className="columns">
                            <div className="column is-10 is-offset-1">
                                <h1 className="title is-size-1">Aktivitäten-Archiv</h1>
                                <h2>Anlässe</h2>
                                {aktivitaeten &&
                                    aktivitaeten.map(
                                        ({ node: post }: { node: any }) => (
                                            <div
                                                className="column"
                                                key={post.id}
                                            >
                                                <article>
                                                    <header>
                                                        <Link
                                                            to={
                                                                post.fields.slug
                                                            }
                                                        >
                                                            <h3 className="title is-size-4">
                                                                {
                                                                    post
                                                                        .frontmatter
                                                                        .date
                                                                }{' '}
                                                                -{' '}
                                                                {
                                                                    post
                                                                        .frontmatter
                                                                        .title
                                                                }
                                                            </h3>
                                                        </Link>
                                                    </header>
                                                </article>
                                            </div>
                                        )
                                    )}
                                <h2>Gruppen</h2>
                                {gruppen &&
                                    gruppen.map(
                                        ({ node: post }: { node: any }) => (
                                            <div
                                                className="column"
                                                key={post.id}
                                            >
                                                <article>
                                                    <header>
                                                        <Link
                                                            to={
                                                                post.fields.slug
                                                            }
                                                        >
                                                            <h3 className="title is-size-4">
                                                                {
                                                                    post
                                                                        .frontmatter
                                                                        .title
                                                                }
                                                            </h3>
                                                        </Link>
                                                    </header>
                                                </article>
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
}

export default () => (
    <StaticQuery
        query={graphql`
            query AktivitaetArchivListQuery {
                aktivitaeten: allMdx(
                    sort: { order: DESC, fields: [frontmatter___date] }
                    filter: {
                        frontmatter: {
                            templateKey: { eq: "aktivitaet-post" }
                            istArchiviert: { eq: true }
                        }
                    }
                ) {
                    edges {
                        node {
                            id
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                                templateKey
                                date(formatString: "DD.MM.YYYY")
                            }
                        }
                    }
                }
                gruppen: allMdx(
                    sort: { order: ASC, fields: [frontmatter___title] }
                    filter: {
                        frontmatter: { templateKey: { eq: "gruppe-post" } }
                    }
                ) {
                    edges {
                        node {
                            id
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                                templateKey
                            }
                        }
                    }
                }
            }
        `}
        render={(data: any) => <AktivitaetArchivList data={data} />}
    />
)
