import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'

const KochrezepteProjektPage = ({ data }: { data: any }) => {
    const { group: recipes } = data.allMdx
    return (
        <Layout>
            <Helmet>
                <title>
                    Kochrezepte - Schweizerischer Blindenbund Regionalgruppe
                    Zürich
                </title>
                <meta
                    name="description"
                    content="Kochrezepte der Mitglieder der Regionalgruppe Zürich des Schweizerischen Blindenbunds."
                />
                <meta property="og:title" content="Kochrezepte" />
                <meta
                    property="og:description"
                    content="Kochrezepte der Mitglieder der Regionalgruppe Zürich des Schweizerischen Blindenbunds."
                />
                <meta
                    property="og:url"
                    content="https://www.rgz-blind.ch/projekte/kochrezepte-projekt/"
                />
            </Helmet>
            <section className="section">
                <div className="container content">
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <h1 className="title is-size-1">Kochrezepte</h1>
                            {recipes &&
                                recipes.map((category: any) => (
                                    <div
                                        className="column"
                                        key={category.fieldValue}
                                    >
                                        <h2>{category.fieldValue}</h2>
                                        {category.edges &&
                                            category.edges.map(
                                                ({
                                                    node: recipe,
                                                }: {
                                                    node: any
                                                }) => (
                                                    <div key={recipe.id}>
                                                        <h4>
                                                            <Link
                                                                to={
                                                                    recipe
                                                                        .fields
                                                                        .slug
                                                                }
                                                            >
                                                                {
                                                                    recipe
                                                                        .frontmatter
                                                                        .title
                                                                }
                                                            </Link>
                                                        </h4>
                                                    </div>
                                                )
                                            )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default KochrezepteProjektPage

export const kochrezepteProjektQuery = graphql`
    query KochrezepteProjektQuery {
        allMdx(
            sort: { order: ASC, fields: [frontmatter___title] }
            filter: { frontmatter: { templateKey: { eq: "kochrezept-item" } } }
        ) {
            group(field: frontmatter___kategorie) {
                fieldValue
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
    }
`
