// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 5000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'http://localhost:5000/oauth2callback';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

// ============================
//  Google Client ID
// ============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '236077849818-ueg4evscogs4qe5c8hqc51smppdd8m5k.apps.googleusercontent.com'; //'236077849818-54flri6csh2goq5f137ag3d4mm2436vo.apps.googleusercontent.com;' //
process.env.CLIENT_SECRET = process.env.CLIENT_SECRET || "TQg8EGTVvzAzQClyGyj2qD7P";
process.env.KEY_API = process.env.KEY_API || "AIzaSyD_EEFpVZ9Hgq4ZYcvGidcYtKP_8NPpYTk"; // process.env.KEY_API || "AIzaSyAuhxA9inwF-N8atcQw5MPOiiedMnjGdWM"; //
process.env.REDIRECT_URL = process.env.REDIRECT_URL || "http://localhost:5000/oauth2callback";