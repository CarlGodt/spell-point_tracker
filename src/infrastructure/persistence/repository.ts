import Dexie from "dexie";
import { useCallback, useState, useEffect } from "react";

export interface $Entity {
  id?: number;
}

interface $Return<T extends $Entity> {
  put: (entity: T, key: number) => Promise<T | null | undefined>;
  add: (entity: T) => Promise<T | null | undefined>;
  get: (key: number) => Promise<$Entity | T | null | undefined>;
  getAll: () => Promise<Array<$Entity> | Array<T> | null | undefined>;
}

const useRepository = <T extends $Entity>(db: Dexie | null, schema: string): $Return<T> => {
  const [table, setTable] = useState<Dexie.Table<T, number>>();

  useEffect(() => {
    db && setTable(db.table(schema));
  }, [db, schema]);

  const put = useCallback(async (entity: T, key: number) => {
    return table && await table.put(entity, key)
    .then(key => {
      console.debug(`${JSON.stringify(entity)} with key: ${key} was updated.`);
      return {
        id: key,
        ...entity
      };
    })
    .catch(err => {
      console.error(err.stack || err);
      return null;
    });
  }, [table]);

  const add = useCallback(async (entity: T) => {
    return table && await table.add(entity)
    .then(key => {
      console.debug(`${JSON.stringify(entity)} was posted with key: ${key}`);
      return {
        id: key,
        ...entity
      };
    })
    .catch(err => {
      console.error(err.stack || err);
      return null;
    });
  }, [table]);

  const get = useCallback(async (key: number) => {
    return table && await table.get(key)
    .then(entity => {
      console.debug(`${JSON.stringify(entity)} was requested with key: ${key}`);
      return {
        id: key,
        ...entity
      };
    })
    .catch(err => {
      console.error(err.stack || err);
      return null;
    });
  }, [table]);

  const getAll = useCallback(async () => {
    return table && await table.toArray()
    .then(entities => {
      console.debug(`${JSON.stringify(entities)} were requested.`);
      return [...entities];
    })
    .catch(err => {
      console.error(err.stack || err);
      return null;
    });
  }, [table]);

  return {
    put,
    add,
    get,
    getAll
  }
}

export default useRepository;