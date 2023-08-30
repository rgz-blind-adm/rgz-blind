const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

function getCurrentDate() {
    const d = new Date()
    let month = (d.getMonth() + 1).toString()
    if (month.length < 2) {
        month = `0${month}`
    }
    let day = d.getDate().toString()
    if (day.length < 2) {
        day = `0${day}`
    }
    return `${d.getFullYear()}-${month}-${day}`
}

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions

    return graphql(`
        {
            allMdx(limit: 1000) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            templateKey
                        }
                    }
                }
            }
        }
    `).then((result) => {
        if (result.errors) {
            result.errors.forEach((e) => console.error(e.toString()))
            return Promise.reject(result.errors)
        }

        const posts = result.data.allMdx.edges

        posts.forEach((edge) => {
            const id = edge.node.id
            createPage({
                path: edge.node.fields.slug,
                tags: edge.node.frontmatter.tags,
                component: path.resolve(
                    `src/templates/${String(
                        edge.node.frontmatter.templateKey
                    )}.tsx`
                ),
                // additional data can be passed via context
                context: {
                    id,
                    currentDate: getCurrentDate(),
                },
            })
        })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions
    if (node.internal.type === `Mdx`) {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
}
