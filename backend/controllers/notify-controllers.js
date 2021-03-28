const q = require('q'); // a che serve? si potrebbe disattivare?
const Subscribers = require('../models/Subscribers');
const Notify = require('../models/Notify');
const webPush = require('web-push');

const subscriptionToNotify = (req, res) => {
  // console.log('body:', req.body);
  const subs = new Subscribers(req.body);
  // console.log(`Subscribers: ${subs}`);

  subs.save(function(err) {
    if (err) {
      console.error(`Si è verificato un errore. Errore: ${err}`);
      res.status(500).json({
        error: 'Si è verificato un errore'
      });
    } else {
      res.json({
        data: 'Sottoscrizione salvata nel database. 1'
      });
    }
  });
};

/**
 * Inviare una notifica per ogni iscritto al servizio di Push Notification
 *
 * Descrizione del servizio di Push Notification:
 * `sendNotification`: è il metodo della libreria 'web-push' che invia la notifica al client,
 *                    viene richiamato per ogni documento trovato nella collection `Subscription`,
 *                    prende 3 parametri: `pushSubscription`, `pushPayload`, `pushOptions`.
 *
 * 1. `pushSubscription`: è un oggetto che contiene i dati di un documento della collection `Subscription`
 *                        che è stato generato per ogni utente che si è iscritto alle notifiche.
 *                        Esempio del valore di `pushSubscription`:
 * var pushSubscription = {
 *   "endpoint":"https://fcm.googleapis.com/fcm/send/c0NI73v1E0Y:APA91bEN7z2weTCpJmcS-MFyfbgjtmlAWuV......",
 *   "keys":{
 *     "p256dh":"BHxSHtYS0q3i0Tb3Ni6chC132ZDPd5uI4r-exy1KsevRqHJvOM5hNX-M83zgYjp-1kdirHv0Elhjw6Hivw1Be5M=",
 *     "auth":"4a3vf9MjR9CtPSHLHcsLzQ=="
 *   }
 * };
 *                        `Subscription`: collection/tabella che contiene tutti i documenti delle sottoscrizioni.
 *                        `subscriptions`: array di tutti i documenti delle sottoscrizioni, per ogni collection
 *                        di un utente che si è iscritto viene richiamato il metodo `sendNotification`.
 *
 * 2. `pushPayload`: dati in formato json da inviare al client per costruire la notifica,
 *                   es: l'autore di un post fornisce i dati relativi al post che possono
 *                   essere il titolo del post, url del post, etc.
 *
 * 3. `pushOptions`: oggetto che contiene:
 *                     subject: email/url del mittente(?)
 *                     privateKey: chiave privata
 *                     publicKey: chiave pubblica
 *                     TTL: tempo di vita di una notifica
 *                     headers: ? necessari ?
 */
const sendNotify = (req, res) => {
  // console.log('DATA', req.body.data);
  const payload = {
    title: req.body.title,
    message: req.body.message,
    url: req.body.url,
    ttl: req.body.ttl,
    icon: req.body.icon,
    image: req.body.image
  };
  const pushPayload = JSON.stringify(payload);

  Subscribers.find({}, (err, subscriptions) => {
    if (err) {
      console.error(`Error occurred while getting subscriptions`);
      res.status(500).json({
        error: 'Technical error occurred'
      });
    } else {
      let parallelSubscriptionCalls = subscriptions.map(subscription => {
        return new Promise((resolve, reject) => {
          const pushSubscription = {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.keys.p256dh,
              auth: subscription.keys.auth
            }
          };

          const pushOptions = {
            vapidDetails: {
              subject: 'mailto:dmanzi83@gmail.com',
              privateKey: process.env.VAPID_PRIVATE_KEY,
              publicKey: process.env.VAPID_PUBLIC_KEY
            },
            TTL: payload.ttl
            // headers: {} // non serve? l'ho disattivato
          };
          webPush
            .sendNotification(pushSubscription, pushPayload, pushOptions)
            .then(value => {
              resolve({
                status: true,
                endpoint: subscription.endpoint,
                data: value
              });
            })
            .catch(err => {
              reject({
                status: false,
                endpoint: subscription.endpoint,
                data: err
              });
            });
        });
      });
      q.allSettled(parallelSubscriptionCalls).then(pushResults => {
        // console.info(pushResults); non cancellare per ora
      });
      res.json({
        data: 'Push triggered'
      });
    }
  });
};

const clickNotify = async (req, res) => {
  console.log('TEST clickNotify');
  // console.log('DATA', req.body);

  // const notifyNumber = await Notify.countDocuments({});
  // console.log('notifyNumber:', notifyNumber);
  // res.status(201).json({ notifyNumber });
  // if (notifyNumber === 0) {
  //   console.log('notifyNumber 2:', notifyNumber);
  // }

  try {
    const number = req.body.number;
    const opened = req.body.opened || 0;
    const closed = req.body.closed || 0;
    console.log('number', number);
    console.log('opened', opened);
    console.log('closed', closed);

    const query = {};
    const update = {
      $inc: { number: number, opened: opened, closed: closed },
      updateDate: new Date()
    };
    const options = { upsert: true, new: true };
    // const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const notify = await Notify.findOneAndUpdate(query, update, options);
    res.status(201).json(notify);
  } catch (error) {
    res.status(500).json({
      error: 'Server Error'
    });
  }
};

exports.subscriptionToNotify = subscriptionToNotify;
exports.sendNotify = sendNotify;
exports.clickNotify = clickNotify;
