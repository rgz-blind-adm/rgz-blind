import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import Content, { HTMLContent } from 'components/Content'
import { PhotoGallery } from 'components/PhotoGallery'

export const TalentItemTemplate = ({
    content,
    contentComponent,
    photogallery,
    helmet,
}: {
    content: any
    contentComponent?: any
    photogallery?: any
    helmet?: any
}) => {
    const PageContent = contentComponent || Content
    return (
        <section className="section">
            {helmet || ''}
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <PageContent className="content" content={content} />
                        <PhotoGallery photogallery={photogallery} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const TalentItem = ({ data }: { data: any }) => {
    const { mdx: post } = data

    return (
        <Layout>
            <TalentItemTemplate
                content={post.body}
                contentComponent={HTMLContent}
                helmet={
                    <Helmet titleTemplate="%s - Schweizerischer Blindenbund Regionalgruppe Zürich">
                        <title>{`${post.frontmatter.title}`}</title>
                        <meta
                            name="description"
                            content={`${post.frontmatter.seodescription}`}
                        />
                        <meta
                            property="og:title"
                            content={post.frontmatter.title}
                        />
                        <meta
                            property="og:description"
                            content={`${post.frontmatter.seodescription}`}
                        />
                        <meta
                            property="og:url"
                            content={
                                `https://www.rgz-blind.ch` +
                                `${post.fields.slug}`
                            }
                        />
                    </Helmet>
                }
                photogallery={post.frontmatter.photogallery}
            />
        </Layout>
    )
}

export default TalentItem

export const talentQuery = graphql`
    query TalentItemById($id: String!) {
        mdx(id: { eq: $id }) {
            id
            body
            fields {
                slug
            }
            frontmatter {
                title
                seodescription
                photogallery {
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
`
