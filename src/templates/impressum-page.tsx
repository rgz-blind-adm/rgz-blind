import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import Content, { HTMLContent } from 'components/Content'
import { Helmet } from 'react-helmet'

export const ImpressumPageTemplate = ({
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

const ImpressumPage = ({ data }: { data: any }) => {
    const { mdx: post } = data

    return (
        <Layout>
            <Helmet>
                <title>
                    Impressum - Schweizerischer Blindenbund Regionalgruppe
                    Zürich
                </title>
                <meta
                    name="description"
                    content="Das Impressum der Regionalgruppe Zürich des Schweizerischen Blindenbunds."
                />
                <meta property="og:title" content="Impressum" />
                <meta
                    property="og:description"
                    content="Das Impressum der Regionalgruppe Zürich des Schweizerischen Blindenbunds."
                />
                <meta
                    property="og:url"
                    content="https://www.rgz-blind.ch/impressum/"
                />
            </Helmet>
            <ImpressumPageTemplate
                contentComponent={HTMLContent}
                title={post.frontmatter.title}
                content={post.body}
            />
        </Layout>
    )
}

export default ImpressumPage

export const impressiumPageQuery = graphql`
    query ImpressumPage($id: String!) {
        mdx(id: { eq: $id }) {
            body
            frontmatter {
                title
            }
        }
    }
`
