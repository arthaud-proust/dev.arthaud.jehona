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


