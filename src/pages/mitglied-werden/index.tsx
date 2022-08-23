import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'
import { Helmet } from 'react-helmet'

function encode(data: any) {
    return Object.keys(data)
        .map(
            (key) =>
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&')
}

export default class Index extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = { isValidated: false }
    }

    handleChange = (e: any) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e: any) => {
        e.preventDefault()
        const form = e.target
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
                'form-name': form.getAttribute('name'),
                ...this.state,
            }),
        })
            .then(() => navigate(form.getAttribute('action')))
            .catch((error) => alert(error))
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <title>
                        Mitglied werden - Schweizerischer Blindenbund
                        Regionalgruppe Zürich
                    </title>
                    <meta
                        name="description"
                        content="Anmeldeformular, um Mitglied zu werden bei der Regionalgruppe Zürich des Schweizerischen Blindenbunds."
                    />
                    <meta property="og:title" content="Mitglied werden" />
                    <meta
                        property="og:description"
                        content={`Anmeldeformular, um Mitglied zu werden bei der Regionalgruppe Zürich des Schweizerischen Blindenbunds.`}
                    />
                    <meta
                        property="og:url"
                        content={`https://www.rgz-blind.ch/mitglied-werden/`}
                    />
                </Helmet>
                <section className="section">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-10 is-offset-1">
                                <div className="content">
                                    <h1>Mitglied werden</h1>
                                    <p>
                                        Wenn Sie Interesse haben, Mitglied bei
                                        der Regionalgruppe Zürich zu werden,
                                        dann füllen Sie bitte das nachstehende
                                        Formular aus. Wir werden uns dann bei
                                        Ihnen melden.
                                    </p>
                                    <p>
                                        Die Aktivmitgliedschaft ist für
                                        Personen, welche eine Sehbehinderung
                                        haben oder blind sind. Der jährliche
                                        Mitgliederbeitrag für Aktivmitglieder
                                        beträgt CHF 40. Für Passivmitglieder
                                        beträgt der Mitgliederbeitrag CHF 30.
                                    </p>
                                    <h2>Anmeldeformular</h2>
                                    <form
                                        name="mitglied-werden"
                                        method="post"
                                        action="/kontakt/danke/"
                                        data-netlify="true"
                                        data-netlify-honeypot="bot-field"
                                        onSubmit={this.handleSubmit}
                                    >
                                        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                                        <input
                                            type="hidden"
                                            name="form-name"
                                            value="mitglied-werden"
                                        />
                                        <div hidden>
                                            <label>
                                                Nicht ausfüllen:{' '}
                                                <input
                                                    name="bot-field"
                                                    onChange={this.handleChange}
                                                />
                                            </label>
                                        </div>
                                        <fieldset className="mb-5">
                                            <legend className="label">
                                                Art der Mitgliedschaft
                                            </legend>
                                            <div className="field">
                                                <div className="control">
                                                    <label className="radio mr-3">
                                                        <input
                                                            type="radio"
                                                            name="mitgliedschaft"
                                                            id="Aktivmitglied"
                                                            value="Aktivmitglied"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            className="mr-1"
                                                            checked
                                                        />{' '}
                                                        Aktivmitglied
                                                    </label>
                                                    <label className="radio">
                                                        <input
                                                            type="radio"
                                                            name="mitgliedschaft"
                                                            value="Passivmitglied"
                                                            id="Passivmitglied"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            className="mr-1"
                                                        />{' '}
                                                        Passivmitglied
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset className="mb-5">
                                            <legend className="label">
                                                Anrede
                                            </legend>
                                            <div className="field">
                                                <div className="control">
                                                    <label className="radio mr-3">
                                                        <input
                                                            type="radio"
                                                            name="anrede"
                                                            value="Herr"
                                                            id="anrede-herr"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            className="mr-1"
                                                            checked
                                                        />{' '}
                                                        Herr
                                                    </label>
                                                    <label className="radio">
                                                        <input
                                                            type="radio"
                                                            name="anrede"
                                                            value="Frau"
                                                            id="anrede-frau"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            className="mr-1"
                                                        />{' '}
                                                        Frau
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <div className="field mb-5">
                                            <label
                                                className="label"
                                                htmlFor={'name'}
                                            >
                                                Vor- und Nachname*
                                            </label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type={'text'}
                                                    name={'name'}
                                                    onChange={this.handleChange}
                                                    id={'name'}
                                                    required={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="field mb-5">
                                            <label
                                                className="label"
                                                htmlFor={'strasse'}
                                            >
                                                Strasse*
                                            </label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type={'text'}
                                                    name={'strasse'}
                                                    onChange={this.handleChange}
                                                    id={'strasse'}
                                                    required={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="field mb-5">
                                            <label
                                                className="label"
                                                htmlFor={'plzort'}
                                            >
                                                PLZ und Ort*
                                            </label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type={'text'}
                                                    name={'plzort'}
                                                    onChange={this.handleChange}
                                                    id={'plzort'}
                                                    required={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="field mb-5">
                                            <label
                                                className="label"
                                                htmlFor={'kanton'}
                                            >
                                                Kanton
                                            </label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type={'text'}
                                                    name={'kanton'}
                                                    onChange={this.handleChange}
                                                    id={'kanton'}
                                                />
                                            </div>
                                        </div>
                                        <div className="field mb-5">
                                            <label
                                                className="label"
                                                htmlFor={'telefonprivat'}
                                            >
                                                Telefon Privat
                                            </label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type={'tel'}
                                                    name={'telefonprivat'}
                                                    onChange={this.handleChange}
                                                    id={'telefonprivat'}
                                                />
                                            </div>
                                        </div>
                                        <div className="field mb-5">
                                            <label
                                                className="label"
                                                htmlFor={'handynummer'}
                                            >
                                                Handynummer
                                            </label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type={'tel'}
                                                    name={'handynummer'}
                                                    onChange={this.handleChange}
                                                    id={'handynummer'}
                                                />
                                            </div>
                                        </div>
                                        <div className="field mb-5">
                                            <label
                                                className="label"
                                                htmlFor={'email'}
                                            >
                                                Email
                                            </label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type={'email'}
                                                    name={'email'}
                                                    onChange={this.handleChange}
                                                    id={'email'}
                                                />
                                            </div>
                                        </div>
                                        <div className="field mb-5">
                                            <label
                                                className="label"
                                                htmlFor={'beruf'}
                                            >
                                                Beruf
                                            </label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type={'text'}
                                                    name={'beruf'}
                                                    onChange={this.handleChange}
                                                    id={'beruf'}
                                                />
                                            </div>
                                        </div>
                                        <div className="field mb-5">
                                            <label
                                                className="label"
                                                htmlFor={'geburtsdatum'}
                                            >
                                                Geburtsdatum
                                            </label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type={'date'}
                                                    name={'geburtsdatum'}
                                                    onChange={this.handleChange}
                                                    id={'geburtsdatum'}
                                                />
                                            </div>
                                        </div>
                                        <div className="field mb-5">
                                            <label
                                                className="label"
                                                htmlFor={'zivilstand'}
                                            >
                                                Zivilstand
                                            </label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type={'text'}
                                                    name={'zivilstand'}
                                                    onChange={this.handleChange}
                                                    id={'zivilstand'}
                                                />
                                            </div>
                                        </div>
                                        <fieldset className="mb-5">
                                            <legend className="label">
                                                Grad der Sehbehinderung
                                            </legend>
                                            <div className="field">
                                                <div className="control">
                                                    <label className="radio mr-3">
                                                        <input
                                                            type="radio"
                                                            name="grad-sehbehinderung"
                                                            value="Keine Sehbehinderung"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            id="keine-sehbehinderung"
                                                            className="mr-1"
                                                            checked
                                                        />{' '}
                                                        keine Sehbehinderung
                                                    </label>
                                                    <label className="radio mr-3">
                                                        <input
                                                            type="radio"
                                                            name="grad-sehbehinderung"
                                                            value="stark sehbehindert"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            id="stark-sehbehindert"
                                                            className="mr-1"
                                                        />{' '}
                                                        stark sehbehindert
                                                    </label>
                                                    <label className="radio mr-3">
                                                        <input
                                                            type="radio"
                                                            name="grad-sehbehinderung"
                                                            value="Sehrest"
                                                            id="sehrest"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            className="mr-1"
                                                        />{' '}
                                                        Sehrest
                                                    </label>
                                                    <label className="radio">
                                                        <input
                                                            type="radio"
                                                            name="grad-sehbehinderung"
                                                            value="blind"
                                                            id="blind"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            className="mr-1"
                                                        />{' '}
                                                        blind
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <div className="field mb-5">
                                            <label
                                                className="label"
                                                htmlFor={
                                                    'seit-wann-sehbehindert-oder-blind'
                                                }
                                            >
                                                Falls sehbehindert oder blind,
                                                seit wann?
                                            </label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type={'text'}
                                                    name={
                                                        'seit-wann-sehbehindert-oder-blind'
                                                    }
                                                    onChange={this.handleChange}
                                                    id={
                                                        'seit-wann-sehbehindert-oder-blind'
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="field mb-5">
                                            <label
                                                className="label"
                                                htmlFor={'erwartungen-sbb'}
                                            >
                                                Was erwarten Sie vom
                                                Schweizerischen Blindenbund?
                                            </label>
                                            <div className="control">
                                                <textarea
                                                    className="textarea"
                                                    name={'erwartungen-sbb'}
                                                    onChange={this.handleChange}
                                                    id={'erwartungen-sbb'}
                                                />
                                            </div>
                                        </div>
                                        <fieldset className="mb-5">
                                            <legend className="label">
                                                Welche Beratungsstelle würden
                                                Sie ggf. aufsuchen?
                                            </legend>
                                            <div className="field">
                                                <div className="control">
                                                    <label className="radio mr-3">
                                                        <input
                                                            type="radio"
                                                            name="aufzusuchende-beratungsstelle"
                                                            value="Keine Beratungsstelle"
                                                            id="keine-beratungsstelle"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            className="mr-1"
                                                            checked
                                                        />{' '}
                                                        Keine
                                                    </label>
                                                    <label className="radio mr-3">
                                                        <input
                                                            type="radio"
                                                            name="aufzusuchende-beratungsstelle"
                                                            value="Aarau"
                                                            id="aarau"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            className="mr-1"
                                                        />{' '}
                                                        Aarau
                                                    </label>
                                                    <label className="radio mr-3">
                                                        <input
                                                            type="radio"
                                                            name="aufzusuchende-beratungsstelle"
                                                            value="Brig"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            id="brig"
                                                            className="mr-1"
                                                        />
                                                        Brig
                                                    </label>
                                                    <label className="radio mr-3">
                                                        <input
                                                            type="radio"
                                                            name="aufzusuchende-beratungsstelle"
                                                            value="Schaffhausen"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            id="schaffhausen"
                                                            className="mr-1"
                                                        />{' '}
                                                        Schaffhausen
                                                    </label>
                                                    <label className="radio mr-3">
                                                        <input
                                                            type="radio"
                                                            name="aufzusuchende-beratungsstelle"
                                                            value="Thun"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            id="thun"
                                                            className="mr-1"
                                                        />{' '}
                                                        Thun
                                                    </label>
                                                    <label className="radio mr-3">
                                                        <input
                                                            type="radio"
                                                            name="aufzusuchende-beratungsstelle"
                                                            value="Uznach"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            id="uznach"
                                                            className="mr-1"
                                                        />{' '}
                                                        Uznach
                                                    </label>
                                                    <label className="radio mr-3">
                                                        <input
                                                            type="radio"
                                                            name="aufzusuchende-beratungsstelle"
                                                            value="Winterthur"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            id="winterthur"
                                                            className="mr-1"
                                                        />{' '}
                                                        Winterthur
                                                    </label>
                                                    <label className="radio">
                                                        <input
                                                            type="radio"
                                                            name="aufzusuchende-beratungsstelle"
                                                            value="Zürich"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            id="zürich"
                                                            className="mr-1"
                                                        />{' '}
                                                        Zürich
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset className="mb-5">
                                            <legend className="label">
                                                Können Sie Blindenschrift lesen?
                                            </legend>
                                            <div className="field">
                                                <div className="control">
                                                    <p>
                                                        <label className="checkbox mr-3">
                                                            <input
                                                                type="checkbox"
                                                                name="kann-vollschrift-lesen"
                                                                value="Kann Vollschrift lesen"
                                                                id="kann-vollschrift-lesen"
                                                                onChange={
                                                                    this
                                                                        .handleChange
                                                                }
                                                                className="mr-1"
                                                            />{' '}
                                                            Kann Vollschrift
                                                            lesen
                                                        </label>
                                                    </p>
                                                    <p>
                                                        <label className="checkbox mr-3">
                                                            <input
                                                                type="checkbox"
                                                                name="kann-kurzschrift-lesen"
                                                                value="Kann Kurzschrift lesen"
                                                                onChange={
                                                                    this
                                                                        .handleChange
                                                                }
                                                                id="kann-kurzschrift-lesen"
                                                                className="mr-1"
                                                            />{' '}
                                                            Kann Kurzschrift
                                                            lesen
                                                        </label>
                                                    </p>
                                                    <p>
                                                        <label className="checkbox">
                                                            <input
                                                                type="checkbox"
                                                                name="kann-blindenschrift-nicht-lesen"
                                                                value="Kann Blindenschrift nicht"
                                                                onChange={
                                                                    this
                                                                        .handleChange
                                                                }
                                                                id="kann-blindenschrift-nicht-lesen"
                                                                className="mr-1"
                                                            />{' '}
                                                            Kann Blindenschrift
                                                            nicht
                                                        </label>
                                                    </p>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset className="mb-5">
                                            <legend className="label">
                                                In welcher Form möchten Sie die
                                                Unterlagen des Schweizerischen
                                                Blindenbundes erhalten?
                                            </legend>
                                            <div className="field">
                                                <div className="control">
                                                    <p>
                                                        <label className="checkbox mr-3">
                                                            <input
                                                                type="checkbox"
                                                                name="unterlagen-in-schwarzschrift"
                                                                value="in Schwarzschrift (per Post)"
                                                                onChange={
                                                                    this
                                                                        .handleChange
                                                                }
                                                                id="unterlagen-in-schwarzschrift"
                                                                className="mr-1"
                                                            />{' '}
                                                            in Schwarzschrift
                                                            (per Post)
                                                        </label>
                                                    </p>
                                                    <p>
                                                        <label className="checkbox mr-3">
                                                            <input
                                                                type="checkbox"
                                                                name="unterlagen-in-blindenschrift"
                                                                value="in Blindenschrift (Kurzschrift, nur in deutsch)"
                                                                onChange={
                                                                    this
                                                                        .handleChange
                                                                }
                                                                id="unterlagen-in-blindenschrift"
                                                                className="mr-1"
                                                            />{' '}
                                                            in Blindenschrift
                                                            (Kurzschrift, nur in
                                                            deutsch)
                                                        </label>
                                                    </p>
                                                    <p>
                                                        <label className="checkbox">
                                                            <input
                                                                type="checkbox"
                                                                name="unterlagen-per-email"
                                                                value="per E-Mail"
                                                                onChange={
                                                                    this
                                                                        .handleChange
                                                                }
                                                                id="unterlagen-per-email"
                                                                className="mr-1"
                                                            />{' '}
                                                            per E-Mail
                                                        </label>
                                                    </p>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset className="mb-5">
                                            <legend className="label">
                                                Besitzen Sie einer der folgenden
                                                Ausweiskarten?
                                            </legend>
                                            <div className="field">
                                                <div className="control">
                                                    <p>
                                                        <label className="checkbox mr-3">
                                                            <input
                                                                type="checkbox"
                                                                name="besitzt-begleiterkarte"
                                                                value="Besitzt Begleiterkarte"
                                                                onChange={
                                                                    this
                                                                        .handleChange
                                                                }
                                                                id="besitzt-begleiterkarte"
                                                                className="mr-1"
                                                            />{' '}
                                                            Begleiterkarte
                                                            ("Ausweiskarte für
                                                            behinderteReisende")
                                                            der Schweiz.
                                                            Transportunternehmen
                                                        </label>
                                                    </p>
                                                    <p>
                                                        <label className="checkbox mr-3">
                                                            <input
                                                                type="checkbox"
                                                                name="besitzt-jahreskarte-voev"
                                                                value="Besitzt Jahreskarte VöV"
                                                                onChange={
                                                                    this
                                                                        .handleChange
                                                                }
                                                                id="besitzt-jahreskarte-voev"
                                                                className="mr-1"
                                                            />{' '}
                                                            Jahreskarte für
                                                            Blinde und
                                                            Sehbehinderte des
                                                            VöV
                                                            (Nahverkehrsunternehmungen)?
                                                        </label>
                                                    </p>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <div className="field mb-5">
                                            <label
                                                className="label"
                                                htmlFor={
                                                    'aufmerksam-auf-sbb-durch-wen'
                                                }
                                            >
                                                Durch wen sind Sie auf den
                                                Schweizerischen Blindenbund
                                                aufmerksam gemacht worden?
                                            </label>
                                            <div className="control">
                                                <textarea
                                                    className="textarea"
                                                    name={
                                                        'aufmerksam-auf-sbb-durch-wen'
                                                    }
                                                    onChange={this.handleChange}
                                                    id={
                                                        'aufmerksam-auf-sbb-durch-wen'
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <fieldset className="mb-5">
                                            <legend className="label">
                                                Um ihre Aufgaben wahrnehmen zu
                                                können, sind unsere
                                                Regionalgruppen auf aktive
                                                Mitarbeit ihrer Mitglieder sowie
                                                freiwillige Helfende angewiesen.
                                                Dürfen wir Sie bei Bedarf
                                                anfragen, ob Sie bereits sind,
                                                mitzuhelfen?
                                            </legend>
                                            <div className="field">
                                                <div className="control">
                                                    <label className="radio mr-3">
                                                        <input
                                                            type="radio"
                                                            name="anfrage-mithilfe-erlaubt"
                                                            value="Bereit, mitzuhelfen"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            id="anfrage-mithilfe-ja"
                                                            className="mr-1"
                                                        />{' '}
                                                        Ja
                                                    </label>
                                                    <label className="radio">
                                                        <input
                                                            type="radio"
                                                            name="anfrage-mithilfe-erlaubt"
                                                            value="Nicht bereit, mitzuhelfen"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            id="anfrage-mithilfe-nein"
                                                            className="mr-1"
                                                            checked
                                                        />{' '}
                                                        Nein
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset className="mb-5">
                                            <legend className="label">
                                                Möchten Sie an den
                                                Veranstaltungen der
                                                Regionalgruppe teilnehmen und
                                                Einladungen dafür erhalten?
                                            </legend>
                                            <div className="field">
                                                <div className="control">
                                                    <label className="radio mr-3">
                                                        <input
                                                            type="radio"
                                                            name="moechte-an-veranstaltungen-teilnehmen"
                                                            value="Möchte an Veranstaltungen teilnehmen"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            id="moechte-an-veranstaltungen-teilnehmen-ja"
                                                            className="mr-1"
                                                        />{' '}
                                                        Ja
                                                    </label>
                                                    <label className="radio">
                                                        <input
                                                            type="radio"
                                                            name="moechte-an-veranstaltungen-teilnehmen"
                                                            value="Möchte nicht an Veranstaltungen teilnehmen"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            id="moechte-an-veranstaltungen-teilnehmen-nein"
                                                            className="mr-1"
                                                            checked
                                                        />{' '}
                                                        Nein
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <div className="field">
                                            <button
                                                className="button"
                                                type="submit"
                                            >
                                                Anmeldung abschicken
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }
}
