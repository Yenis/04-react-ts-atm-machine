import { openDB } from "idb";
import { initializeAtmStateAsync } from "../helpers/initializeSampleData";

const atmDB = "atm-admin-state";
const atmState = "atm-admin-store";
export const atmNumber = `${atmDB} ${atmState}`;

const openAtmState = openDB(atmDB, 1, {
  upgrade(db) {
    db.createObjectStore(atmState);
    initializeAtmStateAsync();
  },
});

export const getAtmStateAsync = async (
  atmNumber: IDBKeyRange | IDBValidKey
) => {
  return (await openAtmState).get(atmState, atmNumber);
};

export const saveAtmStateAsync = async (
  atmNumber: IDBKeyRange | IDBValidKey | undefined,
  data: boolean
) => {
  return (await openAtmState).put(atmState, data, atmNumber);
};
