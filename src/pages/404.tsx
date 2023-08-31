import React from 'react'
import Layout from 'components/Layout'

const NotFoundPage = () => (
    <Layout>
        <section className="section">
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <div className="section">
                            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                                Seite nicht gefunden
                            </h1>
                            <p>Die Seite konnte nicht gefunden werden.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
)

export default NotFoundPage
