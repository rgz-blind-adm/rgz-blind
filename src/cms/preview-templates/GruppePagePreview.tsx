import React from 'react'
import { GruppePostTemplate } from '../../templates/gruppe-post'

const GruppePagePreview = ({
    entry,
    widgetFor,
}: {
    entry: any
    widgetFor: any
}) => <GruppePostTemplate content={widgetFor('body')} />

export default GruppePagePreview
