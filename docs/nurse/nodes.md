---
outline: deep
---
# Nodes

Deze pagina beschrijft alle nodes en elementen van het prestatiebestand. Voor de betekenis in de facturatie, zie [Wie](/nurse/wie), [Wat](/nurse/wat), [Aan wie](/nurse/aan-wie) en [Hoe](/nurse/hoe).

::: tip XSD-schema
[Download](/schemas/tdm3prestatiebestand.xsd)

![image](https://www.plantuml.com/plantuml/svg/NP5HRiCW44J_VGha_roXobLe6CZMBY30jkJJPupNITMl6UtpB0E-rsPBMtxd8IO7ausjPinscj020bR4EfweTbIJRvijU2voWMoRffeW_e_jgOIE5o5Q4uh3CLCyO--KAZ68um9faAQOvJgcYfV7SOBZ8VNY-SIvo4_zHi64o3KALvoKod7uW5oIrrpoWXbHmNQMuPOebMqPsL9qV_fw--YVKDjIZZuPHKZ6OSZcTlioLPNFeUw8g-KrrV56whZgYbmZDdwFabUxxSCTqV5VlG00)
:::

## Node pakketgegevens
Deze node is de overkoepelende node waaronder alle andere nodes verzameld staan.

- één tarificatiedienst-node
- één softwarehuis-node
- één facturatieperiode-node
- één vereniging-node
- een aantal patientgegevens-node
- een aantal uitgevoerdezorg-nodes
- een aantal profielen-nodes
- een aantal lezingidentiteit nodes
- een aantal kennisgevingwondzorg nodes
- een aantal [betaler](#node-betaler)-nodes

Welke elementen verplicht zijn, staat in het [XSD-schema](/schemas/tdm3prestatiebestand.xsd). De voorbeelden op deze site tonen enkel de elementen die voor de situatie van belang zijn.

```xml
	<pakketgegevens>
		<tarificatiedienst>
			…
		</tarificatiedienst>		
		<softwarehuis>
			…
		</softwarehuis>
		<facturatieperiode>
			…
		</facturatieperiode>
		<vereniging>
			…
		</vereniging>
		<patientgegevens>
			…
		</patientgegevens>
		<patientgegevens>
			…
		</patientgegevens>
		<uitgevoerdezorg>
			…
		</uitgevoerdezorg>
		<uitgevoerdezorg>
			…
		</uitgevoerdezorg>
		<profielen>
			…
		</profielen>
		<profielen>
			…
		</profielen>
		<lezingidentiteit>
			…
		</lezingidentiteit>
		<kennisgevingwondzorg>
			…
		</kennisgevingwondzorg>
	</pakketgegevens>

```

## Node softwarehuis
Deze node bevat de gegevens van het softwarehuis

- **code** (string): Dit is een code toegekend door TDM3.
- **naam** (string): De naam van het softwarehuis
- **telefoonnummer** (string): Het telefoonnummer van het softwarehuis
- **email** (string): Het emailadres van het softwarehuis


Voorbeeld:
```xml
	<softwarehuis>
		<code>…</code>
		<naam>…</naam>
		<telefoonnummer>…</telefoonnummer>
		<email>…</email>
	</softwarehuis>
```

## Node patientgegevens

Per patiënt is er normaal één patientgegevens-node met hierin de volgende gegevens. Meerdere nodes voor dezelfde patiënt mogen, bijvoorbeeld bij een gewijzigd adres of ziekenfonds: TDM3 ontdubbelt ze, zie [Wat het pakket aanlevert](/nurse/wat#wat-het-pakket-aanlevert). De volgorde van de elementen in de XML volgt het [XSD-schema](/schemas/tdm3prestatiebestand.xsd); de oplijsting hieronder kan daarvan afwijken.

- **patientgegevens\_id** (long): Dit is een uniek nummer binnen dit bestand waarmee de &#39;uitgevoerdezorgen&#39;-nodes en &#39;profielen&#39;-nodes gelinkt kunnen worden aan de &#39;patiënt&#39;. Dit wil zeggen dat voor elk &#39;profielen&#39;-node en elke &#39;uitgevoerdezorg&#39;-node van de patiënt deze patientgegevens\_id gebruikt moet worden.
- **externeid** (string): De patientid van het versturende systeem. De koppeling met de 'uitgevoerdezorgen'-nodes en de 'profielen'-nodes loopt via patientgegevens\_id; externeid dient ter informatie. Het element is wel verplicht op die nodes.
- **naam** (string): De naam van de patiënt.
- **email** (string): Het emailadres van de patiënt (optioneel).
- **kanaalfactuurpatient** (integer): Het kanaal waarlangs de patiëntfactuur moet verstuurd worden (optioneel). Mogelijke waardes:
   - 1 = Per Post. Tevens standaard waarde wanneer niets is ingevuld. 
   - 2 = Per e-mail. De praktijk beschikt dan over een toestemming van de patiënt dat de factuur per e-mail mag verstuurd worden.
- **emailfactuurpatient** (string): Het e-mailadres waarnaartoe de patiëntfactuur moet verstuurd worden wanneer kanaalfactuurpatient = 2.
- **voornaam** (string): De voornaam van de patiënt.
- **geslacht** (string): Het geslacht van de patiënt (mogelijke waardes: M, V).
- **geboortedatum** (dateTime): De geboortedatum van de patiënt.
- **straat** (string): De straat van de patiënt. (domicilie/factuur adres)
- **huisnummer** (string): De huisnummer van de patiënt. (kan maximum 10 karakters bevatten).  (domicilie adres)
- **busnr** (string): De busnr van de patiënt. (kan maximum 10 karakters bevatten).  (domicilie/factuur adres)
- **postcode** (string): De postcode van de patiënt.  (domicilie/factuur adres)
- **gemeente** (string): De gemeente van de patiënt.  (domicilie/factuur adres)
- **landcode** (string): De landcode van de patiënt (ISO)  (domicilie/factuur adres)
- **ziekenfondscode** (string): Het ziekenfonds waar de patiënt is aangesloten. TDM3 gebruikt de gegevens van MyCareNet wanneer die beschikbaar zijn, anders deze waarde.
- **stamnummer** (string): Enkel voor buitenlanders en boorlingen, **voor alle andere gevallen moet men het rijksregisternummer gebruiken.** Bij facturatie van zorgen buiten het ZIV (verzekering, ocmw, patient) en het rijksregisternummer of stamnummer is niet gekend, kan in dit veld een unieke identificatienummer meegegeven worden.
- **hoedanigheid** (string): De hoedanigheid van de patiënt (optioneel). (deprecated)
- **geldigvan** (dateTime): Geldigheidsperiode van - datum (optioneel). (deprecated)
- **geldigtot** (dateTime): Geldigheidsperiode tot datum (optioneel). (deprecated)
- **risicocode1** (string): De risicocode 1 (CG1) van de patiënt. TDM3 gebruikt de gegevens van MyCareNet wanneer die beschikbaar zijn, anders deze waarde.
- **risicocode2** (string): De risicocode 2 (CG2) van de patiënt. TDM3 gebruikt de gegevens van MyCareNet wanneer die beschikbaar zijn, anders deze waarde.
- **ruraal** (string): `true` wanneer het adres in een rurale zone ligt, anders `false`. Bij `true` voegt TDM3 de verplaatsingskosten (418913) toe bij zorg die thuis wordt verleend, zie [Rurale zone en verplaatsingskosten](/nurse/wat#rurale-zone-en-verplaatsingskosten).
- **startdatumpal** (dateTime): De startdatum paliatieve verzorging, van het palliatief akkoord.
- **rijksregisternummer** (string): Het rijksregisternummer van de patiënt.
- **kanaalbewijsstuk** (integer): 1 = Per post, 2 = per e-mail, 3 = eBox
- **bestemmelingbewijsstuk** (integer): 1 = patiënt, 2 = vertegenwoordiger van de patiënt of bewindvoerder
- **naambestemmelingbewijsstuk** (string): De naam van de bestemmelingbewijsstuk (zelfs als dit de patiënt is)
- **voornaambestemmelingbewijsstuk** (string): De voornaam van de bestemmelingbewijsstuk (zelfs als dit de patiënt is)
- **straatbestemmelingbewijsstuk** (string): De straat van bestemmelingbewijsstuk (zelfs als dit de patiënt is)
- **huisnummerbestemmelingbewijsstuk** (string): De huisnummer van bestemmelingbewijsstuk (zelfs als dit de patiënt is). (kan maximum 10 karakters bevatten)
- **busbestemmelingbewijsstuk** (string): De busnummer van bestemmelingbewijsstuk (zelfs als dit de patiënt is). (kan maximum 10 karakters bevatten)
- **postcodebestemmelingbewijsstuk** (string): De postcode van bestemmelingbewijsstuk (zelfs als dit de patiënt is).
- **gemeentebestemmelingbewijsstuk** (string): De gemeente van van bestemmelingbewijsstuk (zelfs als dit de patiënt is).
- **emailbestemmelingbewijsstuk** (string): e-mailadres van bestemmelingbewijsstuk (zelfs als dit de patiënt is).
- **taalcodebewijsstuk** (string): de ISO-639-1 taalcode waarin het bewijsstuk moet opgesteld worden.  [https://en.wikipedia.org/wiki/List\_of\_ISO\_639-1\_codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
    - Nederlands = nl
    - Frans = fr
    - Tweetalig = nlfr
    Indien geen taalcode wordt meegegeven of aangeduid, wordt de overeenkomstige taal van de postcode (Gewest) gebruikt. Indien Brussels Hoofdstedelijk Gewest, dan wordt het bewijsstuk tweetalig opgesteld.
- **identificatiebestemmelingbewijsstuk** (string)
  - identificatie eigenaar ebox
  - indien patient, hier het insz nummer van de patient herhalen, indien bewindvoerder, de insz van de bewindvoerder plaatsen.
- **identificatietypebestemmelingbewijsstuk** (int)
  - type identificatie eigenaar eBox, 1 = INSS , 2 = NIHII, 3 = CBE (organization)
- **landcodebestemmelingbewijsstuk** (string): De landcode van bestemmelingbewijsstuk (zelfs als dit de patiënt is).

- **metadata**(type metadata, optioneel element)**:** een &quot;key-value&quot; pair  (naam-waarde) van items waarbij optioneel meta informatie kan meegegeven, die niet direct te maken heeft met de tarificatie van prestaties.
		Voorbeeld metadata item
```xml
			<metadata>
			<item>
				<naam>venootschap</naam>
				<waarde>de zonnebloem</waarde>
			</item>
			<item>
				<naam>ronde</naam>
				<waarde>tour 1</waarde>
			</item>
			</metadata>
```
- **adressen**  (type collection adres, optioneel element). Standaard wordt het domicilie adres (officieel) meegegeven. Via het element adressen kunnen ook andere adressen meegeven
worden, zoals het verzorgingsadres. 

### Element adres op node patientgegevens
Standaard wordt het domicilie adres (officieel) meegegeven op patiëntgegeven niveau, de patiëntfactuur wordt dan naar dit adres verstuurd. 
Andere adressen komen mee via het element adressen. Het element kan een lijst van 1 of meerdere adressen bevatten, elk met een type:

| Type | Betekenis |
| --- | --- |
| Verzorging | Het adres waar de patiënt verzorgd wordt, wanneer dat verschilt van het domicilie adres. `ruraal` op dit adres heeft voorrang op `ruraal` van patientgegevens, zie [Voorrang van het verzorgingsadres](/nurse/wat#voorrang-van-het-verzorgingsadres). |
| Factuur | Het adres waar de patiëntfactuur naartoe gaat, wanneer dat verschilt van het domicilie adres. Is er een adres van dit type, dan gaat de patiëntfactuur naar dit adres en niet naar het adres op patiëntgegeven niveau. Zie [De remgeldfactuur bij een andere partij](/nurse/aan-wie#de-remgeldfactuur-bij-een-andere-partij). |
| Domicilie | Het officiële adres, wanneer op patiëntgegeven niveau een ander adres staat. |


Elk adres heeft volgende eigenschappen
- **type** (AdresType) : string enumeratie beperkt tot volgende waarden: Verzorging, Factuur, Domicilie
- **straat** (string): De straat van de patiënt voor dit type adres.
- **huisnummer** (string): De huisnummer van de patiënt voor dit type adres. (kan maximum 10 karakters bevatten).
- **busnr** (string): De busnummer van de patiënt voor dit type adres. (kan maximum 10 karakters bevatten, optioneel).
- **postcode** (string): De postcode van de patiënt voor dit type adres.
- **gemeente** (string): De gemeente van de patiënt voor dit type adres.
- **landcode** (string): De landcode van de patiënt (ISO) voor dit type adres. 
- **ruraal** (boolean): `true` of `false`. Bij een adres van het type Verzorging heeft dit veld voorrang op `ruraal` van patientgegevens, zie [Voorrang van het verzorgingsadres](/nurse/wat#voorrang-van-het-verzorgingsadres).
- **email** (string): optioneel email adres. 

Voorbeeld adressen
	
```xml
		<patientgegevens>
				<patientgegevens_id>…</patientgegevens_id>
				<externeid>…</externeid>
				<naam>…</naam>
				<voornaam>…</voornaam>
				<geslacht>…</geslacht>
				<geboortedatum>…</geboortedatum>
				<straat>Stationstraat</straat>
				<huisnummer>15</huisnummer>
				<postcode>9300</postcode>
				<gemeente>Aalst</gemeente>
				<landcode>…</landcode>
				<ziekenfondscode>…</ziekenfondscode>
				<adressen>
					<adres>
						<type>Verzorging</type>
						<straat>Drie Sleutelstraat</straat>
						<huisnummer>74</huisnummer>
						<busnr>A</busnr>
						<postcode>9300</postcode>
						<gemeente>Aalst</gemeente>
						<landcode>BE</landcode>
						<ruraal>false</ruraal>
						<email>example@email.be</email>
					</adres>
				</adressen>
		</patientgegevens>
```

### Voorbeeld patientgegevens

De elementen staan in de volgorde van het XSD-schema.

```xml
	<patientgegevens>
		<patientgegevens_id>…</patientgegevens_id>
		<externeid>…</externeid>
		<naam>…</naam>
		<email>…</email>
		<voornaam>…</voornaam>
		<geslacht>…</geslacht>
		<geboortedatum>…</geboortedatum>
		<straat>…</straat>
		<huisnummer>…</huisnummer>
		<busnr>…</busnr>
		<postcode>…</postcode>
		<gemeente>…</gemeente>
		<landcode>…</landcode>
		<ziekenfondscode>…</ziekenfondscode>
		<stamnummer>…</stamnummer>
		<risicocode1>…</risicocode1>
		<risicocode2>…</risicocode2>
		<ruraal>…</ruraal>
		<startdatumpal>…</startdatumpal>
		<rijksregisternummer>…</rijksregisternummer>
		<kanaalfactuurpatient>…</kanaalfactuurpatient>
		<emailfactuurpatient>…</emailfactuurpatient>
		<kanaalbewijsstuk>…</kanaalbewijsstuk>
		<bestemmelingbewijsstuk>…</bestemmelingbewijsstuk>
		<naambestemmelingbewijsstuk>…</naambestemmelingbewijsstuk>
		<voornaambestemmelingbewijsstuk>…</voornaambestemmelingbewijsstuk>
		<straatbestemmelingbewijsstuk>…</straatbestemmelingbewijsstuk>
		<huisnummerbestemmelingbewijsstuk>…</huisnummerbestemmelingbewijsstuk>
		<busbestemmelingbewijsstuk>…</busbestemmelingbewijsstuk>
		<postcodebestemmelingbewijsstuk>…</postcodebestemmelingbewijsstuk>
		<gemeentebestemmelingbewijsstuk>…</gemeentebestemmelingbewijsstuk>
		<landcodebestemmelingbewijsstuk>…</landcodebestemmelingbewijsstuk>
		<emailbestemmelingbewijsstuk>…</emailbestemmelingbewijsstuk>
		<identificatiebestemmelingbewijsstuk>…</identificatiebestemmelingbewijsstuk>
		<identificatietypebestemmelingbewijsstuk>…</identificatietypebestemmelingbewijsstuk>
		<taalcodebewijsstuk>…</taalcodebewijsstuk>
		<metadata>
			<item>
				<naam>…</naam>
				<waarde>…</waarde>
			</item>
		</metadata>
		<adressen>
			<adres>...</adres>
		</adressen>
	</patientgegevens>
```

## Node betaler

Dit is een node binnen [pakketgegevens](#node-pakketgegevens) die verwijst naar de derdebetalercode in de uitgevoerdezorg node. De uitleg per type bestemmeling en een voorbeeld staan op [Aan wie](/nurse/aan-wie#de-node-betaler).
Per unieke derdebetalercode mag er max 1 betaler element meegegeven worden.
Dit laat toe om extra gegevens mee te geven ikv de facturatie aan niet-ziekefondsen (patienten, medische huizen, ziekenhuizen, verzekeringen, enz)
- **externeid**: (string) Het externe id van het versturende systeem.
- **type** (long): Indicator die aangeeft over welk soort betaler het gaat. Dezelfde codes als het type bestemmeling: 2=verzekering, 3=patiënt, 4=ocmw, 5=medisch huis, 6=zorgorganisatie. Voor het ziekenfonds is er geen betaler-node.
- **referentienr**: (string) komt overeen met *uitgevoerdezorg.derdebetalercode*.
- **naam** (string): De naam van de organisatie of achernaam van de persoon.
- **voornaam** (string): De voornaam van de persoon, leeg indien een organisatie.
- **email**:  (string) email adres
- **taalcode** (string): de ISO-639-1 taalcode waarin de factuur moet opgesteld worden.  [https://en.wikipedia.org/wiki/List\_of\_ISO\_639-1\_codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
    - Nederlands = nl
    - Frans = fr
    - Tweetalig = nlfr
    Indien geen taalcode wordt meegegeven of aangeduid, wordt de overeenkomstige taal van de postcode (Gewest) gebruikt.
- **rijksregisternr**: (string) Indien persoon. INSZ, stamnummer of  bij facturatie van zorgen buiten het ZIV (verzekering, ocmw, patient) en het rijksregisternummer of stamnummer is niet gekend, kan in dit veld een unieke identificatienummer meegegeven worden.
- **kbonr**: (string) indien facturatie aan een organisatie/bedrijf, kan een KboNr meegegeven worden zodat de factuur correct opgemaakt kan worden en aan de juiste entiteit kan bezorgd worden via een eventueel electronische kanalen
- **rizivnr**: (string) indien facturatie aan een andere zorgorganisatie zoals een groepering, ziekenhuis of medisch huis kan hier de rizivnr van deze organisatie meegegeven worden.
- **uwreferentie**: (string) polisnummer, dossiernummer, ordernummer of andere referentie die voor de partij op de factuur moet verschijnen zodat men efficënt de link kan leggen met het eigen dossierbeheer systeem
- **telefoon**: (string) gsm of telefoonnummer van de betaler waarmee TDM3 contact kan opnemen ikv verdere opvolging van de factuur
- **terattentievan**: (string) hiermee kan verder gespecifieerd worden aan wie of welke afdeling binnen een organisatie de factuur mag gericht worden
- **facturatiekanaal**: (long) 0=POST, 1=EBOX, 2=EMAIL, 3=PEPPOL. Hier kan aangegeven worden via welk kanaal de factuur moet/mag verstuurd worden. Afhankelijk van het kanaal worden bepaalde informatievelden verplicht:
    - PEPPOL: het KBO-nummer (`kbonr`) is verplicht.
    - EBOX: het KBO-nummer is enkel verplicht wanneer de betaler geen patiënt is. Bij een patiënt dient het rijksregisternummer (`rijksregisternr`) als identificatie.
- **adressen**: (complexeType) minstens 1 adres van het [AdresType](#element-adres-op-node-patientgegevens) Factuur 
- **metadata**: (complexeType) zie uitleg bij [metadata](#type-metadata)  



## Node uitgevoerdezorg

Per zorgverstrekking is er een uitgevoerdezorg node met hierin de volgende gegevens. De volgorde van de elementen in de XML volgt het [XSD-schema](/schemas/tdm3prestatiebestand.xsd); de oplijsting hieronder kan daarvan afwijken.

- **input\_uitgevoerdezorg\_id** (long): De uitgevoerdezorgid van het versturende systeem.
- **externeid** (string): Het patientid van het versturende systeem refererend naar externid van patientgegevens.
- **datumuitvoering** (dateTime): De datum waarop de prestatie is uitgevoerd.
- **zorgminuten** (int): Het aantal minuten de uitgevoerdezorg heeft geduurd. Bijvoorbeeld in het kader van een complexe wondzorg.
- **datumvoorschrift** (dateTime): De datum waarop de prestatie is voorgeschreven. Enkel bij een verstrekking met een voorschrift, en altijd samen met rizivnummervoorschrijver, zie [Voorschrift: datum en voorschrijver](/nurse/wat#voorschrift-datum-en-voorschrijver).
- **rizivnummervoorschrijver** (string): De rizivnummer van de voorschrijvende geneesheer.
- **naamvoorschrijver** (string): De naam van de voorschrijvende geneesheer (optioneel).
- **referentieverwijsvoorschrift** (string): referentienummer (Short RefID) (Short Code) van het digitaal verwijsvoorschrift. Dit nummer bestaat uit 6 alfanumerieke karakters. Moet ingevuld worden wanneer voor de verstrekking  een digitaal verwijsvoorschrift werd gebruikt.
- **remgeld** (string): uitgedrukt als percentage van het persoonlijk aandeel dat wordt gevraagd, van 0 tem 100. 0 is geen remgeld tellen, 100 = het volledige persoonlijk aandeel wordt gevraagd.
- **nomenclatuurnummer** (string): De nomenclatuurnummer van de prestatie.
- **pseudocodenummer** (string): De pseudocode voor de nomenclatuur. Moet enkel ingevuld worden indien er geen nomenclatuurnummer bestaat (palliatieve zorgen en niet vergoedbare zorgen). Dan moet de nomenclatuurnummer 000000 zijn. Indien geen pseudocode veld opvullen met 000000. TDM3 verwerkt `nomenclatuurnummer` en `pseudocodenummer` op dezelfde manier: een code mag in een van beide velden staan, maar per uitgevoerdezorg wordt maar één code meegegeven. Het andere veld wordt weggelaten of met 000000 opgevuld. Uitzondering: bij een kb90bedrag staat de code 426856 altijd in `pseudocodenummer`. 
- **kb90bedrag** (string): Het te factureren bedrag van zorg buiten de RIZIV-nomenclatuur, aan de patiënt of een andere betaler dan het ziekenfonds. Deze zorg heeft 426856 als pseudocodenummer. Bij KB90 in strikte zin (een vermelding voor het ziekenfonds) blijft dit veld weg, zie [Zorg zonder RIZIV-nomenclatuur](/nurse/wat#zorg-zonder-riziv-nomenclatuur-kb90).
- **kb90omschrijving** (string): Een vrije omschrijving van de zorg die gefactureerd wordt onder de kb90 nomenclatuur. Verschijnt op de factuur en het bewijsstuk.
- **BtwPercentage** (int): Indien er voor de prestatie btw moet aangerekend worden, dient hier gespecifieerd te worden hoeveel het btw percentage is: 0, 6 of 21
- **BedragInclusiefBtw** (boolean): Hiermee kan gespecifeerd worden hoe de btw berekening dient te gebeuren. Indien het kb90bedrag of de tariefberekening voor de nomenclatuurcode inclusief 21% btw is, dan moet waarde Ja (Boolean True) meegegeven worden. Indien TDM3 zelf btw bedrag dient te berekenen op het kb90 bedrag of het door TDM3 getarifieerde bedrag, dan moet hier waarde Nee (Boolean False) meegeven worden.
- **ziekenfondscode** (string): Het ziekenfonds van de patiënt.
- **rizivnummerverpleegkundige** (string): De rizivnummer van de verpleegkundige, voorafgegaan door 0 of 1. TDM3 bepaalt de conventiestatus zelf en neemt dat cijfer niet over uit het bestand.
- **naamverpleegkundige** (string): de naam van  de verpleegkundige
- **patientgegevens\_id** (long): De unieke nummer van de patiënt binnen dit bestand.
- **bezoeknummer** (long): Het volgnummer van het bezoek bij de patiënt op die dag, van 1 tot en met 10. Het is geen uniek id in het bestand. Alle zorgen van hetzelfde bezoek hebben hetzelfde nummer. De [lezingidentiteit](#node-lezingidentiteit) wordt gekoppeld op patiënt, datum en bezoeknummer.
- **rep\_typebestemmeling\_id** (long): Indicator die aangeeft voor wie de factuur is. Mogelijke waardes: 1=ziekenfonds, 2=verzekering, 3=patiënt, 4=ocmw, 5=medisch huis, 6=zorgorganisatie (een andere zorgorganisatie dan een medisch huis, bijvoorbeeld een ziekenhuis of een groepering). Zie [Type bestemmeling](/nurse/aan-wie#type-bestemmeling).
- **insuline** (boolean): Dit zou op &#39;True&#39; moeten staan wanneer de verpleegkundige een dossier bijhoudt van een diabetes patiënt en de verpleegkundige insuline inspuitingen geeft.  De verpleegkundige krijgt dan een forfait honoraria (423231,423334).  Dit forfait wordt dan door TDM3 toegevoegd.
- **derdebetalercode** (string): Enkel voor niet-ziekenfonds facturen (patiënt, verzekering, medisch huis, ocmw, etc). Bij deze facturen is derdebetalercode of derdebetalernaam verplicht, zie [Derdebetalergegevens](/nurse/aan-wie#derdebetalergegevens). Voor patiëntfacturen staat hier de patientnummer(dit mag een interne id zijn, eigen nummering,…), voor andere staat hierin de id van de verzekering in het versturende systeem. Dit veld mag maximum 10 posities lang zijn.
- **derdebetalernaam** (string): Enkel voor niet-ziekenfonds facturen (patiënt, verzekering, medisch huis, ocmw, etc). De naam van de betaler. Bij een patiëntfactuur is dit de naam op de factuur.
- **derdebetaleradres** (string): Enkel voor niet-ziekenfonds facturen (patiënt, verzekering, medisch huis, ocmw, etc). Het adres van de betaler. Bij een patiëntfactuur is dit het adres op de factuur.
- **derdebetaleremail** (string): Enkel voor niet-ziekenfonds facturen (verzekering medisch huis, ocmw, etc). Indien gewenst door de derde kan hier het email adres meegegeven worden waarnaar de factuur verstuurd moet worden.
- **polisnummer** (string): In geval van facturatie aan verzekering staat hier het eventuele polisnummer.
- **dossiernummer** (string): In geval van facturatie aan verzekering staat hier het eventuele dossiernummer.
- **datumongeval** (dateTime): In geval van een arbeidsongeval staat hier de datum van het ongeval.
- **werkgever** (string): In geval van een arbeidsongeval staat hier de naam van de werkgever.
- **TypeFacturering** (int)
  - 0 = standaard factuur
  - 1 = herindiening. TDM3 behandelt deze waarde als 0 en bepaalt zelf of het om een herindiening gaat, zie [Herindieningen](/nurse/hoe#herindieningen)
  - 3 = kredietnota
  - 5 = correctiefactuur voor forfaits verpleegkundige zorgen wegens declassering na bezoek adviserend geneesheer
- **rizivnummerzorgkundige** (string): De rizivnummer van de zorgkundige
- **naamzorgkundige** (string): De naam van de zorgkundige
- **ZHOpname (string):**  veld om aan te duiden of er die dag een opname/ontslag is in een ziekenhuis of andere zorginstelling. Bij waarde 1 en 2 vermeldt TDM3 de pseudocode [426613](https://webappsa.riziv-inami.fgov.be/Nomen/nl/426613) als betrekkelijke verstrekking in de facturatie. Tevens zijn de waardes van belang m.b.t. het correct factureren van palliatieve forfaits, een forfait PC/C (uitzonderingsituaties).
    - 0 = geen opname
	- 1 = opname in ziekenhuis 
    - 2 = ontslag in ziekenhuis
	- 3 = opname in andere verzorgingsinstelling
	- 4 = ontslag in andere verzorgingsinstelling
- **Locatie:** Ikv Verordening van 28 juli 2003 bijlage 85, wordt hier de overeenkomstige pseudocode meegegeven die moeten vermeld worden bij de verstrekkingen van art. 8, §1, 3° van de nomenclatuur (&quot;verstrekkingen verleend hetzij in de praktijkkamer van de beoefenaar van de verpleegkunde, hetzij in een hersteloord&quot;). Deze pseudocodes geven de plaats van verstrekking weer, zie [Betrekkelijke verstrekking: locatie](/nurse/wat#betrekkelijke-verstrekking-locatie). Voor het pilootproject artikel 56 bevat dit element de locatiecode van de directe zorg, zie [Pilootproject artikel 56](/nurse/artikel56#betrekkelijke-verstrekking-locatie).
- **metadata**(type metadata, optioneel element)**:** een &quot;key-value&quot; pair  (naam-waarde) van items waarbij optioneel meta informatie kan meegegeven, die niet direct te maken heeft met de tarificatie van prestaties.

```xml
	<uitgevoerdezorg>
		<input_uitgevoerdezorg_id>…</input_uitgevoerdezorg_id>
		<externeid>…</externeid>
		<datumuitvoering>…</datumuitvoering>
		<zorgminuten>…</zorgminuten>
		<datumvoorschrift>…</datumvoorschrift>
		<rizivnummervoorschrijver>…</rizivnummervoorschrijver>
		<naamvoorschrijver>…</naamvoorschrijver>
		<referentieverwijsvoorschrift>…</referentieverwijsvoorschrift>
		<remgeld>…</remgeld>
		<nomenclatuurnummer>…</nomenclatuurnummer>
		<pseudocodenummer>…</pseudocodenummer>
		<kb90bedrag>…</kb90bedrag>
		<kb90omschrijving>…</kb90omschrijving>
		<rizivnummerzorgkundige>…</rizivnummerzorgkundige>
		<naamzorgkundige>…</naamzorgkundige>
		<rizivnummerverpleegkundige>…</rizivnummerverpleegkundige>
		<naamverpleegkundige>…</naamverpleegkundige>
		<ziekenfondscode>…</ziekenfondscode>
		<patientgegevens_id>…</patientgegevens_id>
		<bezoeknummer>…</bezoeknummer>
		<rep_typebestemmeling_id>…</rep_typebestemmeling_id>
		<insuline>…</insuline>
		<derdebetalercode>…</derdebetalercode>
		<derdebetalernaam>…</derdebetalernaam>
		<derdebetaleradres>…</derdebetaleradres>
		<derdebetaleremail>…</derdebetaleremail>
		<polisnummer>…</polisnummer>
		<dossiernummer>…</dossiernummer>
		<datumongeval>…</datumongeval>
		<werkgever>…</werkgever>
		<ZHOpname>…</ZHOpname>
		<Locatie>…</Locatie>
		<TypeFacturering>…</TypeFacturering>
		<metadata>
			<item>
				<naam>…</naam>
				<waarde>…</waarde>
			</item>
		</metadata>
		<BtwPercentage>…</BtwPercentage>
		<BedragInclusiefBtw>…</BedragInclusiefBtw>
	</uitgevoerdezorg>
```
 

## Node tarificatiedienst

Deze node bevat de code en naam van de tarificatiedienst waar de prestaties verwerkt zullen worden.

-	**code** (string): De code van de tarificatiedienst. Dit moet TDM3 zijn.
-	**naam** (string): De naam van de tarificatiedienst. Dit moet TDM3 zijn.

Voorbeeld:
```xml
<tarificatiedienst>
	<code>TDM3</code>
	<naam>TDM3</naam>
</tarificatiedienst>

```

## Node facturatieperiode

Deze node bevat het jaar en de maand van de verwerking van de prestaties.

- **jaar** (long): Het jaar van de verwerking van de prestaties.
- **maand** (long): De maand van de verwerking van de prestaties.

**Voorbeeld:**

```xml
<facturatieperiode>
	<jaar>…</jaar>
	<maand>…</maand>
</facturatieperiode>
```

## Node vereniging

Deze node bevat de code en naam van de vereniging waar de prestaties vandaan komen.

- **code** (string): De code van de vereniging (praktijk) waar de prestaties vandaan komen.  Via TDM3 aan te vragen.
- **naam** (string): De naam van de vereniging waar de prestaties vandaan komen.

**Voorbeeld:**
```xml
<vereniging>
	<code>…</code>
	<naam>…</naam>
</vereniging>
```

## Node prijsberekening

Deze node bevat een indicator die aangeeft of de prijsberekening een tijdelijke prijsberekening is of niet.

**- tijdelijk** (boolean): True als het een tijdelijke prijsberekening is.

```xml
<prijsberekening>
	<tijdelijk>false</tijdelijk>
</prijsberekening>
```

## Node profielen
Per patientprofiel is er een profielen-node met daarin volgende gegevens (in volgorde zoals ze hieronder staan).
De startdatum van het palliatief akkoord wordt op patientgegeven node meegegeven, in het veld &quot;startdatumpal&quot;.

- **externeid** (string): de patientid uit het versturende systeem refererend naar externid van patientgegevens.
- **startdatum** (dateTime): Startdatum van het mycarenet akkoord/profiel
- **einddatum** (dateTime): Einddatum van het mycarenet akkoord/profiel
- **patientgegevens\_id** (long): De unieke nummer van de patiënt binnen dit bestand.
- **profiel** (string): Het type profiel van de patiënt.

Mogelijke waardes zijn :
| **profiel** | Omschrijving       | Aantal toilleten |
| ----------- | ------------------ | ---------------- |
| A           | Profiel A          | 7                |
| B           | Profiel B          | 7                |
| C           | Profiel C          | 7                |
| P2          | Palliatief Profiel | 2                |
| P7          | Palliatief Profiel | 7                |
| PA          | Forfait PA         | 7                |
| PB          | Forfait PB         | 7                |
| PC          | Forfait PC         | 7                |
| PN          | Forfait PN         | 7                |
| T2          | Profiel N          | 2                |
| T7          | Profiel N          | 7                |

Het profiel PP wordt niet meegegeven. Het pakket geeft PN door en TDM3 schaalt zelf op naar PP op de dagen waarop het dagplafond bereikt is, zie [PN en PP](/nurse/wat#pn-en-pp).

```xml
<profielen>
	<externeid>…</externeid>
	<startdatum>…</startdatum>
	<einddatum>…</einddatum>
	<patientgegevens_id>…</patientgegevens_id>
	<profiel>…</profiel>
</profielen>
```


## Node lezingidentiteit
Dit is enkel van toepassing bij facturatie via electronische derdebetaler! Maw, niet bij facturatie naar een Medisch huis, verzekering, patiënt,…
-	Vanaf 1/10/2017 is er verplichte verificatie van de identiteit van de patiënt, bij toepassing van facturatie via electronische derdebetaler
-	**De richtlijnen omtrent “lezing identiteit node” in deze xml volgen 1-op-1 de richtlijnen van de ‘groene bijbel’ (instructies electronische facturatie)**
-	Elk bezoek bij elke patiënt, dat via electronische derdebetaler wordt gefactureerd, geeft dus aanleiding tot een “lezingidentiteit” node (vanaf 1/10/2017).
-	Zorgen die geen bezoek vereisen en autonoom voorkomen, geven ook aanleiding tot een “lezingidentiteit” node, maar dan met “typevandrageridentiteitsdocument” = 7 en “redengebruikvignet” = 1
-	TDM3 zal ter hoogte van de facturatie rekening houden met enkel de lezingen identiteit die van toepassing zijn.

De volgende gegevens zijn vereist.

* **externeid** (string): de patientid uit het versturende systeem refererend naar externid van patientgegevens.	Cfr de uitgevoerdezorg node 
* **patientgegevens_id** (long): De unieke nummer van de patiënt binnen dit bestand. Cfr de uitgevoerdezorg node 
* **redenmanueleinvoering** (int):
    * Mogelijke waardes:
        - 0 = Niet van toepassing
        - 1 = Gebruik identiteitsdocument zonder chip
        - 2 = Onbeschikbaarheid kaartlezer
        - 3 = Panne van het informaticasysteem
        - 4 = Uitgestelde verificatie zonder panne, omdat de patiënt geen geldig identiteitsdocument kon voorleggen
        - 5 = Uitgestelde verificatie zonder panne, omdat vergeten werd om het identiteitsdocument in te lezen
        - 6 = Gebrek aan interconnectiviteit tussen software
        - 7 = Rechthebbende bezig geen identiteitsdocument (zoals bedoeld in artikel 3 van het KB 18/09/2015)
* **datumuitvoering** (dateTime): de datum van het bezoek, cfr datumuitvoering veld in uitgevoerdezorg node
* **bezoeknummer** (long): Nummer van het bezoek. Cfr node uitgevoerdezorg.
* **datumlezingidentiteitsdocument** (dateTime): datum waarop het identiteitsdocument is ingelezen. Dit element moet steeds ingevuld worden, behalve indien “typevanlezingidentiteitsdocument” = 4 en redenmanueleinvoering = 3.
*	**identificatiepatient** (string): de rijksregisternr, insz van de rechthebbende, cfr patientgegeven node.
*	**typevanlezingidentiteitsdocument** (string): Mogelijke waardes
      1. Lezing van de chipkaart
      2. Lezing van de streepjescode
      3. Lezing QR code
      4. Manuele invoering
        - Bij gebruik van deze waarde moet in “redenmanueleinvoering“ de reden vermeld worden.
     - A: Elektronische invoering (itsme®)
*	**typevandrageridentiteitsdocument** (string):
      
	  0. Geen (enkel wanneer Reden Manuele Invoering = 7, rechthebbende bezig geen identiteitsdocument)
      1. Belgische elektronische identiteitskaart (of Kids-id)
      2. Elektronische vreemdelingenkaart
      3. Kid-id kaart (*)
         - mogelijk tot en met gefactureerde maand december 2016; vanaf gefactureerde maand januari 2017 moet waarde 1 gebruikt worden ingeval van Kids-id.
      4. ISI+ kaart
      5. Elektronisch verblijfsdocument
      6. Een nog geldige sociale identiteitskaart (SIS-kaart) (**)
         - Niet meer geldig vanaf 01/01/2017
      7. Een vignet met streepjescode
          - Bij gebruik van deze waarde, moet in element “redengebruikvignet” de reden vermeld worden.
      8. Attest van sociaal verzekerde
      9. Attest van verlies of diefstal van Belgische elektronische
     - A: Elektronische invoering (itsme®)

*	**redengebruikvignet** (int):
    - Mogelijke waardes:
        - 0 = Niet van toepassing
        - 1 = Rechthebbende niet aanwezig tijdens verstrekking en gelijktijdige aanwezigheid van rechthebbende en zorgverlener niet reglementair vereist
        - 2 = Rechthebbende bezit geen identiteitsdocument
*	**uurvanlezingidentiteitsdocument** (string): formaat HHmm
    -  Voorbeeld: 1510, 0109, 1305, etc
    -  dit element moet steeds ingevuld worden, behalve indien **“typevanlezingidentiteitsdocument”** = 4 en **“redenmanueleinvoering”** = 3
*	**rizivnummerverstrekker** (string): de rizivnummer van de verstrekker
*	**serienummervandedrager** (string): Het serienummer van de drager (eID-kaart, …) moet in dit element vermeld worden. Deze zone moet steeds ingevuld worden, ook ingeval van manuele invoering, behalve indien typevandrageridentiteitsdocument  = 7, 8 of 9.
*	**nummerbewijsstuk** (string): Het nummer van het bewijsstuk afgeleverd aan de patiënt moet in deze zone vermeld worden. Dit hoeft niet ingevuld te worden wanneer de TDM3 Facturatiedienst het bewijsstuk opmaak, dit is dus de standaard situatie!

## Node kennisgevingwondzorg
Op basis de zorgduurte van de complexe wondzorgen (zie node [uitgevoerdezorg](#node-uitgevoerdezorg) 'zorgminuten' ) die dag en de aanwezige kennisgeving Wondzorg, kan TDM3 voor een specifieke dag het bijkomend honorarium complexe wondzorg toevoegen. Deze node volgt de mycarenet berichtgeving. Zie ook [Complexe wondzorg](/nurse/wat#complexe-wondzorg).

- **externeid** (string): de patientid uit het versturende systeem refererend naar externid van patientgegevens.
- **patientgegevens\_id** (long): De unieke nummer van de patiënt binnen dit bestand.
- **identificatiepatient** (string): de rijksregisternr, insz van de rechthebbende, cfr patientgegeven node.
- **startdatum** (dateTime): Startdatum van de mycarenet kennisgeving
- **einddatum** (dateTime): Einddatum van de mycarenet kennisgeving
- **typecomplexewondzorg** (int): Het type complexe wondzorg.
	- 3 = wondzorg tussen 30 en 59 minuten, eerste kennisgeving voor een periode van maximum 3 maanden
    - 4 = wondzorg tussen 60 en 89 minuten, eerste kennisgeving voor een periode van maximum 3 maanden
    - 5 = wondzorg langer dan 89 minuten, eerste kennisgeving voor een periode van maximum 3 maanden
    - 6 = wondzorg tussen 30 en 59 minuten, hernieuwing van kennisgeving voor een periode van maximum 3 maanden
    - 7 = wondzorg tussen 60 en 89 minuten, hernieuwing van kennisgeving voor een periode van maximum 3 maanden
    - 8 = wondzorg langer dan 89 minuten, hernieuwing van kennisgeving voor een periode van maximum 3 maanden

```xml
    <kennisgevingwondzorg>
				<externeid>198</externeid>
				<patientgegevens_id>45</patientgegevens_id>
				<identificatiepatient>20123112345</identificatiepatient>
				<startdatum>2022-12-05T00:00:00</startdatum>
				<einddatum>2023-03-05T00:00:00</einddatum>		
				<typecomplexewondzorg>3</typecomplexewondzorg>
	</kennisgevingwondzorg>

```

## Type metadata

Het optionele element metadata bestaat op [patientgegevens](#node-patientgegevens) en [uitgevoerdezorg](#node-uitgevoerdezorg).

**metadata** (type metadata, optioneel element): een “key-value” pair  (naam-waarde) van items waarbij optioneel meta informatie kan meegegeven. Dit laat toe om op een flexibel manier informatie mee te geven die niet direct te maken heeft met de tarificatie van prestaties, zonder steeds het XSD schema aan te passen.
Het metadata is volledig optioneel voor de software ontwikkelaar van het END. Welke informatie die wordt meegegeven is, zoals steeds, nav concrete afspraken.
Zowel **naam** als **waarde** zijn van type “string”.

```xml
<metadata>
      <item>
        <naam>venootschap</naam>
        <waarde>de zonnebloem</waarde>
      </item>
      <item>
        <naam>ronde</naam>
        <waarde>tour 1</waarde>
      </item>
    </metadata>
```

## Algemene regels
### Het dateTime-formaat
Dit formaat wordt als volgt gedefinëerd: JJJJ-MM-DDTHH:MM:SS.
- JJJJ: jaar (4 posities)
- MM: maand (2 posities)
- DD: dag (2 posities)
- T: vaste waarde, duidt aan dat de tijd volgt.
- HH: uur (2 posities)
- MM: minuten (2 posities)
- SS: seconden (2 posities)

### Toegestane waarden

| Veld | Toegestane waarden |
| --- | --- |
| `ruraal` | `true` of `false`. De waarden `1`, `0` of een leeg veld worden gelezen als `false`. |
| `remgeld` | Een geheel getal van 0 tot en met 100, zonder decimalen. Leeg is 0. |
| `TypeFacturering` | 0, 1, 3 of 5. Weggelaten is 0. Zie [Type facturering](/nurse/hoe#type-facturering). |
| `rep_typebestemmeling_id` | 1 tot en met 6. Weggelaten of 0 is het ziekenfonds. Zie [Type bestemmeling](/nurse/aan-wie#type-bestemmeling). |
| `bezoeknummer` | 1 tot en met 10. |
| `kb90bedrag` | Een bedrag met een punt als decimaalteken, bijvoorbeeld 6.25. |

Een getal (int, long) of een boolean die niet van toepassing is, laat je weg: een leeg element is voor die types ongeldig volgens het XSD.

Het veld `ruraal` is in het XSD een string op patientgegevens en een boolean op adres. Dat is historisch zo gegroeid. Vul op beide plaatsen `true` of `false` in.

### Benaming van de velden
Aangezien XML case-sensitive is moeten alle veldnamen in de juiste case staan zoals in de xsd! De opgegeven benamingen moeten dus letterlijk gebruikt worden.

### Het veld patientgegevens_id
Per patientgegeven-node bestaat er een unieke patientgegevens_id. Deze id moet op elke uitgevoerdezorg-node en op elk profielen-node van de patiënt ingevuld worden. Op basis van dit veld worden de uitgevoerde zorgen en profielen gelinkt aan de patiënt.

In elk XML-bestand wordt er begonnen met patientgegevens_id 1 voor de eerste patiënt.

### Het veld externeid
Per patientgegeven-node bestaat er een externeid: de id van de patiënt in het versturende systeem. Het veld wordt ook ingevuld op elke uitgevoerdezorg-node en op elke profielen-node van de patiënt. De koppeling met de patiënt loopt via patientgegevens_id; externeid dient ter informatie.


## Volledig voorbeeld
Deze XML heeft 2 patiënten, met per patiënt 1 uitgevoerde zorg en 1 profiel. De eerste patiënt is een patiënt die aangesloten is bij een ziekenfonds, de tweede patiënt is verzekerd bij Fortis AG.

```xml
<pakketgegevens>
	<softwarehuis>
		<code>A001</code>
		<naam>AAAAA</naam>
		<telefoonnummer>012/345678</telefoonnummer>
		<email>info@aaaaa.be</email>
	</softwarehuis>
	<patientgegevens>
		<patientgegevens_id>1</patientgegevens_id>
		<externeid>23123</externeid>
		<naam>PEETERS</naam>
		<voornaam>PETER</voornaam>
		<geslacht>M</geslacht>
		<geboortedatum>1920-12-31T00:00:00</geboortedatum>
		<straat>Kerkstraat</straat>
		<huisnummer>1</huisnummer>
		<busnr>B</busnr>
		<postcode>9000</postcode>
		<gemeente>Gent</gemeente>
		<landcode>BE</landcode>
		<ziekenfondscode>131</ziekenfondscode>
		<stamnummer/>
		<risicocode1>110</risicocode1>
		<risicocode2>110</risicocode2>
		<ruraal>false</ruraal>
		<startdatumpal/>
		<rijksregisternummer>20123112345</rijksregisternummer>
	</patientgegevens>
	<patientgegevens>
		<patientgegevens_id>2</patientgegevens_id>
		<externeid>23045</externeid>
		<naam>JANSSEN</naam>
		<voornaam>JAN</voornaam>
		<geslacht>M</geslacht>
		<geboortedatum/>
		<straat>Kerkstraat</straat>
		<huisnummer>2</huisnummer>
		<postcode>9000</postcode>
		<gemeente>Gent</gemeente>
		<landcode>BE</landcode>
		<ziekenfondscode/>
		<stamnummer/>
		<risicocode1/>
		<risicocode2/>
		<ruraal>false</ruraal>
		<startdatumpal/>
		<rijksregisternummer>13456724561</rijksregisternummer>
	</patientgegevens> 
	<uitgevoerdezorg>
		<input_uitgevoerdezorg_id>1234</input_uitgevoerdezorg_id>
		<externeid>23123</externeid>
		<datumuitvoering>2006-05-01T17:00:00</datumuitvoering>
		<datumvoorschrift>2006-04-25T00:00:00</datumvoorschrift>
		<rizivnummervoorschrijver>10765119340</rizivnummervoorschrijver>
		<naamvoorschrijver>WITTERS KATRIJN</naamvoorschrijver>
		<referentieverwijsvoorschrift>A1B2C3</referentieverwijsvoorschrift>
		<remgeld/>
		<nomenclatuurnummer>423275</nomenclatuurnummer>
		<pseudocodenummer>000000</pseudocodenummer>
		<kb90bedrag/>
		<rizivnummerverpleegkundige>148594426401</rizivnummerverpleegkundige>
		<ziekenfondscode/>
		<patientgegevens_id>1</patientgegevens_id>
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
	</uitgevoerdezorg>
	<uitgevoerdezorg>
		<input_uitgevoerdezorg_id>37400</input_uitgevoerdezorg_id>
		<externeid>23045</externeid>
		<datumuitvoering>2006-05-25T18:00:00</datumuitvoering>
		<datumvoorschrift>2006-05-24T00:00:00</datumvoorschrift>
		<rizivnummervoorschrijver>17264911340</rizivnummervoorschrijver>
		<naamvoorschrijver>VOSSEN C</naamvoorschrijver>
		<referentieverwijsvoorschrift/>
		<remgeld/>
		<nomenclatuurnummer>423275</nomenclatuurnummer>
		<pseudocodenummer>000000</pseudocodenummer>
		<kb90bedrag/>
		<rizivnummerverpleegkundige>148946002401</rizivnummerverpleegkundige>
		<ziekenfondscode/>
		<patientgegevens_id>2</patientgegevens_id>
		<bezoeknummer>1</bezoeknummer>
		<rep_typebestemmeling_id>2</rep_typebestemmeling_id>
		<insuline>false</insuline>
		<derdebetalercode>6</derdebetalercode>
		<derdebetalernaam>Fortis AG</derdebetalernaam>
		<derdebetaleradres>E.Jacqmainlaan</derdebetaleradres>
		<polisnummer/>
		<dossiernummer/>
		<datumongeval/>
		<werkgever/>
	</uitgevoerdezorg>
	<tarificatiedienst>
		<code>TDM3</code>
		<naam>TDM3</naam>
	</tarificatiedienst>
	<facturatieperiode>
		<jaar>2006</jaar>
		<maand>5</maand>
	</facturatieperiode>
	<vereniging>
		<code>7139</code>
		<naam>Mederi NV</naam>
	</vereniging>
	<prijsberekening>
		<tijdelijk>false</tijdelijk>
	</prijsberekening>
	<profielen>
		<externeid>23123</externeid>
		<startdatum>2006-04-01T00:00:00</startdatum>
		<einddatum>2006-06-30T00:00:00</einddatum>
		<patientgegevens_id>1</patientgegevens_id>
		<profiel>A</profiel>
	</profielen>
	<profielen>
		<externeid>23045</externeid>
		<startdatum>2006-04-12T00:00:00</startdatum>
		<einddatum>2007-04-11T00:00:00</einddatum>
		<patientgegevens_id>2</patientgegevens_id>
		<profiel>T7</profiel>
	</profielen>
	<lezingidentiteit>
		<externeid>23123</externeid>
		<patientgegevens_id>1</patientgegevens_id>
		<redenmanueleinvoering>0</redenmanueleinvoering>
		<bezoeknummer>1</bezoeknummer>
		<datumuitvoering>2006-05-01T17:00:00</datumuitvoering>
		<datumlezingidentiteitsdocument>2006-05-01T17:00:00</datumlezingidentiteitsdocument>
		<identificatiepatient>20123112345</identificatiepatient>
		<typevanlezingidentiteitsdocument>1</typevanlezingidentiteitsdocument>
		<typevandrageridentiteitsdocument>1</typevandrageridentiteitsdocument>
		<redengebruikvignet>0</redengebruikvignet>
		<uurvanlezingidentiteitsdocument>1700</uurvanlezingidentiteitsdocument>
		<rizivnummerverstrekker>48594426401</rizivnummerverstrekker>
		<serienummervandedrager>590000000001</serienummervandedrager>
	</lezingidentiteit>
</pakketgegevens>

```
