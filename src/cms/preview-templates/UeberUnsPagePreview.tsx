import React from 'react'
import { UeberUnsPageTemplate } from '../../templates/ueberuns-page'

const UeberUnsPagePreview = ({
    entry,
    widgetFor,
}: {
    entry: any
    widgetFor: any
}) => (
    <UeberUnsPageTemplate
        title={entry.getIn(['data', 'title'])}
        content={widgetFor('body')}
    />
)

export default UeberUnsPagePreview
