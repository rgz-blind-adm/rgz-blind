import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

const VorstandMember = ({
    portrait,
    title,
    funktion,
    telefon,
    email,
    slug,
}: {
    portrait: any
    title: string
    funktion: string
    telefon: string
    email: string
    slug: string
}) => {
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image mx-0">
                    <Link to={slug}>
                        <GatsbyImage
                            image={
                                portrait.image.childImageSharp.gatsbyImageData
                            }
                            alt={portrait.alt}
                        />
                    </Link>
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <Link to={slug}>
                            <p className="title is-4">{title}</p>
                        </Link>
                        <p
                            className="is-6 dark-mode-content"
                            style={{ marginBottom: '0' }}
                        >
                            {funktion}
                        </p>
                        <p
                            className="is-6 dark-mode-content"
                            style={{ marginBottom: '0' }}
                        >
                            Telefon: <a href={`tel:${telefon}`}>{telefon}</a>
                        </p>
                        <p className="is-6 dark-mode-content">
                            E-Mail: <a href={`mailto:${email}`}>{email}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VorstandMember
