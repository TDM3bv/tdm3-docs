---
outline: deep
---
# Wie betaalt?

Per uitgevoerde zorg geeft het pakket aan wie de factuur krijgt. Wanneer de patiënt zelf (een deel) betaalt, bepalen het remgeld en het kanaal van de patiëntfactuur hoe dat gebeurt.

## Type bestemmeling

Het veld `rep_typebestemmeling_id` op [uitgevoerdezorg](/nurse/nodes#node-uitgevoerdezorg) bepaalt voor wie de factuur is.

| Code | Bestemmeling |
| --- | --- |
| 1 | Ziekenfonds (verzekeringsinstelling) |
| 2 | Verzekering |
| 3 | Patiënt |
| 4 | OCMW |
| 5 | Medisch huis |

Facturen aan een ziekenfonds (1) verstuurt TDM3 via eFact. De andere bestemmelingen krijgen een factuur van TDM3.

## Derdebetalergegevens

Voor facturen die niet naar een ziekenfonds gaan, identificeren de derdebetalervelden op [uitgevoerdezorg](/nurse/nodes#node-uitgevoerdezorg) de betaler:

- **derdebetalercode**: voor patiëntfacturen het patiëntnummer (een interne id of eigen nummering mag), voor de andere de id van de betaler in het versturende systeem. Maximaal 10 posities.
- **derdebetalernaam** en **derdebetaleradres**: de naam en het adres van de betaler.
- **derdebetaleremail**: optioneel, zie [Factuur aan een derdebetaler](#factuur-aan-een-derdebetaler).
- **polisnummer**, **dossiernummer**, **datumongeval** en **werkgever**: bij facturatie aan een verzekering of bij een arbeidsongeval.

Bij een verzekering (2), de patiënt (3), een OCMW (4) en een medisch huis (5) is `derdebetalercode` of `derdebetalernaam` verplicht. Geef bij voorkeur de code mee. Het adres en het e-mailadres zijn optioneel.

TDM3 koppelt de code per praktijk aan de eigen stamgegevens:

- Bij een onbekende code maakt TDM3 een nieuwe derdebetaler aan met de naam, het adres en het e-mailadres uit het bestand.
- Bij een gekende code gebruikt TDM3 de eigen gegevens. Wijzigingen uit het bestand neemt TDM3 over na review.
- Bij de patiënt (3) worden de naam en het adres de naam en het adres op de factuur.

::: info Node betaler
De node `betaler` is een voorstel om meer gegevens over een betaler mee te geven. Zie [De node betaler](#de-node-betaler-voorstel).
:::

## Remgeld

Remgeld is het deel van het honorarium dat aan de patiënt gevraagd wordt en dus niet door het RIZIV wordt terugbetaald.

Het veld `remgeld` op [uitgevoerdezorg](/nurse/nodes#node-uitgevoerdezorg) is een percentage van het persoonlijk aandeel dat de praktijk vraagt, van 0 tot en met 100. TDM3 berekent het bedrag zelf op basis van het officiële tarief.

| remgeld | Betekenis |
| --- | --- |
| 0 | Geen remgeld voor deze zorg |
| 50 | De patiënt betaalt de helft van het persoonlijk aandeel |
| 100 | De patiënt betaalt het volledige persoonlijk aandeel |

Het remgeld gaat altijd naar de patiënt, en enkel bij zorg die aan het ziekenfonds (type bestemmeling 1) of een medisch huis (type bestemmeling 5) wordt gefactureerd:

- Bij facturatie aan een verzekering (type bestemmeling 2) of een OCMW (type bestemmeling 4) blijft `remgeld` leeg. Is het toch ingevuld, dan negeert TDM3 het.
- Bij facturatie aan de patiënt (type bestemmeling 3) gaat de volledige zorg naar de patiënt.

### De remgeldfactuur bij een andere partij

De remgeldfactuur staat altijd op naam van de patiënt. Moet ze bij een andere partij terechtkomen, bijvoorbeeld een familielid of een bewindvoerder, dan regel je dat via de verzending van de patiëntfactuur:

- **Via patientgegevens**: `kanaalfactuurpatient` met `emailfactuurpatient`, of het postadres van de patiëntfactuur. Zie [Factuur aan de patiënt](#factuur-aan-de-patient).
- **Via een betaler-node** (voorstel): een `betaler` met het rijksregisternummer van de patiënt. Daarmee geef je de verzendwijze gedetailleerder mee. Zie [Remgeld via de betaler-node](#remgeld-via-de-betaler-node).

## Wie betaalt wat

Elke verstrekking is één `uitgevoerdezorg`-node, en elke node heeft één type bestemmeling. Daaruit volgt:

- **Het remgeld is geen aparte node.** Het staat als percentage op de node van de verstrekking. Uit één node met type bestemmeling 1 en `remgeld` = 100 maakt TDM3 twee facturen: een voor het ziekenfonds en een remgeldfactuur voor de patiënt.
- **Een extra dienst is wel een aparte node**, met een eigen type bestemmeling. Zie [vrije nomenclatuur](/nurse/wat#vrije-nomenclatuur).
- **De betaler staat op de node.** Zorgen uit hetzelfde bezoek kunnen dus elk een andere betaler hebben.

De tabel gaat uit van één bezoek met één verstrekking uit de nomenclatuur en één extra dienst. Dat zijn in elke situatie **twee** `uitgevoerdezorg`-nodes. Zonder extra dienst is het er één.

In de tabel staat "bestemmeling" voor het veld `rep_typebestemmeling_id`, en "code" voor `derdebetalercode`.

| Situatie | Node 1: verstrekking uit de nomenclatuur | Node 2: extra dienst (426856) | Wat TDM3 factureert |
| --- | --- | --- | --- |
| 1. Ziekenfonds betaalt, zonder remgeld. Patiënt betaalt de extra dienst. | bestemmeling 1<br>remgeld 0 | bestemmeling 3<br>code | Ziekenfonds: de verstrekking.<br>Patiënt: de extra dienst. |
| 2. Ziekenfonds betaalt. Patiënt betaalt het remgeld en de extra dienst. | bestemmeling 1<br>remgeld 100, of lager | bestemmeling 3<br>code | Ziekenfonds: de verstrekking.<br>Patiënt: het remgeld en de extra dienst. |
| 3. Ziekenfonds betaalt. Een andere partij betaalt de extra dienst. | bestemmeling 1<br>remgeld 0 tot 100 | bestemmeling 2, 4 of 5<br>code | Ziekenfonds: de verstrekking.<br>Patiënt: het remgeld, als er remgeld is.<br>Andere partij: de extra dienst. |
| 4. Patiënt betaalt alles. | bestemmeling 3<br>code | bestemmeling 3<br>code | Patiënt: de volledige verstrekking en de extra dienst. |
| 5. Een andere partij betaalt alles. | bestemmeling 2 of 4<br>code<br>remgeld leeg | bestemmeling 2 of 4<br>code | Andere partij: de verstrekking en de extra dienst.<br>Er is geen remgeld. |

Bij deze situaties hoort nog:

- Het remgeld wordt altijd aan de patiënt gefactureerd. De factuur zelf kan wel bij een andere partij terechtkomen, zie [De remgeldfactuur bij een andere partij](#de-remgeldfactuur-bij-een-andere-partij).
- Bij een andere betaler dan het ziekenfonds (situatie 5) is er geen onderscheid met of zonder remgeld.

### Voorbeeld: ziekenfonds, remgeld en een extra dienst voor de patiënt

Situatie 2 uit de tabel: een wondzorg op voorschrift en incontinentiemateriaal in hetzelfde bezoek. Het zijn twee nodes. Er is geen derde node voor het remgeld.

```xml
<!-- Node 1: de verstrekking. Het ziekenfonds betaalt, de patiënt betaalt het volledige remgeld. -->
<uitgevoerdezorg>
    <input_uitgevoerdezorg_id>9001</input_uitgevoerdezorg_id>
    <externeid>423</externeid>
    <datumuitvoering>2026-02-16T08:00:00</datumuitvoering>
    <datumvoorschrift>2026-02-01T00:00:00</datumvoorschrift>
    <rizivnummervoorschrijver>10828168004</rizivnummervoorschrijver>
    <remgeld>100</remgeld>
    <nomenclatuurnummer>424336</nomenclatuurnummer>
    <rizivnummerverpleegkundige>149488014401</rizivnummerverpleegkundige>
    <patientgegevens_id>341</patientgegevens_id>
    <bezoeknummer>1</bezoeknummer>
    <rep_typebestemmeling_id>1</rep_typebestemmeling_id>
    <insuline>false</insuline>
    <TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>
<!-- Node 2: de extra dienst. De patiënt betaalt. -->
<uitgevoerdezorg>
    <input_uitgevoerdezorg_id>9002</input_uitgevoerdezorg_id>
    <externeid>423</externeid>
    <datumuitvoering>2026-02-16T08:00:00</datumuitvoering>
    <remgeld>0</remgeld>
    <nomenclatuurnummer>000000</nomenclatuurnummer>
    <pseudocodenummer>426856</pseudocodenummer>
    <kb90bedrag>12.50</kb90bedrag>
    <kb90omschrijving>Incontinentiemateriaal</kb90omschrijving>
    <rizivnummerverpleegkundige>149488014401</rizivnummerverpleegkundige>
    <patientgegevens_id>341</patientgegevens_id>
    <bezoeknummer>1</bezoeknummer>
    <rep_typebestemmeling_id>3</rep_typebestemmeling_id>
    <insuline>false</insuline>
    <derdebetalercode>341</derdebetalercode>
    <TypeFacturering>0</TypeFacturering>
    <BtwPercentage>21</BtwPercentage>
    <BedragInclusiefBtw>true</BedragInclusiefBtw>
</uitgevoerdezorg>
```

## Factuur aan de patiënt

Voor facturen aan de patiënt zelf (remgeldfactuur of patiëntfactuur) zijn er twee kanalen, via `kanaalfactuurpatient` op [patientgegevens](/nurse/nodes#node-patientgegevens):

- **Post** (`kanaalfactuurpatient` = 1): verzending per post naar het adres van de patiënt. Dit is ook de standaard wanneer het veld leeg is.
- **E-mail** (`kanaalfactuurpatient` = 2): verzending naar het opgegeven e-mailadres, via een tijdelijke en beveiligde link. De praktijk heeft dan de toestemming van de patiënt om de factuur via dit kanaal te versturen.

Bij e-mail moet `emailfactuurpatient` ingevuld zijn met het e-mailadres waarnaar de factuur verstuurd wordt.

## Factuur aan een derdebetaler

Voor facturen die niet naar een ziekenfonds of de patiënt gaan (verzekering, medisch huis, OCMW, ...) kan `derdebetaleremail` op [uitgevoerdezorg](/nurse/nodes#node-uitgevoerdezorg) het e-mailadres van de derdebetaler bevatten waarnaar de factuur verstuurd mag worden.

Het veld is optioneel en wordt enkel gebruikt wanneer de factuur niet naar een ziekenfonds of de patiënt gaat (`rep_typebestemmeling_id` ≠ 1 en ≠ 3).

## De node betaler (voorstel)

::: warning Nog niet ondersteund
De node `betaler` is een voorstel. Ze staat in het XSD, maar de import van TDM3 verwerkt ze nog niet. Tot dan gelden de [derdebetalergegevens](#derdebetalergegevens) op uitgevoerdezorg.
:::

De derdebetalervelden op uitgevoerdezorg bevatten weinig gegevens: een code, een naam, een adres en een e-mailadres. Ze staan bovendien op elke zorg opnieuw. De node `betaler` beschrijft een betaler één keer per bestand, met meer gegevens: een KBO- of RIZIV-nummer, een eigen referentie van de betaler, een contactpersoon en het kanaal waarlangs de factuur verstuurd wordt (post, eBox, e-mail of Peppol).

### De link met uitgevoerdezorg

- De node staat binnen `pakketgegevens`, naast de andere nodes.
- `betaler.referentienr` is gelijk aan de `derdebetalercode` op de uitgevoerde zorgen van die betaler.
- Per unieke `derdebetalercode` staat er hoogstens één `betaler` in het bestand.
- `betaler.type` is het type bestemmeling van die zorgen.
- Met een `betaler` hoeven `derdebetalernaam`, `derdebetaleradres` en `derdebetaleremail` niet meer op de zorg te staan. Enkel `derdebetalercode` blijft.

### Per type bestemmeling

| Type bestemmeling | Betaler-node | Gegevens die de node toevoegt |
| --- | --- | --- |
| 1. Ziekenfonds | geen voor het ziekenfonds zelf. Wel mogelijk voor het remgeld: `type` = 3, gekoppeld via `rijksregisternr` | de verzendwijze van de remgeldfactuur |
| 2. Verzekering | `type` = 2 | `naam`, `kbonr`, `uwreferentie` (polis- of dossiernummer), `terattentievan`, `facturatiekanaal`, factuuradres |
| 3. Patiënt | `type` = 3 | `naam` en `voornaam`, `rijksregisternr`, `taalcode`, `facturatiekanaal`, factuuradres |
| 4. OCMW | `type` = 4 | `naam`, `kbonr`, `uwreferentie`, `terattentievan`, `facturatiekanaal`, factuuradres |
| 5. Medisch huis | `type` = 5 | `naam`, `rizivnr`, `kbonr`, `facturatiekanaal`, factuuradres |

Alle velden van de node staan op [Nodes](/nurse/nodes#node-betaler-voorstel).

### Remgeld via de betaler-node

Bij zorg voor het ziekenfonds (type bestemmeling 1) staat er geen `derdebetalercode` op de zorg. Een `betaler` voor het remgeld wordt daarom aan de patiënt gekoppeld via het rijksregisternummer: `betaler.rijksregisternr` is gelijk aan `rijksregisternummer` op [patientgegevens](/nurse/nodes#node-patientgegevens).

Met die node bepaal je waar en hoe de remgeldfactuur van de patiënt toekomt: het kanaal (`facturatiekanaal`), het factuuradres, het e-mailadres en `terattentievan`. Dat gaat verder dan `kanaalfactuurpatient` op patientgegevens.

In dit voorbeeld gaat de remgeldfactuur per e-mail naar de dochter van de patiënt:

```xml
<betaler>
    <externeid>341</externeid>
    <type>3</type>
    <referentienr>341</referentienr>
    <naam>PEETERS</naam>
    <voornaam>PETER</voornaam>
    <email>dochter.peeters@voorbeeld.example</email>
    <taalcode>nl</taalcode>
    <rijksregisternr>85010100123</rijksregisternr>
    <facturatiekanaal>2</facturatiekanaal>
    <terattentievan>Mevrouw An Peeters</terattentievan>
    <adressen>
        <adres>
            <type>Factuur</type>
            <straat>Kerkstraat</straat>
            <huisnummer>15</huisnummer>
            <busnr>3B</busnr>
            <postcode>1000</postcode>
            <gemeente>Brussel</gemeente>
            <landcode>BE</landcode>
        </adres>
    </adressen>
</betaler>
```

### Voorbeeld: verzekering met factuur via Peppol

Een wondzorg na een arbeidsongeval wordt aan de verzekering gefactureerd. De zorg verwijst met `derdebetalercode` naar de betaler; de gegevens van de verzekering staan één keer in het bestand.

```xml
<uitgevoerdezorg>
    <input_uitgevoerdezorg_id>9101</input_uitgevoerdezorg_id>
    <externeid>423</externeid>
    <datumuitvoering>2026-02-16T08:00:00</datumuitvoering>
    <datumvoorschrift>2026-02-01T00:00:00</datumvoorschrift>
    <rizivnummervoorschrijver>10828168004</rizivnummervoorschrijver>
    <nomenclatuurnummer>424336</nomenclatuurnummer>
    <rizivnummerverpleegkundige>149488014401</rizivnummerverpleegkundige>
    <patientgegevens_id>341</patientgegevens_id>
    <bezoeknummer>1</bezoeknummer>
    <rep_typebestemmeling_id>2</rep_typebestemmeling_id>
    <insuline>false</insuline>
    <derdebetalercode>VERZ01</derdebetalercode>
    <datumongeval>2026-01-20T00:00:00</datumongeval>
    <werkgever>Voorbeeld Bouw nv</werkgever>
    <TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>

<betaler>
    <externeid>VERZ01</externeid>
    <type>2</type>
    <referentienr>VERZ01</referentienr>
    <naam>Voorbeeld Verzekeringen nv</naam>
    <voornaam/>
    <email>facturen@voorbeeldverzekeringen.example</email>
    <taalcode>nl</taalcode>
    <kbonr>0123456789</kbonr>
    <facturatiekanaal>3</facturatiekanaal>
    <uwreferentie>DOSSIER-2026-0042</uwreferentie>
    <terattentievan>Dienst arbeidsongevallen</terattentievan>
    <adressen>
        <adres>
            <type>Factuur</type>
            <straat>Voorbeeldlaan</straat>
            <huisnummer>1</huisnummer>
            <postcode>1000</postcode>
            <gemeente>Brussel</gemeente>
            <landcode>BE</landcode>
        </adres>
    </adressen>
</betaler>
```

De gegevens in het voorbeeld zijn fictief.

## Adressering en busnummers

Voor een correcte adressering komt het busnummer (bus, appartement) in een apart veld, niet in het huisnummer. Het busnummer bestaat op twee plaatsen op [patientgegevens](/nurse/nodes#node-patientgegevens):

- **Postadres van de patiëntfactuur**: het veld `busnr`, bij het adres waarnaar de factuur aan de patiënt verstuurd wordt. TDM3 gebruikt dit adres voor de afdruk, en voor de verzending wanneer `kanaalfactuurpatient` = 1 of leeg is.
- **Bestemmeling van het bewijsstuk**: het veld `busbestemmelingbewijsstuk`, bij het adres van de ontvanger van het bewijsstuk (de patiënt of een vertegenwoordiger).

Vul het busnummer in wanneer het adres er een vereist en het pakket het in een apart veld bijhoudt. Zo komen facturen en bewijsstukken op het juiste adres aan.

Wanneer het verzorgingsadres verschilt van het domicilieadres, kan het verzorgingsadres meekomen via het element [adressen](/nurse/nodes#element-adres-op-node-patientgegevens).

### Voorbeeld 1: postadres van de patiëntfactuur met busnummer

```xml
<patientgegevens>
    <patientgegevens_id>341</patientgegevens_id>
    <externeid>1341</externeid>
    <naam>PEETERS</naam>
    <voornaam>PETER</voornaam>
    <straat>Kerkstraat</straat>
    <huisnummer>15</huisnummer>
    <busnr>3B</busnr>
    <postcode>1000</postcode>
    <gemeente>Brussel</gemeente>
    <landcode>BE</landcode>
    <rijksregisternummer>70051512345</rijksregisternummer>
    <kanaalfactuurpatient>1</kanaalfactuurpatient>
</patientgegevens>
```

### Voorbeeld 2: bestemmeling van het bewijsstuk met busnummer

```xml
<patientgegevens>
    <patientgegevens_id>342</patientgegevens_id>
    <externeid>3442</externeid>
    <naam>JANSSEN</naam>
    <voornaam>JAN</voornaam>
    <straat>Stationstraat</straat>
    <huisnummer>25</huisnummer>
    <postcode>9000</postcode>
    <gemeente>Gent</gemeente>
    <landcode>BE</landcode>
    <rijksregisternummer>85032012345</rijksregisternummer>
    <!-- Bewijsstuk bestemmeling adres met busnummer (vertegenwoordiger) -->
    <kanaalbewijsstuk>1</kanaalbewijsstuk>
    <bestemmelingbewijsstuk>2</bestemmelingbewijsstuk>
    <naambestemmelingbewijsstuk>JANSSEN</naambestemmelingbewijsstuk>
    <voornaambestemmelingbewijsstuk>Maria</voornaambestemmelingbewijsstuk>
    <straatbestemmelingbewijsstuk>Dorpstraat</straatbestemmelingbewijsstuk>
    <huisnummerbestemmelingbewijsstuk>42</huisnummerbestemmelingbewijsstuk>
    <busbestemmelingbewijsstuk>A12</busbestemmelingbewijsstuk>
    <postcodebestemmelingbewijsstuk>2000</postcodebestemmelingbewijsstuk>
    <gemeentebestemmelingbewijsstuk>Antwerpen</gemeentebestemmelingbewijsstuk>
    <landcodebestemmelingbewijsstuk>BE</landcodebestemmelingbewijsstuk>
</patientgegevens>
```

### Voorbeeld 3: beide adressen met busnummer

```xml
<patientgegevens>
    <patientgegevens_id>343</patientgegevens_id>
    <externeid>343</externeid>
    <naam>VERMEULEN</naam>
    <voornaam>Sophie</voornaam>
    <!-- Post-adres patiëntfactuur met busnummer -->
    <straat>Kerkstraat</straat>
    <huisnummer>15</huisnummer>
    <busnr>3B</busnr>
    <postcode>1000</postcode>
    <gemeente>Brussel</gemeente>
    <landcode>BE</landcode>
    <ziekenfondscode>200</ziekenfondscode>
    <rijksregisternummer>55110812345</rijksregisternummer>
    <kanaalfactuurpatient>1</kanaalfactuurpatient>
    <!-- Bewijsstuk bestemmeling adres met busnummer (vertegenwoordiger) -->
    <kanaalbewijsstuk>1</kanaalbewijsstuk>
    <bestemmelingbewijsstuk>2</bestemmelingbewijsstuk>
    <naambestemmelingbewijsstuk>VERMEULEN</naambestemmelingbewijsstuk>
    <voornaambestemmelingbewijsstuk>Tom</voornaambestemmelingbewijsstuk>
    <straatbestemmelingbewijsstuk>Dorpstraat</straatbestemmelingbewijsstuk>
    <huisnummerbestemmelingbewijsstuk>42</huisnummerbestemmelingbewijsstuk>
    <busbestemmelingbewijsstuk>A12</busbestemmelingbewijsstuk>
    <postcodebestemmelingbewijsstuk>2000</postcodebestemmelingbewijsstuk>
    <gemeentebestemmelingbewijsstuk>Antwerpen</gemeentebestemmelingbewijsstuk>
    <landcodebestemmelingbewijsstuk>BE</landcodebestemmelingbewijsstuk>
</patientgegevens>
```
