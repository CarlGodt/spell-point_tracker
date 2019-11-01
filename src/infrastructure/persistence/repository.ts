import Dexie from "dexie";
import { useCallback } from "react";

export interface $Entity {
  id?: number;
}

export class Entity implements $Entity {
  id?: number;
}

interface $Return<T extends $Entity> {
  put: (entity: T, key: number) => Promise<T | null>;
  add: (entity: T) => Promise<T | null>;
  get: (key: number) => Promise<T | null>;
  getAll: () => Promise<Array<T>>;
  del: (key: number) => void;
}

const useRepository = <T extends $Entity>(table: Dexie.Table<T, number>): $Return<T> => {
  const put = useCallback(async (entity: T, key: number) => {
    try {
      const newKey = await table.put(entity, key);
      console.debug(`${JSON.stringify(entity)} with key: ${key} was updated.`);
      return {
        id: newKey,
        ...entity
      } as T;
    } catch (err) {
      console.error(err.stack || err);
      return null;
    }
  }, [table]);

  const add = useCallback(async (entity: T) => {
    try {
      const key = table.add(entity);
      console.debug(`${JSON.stringify(entity)} was added with key: ${key}`);
      return {
        id: key,
        ...entity
      } as T;
    } catch (err) {
      console.error(err.stack || err);
      return null;
    }
  }, [table]);

  const del = useCallback(async (key: number) => {
    try {
      table.delete(key);
      console.debug(`Entity key: ${key} was deleted`);
    } catch(err) {
      console.error(err.stack || err);
    }
  }, [table]);

  const get = useCallback(async (key: number) => {
    try {
      const entity = await table.get(key);
      console.debug(`${JSON.stringify(entity)} was requested with key: ${key}`);
      return {
        id: key,
        ...entity
      } as T;
    } catch (err) {
      console.error(err.stack || err);
      return null;
    }
  }, [table]);

  const getAll = useCallback(async () => {
    try {
      const entities = await table.toArray();
      console.debug(`${JSON.stringify(entities)} were requested.`);
      return [...entities] as Array<T>;
    } catch (err) {
      console.error(err.stack || err);
      return [];
    }
  }, [table]);

  return {
    put,
    add,
    get,
    getAll,
    del
  }
}

export default useRepository;