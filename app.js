const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const { PORT, NODE_ENV } = require('./config/config');

const app = express();

// Connetti al database
connectDB();

// Middleware
app.use(express.json({ extended: false })); // Permette di ricevere dati JSON nel body delle richieste

// Configurazione CORS
const allowedOrigins = [
    'http://localhost:3000', // Frontend in sviluppo
    // Aggiungi qui l'URL del tuo frontend deployato su Vercel/Netlify quando lo avrai
    // Es: 'https://sportvolcei-frontend.vercel.app',
    // Es: 'https://www.tuodominiofrontend.it'
];

app.use(cors({
    origin: function (origin, callback) {
        // Permetti richieste senza origine (es. da Postman o app mobile)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'La policy CORS di questo sito non permette l\'accesso dall\'origine specificata.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// Rotte API (le creeremo in seguito)
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/fields', require('./routes/fieldRoutes'));
// app.use('/api/bookings', require('./routes/bookingRoutes'));
// app.use('/api/results', require('./routes/resultRoutes'));

// Rotta di test semplice
app.get('/', (req, res) => res.send('API SportVolcei  online!'));

// Avvia il server
app.listen(PORT, () => console.log(`Server avviato sulla porta ${PORT} in ambiente ${NODE_ENV}`));