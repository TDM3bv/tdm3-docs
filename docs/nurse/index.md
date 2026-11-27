---
outline: deep
---
# Het prestatiebestand thuisverpleging

Het prestatiebestand (nurse-xml) is het XML-bestand waarmee een softwarepakket voor thuisverpleging de geregistreerde zorg aan TDM3 bezorgt. De zorgverlener registreert de zorg in het pakket, het pakket exporteert het prestatiebestand, en TDM3 doet de rest van de keten: valideren, opkuisen en aanvullen, factureren, verzenden en afrekenen met ziekenfondsen, verzekeringen, OCMW's, medische huizen en patiënten, en doorstorten aan de praktijk.

::: tip Specificatie
- [XSD-schema downloaden](/schemas/tdm3prestatiebestand.xsd)
- [Nodes](/nurse/nodes): alle elementen van het bestand, met type en betekenis
- [Veelgestelde vragen](/nurse/faq): vragen van softwarehuizen, met het antwoord van TDM3
- [Changelog](/nurse/CHANGELOG): wijzigingen aan de specificatie
:::

## Principes

- **Eén richting.** Het pakket exporteert, TDM3 verwerkt. TDM3 koppelt niet terug naar het pakket: de zorgverlener en de praktijk volgen het resultaat op via de prestatie- en betalingsoverzichten van TDM3.
- **Per praktijk, per facturatiemaand.** Normaal gezien levert het pakket één bestand per praktijk per facturatiemaand. Meerdere bestanden voor dezelfde praktijk en maand mogen ook: TDM3 voegt ze samen.
- **De verenigingscode is verplicht.** Ze identificeert de praktijk en wordt door TDM3 toegekend. Zie [Wie](/nurse/wie#de-praktijk).
- **Een eigen softwarehuiscode.** Elk softwarepakket krijgt van TDM3 een code voor de node [softwarehuis](/nurse/nodes#node-softwarehuis).
- **Geen tarificatielogica in het pakket.** Forfaits, basisverstrekkingen en supplementen voegt TDM3 zelf toe. Zie [Wat TDM3 zelf toevoegt](/nurse/wat#wat-tdm3-zelf-toevoegt).
- **Dicht bij de RIZIV-facturatie-instructies.** De velden volgen de instructies zo nauw mogelijk. Optionele velden dienen voor maatwerk en een rijkere dataset: niet elk pakket hoeft alles aan te leveren.

## Opbouw van het bestand

De kop van het bestand bestaat uit de nodes [softwarehuis](/nurse/nodes#node-softwarehuis), [tarificatiedienst](/nurse/nodes#node-tarificatiedienst) en [facturatieperiode](/nurse/nodes#node-facturatieperiode). De rest van het bestand beantwoordt vier vragen.

| | Vraag | Belangrijkste gegevens |
| --- | --- | --- |
| **[Wie](/nurse/wie)** | Wie voert de zorg uit? | [vereniging](/nurse/nodes#node-vereniging): de verenigingscode is de praktijk. De zorgverlener: RIZIV-nummers op [uitgevoerdezorg](/nurse/nodes#node-uitgevoerdezorg). |
| **[Wat](/nurse/wat)** | Welke zorg, bij welke patiënt? | [patientgegevens](/nurse/nodes#node-patientgegevens), [uitgevoerdezorg](/nurse/nodes#node-uitgevoerdezorg), [profielen](/nurse/nodes#node-profielen), [lezingidentiteit](/nurse/nodes#node-lezingidentiteit), [kennisgevingwondzorg](/nurse/nodes#node-kennisgevingwondzorg). Zorg zonder RIZIV-nomenclatuur via 426856 (KB90). |
| **[Aan wie](/nurse/aan-wie)** | Wie betaalt? | Type bestemmeling, derdebetalergegevens, de patiënt als betaler: remgeld en kanaal van de patiëntfactuur. |
| **[Hoe](/nurse/hoe)** | Hoe wordt er gefactureerd en aangeleverd? | Type facturering 0, 1, 3 of 5: correcties, herindieningen en crediteringen. Aanlevering per praktijk per maand. |

## Voorbeelden

- [Voorbeelden artikel 8](/nurse/artikel8): twaalf uitgewerkte situaties (forfaitpatiënt, meerdere bezoeken per dag, zorgkundige, palliatieve patiënt, complexe wondzorg, KB90, correctieforfait, ...).
- [Pilootproject artikel 56](/nurse/artikel56): bijkomende instructies voor praktijken in het pilootproject nieuwe praktijkfinanciering.
- [Volledig voorbeeld](/nurse/nodes#volledig-voorbeeld) van een prestatiebestand.

![Structuur van het prestatiebestand](https://www.plantuml.com/plantuml/svg/NP5HRiCW44J_VGha_roXobLe6CZMBY30jkJJPupNITMl6UtpB0E-rsPBMtxd8IO7ausjPinscj020bR4EfweTbIJRvijU2voWMoRffeW_e_jgOIE5o5Q4uh3CLCyO--KAZ68um9faAQOvJgcYfV7SOBZ8VNY-SIvo4_zHi64o3KALvoKod7uW5oIrrpoWXbHmNQMuPOebMqPsL9qV_fw--YVKDjIZZuPHKZ6OSZcTlioLPNFeUw8g-KrrV56whZgYbmZDdwFabUxxSCTqV5VlG00)
