import React from 'react'
import { TalentItemTemplate } from '../../templates/talent-item'

const TalentPagePreview = ({
    entry,
    widgetFor,
}: {
    entry: any
    widgetFor: any
}) => <TalentItemTemplate content={widgetFor('body')} />

export default TalentPagePreview
