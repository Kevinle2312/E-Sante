import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import fruits from '../data/fruits';
import { v4 as uuid } from "uuid";

import Person from "../models/PscyData.js";


import axios from "axios";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "https://fake-health-data-api.shrp.dev",
  timeout: 3000,
  headers: {},
});

function FruitsMaster() {
  const [data, setData] = useState([]); //par défaut la liste de fruits est vide
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [needToReload, setNeedToReload] = useState(false);
  useAuth();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const filteredData = Person.filter((fruit) => {
  //   if (selectedSeason === "") {
  //     return true; // Afficher tous les fruits si aucune saison sélectionnée
  //   } else {
  //     return fruit.season === selectedSeason;
  //   }
  // });

  async function onSubmitSearchForm(data) {
    const keyword = data.keyword;
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/items/fruits?search=${keyword}`
      );
      const collectionOfFruitItems = response.data.data.map(
        (jsonItem) => new Fruit(jsonItem.name, jsonItem.color, jsonItem.image)
      );
      setFruits(collectionOfFruitItems);
      setLoading(false);
      setError(false);
      reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }

  function onReloadData() {
    setNeedToReload(needToReload ? false : true); //déclenche l'exécution de useEffect
  }

  useEffect(() => {
    async function fetchDataFromAPI() {
      try {
        setLoading(true);
        const predefinedId = "your_predefined_id";
        const response = await axiosInstance.get("/host/people/${predefinedId}/physiological-data");
        const collectionOfData = response.data.data.map(
          (jsonItem) => new Person(
            jsonItem.id,
            jsonItem.gender,
            jsonItem.firstname,
            jsonItem.lastname,
            jsonItem.birthyear,
            jsonItem.height,
            jsonItem.weightStart,
            jsonItem.weightGoal,
            jsonItem.bmiStart,
            jsonItem.bmiGoal,
            jsonItem.activityProfile,
            jsonItem.physiologicalData
          )
        );

        setData(collectionOfData);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }

    fetchDataFromAPI();
  }, [needToReload]);
  //on indique que useEffect a une dépendance à needToReload
  //-> si needToReload évolue, useEffect doit être appelé




  return (
    <div className="FruitsMaster">
      <button onClick={() => onReloadData()}>Recharger les données</button>

      <form onSubmit={handleSubmit(onSubmitSearchForm)}>
        <input
          placeholder="Mot clé"
          {...register("keyword", { required: true })}
        />
        {errors.keyword && <span>Ce champ est obligatoire</span>}

        <input type="submit" value="Recherche" />
      </form>

      {loading === true && <p>Chargement...</p>}
      {error === true && <p>Une erreur s'est produite</p>}

    </div>

  );
}

export default FruitsMaster;
