import makeFinalStore from 'alt-utils/lib/makeFinalStore';

export default function(alt, storage, storeName) {

  //setup a final store
  const finalStore = makeFinalStore(alt);

  //bootstrap (restore) the store, reading from the storage
  try {
    alt.bootstrap(storage.get(storeName));
  }
  catch(e) {
    console.error("Unable to bootstrap data", e);
  }

  //snapshot the store to the storage (localstorage for the moment)
  finalStore.listen(() => {
    if(!storage.get('debug')) {
      storage.set(storeName, alt.takeSnapshot());
    }
  });
}
