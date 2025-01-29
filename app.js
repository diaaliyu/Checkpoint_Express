const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware pour vérifier l'heure de la requête
function checkWorkingHours(req, res, next) {
    const currentDate = new Date();
    const day = currentDate.getDay(); // Jour de la semaine (0 = dimanche, 1 = lundi, ...)
    const hour = currentDate.getHours();

    // Les heures de travail sont du lundi au vendredi, de 9h à 17h
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        return next(); // Si dans les horaires de travail, continuer la requête
    }

    res.status(403).send("L'application est uniquement disponible pendant les heures de travail (lundi au vendredi, 9h-17h).");
}

// Définir le moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour les fichiers statiques (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Appliquer le middleware à toutes les routes
app.use(checkWorkingHours);

// Définir les routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
