import React from 'react'
import { Link, graphql } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import { GatsbyImage } from 'gatsby-plugin-image'

export const IndexPageTemplate = ({
    content,
    contentComponent,
    activities,
    projects,
}: {
    content: any
    contentComponent?: any
    activities: any
    projects: any
}) => {
    const PageContent = contentComponent || Content

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
                            <h2>Aktivitäten</h2>
                            <div
                                className="tile is-ancestor"
                                style={{ flexWrap: 'wrap' }}
                            >
                                {activities &&
                                    activities.map(
                                        ({ node: activity }: { node: any }) => (
                                            <div
                                                className="tile  is-parent"
                                                key={activity.id}
                                            >
                                                <div className="tile is-child">
                                                    <div className="card">
                                                        <div className="card-content">
                                                            <div className="media">
                                                                <div className="media-content">
                                                                    <p className="title is-4">
                                                                        <Link
                                                                            to={
                                                                                activity
                                                                                    .fields
                                                                                    .slug
                                                                            }
                                                                        >
                                                                            {
                                                                                activity
                                                                                    .frontmatter
                                                                                    .title
                                                                            }
                                                                        </Link>
                                                                    </p>
                                                                    <p className="subtitle is-6">
                                                                        {
                                                                            activity
                                                                                .frontmatter
                                                                                .date
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="content">
                                                                {
                                                                    activity
                                                                        .frontmatter
                                                                        .shortdescription
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <div className="content">
                            <h2>Projekte</h2>
                            <div className="tile is-ancestor">
                                {projects &&
                                    projects.map(
                                        ({ node: projekt }: { node: any }) => (
                                            <div
                                                className="tile is-parent"
                                                key={projekt.id}
                                            >
                                                <div className="tile is-child">
                                                    <div className="card">
                                                        <div className="card-image">
                                                            <figure className="image mx-0">
                                                                <Link
                                                                    to={
                                                                        `/projekte/` +
                                                                        `${projekt.frontmatter.link}` +
                                                                        '/'
                                                                    }
                                                                >
                                                                    <GatsbyImage
                                                                        image={
                                                                            projekt
                                                                                .frontmatter
                                                                                .bild
                                                                                .image
                                                                                .childImageSharp
                                                                                .gatsbyImageData
                                                                        }
                                                                        alt={
                                                                            projekt
                                                                                .frontmatter
                                                                                .bild
                                                                                .alt
                                                                        }
                                                                    />
                                                                </Link>
                                                            </figure>
                                                        </div>
                                                        <div className="card-content">
                                                            <div className="media">
                                                                <div className="media-content">
                                                                    <p className="title is-4">
                                                                        <Link
                                                                            to={
                                                                                `/projekte/` +
                                                                                `${projekt.frontmatter.link}` +
                                                                                '/'
                                                                            }
                                                                        >
                                                                            <strong>
                                                                                {
                                                                                    projekt
                                                                                        .frontmatter
                                                                                        .title
                                                                                }
                                                                            </strong>
                                                                        </Link>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="content">
                                                                {
                                                                    projekt
                                                                        .frontmatter
                                                                        .beschreibung
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const IndexPage = ({ data }: { data: any }) => {
    const { index: post, activities: activities, projects: projects } = data

    return (
        <Layout>
            <Helmet>
                <title>Schweizerischer Blindenbund Regionalgruppe Zürich</title>
                <meta
                    name="description"
                    content="Webseite der Regionalgruppe Zürich des Schweizerischen Blindenbunds."
                />
                <meta
                    property="og:title"
                    content="Regionalgruppe Zürich des Schweiz. Blindenbunds"
                />
                <meta
                    property="og:description"
                    content="Webseite der Regionalgruppe Zürich des Schweizerischen Blindenbunds."
                />
                <meta property="og:url" content="https://www.rgz-blind.ch/" />
            </Helmet>
            <IndexPageTemplate
                contentComponent={HTMLContent}
                content={post.body}
                activities={activities.edges}
                projects={projects.edges}
            />
        </Layout>
    )
}

export default IndexPage

export const pageQuery = graphql`
    query IndexPageTemplate($currentDate: Date!) {
        index: mdx(frontmatter: { templateKey: { eq: "index-page" } }) {
            body
            frontmatter {
                title
            }
        }
        activities: allMdx(
            sort: { order: ASC, fields: [frontmatter___date] }
            filter: {
                frontmatter: {
                    templateKey: { eq: "aktivitaet-post" }
                    date: { gte: $currentDate }
                    istArchiviert: { eq: false }
                }
            }
            limit: 3
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        shortdescription
                        templateKey
                        date(formatString: "dddd, DD.MM.YYYY", locale: "de")
                    }
                }
            }
        }
        projects: allMdx(
            sort: { order: ASC, fields: [frontmatter___reihenfolge] }
            filter: { frontmatter: { templateKey: { eq: "projekt-item" } } }
            limit: 3
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        link
                        templateKey
                        beschreibung
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
