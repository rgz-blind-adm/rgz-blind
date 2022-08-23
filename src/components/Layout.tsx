import React from 'react'
import { Helmet } from 'react-helmet'
import './all.sass'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'

const TemplateWrapper = ({ children }: { children: any }) => {
    const { title, description } = useSiteMetadata()
    return (
        <div>
            <Helmet>
                <html lang="de" />
                <title>{title}</title>
                <meta name="description" content={description} />

                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href={`${withPrefix('/')}uploads/apple-touch-icon.png`}
                />
                <link
                    rel="icon"
                    type="image/png"
                    href={`${withPrefix('/')}uploads/favicon-32x32.png`}
                    sizes="32x32"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href={`${withPrefix('/')}uploads/favicon-16x16.png`}
                    sizes="16x16"
                />

                <link
                    rel="mask-icon"
                    href={`${withPrefix('/')}iuploadsmg/safari-pinned-tab.svg`}
                    color="#ff4400"
                />
                <meta name="theme-color" content="#fff" />

                <meta
                    property="og:site_name"
                    content="Regionalgruppe Zürich des Schweizerischen Blindenbunds"
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:image"
                    content="https://www.rgz-blind.ch/uploads/og-image.jpg"
                />
                <meta property="og:image:width" content="256" />
                <meta property="og:image:height" content="256" />
            </Helmet>
            <SkipNavLink>Zum Hauptinhalt springen</SkipNavLink>
            <Navbar />
            <SkipNavContent />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default TemplateWrapper
