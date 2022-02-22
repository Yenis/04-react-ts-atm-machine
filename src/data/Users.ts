import { openDB } from 'idb';

const accessIdbAsync = openDB('atm-store', 1, {
  upgrade(db) {
    db.createObjectStore('atm-users');
  },
});

export async function getUserIdbAsync(card: IDBKeyRange | IDBValidKey) {
  return (await accessIdbAsync).get('atm-users', card);
};
export async function saveUserIdbAsync(card: IDBKeyRange | IDBValidKey | undefined, data: any) {
  return (await accessIdbAsync).put('atm-users', data, card);
};
export async function allCurrentUsersIdbAsync() {
  return (await accessIdbAsync).getAllKeys('atm-users');
};














// import { openDB, DBSchema } from 'idb';

// interface MyDB extends DBSchema {
//   users: {
//     value: {
//       id: string;
//       name: string;
//       cardNumber: string;
//       pinNumber: string;
//       balance: number
//     };
//     key: string;
//     indexes: { 'by-name': string };
//   };
// }

// async function databaseAction() {
//   const db = await openDB<MyDB>('my-db', 1, {
//     upgrade(db) {
//       db.createObjectStore('users');

//       const productStore = db.createObjectStore('users', {
//         keyPath: 'cardNumber',
//       });
//       productStore.createIndex('by-name', 'name');
//     },
//   });

//   await db.put('users', {
//     id: "12345",
//     name: "Yen",
//     cardNumber: "1234567891011123",
//     pinNumber: "12346",
//     balance: 99999
//   }, 'Yens');

// }

// export default databaseAction;