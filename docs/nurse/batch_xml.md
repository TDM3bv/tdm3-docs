# Beschrijving Batch XM


## Algemene opmerkingen
Per praktijk (unieke verenigingcode)  en per “facturatiemaand” wordt er 1 xml bestand aangemaakt.

!!! warning Toevoegingen door TDM3
De uitgevoerde zorgen (als nomenclatuurode) worden doorgegeven in het xml bestand. 
TDM3 voegt zelf onderstaande zaken toe ikv tarificatie.
-	Basisverstrekkingen (eerste, tweede,derde)
-	Forfait A, B, C, PA, PB, PC, PP
o	De nomenclatuurcodes ikv zorgen worden dan vervangen door pseudocodes
-	Supplementair forfait: PN
-	Opvolgingshonorarium diabetes (op basis van waarde “insuline= true” op node uitgevoerde zorg)
-	Verplaatsingskosten (op basis van waarde “ruraal=true” op node patientgegeven)

Dit betekent dat deze nomenclatuurcodes (basisverstrekking, forfaits, pseudocodes als vervanging van) niet meekomen in de xml. Een paliatief forfait wordt aangerekend op basis van 
-	de startdatum “Paliatief” op node patientgegeven. 
-	In combinatie met het doorgegeven patientprofiel. Ook al zou er in de node “patientprofiel” een paliatief forfait profiel zijn aangeduid, TDM3 kijkt altijd naar de startdatum “Paliatief” op node patientgegeven om te bepalen of een patiënt palliatief is of niet.
!!!

!!! info pseudocodes die wel kunnen meegegeven worden in het xml bestand:
Pseudocodes die een bijkomende noodzakelijke registratie betekenen en dus op zichzelf noodzakelijk zijn ikv tarificatie, kunnen en moeten wel meekomen in de xml.

Bijvoorbeeld: 

- 426510:  	Thuiszorgen verpleegkunde, palliatieve patiënten : pseudocode te vermelden voor elk dringend bezoek overdag dat tijdens de verzorgingsdag is verleend voor              het forfait PA (427055 en 427136), voor het forfait PB (427033 en 427114), voor het forfait PC (427011 en 427092), voor het forfait PP (427173 en 427195)               en voor het forfait PN (427070 en 427151)
- 426893: 	Thuiszorgen verpleegkunde, palliatieve patiënten : pseudocode te vermelden voor elk overlegvergadering met de huisarts dat tijdens de verzorgingsdag is                 verleend voor het forfait PA (427055 en 427136), voor het forfait PB (427033 en 427114), voor het forfait PC (427011 en 427092), voor het forfait PP                    (427173 en 427195) en voor het forfait PN (427070 en 427151)

!!!

!!! info Remgeld
Indien er gefactureerd wordt aan een verzekeringsinstelling (type bestemmeling = 2), dan moet bij remgeld (=het deel dat aan de patient wordt gevraagd en dus de patient niet van de derdebetaler (verzekeringsinstelling) terugtrekt). Doorgaans wordt er geen remgeld gevraagd bij individuele verzekeringsinstellingen en is dit zinloos. Maar als dit veld is ingevuld dan zal TDM3 remgeld factureren aan de patient en niet aan de derdebetaler.
!!!

!!! info Herindieningen
Aangezien de facturen en afrekeningenen worden opgemaakt ter hoogte van TDM3, kunnen en mogen herindieningen als gewone indieningen (type facturering = 0) of als expliciet herindiening (type facturering = 1) meegaan, TDM3 voegt de bijkomende gegevens waarover het END niet kan beschikken, toe.
!!!

!!! info Zorgen zonder riziv-nomenclatuur
Deze kunnen en mogen in de xml meegaan en worden gefactureerd onder de KB90 nomenclatuurnr. In het veld KB90Bedrag wordt dan het te factureren bedrag aangeduid.
!!!

