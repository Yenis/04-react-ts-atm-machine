import { openDB } from "idb";
import { UserPin } from "../helpers/customHooks/userPinHook";
import { initializeUserPinsOnDbCreationAsync } from "../helpers/initializeSampleData";

enum PinDB {
  DB = "atm-user-pin",
  STORE = "atm-user-pin-store"
}

const openAtmUserPinStore = openDB(PinDB.DB, 1, {
  upgrade(db) {
    db.createObjectStore(PinDB.STORE);
    initializeUserPinsOnDbCreationAsync();
  },
});

export const getUserPinStateAsync = async (
  cardNumber: IDBKeyRange | IDBValidKey
): Promise<UserPin> => {
  return (await openAtmUserPinStore).get(PinDB.STORE, cardNumber);
};

export const saveUserPinStateAsync = async (
  card: IDBKeyRange | IDBValidKey | undefined,
  data: UserPin
) => {
  return (await openAtmUserPinStore).put(PinDB.STORE, data, card);
};
