let isSubscribed = false;
let swRegistration = null;

/// Url Encription
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/// Verifica se le notifiche sono supportate dal browser
function isPushNotificationSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window;
}

/**
 * Installa il service worker e controlla se l'utente è già sottoscritto
 */
export default function subscribeToNotify() {
  if (!isPushNotificationSupported()) {
    return console.warn('Push messaging is not supported');
  }

  console.log('Service Worker e Push Notification sono supportati dal browser');

  navigator.serviceWorker
    .register('/sw.js')
    .then(function(reg) {
      console.log('service worker registered');

      swRegistration = reg;

      swRegistration.pushManager.getSubscription().then(function(subscription) {
        isSubscribed = !(subscription === null);

        if (isSubscribed) {
          console.log(`l'utente è già iscritto`);
        } else {
          swRegistration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                process.env.REACT_APP_VAPID_PUBLIC_KEY
              )
            })
            .then(function(subscription) {
              console.log(subscription);
              console.log(
                `Tenta di inviare una richiesta al server per iscrivere l'utente`
              );

              postSubscription(subscription);

              isSubscribed = true;
            })
            .catch(function(err) {
              console.log('Failed to subscribe user: ', err);
            });
        }
      });
    })
    .catch(function(error) {
      console.error('Service Worker Error', error);
    });
}

/**
 * Invia un api request al server per aggiungere un nuovo sottoscrittore al database
 * TODO: inviare al database anche altre informazioni. es: id dell'utente ?
 * @param {Object} subscription - info che vengono salvate nel db per inviare successivamente le notifiche
 */
async function postSubscription(subscription) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/notify/subscribe`,
    {
      credentials: 'omit',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        'sec-fetch-mode': 'cors'
      },
      body: JSON.stringify(subscription),
      method: 'POST',
      mode: 'cors'
    }
  );
  return await response.json();
}

// function postSubscription(subscription) {
//   let xmlHttp = new XMLHttpRequest();
//   //put here API address
//   xmlHttp.open('POST', `${process.env.REACT_APP_API_URL}/notify/subscribe`);
//   xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//   xmlHttp.onreadystatechange = function() {
//     if (xmlHttp.readyState !== 4) return;
//     if (xmlHttp.status !== 200 && xmlHttp.status !== 304) {
//       console.log('HTTP error ' + xmlHttp.status, null);
//     } else {
//       console.log('Richiesta di iscrizione inviata al server');
//     }
//   };

//   xmlHttp.send(JSON.stringify(subscription));
// }
