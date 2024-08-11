URL: https://master--site-pinger.netlify.app/dashboard

# Servizio di Monitoraggio dello Stato dei Siti Web

## Descrizione

Questo servizio Angular monitora costantemente una lista di siti web per verificarne lo stato online. Invia richieste HTTP a intervalli regolari e registra eventuali disconnessioni con dettagli sugli errori. Si integra anche con Firestore per gestire dinamicamente la lista dei siti. In caso di rilevamento di un blocco di un sito, il sistema invierà in automatico una mail alla casella
del proprietario del sito.

## Funzionalità

- **Controllo periodico dello stato dei siti web**: Invia richieste HTTP a intervalli definiti per verificare se i siti sono online.
- **Registrazione degli errori**: Registra gli errori con dettagli nel caso in cui un sito non sia raggiungibile.
- **Integrazione con Firestore**: Permette di gestire dinamicamente la lista dei siti da monitorare.

## Installazione

Imposta le tue credenziali di Firebase nel file di configurazione environment.ts.
Utilizzo
Avvia l'applicazione Angular

## Monitoraggio automatico

Il servizio inizierà automaticamente a monitorare lo stato dei siti web configurati in Firestore.
I log degli errori saranno visibili nella console del browser.

## Configurazione
URL dei siti da monitorare: La lista dei siti viene gestita in Firestore. Aggiungi, modifica o rimuovi i siti direttamente da Firestore.
Intervallo di controllo: L'intervallo di controllo è configurabile tramite il codice sorgente (default: 5 minuti).
