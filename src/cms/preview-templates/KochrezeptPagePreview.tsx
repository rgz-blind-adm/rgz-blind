import { KochrezeptTemplate } from '../../templates/kochrezept-item'
import React from 'react'

const KochrezeptPagePreview = ({
    entry,
    widgetFor,
}: {
    entry: any
    widgetFor: any
}) => (
    <KochrezeptTemplate
        title={entry.getIn(['data', 'title'])}
        content={widgetFor('body')}
    />
)

export default KochrezeptPagePreview
