---
outline: deep
---
# Wie voert de zorg uit?

Het prestatiebestand legt vast welke praktijk de zorg factureert en welke zorgverlener elke zorg effectief uitvoerde.

## De praktijk

De praktijk is de **vereniging** in het bestand. Ze wordt geïdentificeerd door de verenigingscode op de node [vereniging](/nurse/nodes#node-vereniging).

- De verenigingscode is verplicht en wordt door TDM3 toegekend. Vraag ze aan bij TDM3.
- Op basis van de verenigingscode koppelt TDM3 de zorg aan de contracten, de financiële afspraken en de afscherming van de gegevens van de praktijk.
- Per praktijk en per facturatiemaand levert het pakket normaal gezien één bestand. Zie [Aanlevering](/nurse/hoe#aanlevering).

Het prestatiebestand is niet het facturatiebestand voor het ziekenfonds. Het pakket levert per praktijk of team (verenigingscode) aan. TDM3 groepeert die bestanden zelf onder het juiste derdebetalersnummer, in één of meerdere facturatiebestanden. Zo kan een team aanleveren en gefactureerd worden zodra het klaar is. De verenigingscode is de sleutel waarmee TDM3 de bestanden aan de praktijk koppelt.

## De zorgverlener

Op elke [uitgevoerdezorg](/nurse/nodes#node-uitgevoerdezorg) staat de zorgverlener die de zorg effectief uitvoerde.

- **rizivnummerverpleegkundige**: het RIZIV-nummer van de verpleegkundige, voorafgegaan door 0 (niet geconventioneerd) of 1 (geconventioneerd).
- **naamverpleegkundige**: de naam van de verpleegkundige.
- **rizivnummerzorgkundige** en **naamzorgkundige**: het RIZIV-nummer en de naam van de zorgkundige, wanneer een zorgkundige de zorg uitvoerde.

TDM3 koppelt de zorgverlener aan de contracten op basis van de verenigingscode, het RIZIV-nummer en de facturatiemaand.

## Zorgkundigen bij palliatieve zorg (vanaf 01/2024)

Vanaf prestatiedatum 01/01/2024 mogen zorgkundigen ook ingezet worden bij de uitvoering van palliatieve zorgen, op voorwaarde dat een zitting door een verpleegkundige is uitgevoerd.

Hierop bestaan uitzonderingen: wanneer de patiënt overlijdt, of bij een opname in of ontslag uit een zorginstelling. Dan kan de verpleegassistent, verpleegkundige of zorgkundige de enige zijn, of kan een forfait C/PC gefactureerd worden wanneer er maar één zitting heeft plaatsgevonden.

Daarom is de betekenis van het veld [uitgevoerdezorg.ZHOpname](/nurse/nodes#node-uitgevoerdezorg) uitgebreid met de waarden 2, 3 en 4:

- 0 = geen opname
- 1 = opname in ziekenhuis
- **2 = ontslag uit ziekenhuis**
- **3 = opname in andere verzorgingsinstelling**
- **4 = ontslag uit andere verzorgingsinstelling**

Bij waarde 1 en 2 vermeldt TDM3 de pseudocode [426613](https://webappsa.riziv-inami.fgov.be/Nomen/nl/426613) als betrekkelijke verstrekking in de facturatie. De waarden zijn ook van belang voor het correct factureren van palliatieve forfaits en van een forfait PC/C in de uitzonderingssituaties.
