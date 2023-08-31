import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import Content, { HTMLContent } from 'components/Content'
import { Helmet } from 'react-helmet'

export const KulturPageTemplate = ({
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

const KulturPage = ({ data }: { data: any }) => {
    const { mdx: post } = data

    return (
        <Layout>
            <Helmet>
                <title>
                    Kultur - Schweizerischer Blindenbund Regionalgruppe Zürich
                </title>
                <meta
                    name="description"
                    content="Kultur der Regionalgruppe Zürich des Schweizerischen Blindenbunds."
                />
                <meta property="og:title" content="Kultur" />
                <meta
                    property="og:description"
                    content="Kultur der Regionalgruppe Zürich des Schweizerischen Blindenbunds."
                />
                <meta
                    property="og:url"
                    content="https://www.rgz-blind.ch/kultur/"
                />
            </Helmet>
            <KulturPageTemplate
                contentComponent={HTMLContent}
                title={post.frontmatter.title}
                content={post.body}
            />
        </Layout>
    )
}

export default KulturPage

export const kulturPageQuery = graphql`
    query KulturPage($id: String!) {
        mdx(id: { eq: $id }) {
            body
            frontmatter {
                title
            }
        }
    }
`
