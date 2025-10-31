---
outline: deep
---
# Beschrijving batch XML

::: tip XSD Schema
[Download](/schemas/tdm3prestatiebestand.xsd)

![image](https://www.plantuml.com/plantuml/svg/NP5HRiCW44J_VGha_roXobLe6CZMBY30jkJJPupNITMl6UtpB0E-rsPBMtxd8IO7ausjPinscj020bR4EfweTbIJRvijU2voWMoRffeW_e_jgOIE5o5Q4uh3CLCyO--KAZ68um9faAQOvJgcYfV7SOBZ8VNY-SIvo4_zHi64o3KALvoKod7uW5oIrrpoWXbHmNQMuPOebMqPsL9qV_fw--YVKDjIZZuPHKZ6OSZcTlioLPNFeUw8g-KrrV56whZgYbmZDdwFabUxxSCTqV5VlG00)
:::



# Algemene opmerkingen
Per praktijk (unieke verenigingcode)  en per “facturatiemaand” wordt er normaal gezien 1 xml bestand aangemaakt.

## Toevoegingen door TDM3

De uitgevoerde zorgen (als nomenclatuurode) worden doorgegeven in het xml bestand. 
TDM3 voegt zelf onderstaande zaken toe ikv tarificatie.
-	Basisverstrekkingen (eerste, tweede,derde)
-	Forfait A, B, C, PA, PB, PC, PP op basis van het doorgegeven profiel
	-   De nomenclatuurcodes ikv zorgen worden dan vervangen door pseudocodes
-	Supplementair forfait: PN
-	Opvolgingshonorarium diabetes (op basis van waarde “insuline= true” op node uitgevoerde zorg)
-	Verplaatsingskosten (op basis van waarde “ruraal=true” op node patientgegeven)
-   Bijkomend honorarium complexe wondzorg op [basis van kennisgeving wondzorg node en de uitgevoerdezorg.zorgminuten](#hervorming-wondzorg-nomenclatuur-december-2022)

Dit betekent dat deze nomenclatuurcodes (basisverstrekking, forfaits, pseudocodes als vervanging van) niet meekomen in de xml. Een paliatief forfait wordt aangerekend op basis van 
-	de startdatum “Paliatief” op node patientgegeven. 
-	In combinatie met het doorgegeven patientprofiel. Ook al zou er in de node “patientprofiel” een paliatief forfait profiel zijn aangeduid, TDM3 kijkt altijd naar de startdatum “Paliatief” op node patientgegeven om te bepalen of een patiënt palliatief is of niet.


## pseudocodes die wel kunnen meegegeven worden in het xml bestand:
Pseudocodes die een bijkomende noodzakelijke registratie betekenen en dus op zichzelf noodzakelijk zijn ikv tarificatie, kunnen en moeten wel meekomen in de xml.

Bijvoorbeeld: 

- **426510**:  	Thuiszorgen verpleegkunde, palliatieve patiënten : pseudocode te vermelden voor elk dringend bezoek overdag dat tijdens de verzorgingsdag is verleend voor              het forfait PA (427055 en 427136), voor het forfait PB (427033 en 427114), voor het forfait PC (427011 en 427092), voor het forfait PP (427173 en 427195)               en voor het forfait PN (427070 en 427151)
- **426893**: 	Thuiszorgen verpleegkunde, palliatieve patiënten : pseudocode te vermelden voor elk overlegvergadering met de huisarts dat tijdens de verzorgingsdag is                 verleend voor het forfait PA (427055 en 427136), voor het forfait PB (427033 en 427114), voor het forfait PC (427011 en 427092), voor het forfait PP                    (427173 en 427195) en voor het forfait PN (427070 en 427151)
- **426576**: Thuiszorgen verpleegkunde : pseudocode te vermelden voor elke voorbereiding medicatie dat tijdens de verzorgingsdag is verleend voor : a) niet-palliatieve patiënten : het forfait A (425272, 425670, 426075 en 429096), voor het forfait B (425294, 425692, 426090 en 429111) en voor het forfait C (425316, 425714, 426112 en 429133); b) palliatieve patiënten : het forfait PA (427055 en 427136), voor het forfait PB (427033 en 427114), voor het forfait PC (427011 en 427092) en voor het forfait PP (427173
	- Indien de prestatie code **424874** meekomt, zal deze sowieso vervangen worden door de pseudocode **426576** wanneer het een forfait factuur betreft

## samenvoegen van verstrekkingen binnen éénzelfde bezoek
- wanneer er meer dan 1x een *eenvoudige wondzorg* (vb. 424336) wordt doorgegeven via de xml, zal TDM3 dit vervangen door 1x prestatiecode *complexe wondzorg* (vb. 424351).
- wanneer er meer dan 1x *"Toedienen geneesmiddelen (IM, SC, HD)"* (vb 423076) wordt doorgegeven via de xml, zal TDM3 dit vervangen door 1x *"Toedienen geneesmiddelen (IM, SC, HD, IV) in verschillende injectieplaatsen"* (vb. 424351)

## Email
### Factuur aan patiënt

Voor facturen gericht aan de patiënt zelf (bij remgeld factuur of patiënt factuur) worden twee leveringskanalen ondersteund:

- **Post** (kanaalfactuurpatient = 1): Traditionele verzending per post naar het adres van de patiënt
- **E-mail** (kanaalfactuurpatient = 2): Digitale verzending naar het opgegeven e-mailadres, via tijdelijke en beveiligde link. De praktijk beschikt dan over de toestemming van de patiënt dat de factuur via dit kanaal mag verzonden worden.

Wanneer gekozen wordt voor e-mail verzending (kanaalfactuurpatient = 2), moet het veld `emailfactuurpatient` ingevuld worden met het e-mailadres waarnaartoe de factuur moet verzonden worden. Deze velden zijn terug te vinden op de patientgegevens node.

### Factuur aan derdebetaler

Voor niet-ziekenfonds facturen (verzekering, medisch huis, OCMW, etc.) kan het `derdebetaleremail` veld gebruikt worden op de uitgevoerdezorg node om het e-mail adres van de derdebetaler mee te geven dat kan/mag gebruik worden voor het versturen van de factuur per e-mail.

Het `derdebetaleremail` veld is optioneel en wordt enkel gebruikt wanneer:
- De factuur niet naar een ziekenfonds of patiënt gaat (rep_typebestemmeling_id ≠ 1 && rep_typebestemmeling_id ≠ 3)

## Remgeld

Indien er gefactureerd wordt aan een verzekeringsinstelling (type bestemmeling = 2) of OCMW (type bestemmeling = 4), dan mag bij remgeld niets ingevuld worden. Remgeld is het deel van het honorarium dat aan de patient wordt gevraagd en dus niet door het RIZIV (medisch huis, ziekenfonds) wordt terugbetaald. 
Als dit veld is ingevuld bij facturatie aan OCMW of verzekeringsinstelling dan zal TDM3 dit negeren.


## Herindieningen
Aangezien de facturen en afrekeningenen worden opgemaakt ter hoogte van TDM3, kunnen en mogen herindieningen als gewone indieningen (type facturering = 0) of als expliciet herindiening (type facturering = 1) meegaan, TDM3 voegt de bijkomende gegevens waarover het END niet kan beschikken, toe.


## Zorgen zonder riziv-nomenclatuur
Deze kunnen en mogen in de xml meegaan en worden gefactureerd onder de KB90 nomenclatuurnr. In het veld KB90Bedrag wordt dan het te factureren bedrag aangeduid.
Optioneel kan via `uitgevoerdezorg.metadata` de prestatiecode meegegeven worden.

```xml
	<uitgevoerdezorg>
		<input_uitgevoerdezorg_id>7007</input_uitgevoerdezorg_id>
		<externeid>423</externeid>
		<datumuitvoering>2025-04-28T11:00:00</datumuitvoering>
		<datumvoorschrift>2025-04-01T00:00:00</datumvoorschrift>
		<rizivnummervoorschrijver/>
		<naamvoorschrijver> </naamvoorschrijver>
		<remgeld>0</remgeld>
		<nomenclatuurnummer>000000</nomenclatuurnummer>
		<pseudocodenummer>426856</pseudocodenummer>
		<kb90bedrag>6.25</kb90bedrag>
		<kb90omschrijving>Avondzorg; aan/uitkleden,pants...,tanden poetsen</kb90omschrijving>
		<rizivnummerzorgkundige/>
		<naamzorgkundige/>
		<rizivnummerverpleegkundige>149488014401</rizivnummerverpleegkundige>
		<patientgegevens_id>341</patientgegevens_id>
		<bezoeknummer>1</bezoeknummer>
		<rep_typebestemmeling_id>3</rep_typebestemmeling_id>
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
		<TypeFacturering>0</TypeFacturering>
		<metadata>
			<item>
				<naam>prestatiecode</naam>
				<waarde>AV0154</waarde>
			</item>
		</metadata>
	</uitgevoerdezorg>
```

## Locatie veld bij node uitgevoerde zorg
De nomenclatuur specifieert enkel “praktijkkamer OF hersteloord”. Vanaf prestatiedatum 1 april 2016 kan men voor deze nomenclatuurnrs geen bedrag meer factureren, tenzij deze is uitgevoerd in een hersteloord. Om dit onderscheid te kunnen maken wordt de locatie gespescifieerd via een pseudocode (zie onderstaande tabel).
Wanneer de doorgegeven nomenclatuurnr een “praktijkkamer of hersteloord” betreft, moet een van de onderstaande pseudocodes worden vermeld. Op basis van deze pseudocode zal TDM3 dan al dan niet een bedrag factureren. 
| NomenclatuurCode | Omschrijving                                                                                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 421131           | Verpleegkundigen: pseudo-code betrekkelijke verstrekking: alleenstaande praktijkkamer van verpleegkundige(n)                                                                              |
| 421212           | Verpleegkundigen: pseudo-code betrekkelijke verstrekking: hersteloord                                                                                                                     |
| 421175           | Verpleegkundigen: pseudo-code betrekkelijke verstrekking: praktijkkamer van verpleegkundige(n) in een ziekenhuis                                                                          |
| 421190           | Verpleegkundigen: pseudo-code betrekkelijke verstrekking: praktijkkamer van verpleegkundige(n) in een polikliniek buiten een ziekenhuiscampus bij geneesheer specialist(en)               |
| 421153           | Verpleegkundigen: pseudo-code betrekkelijke verstrekking: praktijkkamer van verpleegkundige(n) deel uit makend van een multidisciplinaire groepspraktijk van eerste lijns gezondheidszorg |


## Pijnpompcodes
Aangezien op basis van de pseudocode niet is op te maken welke betalende nomenclatuurcode TDM3 dient toe te voegen, moet in de xml de betalende nomenclatuurcode alsook de pseudocode meegaan, als aparte uitgevoerdezorg nodes:  1 met veld nomenclatuurummer  ingevuld, voor de betalende nomenclatuurcode, de andere met het veld Pseudocodenummer ingevuld, voor de pseudocode.

**Betalende codes**
| NomenclatuurCode | WWaarde | KorteOmschrijvingNL                                                     |
| ---------------- | ------- | ----------------------------------------------------------------------- |
| 429251           | 2.94600 | vervangen suprapubische sonde met ballon / verblijfplaats mindervaliden |
| 427571           | 2.94600 | toezicht/opvolging pompsystemen catheter / praktijkkamer                |
| 427534           | 2.94600 | toezicht/opvolging pompsystemen catheter / weekdag aan huis             |
| 427556           | 4.50400 | toezicht/opvolging pompsystemen catheter / weekend/feestdag aan huis    |

  **Pseudocodes**
| NomenclatuurCode | WWaarde | OmschrijvingNL                                                                                                                                                                                                                                          |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 427615           | NULL    | Thuiszorgen verpleegkunde, specifieke technische verstrekkingen : Pseudocode te vermelden voor elke verbandwissel dat tijdens de verzorgingsdag is verleend bij de facturatie van de verstrekking 427534, 427556, 427571 of 429251                      |
| 427593           | NULL    | Thuiszorgen verpleegkunde, specifieke technische verstrekkingen : Pseudocode te vermelden voor elk bijkomend bezoek dat tijdens de verzorgingsdag is verleend bij de facturatie van de verstrekking 427534, 427556, 427571 of 429251                    |
| 427630           | NULL    | Thuiszorgen verpleegkunde, specifieke technische verstrekkingen : Pseudocode te vermelden voor elk heropstarten van de pomp dat tijdens de verzorgingsdag is verleend bij de facturatie van de verstrekking 427534, 427556, 427571 of 429251            |
| 427674           | NULL    | Thuiszorgen verpleegkunde, specifieke technische verstrekkingen : Pseudocode te vermelden voor elk wisselen van het medicatiereservoir dat tijdens de verzorgingsdag is verleend bij de facturatie van de verstrekking 427534, 427556, 427571 of 429251 |
| 427652           | NULL    | Thuiszorgen verpleegkunde, specifieke technische verstrekkingen : Pseudocode te vermelden voor elke wijziging van de onderhoudsdosis dat tijdens de verzorgingsdag is verleend bij de facturatie van de verstrekking 427534, 427556, 427571 of 429251   |

##  het doorgeven van een afscoring forfait
Het oorspronkelijke forfait en oorspronkelijke zorgen hoeven niet doorgegeven worden. De zorgen + nieuw profiel moeten doorgegeven worden. 
Bij de betrokken zorgen hoeft enkel type facturering = 5 meegegeven te worden. TDM3 kan dan een  correctie forfait factuur opstellen,  de originele factuurlijnen worden opgehaald, in min gezet en de nieuwe factuurlijnen worden in plus zetten.
Wat indien de oorspronkelijke facturatie niet door TDM3 of onder een ander groepsnr is uitgevoerd? Dit gebeurt niet via de xml en verijst manuele interventie van een TDM3 tarificateur.
    
Voorbeeld afscoring forfait/profiel van A naar T7
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
		<datumvoorschrift>2018-04-01T00:00:00</datumvoorschrift>
		<rizivnummervoorschrijver/>
		<naamvoorschrijver> </naamvoorschrijver>
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
## COVID19-crisis instructies
### Diabeteseducatie via videoconsultatie tijdens de COVID19-crisis
- Als tijdelijke aanpassing mag een individuele sessie tijdens de duur van de maatregelen, door middel van videocommunicatie plaatsvinden.
	Deze "locatie" kan via de xml aangeduid worden door de pseudocode **792433** te vermelden in het element **Locatie** ([Bron RIZIV](https://www.riziv.fgov.be/nl/covid19/Paginas/diabeteseducatie-1ste-lijn-videoconsultatie.aspx))
```xml
	    <uitgevoerdezorg>
		     ...andere elementen...
			<nomenclatuurnummer>794312 </nomenclatuurnummer>
			<Locatie>792433</Locatie>
	         ...andere elementen...
		</uitgevoerdezorg>
```
## Hervorming wondzorg nomenclatuur december 2022
De hervorming van de wondzorg nomenclatuur vereist enkele aanpassingen en nieuwe gegevens, afhankelijk van de manier  waarop de info wordt doorgegeven.

**Optie A**: Het pakket geeft rechtstreeks de overeenkomstige nomenclatuurcode voor bijkomend honorarium complexe wondzorg via een aparte [node uitgevoerde zorg](nodes#node-uitgevoerdezorg).  TDM3 zal dit dan  niet zelf toevoegen.

**Optie B**: Het pakket geeft de kennisgeving wondzorg door en de zorgduur van de complexe wondzorg
 - Kennisgegving: Een [kennisgevingwondzorg node](nodes#node-kennsigevingwondzorg)
 - Zorgduur: de zorgduur van de complexe wondzorg bij uitgevoerdezorg node via [uitgevoerdezorg.zorgminuten](nodes#node-uitgevoerdezorg)
 
 Op basis de zorgduurte van de complexe wondzorgen die dag en de meeste recente aanwezige kennisgevingwondzorg, zal TDM3 voor een specifieke dag het correcte bijkomend honorarium complexe wondzorg factureren.

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
			<datumvoorschrift/>
			<rizivnummervoorschrijver/>
			<naamvoorschrijver/>
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

## Facturatie pseudocodes thuishospitalisatie juli 2023
Het gaat om onderstaande pseudocodes, die mogen gefactureerd worden voor prestaties vanaf 1 juli 2023.
| NomenclatuurCode | WWaarde | KorteOmschrijvingNL                                                     |
| ---------------- | ------- | ----------------------------------------------------------------------- |
| 418574           | NULL | Initiëren thuishospitalisatie: forfaitair honorarium voor thuisverpleegkundigen te factureren via derdebetalersregeling |
| 418596           | NULL | Forfait honorarium per behandeldag zorgafstemming door de thuisverpleegkundige in de thuissituatie te factureren via derdebetalersregeling                |
| 418611           | NULL | Forfaitair honorarium voor verpleegkundige bij toediening in de leefomgeving van de patiënt van antitumorale geneesmiddelen langs intramusculaire,subcutane of hypodermale toedieningsweg te factureren via derdebetalersregeling             |

Deze pseudocodes mogen en moeten meekomen via het xml-prestatiebestand als aparte uitgevoerde zorg volgens de gekende regels van de xml/RIZIV facturatie. 
Ze kunnen autonoom gefactureerd worden, vereisen een voorschrift, worden uitgevoerd door een verpleegkundige en vereisen een verificatie van de identiteit.

```xml
		<uitgevoerdezorg>
			<input_uitgevoerdezorg_id>32145344</input_uitgevoerdezorg_id>
			<externeid>6454</externeid>
			<datumuitvoering>2023-07-01T09:08:00</datumuitvoering>
			<zorgminuten/>
			<datumvoorschrift>2023-06-25</datumvoorschrift>
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


## Wijziging inzetbaarheid zorgkundigen 01/2024
Vanaf prestatiedatum 01/01/2024 mogen zorgkundigen ook ingezet worden bij de uitvoering van palliatieve zorgen, op voorwaarde dat een zitting door een verpleegkundige is uitgevoerd.
Hier zijn enkele uitzonderingen voor: wanneer de patiënt komt te overlijden, of bij een opname of ontslag in een zorginstelling. Dan kan de verpleegassistent, verpleegkundige of zorgkundige de engiste zijn, of kan een forfait C/PC gefactureerd worden wanneer er maar 1 zitting heeft plaatsgevonden.

Daarom wordt de betekenis van het veld [uitgevoerdezorg.ZHOpname](/nurse/nodes#node-uitgevoerdezorg) (int) uitgebreid, met extra waardes: 2,3 en 4.
Deze waardes zijn:
- 0 = geen opname
- 1 = opname in ziekenhuis 
- **2 = ontslag in ziekenhuis**
- **3 = opname in andere verzorgingsinstelling**
- **4 = ontslag in andere verzorgingsinstelling**

Bij waarde 1 en 2 zal TDM3 de pseudocode [426613](https://webappsa.riziv-inami.fgov.be/Nomen/nl/426613) toevoegen in facturatie. Tevens zijn de waardes van belang m.b.t. het correct factureren van palliatieve forfaits, een forfait PC/C (uitzonderingsituaties)

## Referentienummer digitaal verwijsvoorschrift
Voor prestaties waarbij een digitaal verwijsvoorschrift werd gebruikt, moet het referentienummer meegegeven worden in het prestatiebestand naar analogie met de facturatie instructies:

- **[referentieverwijsvoorschrift](/nurse/nodes#node-uitgevoerdezorg)** (string): Het referentienummer (shortcode) van het digitaal verwijsvoorschrift. Dit nummer bestaat uit 6 alfanumerieke karakters. Moet ingevuld worden wanneer electronisch verwijsvoorschrift werd gebruikt.
```xml
		<uitgevoerdezorg>
			<input_uitgevoerdezorg_id>32145344</input_uitgevoerdezorg_id>
			<externeid>6454</externeid>
			<datumuitvoering>2023-07-01T09:08:00</datumuitvoering>
			<zorgminuten/>
			<datumvoorschrift>2023-06-25</datumvoorschrift>
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

## Adressering - busnummers - factuur aan patiënt en bewijsstuk

Voor een correcte adressering is het belangrijk dat het busnummer (bus, appartement) wordt meegegeven via een apart veld i.p.v. in het huisnummer veld. Het busnummer veld is beschikbaar op verschillende plaatsen in de XML structuur:

- **post-adres patiëntfactuur op [patientgegevens node](nodes#node-patiëntgegevens)**: Het `busnr` veld op de patientgegevens node voor het adres waarnaar de 'factuur aan de patiënt' mag verstuurd worden. Wordt door TDM3 gebruikt voor afdruk, en voor verzending van de factuur wanneer kanaalfactuurpatient=1 is of niet gespecifieerd.
- **Bewijsstuk bestemmeling op [patientgegevens node](nodes#node-patiëntgegevens)**: Het `busnrbestemmelingbewijsstuk` veld op de patientgegevens node voor het adres van de ontvanger van het bewijsstuk (patiënt of vertegenwoordiger)

Het busnummer wordt aangeraden in te vullen wanneer het adres een busnummer vereist en dit in het EVD eveneens in een apart veld beschikbaar is. Dit om ervoor te zorgen dat facturen en bewijsstukken op het correcte adres aankomen.

### Voorbeeld 1: Post-adres patiëntfactuur met busnummer
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

### Voorbeeld 2: Bewijsstuk bestemmeling met busnummer
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
    <busnrbestemmelingbewijsstuk>A12</busnrbestemmelingbewijsstuk>
    <postcodebestemmelingbewijsstuk>2000</postcodebestemmelingbewijsstuk>
    <gemeentebestemmelingbewijsstuk>Antwerpen</gemeentebestemmelingbewijsstuk>
    <landcodebestemmelingbewijsstuk>BE</landcodebestemmelingbewijsstuk>

</patientgegevens>
```

### Voorbeeld 3: Gecombineerd - beide adressen met busnummer
```xml
<patientgegevens>
    <patientgegevens_id>343</patientgegevens_id>
    <externeid>343</externeid>
    <naam>VERMEULEN</naam>
    <voornaam>Sophie</voornaam>
    <rijksregisternummer>55110812345</rijksregisternummer>
    <!-- Post-adres patiëntfactuur met busnummer -->
    <straat>Kerkstraat</straat>
    <huisnummer>15</huisnummer>
    <busnr>3B</busnr>
    <postcode>1000</postcode>
    <gemeente>Brussel</gemeente>
    <landcode>BE</landcode>
    <ziekenfondscode>200</ziekenfondscode>
    <kanaalfactuurpatient>1</kanaalfactuurpatient>
    <!-- Bewijsstuk bestemmeling adres met busnummer (vertegenwoordiger) -->
    <kanaalbewijsstuk>1</kanaalbewijsstuk>
    <bestemmelingbewijsstuk>2</bestemmelingbewijsstuk>
    <naambestemmelingbewijsstuk>VERMEULEN</naambestemmelingbewijsstuk>
    <voornaambestemmelingbewijsstuk>Tom</voornaambestemmelingbewijsstuk>
    <straatbestemmelingbewijsstuk>Dorpstraat</straatbestemmelingbewijsstuk>
    <huisnummerbestemmelingbewijsstuk>42</huisnummerbestemmelingbewijsstuk>
    <busnrbestemmelingbewijsstuk>A12</busnrbestemmelingbewijsstuk>
    <postcodebestemmelingbewijsstuk>2000</postcodebestemmelingbewijsstuk>
    <gemeentebestemmelingbewijsstuk>Antwerpen</gemeentebestemmelingbewijsstuk>
    <landcodebestemmelingbewijsstuk>BE</landcodebestemmelingbewijsstuk>
</patientgegevens>