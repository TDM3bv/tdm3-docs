---
outline: deep
---
# Voorbeelden artikel 8

Deze pagina toont voorbeelden van het prestatiebestand (nurse-xml) voor de facturatie van thuisverpleging volgens artikel 8 van de nomenclatuur. Elk voorbeeld beschrijft een situatie, de XML die de software van de praktijk aanlevert, en wat TDM3 daarna zelf doet.

De gegevens in de voorbeelden zijn fictief. De combinaties van codes, de tijdstippen en de minuten zijn representatief voor de bestanden die TDM3 ontvangt. De voorbeelden tonen enkel de nodes die voor de situatie van belang zijn; de volledige beschrijving staat bij de [nodes](/nurse/nodes), de algemene regels bij de [algemene instructies](/nurse/). Voor het pilootproject artikel 56, zie [Pilootproject artikel 56](/nurse/artikel56).

## Afspraken in alle voorbeelden

- Elke verstrekking is een aparte `uitgevoerdezorg`. Een nomenclatuurcode staat in `nomenclatuurnummer`. Een pseudocode staat in `pseudocodenummer`, met `nomenclatuurnummer` 000000.
- De zorgen van eenzelfde bezoek hebben hetzelfde `bezoeknummer`. Per dag krijgt elk bezoek een eigen bezoeknummer (1, 2, 3, ...).
- Elk bezoek met zorg die aan het ziekenfonds gefactureerd wordt, heeft een `lezingidentiteit` met hetzelfde bezoeknummer.
- Een toilet vereist een profiel (of een voorschrift). Een profiel geldt op een zorgdag als de zorgdag tussen `startdatum` en `einddatum` ligt en de `startdatum` hoogstens 3 maanden vóór de zorgdag ligt.
- Een `datumvoorschrift` komt altijd samen met `rizivnummervoorschrijver`.
- Basisverstrekkingen, forfaits, het supplement PN, het opvolgingshonorarium diabetes en de verplaatsingskosten (ruraal) worden niet meegegeven: TDM3 voegt die zelf toe, zie [Toevoegingen door TDM3](/nurse/#toevoegingen-door-tdm3).

## Voorbeelden

### Voorbeeld 1: forfaitpatiënt, toilet op een weekdag

Een patiënt met profiel A krijgt op een weekdag een toilet thuis (425110).

```xml
<!-- Profiel A, geldig op de zorgdag -->
<profielen>
	<externeid>100</externeid>
	<startdatum>2026-01-01T00:00:00</startdatum>
	<einddatum>2026-03-31T00:00:00</einddatum>
	<patientgegevens_id>1</patientgegevens_id>
	<profiel>A</profiel>
</profielen>

<!-- Toilet weekdag thuis (425110) -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>1001</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-16T08:00:00</datumuitvoering>
	<zorgminuten>10</zorgminuten>
	<nomenclatuurnummer>425110</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<insuline>false</insuline>
	<TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>

<!-- Lezingidentiteit: eID ingelezen, zelfde bezoeknummer -->
<lezingidentiteit>
	<externeid>100</externeid>
	<patientgegevens_id>1</patientgegevens_id>
	<redenmanueleinvoering>0</redenmanueleinvoering>
	<bezoeknummer>1</bezoeknummer>
	<datumuitvoering>2026-02-16T08:00:00</datumuitvoering>
	<datumlezingidentiteitsdocument>2026-02-16T08:00:00</datumlezingidentiteitsdocument>
	<identificatiepatient>85010100123</identificatiepatient>
	<typevanlezingidentiteitsdocument>1</typevanlezingidentiteitsdocument>
	<typevandrageridentiteitsdocument>1</typevandrageridentiteitsdocument>
	<redengebruikvignet>0</redengebruikvignet>
	<uurvanlezingidentiteitsdocument>0800</uurvanlezingidentiteitsdocument>
	<rizivnummerverstrekker>12345678901</rizivnummerverstrekker>
	<serienummervandedrager>590000000001</serienummervandedrager>
</lezingidentiteit>
```

**Wat TDM3 doet**

- TDM3 voegt het forfait A toe, één keer per verzorgingsdag, omdat de dag een toilet bevat en het profiel A geldt.
- Op de forfaitfactuur vervangt TDM3 de nomenclatuurcode van het toilet door de bijhorende pseudocode.

### Voorbeeld 2: twee bezoeken op één dag

Een patiënt met profiel T7 krijgt 's ochtends een toilet en 's avonds een subcutane inspuiting op voorschrift (423076). Elk bezoek heeft een eigen bezoeknummer en een eigen lezingidentiteit.

```xml
<!-- Profiel T7, geldig op de zorgdag -->
<profielen>
	<externeid>100</externeid>
	<startdatum>2026-01-01T00:00:00</startdatum>
	<einddatum>2026-03-31T00:00:00</einddatum>
	<patientgegevens_id>1</patientgegevens_id>
	<profiel>T7</profiel>
</profielen>

<!-- Bezoek 1, 's ochtends: toilet weekdag (425110) -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>2001</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-17T08:00:00</datumuitvoering>
	<zorgminuten>10</zorgminuten>
	<nomenclatuurnummer>425110</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<insuline>false</insuline>
	<TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>

<!-- Lezingidentiteit bezoek 1 -->
<lezingidentiteit>
	<externeid>100</externeid>
	<patientgegevens_id>1</patientgegevens_id>
	<redenmanueleinvoering>0</redenmanueleinvoering>
	<bezoeknummer>1</bezoeknummer>
	<datumuitvoering>2026-02-17T08:00:00</datumuitvoering>
	<datumlezingidentiteitsdocument>2026-02-17T08:00:00</datumlezingidentiteitsdocument>
	<identificatiepatient>85010100123</identificatiepatient>
	<typevanlezingidentiteitsdocument>1</typevanlezingidentiteitsdocument>
	<typevandrageridentiteitsdocument>1</typevandrageridentiteitsdocument>
	<redengebruikvignet>0</redengebruikvignet>
	<uurvanlezingidentiteitsdocument>0800</uurvanlezingidentiteitsdocument>
	<rizivnummerverstrekker>12345678901</rizivnummerverstrekker>
	<serienummervandedrager>590000000001</serienummervandedrager>
</lezingidentiteit>

<!-- Bezoek 2, 's avonds: inspuiting IM/SC/HD op voorschrift (423076) -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>2002</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-17T18:00:00</datumuitvoering>
	<zorgminuten>10</zorgminuten>
	<datumvoorschrift>2026-02-10T00:00:00</datumvoorschrift>
	<rizivnummervoorschrijver>19999999901</rizivnummervoorschrijver>
	<naamvoorschrijver>ARTS VOORBEELD</naamvoorschrijver>
	<nomenclatuurnummer>423076</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>2</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<insuline>false</insuline>
	<TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>

<!-- Lezingidentiteit bezoek 2 -->
<lezingidentiteit>
	<externeid>100</externeid>
	<patientgegevens_id>1</patientgegevens_id>
	<redenmanueleinvoering>0</redenmanueleinvoering>
	<bezoeknummer>2</bezoeknummer>
	<datumuitvoering>2026-02-17T18:00:00</datumuitvoering>
	<datumlezingidentiteitsdocument>2026-02-17T18:00:00</datumlezingidentiteitsdocument>
	<identificatiepatient>85010100123</identificatiepatient>
	<typevanlezingidentiteitsdocument>1</typevanlezingidentiteitsdocument>
	<typevandrageridentiteitsdocument>1</typevandrageridentiteitsdocument>
	<redengebruikvignet>0</redengebruikvignet>
	<uurvanlezingidentiteitsdocument>1800</uurvanlezingidentiteitsdocument>
	<rizivnummerverstrekker>12345678901</rizivnummerverstrekker>
	<serienummervandedrager>590000000001</serienummervandedrager>
</lezingidentiteit>
```

**Wat TDM3 doet**

- TDM3 voegt per bezoek met een technische verpleegkundige verstrekking een basisverstrekking toe: de eerste voor het bezoek van 's ochtends, de tweede voor dat van 's avonds.
- De volgorde van de basisverstrekkingen volgt het tijdstip (`datumuitvoering`), niet het bezoeknummer.

### Voorbeeld 3: compressiekousen en toilet in één bezoek

Een patiënt met profiel T7 krijgt in één bezoek een toilet en het aandoen van compressiekousen op voorschrift (424933).

```xml
<!-- Profiel T7, geldig op de zorgdag -->
<profielen>
	<externeid>100</externeid>
	<startdatum>2026-01-01T00:00:00</startdatum>
	<einddatum>2026-03-31T00:00:00</einddatum>
	<patientgegevens_id>1</patientgegevens_id>
	<profiel>T7</profiel>
</profielen>

<!-- Toilet weekdag (425110) -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>3001</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-18T08:00:00</datumuitvoering>
	<zorgminuten>10</zorgminuten>
	<nomenclatuurnummer>425110</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<insuline>false</insuline>
	<TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>

<!-- Compressietherapie: aandoen van kousen, op voorschrift (424933), zelfde bezoeknummer -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>3002</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-18T08:00:00</datumuitvoering>
	<zorgminuten>10</zorgminuten>
	<datumvoorschrift>2026-02-01T00:00:00</datumvoorschrift>
	<rizivnummervoorschrijver>19999999901</rizivnummervoorschrijver>
	<naamvoorschrijver>ARTS VOORBEELD</naamvoorschrijver>
	<nomenclatuurnummer>424933</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<insuline>false</insuline>
	<TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>

<!-- Lezingidentiteit: eID ingelezen, zelfde bezoeknummer -->
<lezingidentiteit>
	<externeid>100</externeid>
	<patientgegevens_id>1</patientgegevens_id>
	<redenmanueleinvoering>0</redenmanueleinvoering>
	<bezoeknummer>1</bezoeknummer>
	<datumuitvoering>2026-02-18T08:00:00</datumuitvoering>
	<datumlezingidentiteitsdocument>2026-02-18T08:00:00</datumlezingidentiteitsdocument>
	<identificatiepatient>85010100123</identificatiepatient>
	<typevanlezingidentiteitsdocument>1</typevanlezingidentiteitsdocument>
	<typevandrageridentiteitsdocument>1</typevandrageridentiteitsdocument>
	<redengebruikvignet>0</redengebruikvignet>
	<uurvanlezingidentiteitsdocument>0800</uurvanlezingidentiteitsdocument>
	<rizivnummerverstrekker>12345678901</rizivnummerverstrekker>
	<serienummervandedrager>590000000001</serienummervandedrager>
</lezingidentiteit>
```

**Wat TDM3 doet**

- Profiel T7 geeft geen forfait: TDM3 factureert de verstrekkingen per prestatie en voegt de basisverstrekking toe.

### Voorbeeld 4: toilet in het weekend

Op zaterdag krijgt een patiënt met profiel T7 een toilet. In het weekend en op feestdagen wordt de weekendcode gebruikt (425515 in plaats van 425110).

```xml
<!-- Profiel T7, geldig op de zorgdag -->
<profielen>
	<externeid>100</externeid>
	<startdatum>2026-01-01T00:00:00</startdatum>
	<einddatum>2026-03-31T00:00:00</einddatum>
	<patientgegevens_id>1</patientgegevens_id>
	<profiel>T7</profiel>
</profielen>

<!-- Toilet weekend (425515) -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>4001</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-21T08:30:00</datumuitvoering>
	<zorgminuten>10</zorgminuten>
	<nomenclatuurnummer>425515</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<insuline>false</insuline>
	<TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>

<!-- Lezingidentiteit: eID ingelezen, zelfde bezoeknummer -->
<lezingidentiteit>
	<externeid>100</externeid>
	<patientgegevens_id>1</patientgegevens_id>
	<redenmanueleinvoering>0</redenmanueleinvoering>
	<bezoeknummer>1</bezoeknummer>
	<datumuitvoering>2026-02-21T08:30:00</datumuitvoering>
	<datumlezingidentiteitsdocument>2026-02-21T08:30:00</datumlezingidentiteitsdocument>
	<identificatiepatient>85010100123</identificatiepatient>
	<typevanlezingidentiteitsdocument>1</typevanlezingidentiteitsdocument>
	<typevandrageridentiteitsdocument>1</typevandrageridentiteitsdocument>
	<redengebruikvignet>0</redengebruikvignet>
	<uurvanlezingidentiteitsdocument>0830</uurvanlezingidentiteitsdocument>
	<rizivnummerverstrekker>12345678901</rizivnummerverstrekker>
	<serienummervandedrager>590000000001</serienummervandedrager>
</lezingidentiteit>
```

**Wat TDM3 doet**

- Wordt een weekend- of feestdagcode op een weekdag meegegeven, dan factureert TDM3 de weekcode.

### Voorbeeld 5: toilet door een zorgkundige

Een zorgkundige voert het toilet uit. In de `uitgevoerdezorg` staan zowel de zorgkundige (`rizivnummerzorgkundige`) als de verpleegkundige die het toezicht heeft (`rizivnummerverpleegkundige`).

```xml
<!-- Profiel T7, geldig op de zorgdag -->
<profielen>
	<externeid>100</externeid>
	<startdatum>2026-01-01T00:00:00</startdatum>
	<einddatum>2026-03-31T00:00:00</einddatum>
	<patientgegevens_id>1</patientgegevens_id>
	<profiel>T7</profiel>
</profielen>

<!-- Toilet weekdag (425110) door een zorgkundige, met toezichthoudende verpleegkundige -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>5001</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-16T09:00:00</datumuitvoering>
	<zorgminuten>10</zorgminuten>
	<nomenclatuurnummer>425110</nomenclatuurnummer>
	<rizivnummerzorgkundige>133333333440</rizivnummerzorgkundige>
	<naamzorgkundige>ZORGKUNDIGE EEN</naamzorgkundige>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<insuline>false</insuline>
	<TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>

<!-- Lezingidentiteit: eID ingelezen, zelfde bezoeknummer -->
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
	<rizivnummerverstrekker>12345678901</rizivnummerverstrekker>
	<serienummervandedrager>590000000001</serienummervandedrager>
</lezingidentiteit>
```

**Wat TDM3 doet**

- TDM3 beschouwt de zorgkundige als uitvoerder en de verpleegkundige als toezichthouder.
- Een verstrekking die een zorgkundige niet mag uitvoeren, geeft een fout.

### Voorbeeld 6: palliatieve patiënt met een dringend bezoek

Een palliatieve patiënt (profiel PB) krijgt 's ochtends een toilet. 's Middags volgt een dringend bezoek, aangeduid met pseudocode 426510. De startdatum van het palliatief statuut staat op node patientgegevens:

```xml
<!-- Fragment van node patientgegevens: startdatum palliatief statuut -->
<startdatumpal>2026-01-15T00:00:00</startdatumpal>

<!-- Profiel PB vanaf de startdatum palliatief -->
<profielen>
	<externeid>100</externeid>
	<startdatum>2026-01-15T00:00:00</startdatum>
	<einddatum>2026-04-14T00:00:00</einddatum>
	<patientgegevens_id>1</patientgegevens_id>
	<profiel>PB</profiel>
</profielen>

<!-- Bezoek 1, 's ochtends: toilet weekdag (425110) -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>6001</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-17T08:00:00</datumuitvoering>
	<zorgminuten>15</zorgminuten>
	<nomenclatuurnummer>425110</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<insuline>false</insuline>
	<TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>

<!-- Lezingidentiteit bezoek 1 -->
<lezingidentiteit>
	<externeid>100</externeid>
	<patientgegevens_id>1</patientgegevens_id>
	<redenmanueleinvoering>0</redenmanueleinvoering>
	<bezoeknummer>1</bezoeknummer>
	<datumuitvoering>2026-02-17T08:00:00</datumuitvoering>
	<datumlezingidentiteitsdocument>2026-02-17T08:00:00</datumlezingidentiteitsdocument>
	<identificatiepatient>85010100123</identificatiepatient>
	<typevanlezingidentiteitsdocument>1</typevanlezingidentiteitsdocument>
	<typevandrageridentiteitsdocument>1</typevandrageridentiteitsdocument>
	<redengebruikvignet>0</redengebruikvignet>
	<uurvanlezingidentiteitsdocument>0800</uurvanlezingidentiteitsdocument>
	<rizivnummerverstrekker>12345678901</rizivnummerverstrekker>
	<serienummervandedrager>590000000001</serienummervandedrager>
</lezingidentiteit>

<!-- Bezoek 2, 's middags: pseudocode dringend bezoek palliatieve patiënt (426510) -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>6002</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-17T13:00:00</datumuitvoering>
	<zorgminuten>20</zorgminuten>
	<nomenclatuurnummer>000000</nomenclatuurnummer>
	<pseudocodenummer>426510</pseudocodenummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>2</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<insuline>false</insuline>
	<TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>

<!-- Lezingidentiteit bezoek 2 -->
<lezingidentiteit>
	<externeid>100</externeid>
	<patientgegevens_id>1</patientgegevens_id>
	<redenmanueleinvoering>0</redenmanueleinvoering>
	<bezoeknummer>2</bezoeknummer>
	<datumuitvoering>2026-02-17T13:00:00</datumuitvoering>
	<datumlezingidentiteitsdocument>2026-02-17T13:00:00</datumlezingidentiteitsdocument>
	<identificatiepatient>85010100123</identificatiepatient>
	<typevanlezingidentiteitsdocument>1</typevanlezingidentiteitsdocument>
	<typevandrageridentiteitsdocument>1</typevandrageridentiteitsdocument>
	<redengebruikvignet>0</redengebruikvignet>
	<uurvanlezingidentiteitsdocument>1300</uurvanlezingidentiteitsdocument>
	<rizivnummerverstrekker>12345678901</rizivnummerverstrekker>
	<serienummervandedrager>590000000001</serienummervandedrager>
</lezingidentiteit>
```

**Wat TDM3 doet**

- TDM3 bepaalt het palliatief statuut op basis van `startdatumpal`, en voegt het forfait PB toe.
- Een palliatief profiel zonder `startdatumpal` wordt niet als palliatief behandeld.

### Voorbeeld 7: complexe wondzorg met kennisgeving

Een patiënt krijgt op een weekdag complexe wondzorg (424351) van 35 minuten. Er is een kennisgeving complexe wondzorg (type 3: 30 tot 59 minuten).

```xml
<!-- Kennisgeving complexe wondzorg, type 3 -->
<kennisgevingwondzorg>
	<externeid>100</externeid>
	<patientgegevens_id>1</patientgegevens_id>
	<identificatiepatient>85010100123</identificatiepatient>
	<startdatum>2026-02-01T00:00:00</startdatum>
	<einddatum>2026-04-30T00:00:00</einddatum>
	<typecomplexewondzorg>3</typecomplexewondzorg>
</kennisgevingwondzorg>

<!-- Complexe wondzorg weekdag (424351), 35 minuten -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>7001</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-18T10:00:00</datumuitvoering>
	<zorgminuten>35</zorgminuten>
	<datumvoorschrift>2026-02-01T00:00:00</datumvoorschrift>
	<rizivnummervoorschrijver>19999999901</rizivnummervoorschrijver>
	<naamvoorschrijver>ARTS VOORBEELD</naamvoorschrijver>
	<nomenclatuurnummer>424351</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<insuline>false</insuline>
	<TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>

<!-- Lezingidentiteit: eID ingelezen, zelfde bezoeknummer -->
<lezingidentiteit>
	<externeid>100</externeid>
	<patientgegevens_id>1</patientgegevens_id>
	<redenmanueleinvoering>0</redenmanueleinvoering>
	<bezoeknummer>1</bezoeknummer>
	<datumuitvoering>2026-02-18T10:00:00</datumuitvoering>
	<datumlezingidentiteitsdocument>2026-02-18T10:00:00</datumlezingidentiteitsdocument>
	<identificatiepatient>85010100123</identificatiepatient>
	<typevanlezingidentiteitsdocument>1</typevanlezingidentiteitsdocument>
	<typevandrageridentiteitsdocument>1</typevandrageridentiteitsdocument>
	<redengebruikvignet>0</redengebruikvignet>
	<uurvanlezingidentiteitsdocument>1000</uurvanlezingidentiteitsdocument>
	<rizivnummerverstrekker>12345678901</rizivnummerverstrekker>
	<serienummervandedrager>590000000001</serienummervandedrager>
</lezingidentiteit>
```

**Wat TDM3 doet**

- Als de som van `zorgminuten` van de complexe wondzorgen op die dag minstens 30 minuten is en er een kennisgeving geldt, voegt TDM3 het bijkomend honorarium complexe wondzorg toe.
- Zie ook [hervorming wondzorg nomenclatuur december 2022](/nurse/#hervorming-wondzorg-nomenclatuur-december-2022).

### Voorbeeld 8: toilet in een hersteloord

Een toilet in een hersteloord heeft een eigen code (425913). De plaats wordt aangeduid met de locatiecode 421212 in het element `Locatie`.

```xml
<!-- Profiel T7, geldig op de zorgdag -->
<profielen>
	<externeid>100</externeid>
	<startdatum>2026-01-01T00:00:00</startdatum>
	<einddatum>2026-03-31T00:00:00</einddatum>
	<patientgegevens_id>1</patientgegevens_id>
	<profiel>T7</profiel>
</profielen>

<!-- Toilet in hersteloord (425913), locatie hersteloord (421212) -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>8001</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-19T08:00:00</datumuitvoering>
	<zorgminuten>10</zorgminuten>
	<nomenclatuurnummer>425913</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<insuline>false</insuline>
	<Locatie>421212</Locatie>
	<TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>

<!-- Lezingidentiteit: eID ingelezen, zelfde bezoeknummer -->
<lezingidentiteit>
	<externeid>100</externeid>
	<patientgegevens_id>1</patientgegevens_id>
	<redenmanueleinvoering>0</redenmanueleinvoering>
	<bezoeknummer>1</bezoeknummer>
	<datumuitvoering>2026-02-19T08:00:00</datumuitvoering>
	<datumlezingidentiteitsdocument>2026-02-19T08:00:00</datumlezingidentiteitsdocument>
	<identificatiepatient>85010100123</identificatiepatient>
	<typevanlezingidentiteitsdocument>1</typevanlezingidentiteitsdocument>
	<typevandrageridentiteitsdocument>1</typevandrageridentiteitsdocument>
	<redengebruikvignet>0</redengebruikvignet>
	<uurvanlezingidentiteitsdocument>0800</uurvanlezingidentiteitsdocument>
	<rizivnummerverstrekker>12345678901</rizivnummerverstrekker>
	<serienummervandedrager>590000000001</serienummervandedrager>
</lezingidentiteit>
```

**Wat TDM3 doet**

- TDM3 neemt de locatie over voor alle zorgen van hetzelfde bezoek.
- Zonder locatiecode bij een code voor praktijkkamer of hersteloord geeft TDM3 een fout. Zie ook [Locatie veld bij node uitgevoerde zorg](/nurse/#locatie-veld-bij-node-uitgevoerde-zorg).

### Voorbeeld 9: wekelijkse voorbereiding van medicatie op een forfaitdag

Bij een patiënt met profiel A worden tijdens het bezoek een toilet en de wekelijkse voorbereiding van de geneesmiddelen per os (424874) uitgevoerd.

```xml
<!-- Profiel A, geldig op de zorgdag -->
<profielen>
	<externeid>100</externeid>
	<startdatum>2026-01-01T00:00:00</startdatum>
	<einddatum>2026-03-31T00:00:00</einddatum>
	<patientgegevens_id>1</patientgegevens_id>
	<profiel>A</profiel>
</profielen>

<!-- Toilet weekdag (425110) -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>9001</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-16T08:00:00</datumuitvoering>
	<zorgminuten>10</zorgminuten>
	<nomenclatuurnummer>425110</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<insuline>false</insuline>
	<TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>

<!-- Wekelijkse voorbereiding geneesmiddelen per os (424874), zelfde bezoeknummer -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>9002</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-16T08:00:00</datumuitvoering>
	<zorgminuten>10</zorgminuten>
	<nomenclatuurnummer>424874</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<insuline>false</insuline>
	<TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>

<!-- Lezingidentiteit: eID ingelezen, zelfde bezoeknummer -->
<lezingidentiteit>
	<externeid>100</externeid>
	<patientgegevens_id>1</patientgegevens_id>
	<redenmanueleinvoering>0</redenmanueleinvoering>
	<bezoeknummer>1</bezoeknummer>
	<datumuitvoering>2026-02-16T08:00:00</datumuitvoering>
	<datumlezingidentiteitsdocument>2026-02-16T08:00:00</datumlezingidentiteitsdocument>
	<identificatiepatient>85010100123</identificatiepatient>
	<typevanlezingidentiteitsdocument>1</typevanlezingidentiteitsdocument>
	<typevandrageridentiteitsdocument>1</typevandrageridentiteitsdocument>
	<redengebruikvignet>0</redengebruikvignet>
	<uurvanlezingidentiteitsdocument>0800</uurvanlezingidentiteitsdocument>
	<rizivnummerverstrekker>12345678901</rizivnummerverstrekker>
	<serienummervandedrager>590000000001</serienummervandedrager>
</lezingidentiteit>
```

**Wat TDM3 doet**

- Op een forfaitdag vervangt TDM3 424874 door de pseudocode 426576.

### Voorbeeld 10: zorg zonder RIZIV-nomenclatuur (KB90) aan de patiënt

's Ochtends krijgt de patiënt een toilet, gefactureerd aan het ziekenfonds. 's Avonds volgt een avondzorg zonder RIZIV-nomenclatuur, gefactureerd aan de patiënt via pseudocode 426856 en een `kb90bedrag`. Bij facturatie aan de patiënt (bestemmeling 3) is `derdebetalercode` verplicht.

```xml
<!-- Profiel T7, geldig op de zorgdag -->
<profielen>
	<externeid>100</externeid>
	<startdatum>2026-01-01T00:00:00</startdatum>
	<einddatum>2026-03-31T00:00:00</einddatum>
	<patientgegevens_id>1</patientgegevens_id>
	<profiel>T7</profiel>
</profielen>

<!-- Bezoek 1: toilet weekdag (425110), aan het ziekenfonds -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>10001</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-17T08:00:00</datumuitvoering>
	<zorgminuten>10</zorgminuten>
	<nomenclatuurnummer>425110</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<insuline>false</insuline>
	<TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>

<!-- Lezingidentiteit bezoek 1 -->
<lezingidentiteit>
	<externeid>100</externeid>
	<patientgegevens_id>1</patientgegevens_id>
	<redenmanueleinvoering>0</redenmanueleinvoering>
	<bezoeknummer>1</bezoeknummer>
	<datumuitvoering>2026-02-17T08:00:00</datumuitvoering>
	<datumlezingidentiteitsdocument>2026-02-17T08:00:00</datumlezingidentiteitsdocument>
	<identificatiepatient>85010100123</identificatiepatient>
	<typevanlezingidentiteitsdocument>1</typevanlezingidentiteitsdocument>
	<typevandrageridentiteitsdocument>1</typevandrageridentiteitsdocument>
	<redengebruikvignet>0</redengebruikvignet>
	<uurvanlezingidentiteitsdocument>0800</uurvanlezingidentiteitsdocument>
	<rizivnummerverstrekker>12345678901</rizivnummerverstrekker>
	<serienummervandedrager>590000000001</serienummervandedrager>
</lezingidentiteit>

<!-- Bezoek 2: zorg zonder RIZIV-nomenclatuur (426856), aan de patiënt -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>10002</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-17T19:00:00</datumuitvoering>
	<zorgminuten>10</zorgminuten>
	<nomenclatuurnummer>000000</nomenclatuurnummer>
	<pseudocodenummer>426856</pseudocodenummer>
	<kb90bedrag>6.00</kb90bedrag>
	<kb90omschrijving>Avondzorg: aan- en uitkleden</kb90omschrijving>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>2</bezoeknummer>
	<rep_typebestemmeling_id>3</rep_typebestemmeling_id>
	<insuline>false</insuline>
	<derdebetalercode>P100</derdebetalercode>
	<TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>
```

**Wat TDM3 doet**

- TDM3 factureert het `kb90bedrag` aan de patiënt. Het bedrag gebruikt een punt als decimaalteken.
- Zie ook [Zorgen zonder riziv-nomenclatuur](/nurse/#zorgen-zonder-riziv-nomenclatuur).

### Voorbeeld 11: dag van een ziekenhuisopname

Een patiënt krijgt 's ochtends een toilet en wordt die dag opgenomen in het ziekenhuis. Dat wordt aangeduid met `ZHOpname` = 1.

```xml
<!-- Profiel T7, geldig op de zorgdag -->
<profielen>
	<externeid>100</externeid>
	<startdatum>2026-01-01T00:00:00</startdatum>
	<einddatum>2026-03-31T00:00:00</einddatum>
	<patientgegevens_id>1</patientgegevens_id>
	<profiel>T7</profiel>
</profielen>

<!-- Toilet weekdag (425110) op de dag van de ziekenhuisopname -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>11001</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-02-18T08:00:00</datumuitvoering>
	<zorgminuten>10</zorgminuten>
	<nomenclatuurnummer>425110</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<insuline>false</insuline>
	<ZHOpname>1</ZHOpname>
	<TypeFacturering>0</TypeFacturering>
</uitgevoerdezorg>

<!-- Lezingidentiteit: eID ingelezen, zelfde bezoeknummer -->
<lezingidentiteit>
	<externeid>100</externeid>
	<patientgegevens_id>1</patientgegevens_id>
	<redenmanueleinvoering>0</redenmanueleinvoering>
	<bezoeknummer>1</bezoeknummer>
	<datumuitvoering>2026-02-18T08:00:00</datumuitvoering>
	<datumlezingidentiteitsdocument>2026-02-18T08:00:00</datumlezingidentiteitsdocument>
	<identificatiepatient>85010100123</identificatiepatient>
	<typevanlezingidentiteitsdocument>1</typevanlezingidentiteitsdocument>
	<typevandrageridentiteitsdocument>1</typevandrageridentiteitsdocument>
	<redengebruikvignet>0</redengebruikvignet>
	<uurvanlezingidentiteitsdocument>0800</uurvanlezingidentiteitsdocument>
	<rizivnummerverstrekker>12345678901</rizivnummerverstrekker>
	<serienummervandedrager>590000000001</serienummervandedrager>
</lezingidentiteit>
```

**Wat TDM3 doet**

- TDM3 vermeldt de opname in het facturatiebestand met pseudocode 426613.
- De waarde is ook van belang voor de palliatieve forfaits en voor een forfait C/PC in uitzonderingssituaties.

### Voorbeeld 12: correctieforfait na declassering

Na een bezoek van de adviserend geneesheer wordt het forfait van de patiënt gedeclasseerd. De praktijk geeft de zorgen van de betrokken dagen opnieuw mee met `TypeFacturering` = 5.

```xml
<!-- Profiel na de declassering -->
<profielen>
	<externeid>100</externeid>
	<startdatum>2026-01-01T00:00:00</startdatum>
	<einddatum>2026-03-31T00:00:00</einddatum>
	<patientgegevens_id>1</patientgegevens_id>
	<profiel>A</profiel>
</profielen>

<!-- Toilet weekdag (425110), correctieforfait -->
<uitgevoerdezorg>
	<input_uitgevoerdezorg_id>12001</input_uitgevoerdezorg_id>
	<externeid>100</externeid>
	<datumuitvoering>2026-01-12T08:00:00</datumuitvoering>
	<zorgminuten>10</zorgminuten>
	<nomenclatuurnummer>425110</nomenclatuurnummer>
	<rizivnummerverpleegkundige>112345678901</rizivnummerverpleegkundige>
	<naamverpleegkundige>VERPLEEGKUNDIGE EEN</naamverpleegkundige>
	<patientgegevens_id>1</patientgegevens_id>
	<bezoeknummer>1</bezoeknummer>
	<rep_typebestemmeling_id>1</rep_typebestemmeling_id>
	<insuline>false</insuline>
	<TypeFacturering>5</TypeFacturering>
</uitgevoerdezorg>

<!-- Lezingidentiteit: eID ingelezen, zelfde bezoeknummer -->
<lezingidentiteit>
	<externeid>100</externeid>
	<patientgegevens_id>1</patientgegevens_id>
	<redenmanueleinvoering>0</redenmanueleinvoering>
	<bezoeknummer>1</bezoeknummer>
	<datumuitvoering>2026-01-12T08:00:00</datumuitvoering>
	<datumlezingidentiteitsdocument>2026-01-12T08:00:00</datumlezingidentiteitsdocument>
	<identificatiepatient>85010100123</identificatiepatient>
	<typevanlezingidentiteitsdocument>1</typevanlezingidentiteitsdocument>
	<typevandrageridentiteitsdocument>1</typevandrageridentiteitsdocument>
	<redengebruikvignet>0</redengebruikvignet>
	<uurvanlezingidentiteitsdocument>0800</uurvanlezingidentiteitsdocument>
	<rizivnummerverstrekker>12345678901</rizivnummerverstrekker>
	<serienummervandedrager>590000000001</serienummervandedrager>
</lezingidentiteit>
```

**Wat TDM3 doet**

- TDM3 maakt een correctiefactuur voor het forfait.
- Een correctieforfait is enkel mogelijk bij een profiel dat forfaitdagen draagt (A, B, C, PA, PB, PC, PP) of bij T7 en P7. Anders geeft TDM3 een fout.
