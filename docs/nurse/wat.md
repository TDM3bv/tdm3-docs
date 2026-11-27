---
outline: deep
---
# Welke zorg, bij welke patiënt?

Het pakket levert de patiënten, hun profielen en de uitgevoerde zorgen aan. TDM3 tarifeert die zorg zelf: het pakket stuurt de zorg zoals ze werd uitgevoerd, niet de codes waarmee ze gefactureerd wordt.

## Wat het pakket aanlevert

| Node | Inhoud |
| --- | --- |
| [patientgegevens](/nurse/nodes#node-patientgegevens) | Eén node per patiënt: rijksregister- of stamnummer, ziekenfonds, startdatum palliatief, ruraal, adressen. |
| [uitgevoerdezorg](/nurse/nodes#node-uitgevoerdezorg) | Eén node per zorgverstrekking: nomenclatuur of pseudocode, zorgverlener, bestemmeling, voorschrift, bezoeknummer. |
| [profielen](/nurse/nodes#node-profielen) | Het profiel van de patiënt: A, B, C, P2, P7, T2, T7, ... |
| [lezingidentiteit](/nurse/nodes#node-lezingidentiteit) | De verificatie van de identiteit van de patiënt (eID-lezing). |
| [kennisgevingwondzorg](/nurse/nodes#node-kennisgevingwondzorg) | De kennisgeving complexe wondzorg. |

Normaal is er één `patientgegevens`-node per patiënt. Meerdere nodes voor dezelfde patiënt mogen, bijvoorbeeld wanneer het adres of het ziekenfonds in de loop van de maand wijzigt: TDM3 ontdubbelt ze.

Voor de verzekerbaarheid gebruikt TDM3 de gegevens van MyCareNet wanneer die beschikbaar zijn, anders de `ziekenfondscode` en `risicocode1`/`risicocode2` uit het bestand. Bepalend voor de facturatie is het [type bestemmeling](/nurse/aan-wie#type-bestemmeling) op uitgevoerdezorg.

## Wat TDM3 zelf toevoegt

De uitgevoerde zorgen komen als nomenclatuurcode in het bestand. In het kader van de tarificatie voegt TDM3 zelf toe:

| Toevoeging | Op basis van |
| --- | --- |
| Basisverstrekkingen (eerste, tweede, derde) | de bezoeken van de dag (`bezoeknummer`). De volgorde eerste, tweede, derde volgt het tijdstip in `datumuitvoering`. |
| Forfait A, B, C, PA, PB, PC | het doorgegeven profiel. De nomenclatuurcodes van de zorgen worden dan vervangen door pseudocodes. |
| Supplementair forfait PN | het doorgegeven profiel PN |
| Forfait PP | het doorgegeven profiel PN, op de dagen waarop het dagplafond bereikt is. Zie [PN en PP](#pn-en-pp). |
| Opvolgingshonorarium diabetes | `uitgevoerdezorg.insuline = true` |
| Verplaatsingskosten | `ruraal` = `true`, bij zorg die thuis wordt verleend. Zie [Rurale zone en verplaatsingskosten](#rurale-zone-en-verplaatsingskosten). |
| Bijkomend honorarium complexe wondzorg | de [kennisgevingwondzorg](/nurse/nodes#node-kennisgevingwondzorg) en `uitgevoerdezorg.zorgminuten`. Zie [Complexe wondzorg](#complexe-wondzorg). |

::: warning Niet meesturen
Deze codes (basisverstrekkingen, forfaits en de pseudocodes die de nomenclatuurcodes vervangen) komen niet mee in het bestand. Het pakket bevat geen tarificatielogica.
:::

### Palliatieve patiënten

Een palliatief forfait wordt aangerekend op basis van:

- de startdatum palliatief (`startdatumpal`) op de node [patientgegevens](/nurse/nodes#node-patientgegevens);
- in combinatie met het doorgegeven patiëntprofiel.

Ook al zou er in de node [profielen](/nurse/nodes#node-profielen) een palliatief profiel staan, TDM3 kijkt altijd naar `startdatumpal` om te bepalen of een patiënt palliatief is.

Het profiel en `startdatumpal` moeten overeenkomen. Een palliatief profiel zonder `startdatumpal`, of een niet-palliatief profiel bij een actieve `startdatumpal`, geeft een fout.

### PN en PP

Voor een palliatieve patiënt zonder forfait A, B of C hangt de facturatie af van het dagplafond:

- dagplafond niet bereikt: de verstrekkingen met het supplementair forfait PN;
- dagplafond bereikt: het forfait PP.

Dat kan van dag tot dag verschillen. Het pakket geeft het profiel **PN** door. TDM3 schaalt zelf op naar PP op de dagen waarop het dagplafond bereikt is. Geef PP niet mee en maak geen profiel per dag.

### Rurale zone en verplaatsingskosten

Het pakket geeft enkel aan of het adres van de patiënt in een rurale zone ligt, met `ruraal` = `true` of `false` op [patientgegevens](/nurse/nodes#node-patientgegevens). Het pakket past `ruraal` niet aan per zorg.

TDM3 voegt de verplaatsingskosten (418913) enkel toe bij verstrekkingen die volgens de nomenclatuur thuis worden verleend. Bij zorg in een hersteloord of een praktijkkamer worden ze dus niet aangerekend, ook al staat `ruraal` op `true`.

#### Voorrang van het verzorgingsadres

Wordt de patiënt op een ander adres verzorgd dan het domicilieadres, dan kan dat verzorgingsadres meekomen via het element [adressen](/nurse/nodes#element-adres-op-node-patientgegevens), met een eigen `ruraal`:

- Is er een adres van het type `Verzorging` meegegeven, dan bepaalt `ruraal` op dat adres het rurale kenmerk.
- Anders geldt `ruraal` op patientgegevens.

In dit voorbeeld ligt het domicilieadres in een rurale zone, maar wordt de patiënt verzorgd op een adres dat niet ruraal is. Er worden geen verplaatsingskosten aangerekend.

```xml
<patientgegevens>
    <patientgegevens_id>1</patientgegevens_id>
    <externeid>100</externeid>
    <naam>PEETERS</naam>
    <voornaam>PETER</voornaam>
    <straat>Dorpsstraat</straat>
    <huisnummer>12</huisnummer>
    <postcode>8647</postcode>
    <gemeente>Lo-Reninge</gemeente>
    <landcode>BE</landcode>
    <ruraal>true</ruraal>
    <rijksregisternummer>85010100123</rijksregisternummer>
    <adressen>
        <adres>
            <type>Verzorging</type>
            <straat>Stationsstraat</straat>
            <huisnummer>74</huisnummer>
            <busnr>A</busnr>
            <postcode>9300</postcode>
            <gemeente>Aalst</gemeente>
            <landcode>BE</landcode>
            <ruraal>false</ruraal>
        </adres>
    </adressen>
</patientgegevens>
```

## Voorschrift: datum en voorschrijver

Het pakket vult `datumvoorschrift` en `rizivnummervoorschrijver` enkel in bij een verstrekking met een voorschrift. Voor de andere zorg leidt TDM3 de datum voor het ziekenfonds zelf af. Het prestatiebestand volgt hier dus niet het facturatiebestand voor het ziekenfonds.

| Type zorg | Het pakket vult in | TDM3 gebruikt voor het ziekenfonds |
| --- | --- | --- |
| Verstrekking met voorschrift | `datumvoorschrift` en `rizivnummervoorschrijver`, altijd samen | de datum en de voorschrijver van het voorschrift |
| Toilet of forfait (A, B, C) | niets | de startdatum van het profiel. Heeft de dag een verstrekking met voorschrift, dan neemt TDM3 dat voorschrift over voor het forfait. |
| Palliatief forfait of supplement | niets | de startdatum van het profiel, ten vroegste `startdatumpal` |
| Verstrekking zonder voorschrift | niets | geen datum |

- Een `datumvoorschrift` zonder geldig `rizivnummervoorschrijver` geeft een validatiefout.
- `naamvoorschrijver` is optioneel. De naam gaat niet naar het ziekenfonds.
- Bij een digitaal verwijsvoorschrift komt ook het referentienummer mee, zie [Digitaal verwijsvoorschrift](#digitaal-verwijsvoorschrift).

## Pseudocodes die wel meekomen

Pseudocodes die een bijkomende, noodzakelijke registratie zijn en op zichzelf nodig zijn voor de tarificatie, kunnen en moeten wel meekomen in het bestand. Bijvoorbeeld:

- **426510**: Thuiszorgen verpleegkunde, palliatieve patiënten: pseudocode te vermelden voor elk dringend bezoek overdag dat tijdens de verzorgingsdag is verleend voor het forfait PA (427055 en 427136), PB (427033 en 427114), PC (427011 en 427092), PP (427173 en 427195) en PN (427070 en 427151).
- **426893**: Thuiszorgen verpleegkunde, palliatieve patiënten: pseudocode te vermelden voor elke overlegvergadering met de huisarts die tijdens de verzorgingsdag is verleend voor het forfait PA (427055 en 427136), PB (427033 en 427114), PC (427011 en 427092), PP (427173 en 427195) en PN (427070 en 427151).
- **426576**: Thuiszorgen verpleegkunde: pseudocode te vermelden voor elke voorbereiding van medicatie die tijdens de verzorgingsdag is verleend voor:
  - niet-palliatieve patiënten: het forfait A (425272, 425670, 426075 en 429096), B (425294, 425692, 426090 en 429111) en C (425316, 425714, 426112 en 429133);
  - palliatieve patiënten: het forfait PA (427055 en 427136), PB (427033 en 427114), PC (427011 en 427092) en PP (427173 en 427195).

  Komt de prestatiecode **424874** mee, dan vervangt TDM3 die door de pseudocode **426576** wanneer het om een forfaitfactuur gaat.

## Samenvoegen binnen eenzelfde bezoek

Komt er meer dan één *Toedienen geneesmiddelen (IM, SC, HD)* (bijvoorbeeld 423076) mee in hetzelfde bezoek, dan vervangt TDM3 die door één *Toedienen geneesmiddelen (IM, SC, HD, IV) in verschillende injectieplaatsen* (bijvoorbeeld 423091).

## Betrekkelijke verstrekking: locatie

De nomenclatuur specificeert voor sommige verstrekkingen enkel "praktijkkamer of hersteloord". Vanaf prestatiedatum 1 april 2016 kan voor deze nomenclatuurnummers geen bedrag meer gefactureerd worden, tenzij de verstrekking in een hersteloord is uitgevoerd.

Om dat onderscheid te maken, vermeldt het pakket de locatie als pseudocode in het element `Locatie` van [uitgevoerdezorg](/nurse/nodes#node-uitgevoerdezorg). Op basis van die pseudocode factureert TDM3 al dan niet een bedrag.

| Pseudocode | Omschrijving |
| --- | --- |
| 421131 | Verpleegkundigen: pseudocode betrekkelijke verstrekking: alleenstaande praktijkkamer van verpleegkundige(n) |
| 421212 | Verpleegkundigen: pseudocode betrekkelijke verstrekking: hersteloord |
| 421175 | Verpleegkundigen: pseudocode betrekkelijke verstrekking: praktijkkamer van verpleegkundige(n) in een ziekenhuis |
| 421190 | Verpleegkundigen: pseudocode betrekkelijke verstrekking: praktijkkamer van verpleegkundige(n) in een polikliniek buiten een ziekenhuiscampus bij geneesheer-specialist(en) |
| 421153 | Verpleegkundigen: pseudocode betrekkelijke verstrekking: praktijkkamer van verpleegkundige(n) die deel uitmaakt van een multidisciplinaire groepspraktijk van eerstelijnsgezondheidszorg |

## Pijnpompcodes

Uit de pseudocode is niet af te leiden welke betalende nomenclatuurcode TDM3 moet toevoegen. Daarom komen de betalende nomenclatuurcode en de pseudocode allebei mee, als aparte uitgevoerdezorg-nodes: één met `nomenclatuurnummer` ingevuld voor de betalende code, één met `pseudocodenummer` ingevuld voor de pseudocode.

**Betalende codes**

| Nomenclatuurcode | W-waarde | Omschrijving |
| --- | --- | --- |
| 429251 | 2.94600 | toezicht/opvolging pompsystemen catheter / verblijfplaats mindervaliden |
| 427571 | 2.94600 | toezicht/opvolging pompsystemen catheter / praktijkkamer |
| 427534 | 2.94600 | toezicht/opvolging pompsystemen catheter / weekdag aan huis |
| 427556 | 4.50400 | toezicht/opvolging pompsystemen catheter / weekend/feestdag aan huis |

**Pseudocodes**

Thuiszorgen verpleegkunde, specifieke technische verstrekkingen: pseudocode te vermelden bij de facturatie van de verstrekking 427534, 427556, 427571 of 429251, voor elk(e):

| Pseudocode | Te vermelden voor elk(e) ... tijdens de verzorgingsdag |
| --- | --- |
| 427615 | verbandwissel |
| 427593 | bijkomend bezoek |
| 427630 | heropstarten van de pomp |
| 427674 | wisselen van het medicatiereservoir |
| 427652 | wijziging van de onderhoudsdosis |

## Complexe wondzorg

De hervorming van de wondzorgnomenclatuur (december 2022) vraagt nieuwe gegevens. Er zijn twee manieren om ze door te geven. Geef niet beide tegelijk door: TDM3 houdt per dag maar één bijkomend honorarium complexe wondzorg over.

**Optie A**: het pakket geeft zelf de nomenclatuurcode voor het bijkomend honorarium complexe wondzorg door, als aparte [uitgevoerdezorg](/nurse/nodes#node-uitgevoerdezorg).

**Optie B**: het pakket geeft de kennisgeving en de zorgduur door:

- de kennisgeving: een node [kennisgevingwondzorg](/nurse/nodes#node-kennisgevingwondzorg);
- de zorgduur van de complexe wondzorg: `zorgminuten` op [uitgevoerdezorg](/nurse/nodes#node-uitgevoerdezorg).

Op basis van de zorgduur van de complexe wondzorgen die dag en de meest recente kennisgeving factureert TDM3 voor die dag het juiste bijkomend honorarium.

```xml
<kennisgevingwondzorg>
    <externeid>198</externeid>
    <patientgegevens_id>45</patientgegevens_id>
    <identificatiepatient>20123112345</identificatiepatient>
    <startdatum>2022-12-05T00:00:00</startdatum>
    <einddatum>2023-03-05T00:00:00</einddatum>
    <typecomplexewondzorg>3</typecomplexewondzorg>
</kennisgevingwondzorg>
<uitgevoerdezorg>
    <input_uitgevoerdezorg_id>32145344</input_uitgevoerdezorg_id>
    <externeid>6454</externeid>
    <datumuitvoering>2022-12-28T09:08:00</datumuitvoering>
    <zorgminuten>45</zorgminuten>
    <datumvoorschrift>2022-12-01T00:00:00</datumvoorschrift>
    <rizivnummervoorschrijver>10828168004</rizivnummervoorschrijver>
    <naamvoorschrijver>Peter Janssens</naamvoorschrijver>
    <remgeld>0</remgeld>
    <nomenclatuurnummer>424351</nomenclatuurnummer>
    <pseudocodenummer>000000</pseudocodenummer>
    <kb90bedrag />
    <rizivnummerverpleegkundige>146611468408</rizivnummerverpleegkundige>
    <patientgegevens_id>45</patientgegevens_id>
    <bezoeknummer>1</bezoeknummer>
    <rep_typebestemmeling_id>1</rep_typebestemmeling_id>
    <insuline>false</insuline>
    <derdebetalercode />
    <derdebetalernaam />
    <derdebetaleradres />
    <polisnummer />
    <dossiernummer />
    <datumongeval />
    <werkgever />
    <TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>
```

## Thuishospitalisatie

Onderstaande pseudocodes mogen gefactureerd worden voor prestaties vanaf 1 juli 2023.

| Pseudocode | Omschrijving |
| --- | --- |
| 418574 | Initiëren thuishospitalisatie: forfaitair honorarium voor thuisverpleegkundigen, te factureren via derdebetalersregeling |
| 418596 | Forfaitair honorarium per behandeldag zorgafstemming door de thuisverpleegkundige in de thuissituatie, te factureren via derdebetalersregeling |
| 418611 | Forfaitair honorarium voor verpleegkundige bij toediening in de leefomgeving van de patiënt van antitumorale geneesmiddelen langs intramusculaire, subcutane of hypodermale toedieningsweg, te factureren via derdebetalersregeling |

Deze pseudocodes mogen en moeten meekomen als aparte uitgevoerde zorg, volgens de gekende regels van het prestatiebestand en de RIZIV-facturatie. Ze kunnen autonoom gefactureerd worden, vereisen een voorschrift, worden uitgevoerd door een verpleegkundige en vereisen een verificatie van de identiteit.

```xml
<uitgevoerdezorg>
    <input_uitgevoerdezorg_id>32145344</input_uitgevoerdezorg_id>
    <externeid>6454</externeid>
    <datumuitvoering>2023-07-01T09:08:00</datumuitvoering>
    <datumvoorschrift>2023-06-25T00:00:00</datumvoorschrift>
    <rizivnummervoorschrijver>10828168004</rizivnummervoorschrijver>
    <naamvoorschrijver>Peter Janssens</naamvoorschrijver>
    <remgeld>0</remgeld>
    <nomenclatuurnummer>000000</nomenclatuurnummer>
    <pseudocodenummer>418574</pseudocodenummer>
    <kb90bedrag />
    <rizivnummerverpleegkundige>146611468408</rizivnummerverpleegkundige>
    <patientgegevens_id>45</patientgegevens_id>
    <bezoeknummer>3</bezoeknummer>
    <rep_typebestemmeling_id>1</rep_typebestemmeling_id>
    <insuline>false</insuline>
    <derdebetalercode />
    <derdebetalernaam />
    <derdebetaleradres />
    <polisnummer />
    <dossiernummer />
    <datumongeval />
    <werkgever />
    <TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>
```

## Digitaal verwijsvoorschrift

Voor prestaties waarbij een digitaal verwijsvoorschrift werd gebruikt, moet het referentienummer meekomen, naar analogie met de facturatie-instructies:

- **[referentieverwijsvoorschrift](/nurse/nodes#node-uitgevoerdezorg)** (string): het referentienummer (shortcode) van het digitaal verwijsvoorschrift, 6 alfanumerieke tekens. Verplicht wanneer een digitaal verwijsvoorschrift werd gebruikt.

```xml
<uitgevoerdezorg>
    <input_uitgevoerdezorg_id>32145344</input_uitgevoerdezorg_id>
    <externeid>6454</externeid>
    <datumuitvoering>2023-07-01T09:08:00</datumuitvoering>
    <datumvoorschrift>2023-06-25T00:00:00</datumvoorschrift>
    <rizivnummervoorschrijver>10828168004</rizivnummervoorschrijver>
    <naamvoorschrijver>Peter Janssens</naamvoorschrijver>
    <referentieverwijsvoorschrift>A1B2C3</referentieverwijsvoorschrift>
    <remgeld>0</remgeld>
    <nomenclatuurnummer>000000</nomenclatuurnummer>
    <pseudocodenummer>418574</pseudocodenummer>
    <kb90bedrag />
    <rizivnummerverpleegkundige>146611468408</rizivnummerverpleegkundige>
    <patientgegevens_id>45</patientgegevens_id>
    <bezoeknummer>3</bezoeknummer>
    <rep_typebestemmeling_id>1</rep_typebestemmeling_id>
    <insuline>false</insuline>
    <derdebetalercode />
    <derdebetalernaam />
    <derdebetaleradres />
    <polisnummer />
    <dossiernummer />
    <datumongeval />
    <werkgever />
    <TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>
```

## Zorg zonder RIZIV-nomenclatuur (KB90)

Zorg die niet in de RIZIV-nomenclatuur staat, komt mee met de pseudocode 426856: `nomenclatuurnummer` = 000000 en `pseudocodenummer` = 426856. Er zijn twee situaties.

### KB90 in strikte zin

Dit is zorg op voorschrift van een arts, die een verpleegkundige mag uitvoeren volgens het KB van 18 juni 1990 en die niet in de nomenclatuur staat. De pseudocode 426856 is een vermelding voor het ziekenfonds op een verzorgingsdag met een forfait. Er hoort geen bedrag bij:

- het [type bestemmeling](/nurse/aan-wie#type-bestemmeling) is het ziekenfonds (1);
- `kb90bedrag` blijft weg.

Komt er bij type bestemmeling 1 toch een `kb90bedrag` mee, dan zet TDM3 het bedrag op 0.

### Vrije nomenclatuur

Dit zijn extra diensten zonder voorschrift, zoals materiaal of begeleiding bij een uitstap of een artsbezoek. De praktijk bepaalt zelf de prijs. Om die zorg te kunnen factureren, heeft TDM3 de pseudocode uitgebreid met eigen velden:

- `kb90bedrag`: het te factureren bedrag;
- `kb90omschrijving`: een vrije omschrijving, die op de factuur en het bewijsstuk verschijnt;
- `BtwPercentage` en `BedragInclusiefBtw`: wanneer er btw aangerekend wordt, zie [uitgevoerdezorg](/nurse/nodes#node-uitgevoerdezorg);
- optioneel een eigen prestatiecode via `uitgevoerdezorg.metadata`, met de naam `prestatiecode`. Geef die bij voorkeur mee.

Extra diensten gaan nooit naar het ziekenfonds: het [type bestemmeling](/nurse/aan-wie#type-bestemmeling) is de patiënt of een andere betaler.

### Voorbeeld 1: vermelding op een forfaitdag (KB90 in strikte zin)

De zorg staat niet in de nomenclatuur en wordt op voorschrift uitgevoerd bij een forfaitpatiënt. Er is geen `kb90bedrag`.

```xml
<uitgevoerdezorg>
    <input_uitgevoerdezorg_id>7007</input_uitgevoerdezorg_id>
    <externeid>423</externeid>
    <datumuitvoering>2025-04-28T11:00:00</datumuitvoering>
    <datumvoorschrift>2025-04-01T00:00:00</datumvoorschrift>
    <rizivnummervoorschrijver>10828168004</rizivnummervoorschrijver>
    <naamvoorschrijver>Peter Janssens</naamvoorschrijver>
    <remgeld>0</remgeld>
    <nomenclatuurnummer>000000</nomenclatuurnummer>
    <pseudocodenummer>426856</pseudocodenummer>
    <rizivnummerverpleegkundige>149488014401</rizivnummerverpleegkundige>
    <patientgegevens_id>341</patientgegevens_id>
    <bezoeknummer>1</bezoeknummer>
    <rep_typebestemmeling_id>1</rep_typebestemmeling_id>
    <insuline>false</insuline>
    <TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>
```

### Voorbeeld 2: materiaal met 21% btw inbegrepen (vrije nomenclatuur)

Het bedrag van 12,50 euro bevat al 21% btw. Er is geen voorschrift.

```xml
<uitgevoerdezorg>
    <input_uitgevoerdezorg_id>7008</input_uitgevoerdezorg_id>
    <externeid>423</externeid>
    <datumuitvoering>2025-04-28T11:00:00</datumuitvoering>
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
    <metadata>
        <item>
            <naam>prestatiecode</naam>
            <waarde>MAT01</waarde>
        </item>
    </metadata>
    <BtwPercentage>21</BtwPercentage>
    <BedragInclusiefBtw>true</BedragInclusiefBtw>
</uitgevoerdezorg>
```

### Voorbeeld 3: dienst zonder btw (vrije nomenclatuur)

```xml
<uitgevoerdezorg>
    <input_uitgevoerdezorg_id>7009</input_uitgevoerdezorg_id>
    <externeid>423</externeid>
    <datumuitvoering>2025-04-29T14:00:00</datumuitvoering>
    <remgeld>0</remgeld>
    <nomenclatuurnummer>000000</nomenclatuurnummer>
    <pseudocodenummer>426856</pseudocodenummer>
    <kb90bedrag>25.00</kb90bedrag>
    <kb90omschrijving>Begeleiding bij een artsbezoek</kb90omschrijving>
    <rizivnummerverpleegkundige>149488014401</rizivnummerverpleegkundige>
    <patientgegevens_id>341</patientgegevens_id>
    <bezoeknummer>1</bezoeknummer>
    <rep_typebestemmeling_id>3</rep_typebestemmeling_id>
    <insuline>false</insuline>
    <derdebetalercode>341</derdebetalercode>
    <TypeFacturering>0</TypeFacturering>
    <metadata>
        <item>
            <naam>prestatiecode</naam>
            <waarde>BEG01</waarde>
        </item>
    </metadata>
    <BtwPercentage>0</BtwPercentage>
</uitgevoerdezorg>
```

## Niet meer van toepassing

### Samenvoegen van eenvoudige wondzorg

::: warning Niet meer van toepassing
Deze regel gold voor zorgdagen tot en met 30 november 2022. Sinds de [hervorming van de wondzorg](#complexe-wondzorg) voegt TDM3 eenvoudige wondzorgen niet meer samen.
:::

Kwam er meer dan één *eenvoudige wondzorg* (bijvoorbeeld 424336) mee in hetzelfde bezoek, dan verving TDM3 die door één *complexe wondzorg* (bijvoorbeeld 424351).

### Diabeteseducatie via videoconsultatie (COVID19)

::: warning Niet meer van toepassing
Deze tijdelijke maatregel is niet meer van toepassing. TDM3 verwerkt het element `Locatie` niet meer bij diabeteseducatie.
:::

Tijdens de COVID19-maatregelen mocht een individuele sessie diabeteseducatie via videocommunicatie plaatsvinden. Die "locatie" werd aangeduid met de pseudocode **792433** in het element `Locatie` ([bron RIZIV](https://www.riziv.fgov.be/nl/covid19/Paginas/diabeteseducatie-1ste-lijn-videoconsultatie.aspx)).

```xml
<uitgevoerdezorg>
    ...andere elementen...
    <nomenclatuurnummer>794312</nomenclatuurnummer>
    <Locatie>792433</Locatie>
    ...andere elementen...
</uitgevoerdezorg>
```
