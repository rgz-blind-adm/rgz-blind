import CMS from 'netlify-cms-app'
import AktivitaetPagePreview from './preview-templates/AktivitaetPagePreview'
import SpendenPagePreview from './preview-templates/SpendenPagePreview'
import ImpressumPagePreview from './preview-templates/ImpressumPagePreview'
import UeberUnsPagePreview from './preview-templates/UeberUnsPagePreview'
import KochrezeptPagePreview from './preview-templates/KochrezeptPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import NetzwerkPagePreview from './preview-templates/NetzwerkPagePreview'
import TalentPagePreview from './preview-templates/TalentPagePreview'
import GruppePagePreview from './preview-templates/GruppePagePreview'

CMS.registerPreviewTemplate('aktivitaetpost', AktivitaetPagePreview)
CMS.registerPreviewTemplate('gruppepost', GruppePagePreview)
CMS.registerPreviewTemplate('spenden', SpendenPagePreview)
CMS.registerPreviewTemplate('impressum', ImpressumPagePreview)
CMS.registerPreviewTemplate('netzwerk', NetzwerkPagePreview)
CMS.registerPreviewTemplate('ueberuns', UeberUnsPagePreview)
CMS.registerPreviewTemplate('talente', TalentPagePreview)
CMS.registerPreviewTemplate('kochrezepte', KochrezeptPagePreview)
CMS.registerPreviewTemplate('index', IndexPagePreview)
