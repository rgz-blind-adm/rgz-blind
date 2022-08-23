import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

export const AdventskalenderTuerchen = ({
    bild,
    link,
}: {
    bild: any
    link: any
}) => {
    return (
        <div className="tile is-3 is-parent">
            <div className="tile is-child">
                <div className="card">
                    <div className="card-image">
                        <figure className={`image mx-0`}>
                            <Link to={link}>
                                <GatsbyImage
                                    image={
                                        bild.image.childImageSharp
                                            .gatsbyImageData
                                    }
                                    alt={bild.alt}
                                />
                            </Link>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    )
}
