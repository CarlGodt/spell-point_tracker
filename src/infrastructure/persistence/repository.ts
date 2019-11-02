import Dexie from "dexie";
import { useCallback } from "react";

export interface $Entity {
  readonly id?: number;
}

interface $Return<T extends $Entity> {
  update: (entity: T) => Promise<number | undefined>;
  put: (entity: T, key: number) => Promise<number | undefined>;
  add: (entity: any) => Promise<number | undefined>;
  get: (key: number) => Promise<T | undefined>;
  getAll: () => Promise<Array<T>>;
  del: (key: number) => void;
}

const useRepository = <T extends $Entity>(table: Dexie.Table<T, number>): $Return<T> => {
  const put = useCallback(async (entity: T) => {
    try {
      const newKey = await table.put(entity);
      console.debug(`${JSON.stringify(entity)} with key: ${entity.id} was updated.`);
      return newKey;
    } catch (err) {
      console.error(err.stack || err);
      return undefined;
    }
  }, [table]);

  const update = useCallback(async (entity: T) => {
    if (!entity.id) return undefined;
    return put(entity);
  }, [put]);

  const add = useCallback(async (entity: any) => {
    try {
      const key = table.add(entity as T);
      console.debug(`${JSON.stringify(entity)} was added with key: ${key}`);
      return key;
    } catch (err) {
      console.error(err.stack || err);
      return undefined;
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
      return entity;
    } catch (err) {
      console.error(err.stack || err);
      return undefined;
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
    update,
    put,
    add,
    get,
    getAll,
    del
  }
}

export default useRepository;