import React from "react";

const FacebookMetadata = (post: any) => {
    return (
        <>
            <meta property="og:title" content={post.frontmatter.title} />
            <meta
                property="og:description"
                content={`${post.frontmatter.seodescription}`}
            />
            <meta
                property="og:url"
                content={`https://www.rgz-blind.ch` + `${post.fields.slug}`}
            />
        </>
    );
};

export default FacebookMetadata;
