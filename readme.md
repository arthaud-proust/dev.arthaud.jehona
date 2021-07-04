# Jehona Mailer 

## C'est quoi?
Jehona est un service fait pour déléguer l'envoi de mails à un serveur nodejs.

## Comment ça fonctionne?

Faire une requête `POST /`  
Exemple d'un corps json de requête :
```json
{
    "apiKey": "...",

    "noStatus": true,

    "params": {

        "host": "ssl0.ovh.net",
        "port": 465,
        "auth": {
            "user": "jehona@arthaud.dev",
            "pass": "..."
        }
    },

    "mail": {
        "from": "Jehona Mailer jehona@arthaud.dev",
        "to": "your@email.com",
        "subject": "Je fonctionne 🎉",
        "text": "Si vous recevez ce mail c'est que tout fonctionne"
    }
}
```

## Documentation
- `apiKey` : Clée pour utiliser l'api 
- `noStatus` : Renvoie une réponse à la requête avant d'avoir envoyé les mails (gain de rapidité considérable pour les gros envois, mais impossible de savoir s'il y a une erreur)
- `params`: Paramètres du compte mail
    - `host`: Adresse stmp
    - `port`: Port (ssl, etc)
    - `secure`: Ssl? **true** par défaut
    - `auth`: Identifiants
        - `user`: Utilisateur
        - `pass`: Mot de passe
- `mail`: Coordonnées, contenu du mail, etc
    - `from`: Nom et/ou adresse de l'envoyeur
    - `to`: Destinataire
    - `cc`: Destinataires, séparés par des virgules
    - `bcc`: Destinataires cachés, séparés par des virgules
    - `subject`: Objet du mail
    - `text`: Contenu du mail sous forme de texte
    - `html`: Contenu du mail sous forme html
    - `attachments`: Tableau de pièces-jointes

Voir la [documentation de nodemailer](https://nodemailer.com/about/) pour plus de précisions

## Comment installer le service?
- `git clone https://github.com/arthaud-proust/jehona-mailer`
- `npm install`
- `echo API_KEY=votre_clée_d_api >> .env`
- `node app.js`