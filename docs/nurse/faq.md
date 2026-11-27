---
outline: deep
---
# Veelgestelde vragen

Vragen van softwarehuizen over het prestatiebestand, met het antwoord van TDM3.

## Is bezoeknummer uniek in het hele bestand, of per patiënt?

*Is `bezoeknummer` op uitgevoerdezorg het unieke nummer van het bezoek in het hele bestand, of is het uniek per patiënt (eerste, tweede, derde bezoek van die patiënt)?*

`bezoeknummer` is het volgnummer van het bezoek bij de patiënt op die dag, van 1 tot en met 10. Het is geen uniek id in het bestand.

- Alle zorgen van hetzelfde bezoek hebben hetzelfde nummer.
- De [lezingidentiteit](/nurse/nodes#node-lezingidentiteit) wordt gekoppeld op patiënt, datum en bezoeknummer.
- De volgorde van de basisverstrekkingen (eerste, tweede, derde) volgt het tijdstip in `datumuitvoering`, niet het bezoeknummer.

## Moet ruraal een string of een boolean zijn?

*In het XSD is `ruraal` op patientgegevens een xs:string en op adres een xs:boolean. Moeten ze allebei boolean zijn?*

Het XSD is historisch gegroeid: `ruraal` is op patientgegevens een string en op adres een boolean. Vul op beide plaatsen `true` of `false` in.

Let op: de waarden `1`, `0` of een leeg veld worden gelezen als `false`. Zie ook [Toegestane waarden](/nurse/nodes#toegestane-waarden).
