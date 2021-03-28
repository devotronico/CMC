let isSubscribed = false;
let swRegistration = null;
// const publicVapidKey =
//   'BNJSL0e0ZhfHvL_ZwumZ4W1QlDVUxObDvqtEGf4e03qUY0tPp9kHDk28bJJ5ZBJWYLJYBNMSAp2oIXca4s1fhoM';

// process.env.REACT_APP_VAPID_PUBLIC_KEY
// console.log(
//   'REACT_APP_VAPID_PUBLIC_KEY',
//   process.env.REACT_APP_VAPID_PUBLIC_KEY
// );

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

/**
 * Installa il service worker e controlla se l'utente è già sottoscritto
 */
export default function subscribeToNotify() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker
      .register('sw.js')
      .then(function(reg) {
        console.log('service worker registered');

        swRegistration = reg;

        swRegistration.pushManager
          .getSubscription()
          .then(function(subscription) {
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

                  saveSubscription(subscription);

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
  } else {
    console.warn('Push messaging is not supported');
  }
}

/**
 * Invia un api request al server per aggiungere un nuovo sottoscrittore al database
 * TODO: inviare al database anche altre informazioni. es: id dell'utente ?
 * @param {Object} subscription - info che vengono salvate nel db per inviare successivamente le notifiche
 */
function saveSubscription(subscription) {
  let xmlHttp = new XMLHttpRequest();
  //put here API address
  xmlHttp.open('POST', '/subscribe');
  xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState !== 4) return;
    if (xmlHttp.status !== 200 && xmlHttp.status !== 304) {
      console.log('HTTP error ' + xmlHttp.status, null);
    } else {
      console.log('Richiesta di iscrizione inviata al server');
    }
  };

  xmlHttp.send(JSON.stringify(subscription));
}
