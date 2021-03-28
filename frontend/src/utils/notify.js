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
 * chiede il consenso dell'utente a ricevere notifiche push e restituisce la risposta dell'utente,
 * le possibili risposte dell'utente sono: granted, default, denied
 */
async function askUserPermission() {
  return await Notification.requestPermission();
}

/**
 * Installa il service worker e controlla se l'utente è già sottoscritto
 */
export default async function subscribeToNotify() {
  if (!isPushNotificationSupported()) {
    return; // console.warn('Push messaging is not supported');
  }
  // console.log('Service Worker e Push Notification sono supportati dal browser');

  const permissionType = await askUserPermission();
  // console.log('TIPO DI PERMESSO:', permissionType);

  const registration = await navigator.serviceWorker.register('/sw.js');
  // console.log('REGISTRATION:', registration);

  const isSubscribed = await registration.pushManager.getSubscription();
  // console.log('TYPEOF isSubscribed:', isSubscribed);

  if (isSubscribed) {
    return; // console.log(`l'utente è già iscritto`);
  }

  if (permissionType !== 'granted') {
    return; // console.log(`l'UTENTE NON HA DATO I PERMESSI PER LE NOTIFICHE`);
  }
  let subscription;
  try {
    // console.log(`registration.pushManager.subscribe`);
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.REACT_APP_VAPID_PUBLIC_KEY
      )
    });
  } catch (error) {
    // console.log('Failed to subscribe user:', error);
  }
  // console.log(`invia una richiesta al server per iscrivere l'utente`);
  postSubscription(subscription);
}

/**
 * Invia un api request al server per aggiungere un nuovo sottoscrittore al database
 * TODO: inviare al database anche altre informazioni. es: id dell'utente ?
 * @param {Object} subscription - info che vengono salvate nel db per inviare successivamente le notifiche
 */
async function postSubscription(subscription) {
  console.log('TEST', process.env.REACT_APP_API_URL);
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
