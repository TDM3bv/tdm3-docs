---
outline: deep
---
# Hoe factureren en aanleveren?

Deze pagina beschrijft hoe het pakket correcties, herindieningen en crediteringen doorgeeft, en hoe het bestand bij TDM3 terechtkomt.

## Type facturering

Het veld `TypeFacturering` op [uitgevoerdezorg](/nurse/nodes#node-uitgevoerdezorg) geeft aan hoe de zorg gefactureerd wordt.

| Code | Betekenis |
| --- | --- |
| 0 | Standaard. Dit is de gebruikelijke waarde. |
| 1 | Herindiening. TDM3 behandelt deze waarde als 0, zie [Herindieningen](#herindieningen). |
| 3 | Creditering (kredietnota) |
| 5 | Correctie forfait: enkel de zorgen met het nieuwe profiel, zie [Correctie forfait](#correctie-forfait-afscoring) |

## Correcties en verwerpingen

Verworpen of te corrigeren zorg ziet de praktijk in de prestatie- en betalingsoverzichten van TDM3. Er zijn dan twee wegen:

- **In het pakket**: de zorg corrigeren en opnieuw exporteren.
- **Door TDM3**: TDM3 crediteert of herindient zelf, ook in bulk.

TDM3 verwerkt allerhande regularisaties en afscoringen, en houdt dubbele facturatie tegen.

## Herindieningen

Vul in de gewone situatie altijd `TypeFacturering` = 0 in, ook bij een herindiening. TDM3 verstuurt de factuur en rekent ze af, en bepaalt dus zelf op basis van de facturatiehistoriek of het om een herindiening gaat. TDM3 vult de gegevens aan waarover het pakket niet beschikt.

De waarde 1 mag meekomen, maar TDM3 behandelt ze als 0.

## Creditering

Met `TypeFacturering` = 3 geeft het pakket de zorg of zorgdag door die gecrediteerd moet worden. Dat zijn enkel minlijnen. Het pakket geeft geen gegevens van de oorspronkelijke factuur mee: TDM3 zoekt die op. Een creditering kan enkel op aanvaarde zorgdagen.

Een creditering en een herindiening zijn twee aparte lijnen. Op een creditering hoeft geen herindiening te volgen, bijvoorbeeld wanneer zorg onterecht werd gefactureerd. Moet er daarna wel gecorrigeerde zorg gefactureerd worden, dan komt die als aparte uitgevoerdezorg mee.

## Correctie forfait (afscoring)

Wanneer het profiel van een patiënt na het bezoek van de adviserend geneesheer wordt afgescoord, maakt TDM3 een correctiefactuur:

- Het oorspronkelijke forfait komt niet mee: TDM3 haalt de oorspronkelijke facturatie zelf op.
- Het pakket geeft de zorgen van de betrokken dagen opnieuw door, samen met het nieuwe profiel, met `TypeFacturering` = 5 op die zorgen.
- TDM3 zet de oorspronkelijke factuurlijnen in min en de nieuwe factuurlijnen in plus. Dit is het enige type waarbij min- en pluslijnen in dezelfde factuur staan.

Een correctie forfait kan enkel bij een profiel met forfaitdagen (A, B, C, PA, PB, PC) of bij T7 en P7.

Werd de oorspronkelijke facturatie niet door TDM3 of onder een ander groepsnummer uitgevoerd, dan kan dat niet via het bestand. Dat vraagt een manuele tussenkomst van een tarificateur van TDM3.

Voorbeeld van een afscoring van profiel A naar T7:

```xml
<profielen>
    <externeid>2</externeid>
    <startdatum>2018-04-01T00:00:00</startdatum>
    <einddatum>2018-04-30T00:00:00</einddatum>
    <patientgegevens_id>341</patientgegevens_id>
    <profiel>T7</profiel>
</profielen>
<uitgevoerdezorg>
    <input_uitgevoerdezorg_id>7007</input_uitgevoerdezorg_id>
    <externeid>423</externeid>
    <datumuitvoering>2018-04-28T11:00:00</datumuitvoering>
    <remgeld>0</remgeld>
    <nomenclatuurnummer>425515</nomenclatuurnummer>
    <pseudocodenummer>000000</pseudocodenummer>
    <kb90bedrag/>
    <kb90omschrijving/>
    <rizivnummerzorgkundige/>
    <naamzorgkundige/>
    <rizivnummerverpleegkundige>149488014401</rizivnummerverpleegkundige>
    <ziekenfondscode>322</ziekenfondscode>
    <patientgegevens_id>341</patientgegevens_id>
    <bezoeknummer>1</bezoeknummer>
    <rep_typebestemmeling_id>1</rep_typebestemmeling_id>
    <insuline>false</insuline>
    <derdebetalercode/>
    <derdebetalernaam/>
    <derdebetaleradres/>
    <polisnummer/>
    <dossiernummer/>
    <datumongeval/>
    <werkgever/>
    <ZHOpname/>
    <Locatie/>
    <TypeFacturering>5</TypeFacturering>
</uitgevoerdezorg>
```

Zie ook [voorbeeld 12 van artikel 8](/nurse/artikel8#voorbeeld-12-correctieforfait-na-afscoring-van-het-profiel).

## Aanlevering

- Het pakket levert per praktijk (verenigingscode) en per facturatiemaand normaal gezien één bestand aan. Meerdere bestanden voor dezelfde praktijk en maand mogen: TDM3 voegt ze samen.
- De node [facturatieperiode](/nurse/nodes#node-facturatieperiode) bevat het jaar en de maand van de verwerking.
- Het kanaal waarlangs de bestanden bij TDM3 komen (bijvoorbeeld SFTP), spreekt het softwarehuis af met TDM3.
