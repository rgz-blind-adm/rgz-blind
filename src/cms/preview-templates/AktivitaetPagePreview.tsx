import React from 'react'
import moment from 'moment'
import { AktivitaetPostTemplate } from '../../templates/aktivitaet-post'

const AktivitaetPagePreview = ({
    entry,
    widgetFor,
}: {
    entry: any
    widgetFor: any
}) => (
    <AktivitaetPostTemplate
        title={entry.getIn(['data', 'title'])}
        content={widgetFor('body')}
        date={moment(entry.getIn(['data', 'date'])).format('DD.MM.YYYY')}
        anmeldeformularanzeigen={entry.getIn([
            'data',
            'anmeldeformularanzeigen',
        ])}
    />
)

export default AktivitaetPagePreview