!!! info Locatie veld bij node uitgevoerde zorg
De nomenclatuur specifieert enkel “praktijkkamer OF hersteloord”. Vanaf prestatiedatum 1 april 2016 kan men voor deze nomenclatuurnrs geen bedrag meer factureren, tenzij deze is uitgevoerd in een hersteloord. Om dit onderscheid te kunnen maken wordt de locatie gespescifieerd via een pseudocode (zie onderstaande tabel).
Wanneer de doorgegeven nomenclatuurnr een “praktijkkamer of hersteloord” betreft, moet een van de onderstaande pseudocodes worden vermeld. Op basis van deze pseudocode zal TDM3 dan al dan niet een bedrag factureren. 
|NomenclatuurCode |	Omschrijving |
|---|---|
|421131	|Verpleegkundigen: pseudo-code betrekkelijke verstrekking: alleenstaande praktijkkamer van verpleegkundige(n)|
|421212	|Verpleegkundigen: pseudo-code betrekkelijke verstrekking: hersteloord|
|421175	|Verpleegkundigen: pseudo-code betrekkelijke verstrekking: praktijkkamer van verpleegkundige(n) in een ziekenhuis|
|421190 |	Verpleegkundigen: pseudo-code betrekkelijke verstrekking: praktijkkamer van verpleegkundige(n) in een polikliniek buiten een ziekenhuiscampus bij geneesheer specialist(en)|
|421153 |	Verpleegkundigen: pseudo-code betrekkelijke verstrekking: praktijkkamer van verpleegkundige(n) deel uit makend van een multidisciplinaire groepspraktijk van eerste lijns gezondheidszorg |
!!!

!!! info Pijnpompcodes
Aangezien op basis van de pseudocode niet is op te maken welke betalende nomenclatuurcode TDM3 dient toe te voegen, moet in de xml de betalende nomenclatuurcode alsook de pseudocode meegaan, als aparte uitgevoerdezorg nodes:  1 met veld nomenclatuurummer  ingevuld, voor de betalende nomenclatuurcode, de andere met het veld Pseudocodenummer ingevuld, voor de pseudocode.

**Betalende codes**
| NomenclatuurCode | WWaarde | KorteOmschrijvingNL |
| --- | --- | --- |
| 429251 | 2.94600 | vervangen suprapubische sonde met ballon / verblijfplaats mindervaliden |
| 427571 | 2.94600 | toezicht/opvolging pompsystemen catheter / praktijkkamer |
| 427534 | 2.94600 | toezicht/opvolging pompsystemen catheter / weekdag aan huis |
| 427556 | 4.50400 | toezicht/opvolging pompsystemen catheter / weekend/feestdag aan huis |

  **Pseudocodes**
| NomenclatuurCode | WWaarde | OmschrijvingNL |
| --- | --- | --- |
| 427615 | NULL | Thuiszorgen verpleegkunde, specifieke technische verstrekkingen : Pseudocode te vermelden voor elke verbandwissel dat tijdens de verzorgingsdag is verleend bij de facturatie van de verstrekking 427534, 427556, 427571 of 429251 |
| 427593 | NULL | Thuiszorgen verpleegkunde, specifieke technische verstrekkingen : Pseudocode te vermelden voor elk bijkomend bezoek dat tijdens de verzorgingsdag is verleend bij de facturatie van de verstrekking 427534, 427556, 427571 of 429251 |
| 427630 | NULL | Thuiszorgen verpleegkunde, specifieke technische verstrekkingen : Pseudocode te vermelden voor elk heropstarten van de pomp dat tijdens de verzorgingsdag is verleend bij de facturatie van de verstrekking 427534, 427556, 427571 of 429251 |
| 427674 | NULL | Thuiszorgen verpleegkunde, specifieke technische verstrekkingen : Pseudocode te vermelden voor elk wisselen van het medicatiereservoir dat tijdens de verzorgingsdag is verleend bij de facturatie van de verstrekking 427534, 427556, 427571 of 429251 |
| 427652 | NULL | Thuiszorgen verpleegkunde, specifieke technische verstrekkingen : Pseudocode te vermelden voor elke wijziging van de onderhoudsdosis dat tijdens de verzorgingsdag is verleend bij de facturatie van de verstrekking 427534, 427556, 427571 of 429251 |
!!!

!!! info het doorgeven van een afscoring forfait
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
!!!


## Node Pakketgegevens

