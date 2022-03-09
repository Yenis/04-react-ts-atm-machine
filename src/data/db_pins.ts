import { openDB } from "idb";
import { UserPin } from "../helpers/userPinHook";
import { initializeUserPinsOnDbCreationAsync } from "../helpers/initializeSampleData";

const pinsDB = "atm-user-pin";
const pinsStore = "atm-user-pin-store";

const openAtmUserPinStore = openDB(pinsDB, 1, {
  upgrade(db) {
    db.createObjectStore(pinsStore);
    initializeUserPinsOnDbCreationAsync();
  },
});

export const getUserPinStateAsync = async (
  cardNumber: IDBKeyRange | IDBValidKey
): Promise<UserPin> => {
  return (await openAtmUserPinStore).get(pinsStore, cardNumber);
};

export const saveUserPinStateAsync = async (
  card: IDBKeyRange | IDBValidKey | undefined,
  data: UserPin
) => {
  return (await openAtmUserPinStore).put(pinsStore, data, card);
};
