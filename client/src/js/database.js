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

/*
  We need to add some code below which will take updated content and save it to IndexedDB.
*/


//PUT function
export const putDb = async (id, value) => {
  // First, create a variable, and set it to asyncronously await the opening of the database. Replace the items in all caps
  const jateDb = await openDB('jate', 1);

  // Now create a variable for the transaction
  const tx = jateDb.transaction('jate', 'readwrite');

  // Now create a variable for the store
  const objStore = tx.objectStore('jate');

  // Now create a variable named "request" and have it perform the update
  const request = objStore.put({ id: id, value: value });

  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

/*
  We need to add some code below which will get all content from IndexedDB.
*/

//Get function
export const getDb = async (value) => {
  // You can duplicate the same first lines of code from above, except that the transaction will be 'readonly'
    console.log("Getting data from the jateDB");
    // connect to DB and version we want to use
    const jateDb = await openDB("jate", 1);
    // make new transaction...need to specify the DB we are posting to and the data privileges.
    const tx = jateDb.transaction("jate", "readwrite");
    //open the object store
    const objStore = tx.objectStore("jate");
    //use the .getAll() method to grab all the content in the DB
    const req = objStore.getAll();
    //confirm the data was fetched
    const res = await req;
    console.log("data save to the jateDB", res);
  // LINES 1-3 HERE

  // Leave the rest as-is
  const request = objStore.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');
  // Check if a variable is defined and if it is, return it. See MDN Docs on Optional Chaining (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
  return result?.value;
};

initdb();
