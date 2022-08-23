import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { Helmet } from 'react-helmet'

export const NetzwerkPageTemplate = ({
    content,
    contentComponent,
}: {
    content: any
    contentComponent?: any
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

const NetzwerkPage = ({ data }: { data: any }) => {
    const { mdx: post } = data

    return (
        <Layout>
            <Helmet>
                <title>
                    Netzwerk - Schweizerischer Blindenbund Regionalgruppe Zürich
                </title>
                <meta
                    name="description"
                    content="Eine Übersicht über alle Partnervereine und Hilfsorganisationen, die mit der RGZ zusammenarbeiten."
                />
                <meta property="og:title" content="Netzwerk" />
                <meta
                    property="og:description"
                    content="Eine Übersicht über alle Partnervereine und Hilfsorganisationen, die mit der RGZ zusammenarbeiten."
                />
                <meta
                    property="og:url"
                    content="https://www.rgz-blind.ch/netzwerk/"
                />
            </Helmet>
            <NetzwerkPageTemplate
                contentComponent={HTMLContent}
                content={post.body}
            />
        </Layout>
    )
}

export default NetzwerkPage

export const NetzwerkPageQuery = graphql`
    query NetzwerkPage($id: String!) {
        mdx(id: { eq: $id }) {
            body
        }
    }
`
