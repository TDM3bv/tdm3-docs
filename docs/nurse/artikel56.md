---
outline: deep
---
# Pilootproject artikel 56

Deze pagina beschrijft hoe het prestatiebestand (nurse-xml) wordt ingevuld voor praktijken die deelnemen aan het pilootproject nieuwe praktijkfinanciering thuisverpleging (artikel 56). Het is de interpretatie van TDM3 van de [instructies elektronische facturatiegegevens van het RIZIV](https://www.riziv.fgov.be/SiteCollectionDocuments/instructies_elektronische_facturatiegegevens.pdf) (bijlage 28).

Wat hier niet beschreven staat, volgt de [algemene instructies](/nurse/) en de beschrijving van de [nodes](/nurse/nodes).

::: info Pilootproject
Deze instructies gelden enkel voor de praktijken die deelnemen aan het pilootproject. Ze kunnen nog wijzigen in de loop van het project.
:::

## Pseudocodes waarmee wordt aangerekend

| Code   | Omschrijving (NL)                  | Omschrijving (FR)                   |
| ------ | ---------------------------------- | ----------------------------------- |
| 423872 | Directe zorg tijdens de week       | Soins directs pendant la semaine    |
| 423894 | Indirecte zorg tijdens de week     | Soins indirects pendant la semaine  |
| 423916 | Directe zorg tijdens het weekend   | Soins directs pendant le week-end   |
| 423931 | Indirecte zorg tijdens het weekend | Soins indirects pendant le week-end |
| 423953 | Verplaatsingstijd                  | Temps de déplacement                |
| 423975 | Palliatief forfait                 | Forfait palliatif                   |

## Betrekkelijke verstrekking (locatie)

De plaats van de directe zorg wordt meegegeven in het bestaande element `Locatie` op de uitgevoerdezorg van de pseudocode directe zorg.

| Code   | Omschrijving (NL)                      | Omschrijving (FR)                      |
| ------ | -------------------------------------- | -------------------------------------- |
| 421330 | bij de patiënt thuis                   | au domicile du patient                 |
| 421352 | in de verpleegpost of het dispensarium | au cabinet du praticien ou dispensaire |
| 421374 | in een instelling                      | dans une institution                   |
| 421396 | op afstand                             | à distance                             |

## Directe en indirecte zorg

- De pseudocode voor directe of indirecte zorg wordt meegegeven als een **aparte uitgevoerdezorg**.
- De zorgtijd wordt meegegeven in `zorgminuten`, **enkel** op de uitgevoerdezorg van de pseudocode directe of indirecte zorg.
- Elke interventiecode is een aparte uitgevoerdezorg met `zorgminuten` = 0.
- De interventiecodes die bij een directe of indirecte zorg horen, krijgen hetzelfde `bezoeknummer` als die pseudocode. Dit is het gewone bezoeknummer van dat bezoek; een fictief bezoeknummer is niet nodig.
- Per bezoek en per uitvoerder komt er precies **één** pseudocode directe zorg (423872 of 423916) **of** **één** pseudocode indirecte zorg (423894 of 423931). De uitvoerder is de zorgkundige als `rizivnummerzorgkundige` ingevuld is, anders de verpleegkundige.
- Op zaterdag, zondag en feestdagen wordt de weekendvariant gebruikt (423916 en 423931), op andere dagen de weekvariant (423872 en 423894).
- Elke directe zorg wordt vergezeld van minstens één interventiecode.
- Bij directe zorg op afstand (locatie 421396) moeten alle interventiecodes directe zorg op afstand uitvoerbaar zijn.
- Afzonderlijke bezoeken krijgen elk een eigen bezoeknummer, ook wanneer ze door verschillende verstrekkers worden uitgevoerd.

## Verplaatsingstijd

- De verplaatsingstijd wordt meegegeven als een aparte uitgevoerdezorg met pseudocode **423953**.
- De verplaatsingstijd in minuten staat in `zorgminuten`.
- Het `bezoeknummer` is dat van de bijhorende directe zorg en interventiecodes.
- Woon-werkverkeer wordt niet meegegeven in het prestatiebestand.

## Palliatief forfait

- Het palliatief forfait **423975** wordt meegegeven als een aparte uitgevoerdezorg, met het bezoeknummer van de bijhorende directe zorg.
- Zoals in de [algemene instructies](/nurse/#toevoegingen-door-tdm3) kijkt TDM3 naar de startdatum palliatief op node patientgegevens om te bepalen of een patiënt palliatief is.

## Rurale vergoeding

- De rurale vergoeding hoeft niet meegegeven te worden. TDM3 voegt die zelf toe, één keer per bezoek met directe zorg, wanneer het element `ruraal` = true op node patientgegevens.
- Komt de rurale vergoeding (418913) toch mee in een bezoek, dan rekent TDM3 die aan en voegt TDM3 er voor dat bezoek geen tweede toe.

## Twee verstrekkers in hetzelfde bezoek

- Wanneer een tweede verstrekker bij de patiënt aanwezig is (bijvoorbeeld bij een zware transfer), registreert elke verstrekker de eigen directe zorg en interventiecodes onder **hetzelfde** `bezoeknummer`, elk met het eigen `rizivnummerverpleegkundige`.
- Bij directe zorg is dan interventiecode **439633** (aanwezigheid tweede verstrekker) verplicht, op minstens één uitgevoerdezorg binnen dat bezoek. In het voorbeeld geeft de tweede verstrekker deze code mee.
- Bij indirecte zorg wordt interventiecode 439633 niet meegegeven: de code gaat over de aanwezigheid bij de patiënt.
- Elke verstrekker die de patiënt ziet, doet een eigen lezing van het identiteitsdocument.

Zie [voorbeeld 5](#voorbeeld-5-twee-verstrekkers-binnen-hetzelfde-bezoek).

## Prestaties gefinancierd buiten artikel 8

Sommige prestaties worden gefinancierd buiten artikel 8, via de klassieke nomenclatuur (bijvoorbeeld een vaccinatie) of via een overeenkomst (bijvoorbeeld een bloedafname).

- Alle interventiecodes van het bezoek worden geregistreerd.
- Het aantal minuten van de pseudocode directe zorg wordt verminderd met de waarde van die prestaties, volgens de omzettingstabel van het RIZIV.
- De pseudocodes van die prestaties worden meegegeven in het bestand, met hetzelfde `bezoeknummer` als de bijhorende interventiecode (niet bezoeknummer 0).
- Deze omzetting gebeurt in de software van de praktijk. TDM3 voert die omzetting niet opnieuw uit.

## Lezing identiteit

- Een [lezingidentiteit](/nurse/nodes#node-lezingidentiteit) komt mee voor elk contact directe zorg bij de patiënt, zoals vandaag.
- Bij een lezing van de chipkaart zijn `redenmanueleinvoering` en `redengebruikvignet` 0 (niet van toepassing).
- `redengebruikvignet` wordt enkel ingevuld bij `typevandrageridentiteitsdocument` = 7 (vignet).
- `typevandrageridentiteitsdocument` = 0 mag enkel samen met `redenmanueleinvoering` = 7.
- Bij directe zorg **op afstand** (locatie 421396) is geen vignet vereist: TDM3 voegt de lezingidentiteit zelf toe.

## Voorschrift en patiëntprofiel

- Bij een interventiecode waarvoor een voorschrift **verplicht** is, worden `datumvoorschrift` en `rizivnummervoorschrijver` meegegeven.
- Bij een interventiecode waarvoor een voorschrift **optioneel** is, wordt het voorschrift enkel meegegeven als er een voorschrift gebruikt werd.
- TDM3 neemt het voorschrift in de juiste situaties op in het facturatiebestand.
- Het patiëntprofiel mag meegegeven worden, maar TDM3 gebruikt het niet voor de tarificatie van artikel 56.

## Codeveld en input_uitgevoerdezorg_id

- Een code mag meegegeven worden in `nomenclatuurnummer` of in `pseudocodenummer`: TDM3 verwerkt beide velden op dezelfde manier. Per uitgevoerdezorg wordt maar **één** code meegegeven; het andere veld wordt weggelaten of met 000000 opgevuld. Uitzondering: bij een `kb90bedrag` staat de code altijd in `pseudocodenummer`. De voorbeelden hieronder gebruiken `nomenclatuurnummer`.
- Elke uitgevoerdezorg krijgt een eigen, uniek `input_uitgevoerdezorg_id`, ook die van de pseudocodes (directe en indirecte zorg, verplaatsingstijd, palliatief forfait). Dit id hoeft niet te verwijzen naar een andere uitgevoerdezorg.

## Voorbeelden

Elke pseudocode en elke interventiecode is een aparte `uitgevoerdezorg`, gelinkt via hetzelfde `bezoeknummer`. De gegevens in de voorbeelden zijn fictief.

### Voorbeeld 1: directe zorg weekdag thuis, met verplaatsingstijd

Een verpleegkundige bezoekt een patiënt thuis op een weekdag. Het bezoek duurt 45 minuten en omvat hygiënische zorg, eenvoudige wondzorg en het opnemen van parameters. De verplaatsingstijd bedraagt 15 minuten.

```xml
<!-- Pseudocode directe zorg weekdag (423872), locatie thuis (421330), 45 min -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>1001</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-16T09:00:00</datumuitvoering>
	<zorgminuten>45</zorgminuten>
	<nomenclatuurnummer>423872</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<Locatie>421330</Locatie>
</uitgevoerdezorg>

<!-- Verplaatsingstijd (423953), 15 min, zelfde bezoeknummer -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>1002</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-16T09:00:00</datumuitvoering>
	<zorgminuten>15</zorgminuten>
	<nomenclatuurnummer>423953</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
</uitgevoerdezorg>

<!-- Interventiecode A.1.1 volledige hygiënische zorg (438174), zelfde bezoeknummer -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>1003</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-16T09:00:00</datumuitvoering>
	<zorgminuten>0</zorgminuten>
	<nomenclatuurnummer>438174</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
</uitgevoerdezorg>

<!-- Interventiecode A.4.8 eenvoudige wondzorg (438793), zelfde bezoeknummer -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>1004</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-16T09:00:00</datumuitvoering>
	<zorgminuten>0</zorgminuten>
	<nomenclatuurnummer>438793</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
</uitgevoerdezorg>

<!-- Interventiecode A.3.2 opnemen parameters (438491), zelfde bezoeknummer -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>1005</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-16T09:00:00</datumuitvoering>
	<zorgminuten>0</zorgminuten>
	<nomenclatuurnummer>438491</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
</uitgevoerdezorg>

<!-- Lezingidentiteit bij directe zorg: eID ingelezen, zelfde bezoeknummer -->
<lezingidentiteit>
	<externeid>100</externeid>
	<patientgegevens_id>1</patientgegevens_id>
	<redenmanueleinvoering>0</redenmanueleinvoering>
	<bezoeknummer>1</bezoeknummer>
	<datumuitvoering>2026-02-16T09:00:00</datumuitvoering>
	<datumlezingidentiteitsdocument>2026-02-16T09:00:00</datumlezingidentiteitsdocument>
	<identificatiepatient>85010100123</identificatiepatient>
	<typevanlezingidentiteitsdocument>1</typevanlezingidentiteitsdocument>
	<typevandrageridentiteitsdocument>1</typevandrageridentiteitsdocument>
	<redengebruikvignet>0</redengebruikvignet>
	<uurvanlezingidentiteitsdocument>0900</uurvanlezingidentiteitsdocument>
	<rizivnummerverstrekker>112345678901</rizivnummerverstrekker>
	<serienummervandedrager>590000000001</serienummervandedrager>
</lezingidentiteit>
```

### Voorbeeld 2: indirecte zorg weekdag

Indirecte zorg op een weekdag. De verpleegkundige besteedt 20 minuten aan het (her)evalueren van de zorgbehoefte (KATZ) en een patiëntenbespreking binnen het team. De interventiecodes hebben hetzelfde bezoeknummer als de pseudocode indirecte zorg.

```xml
<!-- Pseudocode indirecte zorg weekdag (423894), 20 min -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>2001</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-17T14:00:00</datumuitvoering>
	<zorgminuten>20</zorgminuten>
	<nomenclatuurnummer>423894</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
</uitgevoerdezorg>

<!-- Interventiecode B.1.4 (her)evalueren zorgbehoefte KATZ (439795), zelfde bezoeknummer -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>2002</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-17T14:00:00</datumuitvoering>
	<zorgminuten>0</zorgminuten>
	<nomenclatuurnummer>439795</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
</uitgevoerdezorg>

<!-- Interventiecode B.3.1 patiëntenbespreking binnen team (439950), zelfde bezoeknummer -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>2003</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-17T14:00:00</datumuitvoering>
	<zorgminuten>0</zorgminuten>
	<nomenclatuurnummer>439950</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
</uitgevoerdezorg>
```

### Voorbeeld 3: directe zorg weekend in de verpleegpost, met palliatief forfait

Een palliatieve patiënt wordt in het weekend verzorgd in de verpleegpost. De verpleegkundige dient een subcutane inspuiting toe, op voorschrift, en neemt parameters op. Daarnaast wordt het palliatief forfait aangerekend.

```xml
<!-- Pseudocode directe zorg weekend (423916), locatie verpleegpost (421352), 30 min -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>3001</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-15T10:00:00</datumuitvoering>
	<zorgminuten>30</zorgminuten>
	<nomenclatuurnummer>423916</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<Locatie>421352</Locatie>
</uitgevoerdezorg>

<!-- Palliatief forfait (423975), zelfde bezoeknummer -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>3002</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-15T10:00:00</datumuitvoering>
	<zorgminuten>0</zorgminuten>
	<nomenclatuurnummer>423975</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
</uitgevoerdezorg>

<!-- Interventiecode A.4.1 subcutane inspuiting (438653), met voorschrift, zelfde bezoeknummer -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>3003</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-15T10:00:00</datumuitvoering>
	<zorgminuten>0</zorgminuten>
	<datumvoorschrift>2026-02-10T00:00:00</datumvoorschrift>
	<rizivnummervoorschrijver>12345678901</rizivnummervoorschrijver>
	<naamvoorschrijver>ARTS VOORBEELD</naamvoorschrijver>
	<nomenclatuurnummer>438653</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
</uitgevoerdezorg>

<!-- Interventiecode A.3.2 opnemen parameters (438491), zelfde bezoeknummer -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>3004</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-15T10:00:00</datumuitvoering>
	<zorgminuten>0</zorgminuten>
	<nomenclatuurnummer>438491</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
</uitgevoerdezorg>

<!-- Lezingidentiteit bij directe zorg, zelfde bezoeknummer -->
<lezingidentiteit>
	<externeid>100</externeid>
	<patientgegevens_id>1</patientgegevens_id>
	<redenmanueleinvoering>0</redenmanueleinvoering>
	<bezoeknummer>1</bezoeknummer>
	<datumuitvoering>2026-02-15T10:00:00</datumuitvoering>
	<datumlezingidentiteitsdocument>2026-02-15T10:00:00</datumlezingidentiteitsdocument>
	<identificatiepatient>85010100123</identificatiepatient>
	<typevanlezingidentiteitsdocument>1</typevanlezingidentiteitsdocument>
	<typevandrageridentiteitsdocument>1</typevandrageridentiteitsdocument>
	<redengebruikvignet>0</redengebruikvignet>
	<uurvanlezingidentiteitsdocument>1000</uurvanlezingidentiteitsdocument>
	<rizivnummerverstrekker>112345678901</rizivnummerverstrekker>
	<serienummervandedrager>590000000001</serienummervandedrager>
</lezingidentiteit>
```

### Voorbeeld 4: directe zorg op afstand

Een verpleegkundige voert op een weekdag directe zorg op afstand uit: ze neemt parameters op via digitale monitoring en koppelt terug naar de patiënt. Een lezingidentiteit hoeft hier niet mee te komen, zie [Lezing identiteit](#lezing-identiteit).

```xml
<!-- Pseudocode directe zorg weekdag (423872), locatie op afstand (421396), 15 min -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>4001</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-18T11:00:00</datumuitvoering>
	<zorgminuten>15</zorgminuten>
	<nomenclatuurnummer>423872</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<Locatie>421396</Locatie>
</uitgevoerdezorg>

<!-- Interventiecode A.3.2 opnemen parameters (438491), zelfde bezoeknummer -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>4002</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-18T11:00:00</datumuitvoering>
	<zorgminuten>0</zorgminuten>
	<nomenclatuurnummer>438491</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
</uitgevoerdezorg>

<!-- Interventiecode A.3.6 terugkoppeling naar patiënt (438594), zelfde bezoeknummer -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>4003</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-18T11:00:00</datumuitvoering>
	<zorgminuten>0</zorgminuten>
	<nomenclatuurnummer>438594</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
</uitgevoerdezorg>
```

### Voorbeeld 5: twee verstrekkers binnen hetzelfde bezoek

Bij een zware transfer komt een tweede verpleegkundige ter plaatse om de eerste verpleegkundige te ondersteunen. Beide registreren hun directe zorg en interventiecodes onder hetzelfde bezoeknummer. De tweede verpleegkundige geeft interventiecode 439633 (aanwezigheid tweede verstrekker) mee. Elke verpleegkundige doet een eigen lezing van het identiteitsdocument; die lezingen zijn hier weggelaten.

```xml
<!-- Verpleegkundige 1: directe zorg weekdag (423872), 40 min, locatie thuis -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>5001</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-19T09:00:00</datumuitvoering>
	<zorgminuten>40</zorgminuten>
	<nomenclatuurnummer>423872</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<Locatie>421330</Locatie>
</uitgevoerdezorg>

<!-- Verpleegkundige 1: interventiecode volledige hygiënische zorg (438174), zelfde bezoeknummer -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>5002</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-19T09:00:00</datumuitvoering>
	<zorgminuten>0</zorgminuten>
	<nomenclatuurnummer>438174</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
</uitgevoerdezorg>

<!-- Verpleegkundige 2: directe zorg weekdag (423872), 40 min, eigen rizivnummer, zelfde bezoeknummer -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>5003</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-19T09:00:00</datumuitvoering>
	<zorgminuten>40</zorgminuten>
	<nomenclatuurnummer>423872</nomenclatuurnummer>
	<rizivnummerverpleegkundige>198765432101</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE TWEE</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<Locatie>421330</Locatie>
</uitgevoerdezorg>

<!-- Verpleegkundige 2: interventiecode transfer met hulpmiddel (438410), zelfde bezoeknummer -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>5004</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-19T09:00:00</datumuitvoering>
	<zorgminuten>0</zorgminuten>
	<nomenclatuurnummer>438410</nomenclatuurnummer>
	<rizivnummerverpleegkundige>198765432101</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE TWEE</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
</uitgevoerdezorg>

<!-- Verpleegkundige 2: interventiecode aanwezigheid tweede verstrekker (439633), zelfde bezoeknummer -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>5005</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-19T09:00:00</datumuitvoering>
	<zorgminuten>0</zorgminuten>
	<nomenclatuurnummer>439633</nomenclatuurnummer>
	<rizivnummerverpleegkundige>198765432101</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE TWEE</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
</uitgevoerdezorg>
```
