import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import Content, { HTMLContent } from 'components/Content'
import { Helmet } from 'react-helmet'

export const SportFreizeitPageTemplate = ({
    title,
    content,
    contentComponent,
}: {
    title: any
    content: any
    contentComponent: any
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
            </div>
        </section>
    )
}

const SportFreizeitPage = ({ data }: { data: any }) => {
    const { mdx: post } = data

    return (
        <Layout>
            <Helmet>
                <title>
                    SportFreizeit - Schweizerischer Blindenbund Regionalgruppe Zürich
                </title>
                <meta
                    name="description"
                    content="SportFreizeit der Regionalgruppe Zürich des Schweizerischen Blindenbunds."
                />
                <meta property="og:title" content="SportFreizeit" />
                <meta
                    property="og:description"
                    content="SportFreizeit der Regionalgruppe Zürich des Schweizerischen Blindenbunds."
                />
                <meta
                    property="og:url"
                    content="https://www.rgz-blind.ch/sportFreizeit/"
                />
            </Helmet>
            <SportFreizeitPageTemplate
                contentComponent={HTMLContent}
                title={post.frontmatter.title}
                content={post.body}
            />
        </Layout>
    )
}

export default SportFreizeitPage

export const sportFreizeitPageQuery = graphql`
    query SportFreizeitPage($id: String!) {
        mdx(id: { eq: $id }) {
            body
            frontmatter {
                title
            }
        }
    }
`
