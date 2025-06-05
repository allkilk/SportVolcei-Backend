require('dotenv').config(); // Per caricare le variabili d'ambiente da .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa il modulo CORS
const authRoutes = require('./routes/authRoutes'); // Assicurati che questo percorso sia corretto
const userRoutes = require('./routes/userRoutes'); // Assicurati che questo percorso sia corretto

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI; // Recupera l'URI dal file .env

// Middleware
app.use(express.json()); // Per parsare il body delle richieste JSON

// Configurazione CORS (CRUCIALE per la comunicazione frontend-backend)
app.use(cors({
  origin: 'https://sport-volcei-frontend.vercel.app', // Permetti solo al tuo frontend di accedere
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metodi HTTP permessi
  allowedHeaders: ['Content-Type', 'Authorization'], // Intestazioni HTTP permesse (Authorization per i token JWT)
  credentials: true // Permetti l'invio di cookie e credenziali (per future autenticazioni)
}));

// Connessione al database MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connesso a MongoDB Atlas'))
  .catch(err => console.error('Errore di connessione a MongoDB:', err));

// Rotte API
app.get('/', (req, res) => {
  res.send('API SportVolcei è online!'); // Messaggio di benvenuto per testare il backend
});

app.use('/api/auth', authRoutes); // Rotte per autenticazione (login, registrazione)
app.use('/api/users', userRoutes); // Rotte per gestione utenti (es. profilo)

// Gestione errori centralizzata (opzionale ma consigliata)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Qualcosa è andato storto!');
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server backend in ascolto sulla porta ${PORT}`);
});