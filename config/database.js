const { Sequelize } = require('sequelize');
const { DATABASE_URL, NODE_ENV } = require('./config');

let sequelize;

if (NODE_ENV === 'production' && DATABASE_URL) {
    // In produzione, usa l'URL fornito dall'ambiente (es. Render, Railway)
    sequelize = new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Importante per alcuni provider di hosting (es. ElephantSQL)
            }
        },
        logging: false, // Disabilita il logging delle query SQL in produzione
    });
} else {
    // In sviluppo, usa un database locale o test
    // Assicurati che il tuo DATABASE_URL nel .env sia configurato per lo sviluppo
    sequelize = new Sequelize(DATABASE_URL || 'postgresql://user:password@localhost:5432/sportvolcei_db', {
        dialect: 'postgres',
        logging: console.log, // Abilita il logging delle query in sviluppo
    });
}

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connessione al database PostgreSQL riuscita.');
        // Sincronizza i modelli: crea le tabelle se non esistono.
        // NON USARE `force: true` in produzione a meno che non sai cosa stai facendo (cancella i dati!)
        await sequelize.sync();
        console.log('Modelli del database sincronizzati.');
    } catch (error) {
        console.error('Errore di connessione al database:', error.message);
        process.exit(1); // Esce dal processo in caso di errore di connessione
    }
};

module.exports = sequelize;
module.exports.connectDB = connectDB;