require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})

const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = {
    developMiddleware: (app) => {
        app.use(
            '/.netlify/functions/',
            createProxyMiddleware({
                target: 'http://localhost:9000',
                pathRewrite: {
                    '/.netlify/functions/': '',
                },
            })
        )
    },
    siteMetadata: {
        title: 'Schweizerischer Blindenbund RGZ',
        description:
            'Webseite der Regionalgruppe Zürich des Schweizerischen Blindenbunds',
        siteUrl: `https://www.rgz-blind.ch`,
    },
    plugins: [
        `gatsby-plugin-image`,
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        'gatsby-plugin-robots-txt',
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                excludes: [`/kontakt/danke/`, `/projekt-items/*`],
            },
        },
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-typescript',
        'gatsby-plugin-sass',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/static/uploads`,
                name: 'assets',
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/pages`,
                name: 'pages',
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/posts`,
                name: 'content',
            },
        },
        {
            // keep as first gatsby-source-filesystem plugin for gatsby image support
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/static/uploads`,
                name: 'uploads',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/posts`,
                name: 'posts',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/img`,
                name: 'images',
            },
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: [`.mdx`, `.md`],
                plugins: [
                    'gatsby-mdx-tts',
                    'gatsby-remark-audio',
                    'gatsby-remark-embed-video',
                    'gatsby-remark-relative-images',
                    'gatsby-remark-images',
                    `gatsby-remark-responsive-iframe`,
                    'gatsby-remark-copy-linked-files',
                ],
                gatsbyRemarkPlugins: [
                    {
                        resolve: 'gatsby-mdx-tts',
                        options: {
                            awsRegion: 'eu-central-1',
                            defaultVoiceId: 'Vicki',
                            defaultLexiconNames: ['rgzlexicon'],
                            awsCredentials: {
                                accessKeyId:
                                    process.env.GATSBY_AWS_ACCESS_KEY_ID,
                                secretAccessKey:
                                    process.env.GATSBY_AWS_SECRET_ACCESS_KEY,
                            },
                        },
                    },
                    {
                        resolve: 'gatsby-remark-audio',
                        options: {
                            preload: 'auto',
                            loop: false,
                            controls: true,
                            muted: false,
                            autoplay: false,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-embed-video',
                        options: {
                            width: 800,
                            ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
                            height: 400, // Optional: Overrides optional.ratio
                            related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
                            noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
                            urlOverrides: [
                                {
                                    id: 'youtube',
                                    embedURL: (videoId) =>
                                        `https://www.youtube-nocookie.com/embed/${videoId}`,
                                },
                            ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
                            containerClass: 'embedVideo-container', //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
                        },
                    },
                    {
                        resolve: 'gatsby-remark-relative-images',
                        options: {
                            name: 'uploads',
                        },
                    },
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 1024,
                            withWebp: true,
                        },
                    },
                    `gatsby-remark-responsive-iframe`,
                    {
                        resolve: 'gatsby-remark-copy-linked-files',
                        options: {
                            destinationDir: 'static',
                        },
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-use-dark-mode',
            options: {
                classNameDark: 'dark-mode',
                classNameLight: 'light-mode',
                storageKey: 'darkMode',
                minify: true,
            },
        },
        'gatsby-plugin-catch-links',
        {
            resolve: 'gatsby-plugin-netlify-cms',
        },
        {
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
                siteUrl: `https://www.rgz-blind.ch`,
            },
        },
        'gatsby-plugin-root-import',
        'gatsby-plugin-netlify', // make sure to keep it last in the array
    ],
}
