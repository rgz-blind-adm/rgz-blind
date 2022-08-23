import React from 'react'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({
    entry,
    widgetFor,
}: {
    entry: any
    widgetFor: any
}) => (
    <IndexPageTemplate
        title={entry.getIn(['data', 'title'])}
        content={widgetFor('body')}
        activities={[]}
        projects={[]}
    />
)

export default IndexPagePreview
