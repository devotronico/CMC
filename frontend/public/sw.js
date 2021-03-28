// console.log(`TEST: ${process.env.REACT_APP_API_URL}/notify/subscribe`);

/// Service Worker per le Push Notification

/// pagina di apertura all'apertura della notifica
let notificationUrl = '';

// url: OK (al click sulla notifica apre una pagina nel browser dove indirizzare l'utente)
// ttl: non deve essere utilizzato qui
// icon: OK
// image: si puo utilizzare ?
// tag: a che serve? vengono visualizzati i tag?

/**
 * Evento che si attiva quando il server invia una notifica al client con il metodo `sendNotification`
 *
 * [a] Se l'utente è già sul sito/app allora non mostra la notifica. ! da controllare se funziona !
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
 * Dati utilizzabili per costruire la notifica:
 * title: [OK] titolo (es: titolo di un articolo di un blog) (quanto puo essere lungo?)
 * body: [OK] autore della risorsa(es: autore di un articolo), o, breve descrizione, (quanto puo essere lungo?)
 * image: [OK] immagine di sfondo di dimensioni massime 364*180 formato png(es: immagine articolo)
 * icon: [OK] icona di dimensioni massime 128*128 formato png(es: logo website)
 * vibrate: [OK] solo per mobile. i tre valori dell'array indicano: [vibrazione, pausa, vibrazione]
 * badge: [?] icona di dimensioni massime 128*128 formato png(es: logo website), non funziona insieme a icon
 * tag: [?]
 * data: un oggetto che si puo valorizzare a piacere. è accessibile al click sulla notifica
 */
self.addEventListener('push', function(e) {
  // <a>
  clients.matchAll().then(function(c) {
    if (c.length !== 0) {
      return console.log('Application is already open!');
    }
  });
  // </a>
  // Show notification
  const _data = e.data ? JSON.parse(e.data.text()) : {};
  notificationUrl = _data.url;
  e.waitUntil(
    self.registration.showNotification(_data.title, {
      image: _data.image,
      icon: _data.icon,
      image: _data.image,
      body: _data.message,
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
        test: 'OOKK'
      },
      actions: [
        {
          action: 'explore',
          title: 'Clicca per aprire',
          icon: 'https://i.imgur.com/kIN1qXh.png'
        },
        {
          action: 'close',
          title: 'Chiudi',
          icon: 'https://i.imgur.com/jJVReY7.png'
        }
      ]
    })
  );
});

/**
 * Invia una api request al server per salvare nel db l'azione
 * di apertura o chiusura della notifica da parte dell' utente
 * @param {Object} obj {number: {number}, opened: {number} | closed: {number}}
 */
const sendStatsRequest = obj => {
  console.log('send api request to route /api/notify/click');
  fetch('http://localhost:5000/api/notify/click', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'content-type': 'application/json'
    }
  });
};

/// Se l'utente chiude la notifica
self.addEventListener('notificationclose', function(e) {
  console.log('CHIUDE LA NOTIFICA 1');
  // const notification = e.notification; // non cancellare
  // const primaryKey = notification.data.primaryKey; // non cancellare
  sendStatsRequest({ number: 1, closed: 1 });
  console.log('NOTIFICA CHIUSA 1');
});

/// Se l'utente apre o chiude la notifica
self.addEventListener('notificationclick', function(e) {
  console.log('CLICCA LA NOTIFICA');
  const notification = e.notification; // non cancellare
  // const primaryKey = notification.data.primaryKey; // non cancellare
  const action = e.action;

  if (action === 'close') {
    sendStatsRequest({ number: 1, closed: 1 });
    console.log('NOTIFICA CHIUSA 2');
    notification.close();
  } else {
    sendStatsRequest({ number: 1, opened: 1 });
    console.log('NOTIFICA APERTA');
    clients.openWindow(notificationUrl);
    notification.close();
  }
});
