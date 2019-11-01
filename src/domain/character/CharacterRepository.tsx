import useRepository from "../../infrastructure/persistence/repository"
import $Character from "./Character";
import db from "../../infrastructure/persistence/database";

const useCharacterRepository = () => useRepository<$Character>(db, 'character');

export default useCharacterRepository;