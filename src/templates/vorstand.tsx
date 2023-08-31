import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "components/Layout";
import Content, { HTMLContent } from "components/Content";
import FacebookMetadata from "components/FacebookMetadata";

export const VorstandTemplate = ({
    content,
    contentComponent,
    helmet
}: {
    content: any;
    contentComponent?: any;
    helmet?: any;
}) => {
    const PageContent = contentComponent || Content;
    return (
        <section className="section">
            {helmet || ""}
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <PageContent className="content" content={content} />
                    </div>
                </div>
            </div>
        </section>
    );
};

const VorstandItem = ({ data }: { data: any }) => {
    const { mdx: post } = data;

    return (
        <Layout>
            <VorstandTemplate
                content={post.body}
                contentComponent={HTMLContent}
                helmet={
                    <Helmet titleTemplate="%s - Schweizerischer Blindenbund Regionalgruppe Zürich">
                        <title>{`${post.frontmatter.title}`}</title>
                        <meta
                            name="description"
                            content={`${post.frontmatter.seodescription}`}
                        />
                        <FacebookMetadata post={post} />
                    </Helmet>
                }
            />
        </Layout>
    );
};

export default VorstandItem;

export const vorstandQuery = graphql`
    query VorstandById($id: String!) {
        mdx(id: { eq: $id }) {
            id
            body
            fields {
                slug
            }
            frontmatter {
                title
                seodescription
            }
        }
    }
`;
