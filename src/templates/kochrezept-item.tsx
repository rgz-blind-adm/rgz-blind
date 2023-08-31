import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import Content, { HTMLContent } from 'components/Content'

export const KochrezeptTemplate = ({
    title,
    content,
    contentComponent,
    helmet,
}: {
    title: any
    content: any
    contentComponent: any
    helmet?: any
}) => {
    const PageContent = contentComponent || Content

    return (
        <article className="section">
            {helmet || ''}
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <PageContent className="content" content={content} />
                    </div>
                </div>
            </div>
        </article>
    )
}

const Kochrezept = ({ data }: { data: any }) => {
    const { mdx: recipe } = data

    return (
        <Layout>
            <KochrezeptTemplate
                helmet={
                    <Helmet titleTemplate="Kochrezept %s - Schweizerischer Blindenbund Regionalgruppe Zürich">
                        <title>{`${recipe.frontmatter.title}`}</title>
                        <meta
                            name="description"
                            content={`${recipe.frontmatter.seodescription}`}
                        />
                        <meta
                            property="og:title"
                            content={recipe.frontmatter.title}
                        />
                        <meta
                            property="og:description"
                            content={`${recipe.frontmatter.seodescription}`}
                        />
                        <meta
                            property="og:url"
                            content={
                                `https://www.rgz-blind.ch` +
                                `${recipe.fields.slug}`
                            }
                        />
                    </Helmet>
                }
                title={recipe.frontmatter.title}
                content={recipe.body}
                contentComponent={HTMLContent}
            />
        </Layout>
    )
}

export default Kochrezept

export const kochrezeptQuery = graphql`
    query KochrezeptByID($id: String!) {
        mdx(id: { eq: $id }) {
            id
            body
            fields {
                slug
            }
            frontmatter {
                title
                seodescription
                templateKey
            }
        }
    }
`
