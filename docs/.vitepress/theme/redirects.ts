// De pagina /nurse/ is opgesplitst in /nurse/wie, /nurse/wat, /nurse/aan-wie en /nurse/hoe.
// Bestaande links naar een anker op /nurse/ (in mails, presentaties, bladwijzers) sturen we door
// naar de nieuwe plaats. Ook de hernoemde ankers op /nurse/nodes staan hier.
const nurseIndex: Record<string, string> = {
  'beschrijving-batch-xml': '/nurse/',
  'algemene-opmerkingen': '/nurse/#principes',
  'toevoegingen-door-tdm3': '/nurse/wat#wat-tdm3-zelf-toevoegt',
  'pseudocodes-die-wel-kunnen-meegegeven-worden-in-het-xml-bestand': '/nurse/wat#pseudocodes-die-wel-meekomen',
  'samenvoegen-van-verstrekkingen-binnen-eenzelfde-bezoek': '/nurse/wat#samenvoegen-binnen-eenzelfde-bezoek',
  'email': '/nurse/aan-wie#factuur-aan-de-patient',
  'factuur-aan-patient': '/nurse/aan-wie#factuur-aan-de-patient',
  'factuur-aan-derdebetaler': '/nurse/aan-wie#factuur-aan-een-derdebetaler',
  'remgeld': '/nurse/aan-wie#remgeld',
  'herindieningen': '/nurse/hoe#herindieningen',
  'zorgen-zonder-riziv-nomenclatuur': '/nurse/wat#zorg-zonder-riziv-nomenclatuur-kb90',
  'locatie-veld-bij-node-uitgevoerde-zorg': '/nurse/wat#betrekkelijke-verstrekking-locatie',
  'pijnpompcodes': '/nurse/wat#pijnpompcodes',
  'het-doorgeven-van-een-afscoring-forfait': '/nurse/hoe#correctie-forfait-afscoring',
  'covid19-crisis-instructies': '/nurse/wat#diabeteseducatie-via-videoconsultatie-covid19',
  'diabeteseducatie-via-videoconsultatie-tijdens-de-covid19-crisis': '/nurse/wat#diabeteseducatie-via-videoconsultatie-covid19',
  'hervorming-wondzorg-nomenclatuur-december-2022': '/nurse/wat#complexe-wondzorg',
  'facturatie-pseudocodes-thuishospitalisatie-juli-2023': '/nurse/wat#thuishospitalisatie',
  'wijziging-inzetbaarheid-zorgkundigen-01-2024': '/nurse/wie#zorgkundigen-bij-palliatieve-zorg-vanaf-01-2024',
  'referentienummer-digitaal-verwijsvoorschrift': '/nurse/wat#digitaal-verwijsvoorschrift',
  'adressering-busnummers-factuur-aan-patient-en-bewijsstuk': '/nurse/aan-wie#adressering-en-busnummers',
  'voorbeeld-1-post-adres-patientfactuur-met-busnummer': '/nurse/aan-wie#voorbeeld-1-postadres-van-de-patientfactuur-met-busnummer',
  'voorbeeld-2-bewijsstuk-bestemmeling-met-busnummer': '/nurse/aan-wie#voorbeeld-2-bestemmeling-van-het-bewijsstuk-met-busnummer',
  'voorbeeld-3-gecombineerd-beide-adressen-met-busnummer': '/nurse/aan-wie#voorbeeld-3-beide-adressen-met-busnummer',
  'voorbeelden-artikel-8': '/nurse/artikel8',
  'pilootproject-artikel-56': '/nurse/artikel56'
}

const nurseNodes: Record<string, string> = {
  'element-adres-op-node-patientgegeven': '/nurse/nodes#element-adres-op-node-patientgegevens',
  'voorbeeld-patientgegeven': '/nurse/nodes#voorbeeld-patientgegevens',
  'node-kennsigevingwondzorg': '/nurse/nodes#node-kennisgevingwondzorg',
  'node-betaler-voorstel': '/nurse/nodes#node-betaler',
  'type-metadata-en-optioneel-element-metadata-op-patientgegeven-en-uitgevoerdezorg': '/nurse/nodes#type-metadata',
  'xml-nodes': '/nurse/nodes#node-pakketgegevens',
  'opmerkingen': '/nurse/nodes#algemene-regels',
  'het-datetime-formaat': '/nurse/nodes#het-datetime-formaat'
}

function normalize(path: string): string {
  return path.replace(/\.html$/, '').replace(/\/index$/, '/')
}

// Geeft de nieuwe url terug voor een oud anker, of undefined als er niets door te sturen is.
export function redirectFor(pathname: string, hash: string): string | undefined {
  if (!hash) return undefined
  const anchor = decodeURIComponent(hash.replace(/^#/, ''))
  const path = normalize(pathname)
  if (path === '/nurse/' || path === '/nurse') return nurseIndex[anchor]
  if (path === '/nurse/nodes') return nurseNodes[anchor]
  return undefined
}
