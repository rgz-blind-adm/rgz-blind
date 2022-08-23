import React from 'react'
import { ImpressumPageTemplate } from '../../templates/impressum-page'

const ImpressumPagePreview = ({
    entry,
    widgetFor,
}: {
    entry: any
    widgetFor: any
}) => (
    <ImpressumPageTemplate
        title={entry.getIn(['data', 'title'])}
        content={widgetFor('body')}
    />
)

export default ImpressumPagePreview
