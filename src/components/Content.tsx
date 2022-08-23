import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

export const HTMLContent = ({
    content,
    className,
}: {
    content: any
    className: any
}) => (
    <div className={className}>
        <MDXRenderer>{content}</MDXRenderer>
    </div>
)

const Content = ({ content, className }: { content: any; className: any }) => (
    <div className={className}>{content}</div>
)

export default Content
