import React from 'react'
import { NetzwerkPageTemplate } from '../../templates/netzwerk-page'

const NetzwerkPagePreview = ({
    entry,
    widgetFor,
}: {
    entry: any
    widgetFor: any
}) => <NetzwerkPageTemplate content={widgetFor('body')} />

export default NetzwerkPagePreview
