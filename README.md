# SportVolcei-Backend

Questo repository contiene il codice sorgente del backend (API) dell'applicazione web SportVolcei per la prenotazione di campi sportivi. È sviluppato con Node.js, Express.js e PostgreSQL.

## Funzionalità Principali
- Autenticazione e Autorizzazione Utente (JWT)
- Gestione Utenti (Registrazione, Login, Profilo)
- Gestione Campi Sportivi
- Gestione Prenotazioni (creazione, visualizzazione disponibilità)
- Gestione Inviti Partita
- Registrazione Risultati Partite
- Classifiche per Sport e Livello
- Notifiche Email
- (e altre funzionalità che implementerai...)

## Tecnologie Utilizzate
- Node.js
- Express.js
- PostgreSQL (con Sequelize ORM)
- JWT (JSON Web Tokens)
- Bcryptjs (per hashing password)
- Nodemailer (per invio email)
- CORS

## Setup Locale

1.  Clona questo repository:
    ```bash
    git clone [https://github.com/IL_TUO_NOME_UTENTE/SportVolcei-Backend.git](https://github.com/IL_TUO_NOME_UTENTE/SportVolcei-Backend.git)
    cd SportVolcei-Backend
    ```
2.  Installa le dipendenze:
    ```bash
    npm install
    ```
3.  Crea un file `.env` nella root del progetto basandoti su `.env.example` e configura le tue variabili d'ambiente:
    ```
    PORT=5000
    NODE_ENV=development
    DATABASE_URL=postgresql://user:password@localhost:5432/sportvolcei_db # Modifica con i tuoi dati del DB locale
    JWT_SECRET=la_tua_chiave_segreta_per_jwt
    EMAIL_HOST=il_tuo_host_smtp
    EMAIL_USER=la_tua_email_smtp
    EMAIL_PASS=la_tua_password_smtp
    ```
    Assicurati di avere un server PostgreSQL locale in esecuzione e un database chiamato `sportvolcei_db` (o come preferisci) con le credenziali corrette.

4.  Avvia il server in modalità sviluppo (richiede `nodemon` installato globalmente o come dev dependency):
    ```bash
    npm run dev
    ```
    oppure, senza nodemon:
    ```bash
    npm start
    ```
    Il server sarà disponibile su `http://localhost:5000`.

## Deployment
Il backend è configurato per essere deployato facilmente su servizi come Render o Railway. Assicurati di impostare correttamente tutte le variabili d'ambiente nel pannello di controllo del tuo provider di hosting, inclusa la stringa di connessione al database PostgreSQL in produzione e le credenziali email.

Ricorda di aggiungere l'URL del tuo frontend (quando sarà deployato) alla lista `allowedOrigins` nel file `app.js` del backend per consentire le richieste CORS.