import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to add content to the database
export const putDb = async (content) => {
  const textDb = await openDb('jate', 1);
  const tx = textDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  const request = store.put({ id: 1, value: content })

  request.onsuccess = (event) => {
    console.log('Data added to the database successfully');
  };

  request.onerror = (event) => {
    console.error('Error adding data to the database', event.target.error);
  };

  await tx.done;
};

// Method to get all content from the database
export const getDb = async () => {
  const textDb = await openDB('jate', 1);
  const tx = textDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  const request = store.get(1);  
  
  console.log('All content from the database:', request);

  await tx.done;

  return request;
};

initdb();