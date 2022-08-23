import React from 'react'
import { SpendenPageTemplate } from '../../templates/spenden-page'

const SpendenPagePreview = ({
    entry,
    widgetFor,
}: {
    entry: any
    widgetFor: any
}) => (
    <SpendenPageTemplate
        title={entry.getIn(['data', 'title'])}
        content={widgetFor('body')}
    />
)

export default SpendenPagePreview
