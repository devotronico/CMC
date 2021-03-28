const messages = {
  test: {
    e: {
      type: 'error',
      title: 'Errore Test',
      msg: 'Impossibile fare il Test',
      timeout: 10000
    },
    w: {
      type: 'warning',
      title: 'Warning Test',
      msg: 'Mancano alcuni valori per fare il Test',
      timeout: 10000
    },
    i: {
      type: 'info',
      title: 'Info Test',
      msg: 'Il informazioni sul Test',
      timeout: 10000
    },
    s: {
      type: 'success',
      title: 'Success Test',
      msg: 'Il Test è avvenuto con successo',
      timeout: 10000
    }
  },
  prova: {
    e: {
      type: 'error',
      title: 'Errore prova',
      msg: 'Impossibile fare il prova',
      timeout: 10000
    },
    w: {
      type: 'warning',
      title: 'Warning prova',
      msg: 'Mancano alcuni valori per fare il prova',
      timeout: 10000
    },
    i: {
      type: 'info',
      title: 'Info prova',
      msg: 'Il informazioni sul prova',
      timeout: 10000
    },
    s: {
      type: 'success',
      title: 'Success prova',
      msg: 'La prova è avvenuta con successo',
      timeout: 10000
    }
  },
  createProfiles: {
    e: {
      type: 'error',
      title: 'Errore Creazione Profili',
      msg: 'Impossibile creare i Profili',
      timeout: 10000
    },
    w: {
      type: 'warning',
      title: 'Warning Creazione Profili',
      msg: 'Mancano i dati per creare i profili',
      timeout: 10000
    },
    i: {},
    s: {
      type: 'success',
      title: 'Profili Creati',
      msg: 'I Profili sono stati creati con successo',
      timeout: 10000
    }
  },
  createFakeProfiles: {
    e: {
      type: 'error',
      title: 'Errore Creazione Profili Finti',
      msg: 'Impossibile creare i Profili Finti',
      timeout: 10000
    },
    w: {
      type: 'warning',
      title: 'Warning Creazione Profili Finti',
      msg: 'Non è stato fornito un numero oppure il numero non è valido',
      timeout: 10000
    },
    i: {},
    s: {
      type: 'success',
      title: 'Profili Finti Creati',
      msg: 'I Profili finti sono stati creati con successo',
      timeout: 10000
    }
  },
  readProfiles: {
    e: {
      type: 'error',
      title: 'Errore Lettura Profili',
      msg: 'Impossibile ottenere i Profili',
      timeout: 10000
    },
    w: {},
    i: {
      type: 'info',
      title: 'Profili Assenti',
      msg: 'Non ci sono profili da mostrare',
      timeout: 10000
    },
    s: {
      type: 'success',
      title: 'Profili Ottenuti',
      msg: 'Tutti i Profili sono stati ottenuti con successo',
      timeout: 10000
    }
  },
  readFakeProfiles: {
    e: {
      type: 'error',
      title: 'Errore Lettura Profili Finti',
      msg: 'Impossibile ottenere i profili finti',
      timeout: 10000
    },
    w: {},
    i: {
      type: 'info',
      title: 'Profili Fake Assenti',
      msg: 'Non ci sono profili finti da mostrare',
      timeout: 10000
    },
    s: {
      type: 'success',
      title: 'Profili Finti Ottenuti',
      msg: 'Tutti i profili finti sono stati ottenuti con successo',
      timeout: 10000
    }
  },
  updateProfiles: {
    e: {
      type: 'error',
      title: 'Errore Modifica Profili',
      msg: 'Impossibile modificare i profili',
      timeout: 10000
    },
    w: {},
    i: {},
    s: {
      type: 'success',
      title: 'Profili Modificati',
      msg: 'I profili sono stati modificati con successo',
      timeout: 10000
    }
  },
  updateSelectedProfiles: {
    e: {
      type: 'error',
      title: 'Errore Modifica Profili Selezionati',
      msg: 'Impossibile modificare i profili selezionati',
      timeout: 10000
    },
    w: {
      type: 'warning',
      title: 'Warning Modifica Profili Selezionati',
      msg: 'Non è stato modificato nessun profilo selezionato.',
      timeout: 10000
    },
    i: {},
    s: {
      type: 'success',
      title: 'Profili Selezionati Modificati',
      msg: 'I profili selezionati sono stati modificati con successo',
      timeout: 10000
    }
  },
  deleteProfiles: {
    e: {
      type: 'error',
      title: 'Errore Cancellazione Profili',
      msg: 'Impossibile cancellare i profili',
      timeout: 10000
    },
    w: {
      type: 'warning',
      title: 'Warning Cancellazione Profili',
      msg: 'I profili non sono stati cancellati',
      timeout: 10000
    },
    i: {},
    s: {
      type: 'success',
      title: 'Profili Cancellati',
      msg: 'I profili sono stati cancellati con successo',
      timeout: 10000
    }
  },
  deleteSelectedProfiles: {
    e: {
      type: 'error',
      title: 'Errore Cancellazione Profili Selezionati',
      msg: 'Impossibile cancellare i profili selezionati',
      timeout: 10000
    },
    w: {
      type: 'warning',
      title: 'Warning Cancellazione Profili Selezionati',
      msg: 'I profili selezionati non sono stati cancellati',
      timeout: 10000
    },
    i: {},
    s: {
      type: 'success',
      title: 'Profili Selezionati Cancellati',
      msg: 'I profili selezionati sono stati cancellati con successo',
      timeout: 10000
    }
  },
  deleteFakeProfiles: {
    e: {
      type: 'error',
      title: 'Errore Cancellazione Profili Finti',
      msg: 'Impossibile cancellare i profili finti',
      timeout: 10000
    },
    w: {
      type: 'warning',
      title: 'Warning Cancellazione Profili Finti',
      msg: 'I profili finti non sono stati cancellati',
      timeout: 10000
    },
    i: {},
    s: {
      type: 'success',
      title: 'Profili Finti Cancellati',
      msg: 'I profili finti sono stati cancellati con successo',
      timeout: 10000
    }
  }
};

module.exports = messages;
// exports.messages = messages;
