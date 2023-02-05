export const pluralize = (name, count) => count === 1 ? name : `${name}s`;

//make a request to the IndexedDB API and return a Promise
export const indexedDBRequest = async (storeName, method, object) => {
  const request = window.indexedDB.open('shop-shop', 1);
  let db, tx, store;

  return new Promise((resolve, reject) => {
    request.onupgradeneeded = function(e) {
      const db = request.result;
      db.createObjectStore('products', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    request.onError = function(e) {
      console.log('There was an error');
      reject(e);
    };

    request.onSuccess = async function(e) {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      db.onError = function(e) {
        console.log('error', e);
        reject(e);
      };

      try {
        switch (method) {
          case 'put':
            store.put(object);
            resolve(object);
            break;
          case 'get':
            const all = await store.getAll();
            resolve(all.result);
            break;
          case 'delete':
            store.delete(object._id);
            break;
          default:
            console.log('No valid method');
            break;
        }
      } catch (error) {
        reject(error);
      } finally {
        tx.oncomplete = function() {
          db.close();
        };
      }
    };
  });
};
