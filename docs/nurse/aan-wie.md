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
De node [betaler](/nurse/nodes#node-betaler-voorstel) is een voorstel om meer gegevens over niet-ziekenfondsbetalers mee te geven. De import van TDM3 verwerkt deze node nog niet.
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

## Wie betaalt wat

Deze tabel toont per situatie wat het pakket invult op [uitgevoerdezorg](/nurse/nodes#node-uitgevoerdezorg). Zorg uit de nomenclatuur en [vrije nomenclatuur](/nurse/wat#zorg-zonder-riziv-nomenclatuur-kb90) zijn aparte uitgevoerde zorgen, elk met een eigen type bestemmeling.

| Situatie | Zorg uit de nomenclatuur | Remgeld | Vrije nomenclatuur (KB90) |
| --- | --- | --- | --- |
| Ziekenfonds betaalt, geen remgeld, extra's door de patiënt | type bestemmeling 1 | `remgeld` = 0 | type bestemmeling 3 |
| Ziekenfonds betaalt, remgeld en extra's door de patiënt | type bestemmeling 1 | `remgeld` = 1 tot 100, factuur aan de patiënt | type bestemmeling 3 |
| Ziekenfonds betaalt, remgeld en extra's door een andere partij | type bestemmeling 1 | Niet ondersteund: het remgeld gaat altijd naar de patiënt | type bestemmeling 2, 4 of 5, met `derdebetalercode` |
| Alles door de patiënt | type bestemmeling 3, met `derdebetalercode` | Niet van toepassing: alles gaat naar de patiënt | type bestemmeling 3 |
| Alles door een andere partij, met remgeld | type bestemmeling 2 of 4, met `derdebetalercode` | leeg, wordt genegeerd | type bestemmeling 2 of 4, met `derdebetalercode` |
| Alles door een andere partij, zonder remgeld | zoals de vorige rij | zoals de vorige rij | zoals de vorige rij |

## Factuur aan de patiënt

Voor facturen aan de patiënt zelf (remgeldfactuur of patiëntfactuur) zijn er twee kanalen, via `kanaalfactuurpatient` op [patientgegevens](/nurse/nodes#node-patientgegevens):

- **Post** (`kanaalfactuurpatient` = 1): verzending per post naar het adres van de patiënt. Dit is ook de standaard wanneer het veld leeg is.
- **E-mail** (`kanaalfactuurpatient` = 2): verzending naar het opgegeven e-mailadres, via een tijdelijke en beveiligde link. De praktijk heeft dan de toestemming van de patiënt om de factuur via dit kanaal te versturen.

Bij e-mail moet `emailfactuurpatient` ingevuld zijn met het e-mailadres waarnaar de factuur verstuurd wordt.

## Factuur aan een derdebetaler

Voor facturen die niet naar een ziekenfonds of de patiënt gaan (verzekering, medisch huis, OCMW, ...) kan `derdebetaleremail` op [uitgevoerdezorg](/nurse/nodes#node-uitgevoerdezorg) het e-mailadres van de derdebetaler bevatten waarnaar de factuur verstuurd mag worden.

Het veld is optioneel en wordt enkel gebruikt wanneer de factuur niet naar een ziekenfonds of de patiënt gaat (`rep_typebestemmeling_id` ≠ 1 en ≠ 3).

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
