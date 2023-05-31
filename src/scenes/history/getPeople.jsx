import axios from "axios";
import { v4 as uuid } from "uuid";
import { useState, useEffect } from "react";


function MasterGetPeople(){
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const accessToken = localStorage.getItem('token')
  const URL = "https://fake-health-data-api.shrp.dev/";
  useEffect(() => {
    async function getPeople() {
      //permet d'obtenir la liste des utilisateurs fictifs depuis l'API

      try {
        setLoading(true);
        setError(false);

        //requête HTTP auprès de l'API
        //authentification à l'aide de l'access_token obtenu lors du sign in
        //communication de l'access_token via le header HTTP Authorization en mode bearer
        const response = await axios.get(URL+ "people", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setLoading(false);
        console.log(response.status)
        if (response.status === 200) {
          //mise à jour des personnes fictives
          setPeople(response.data.people);
          console.log("OK")
        } else if (response.status === 498) {
          console.error(response.status);
          setError("Access Token has expired");
        } else {
          console.error(response.status);
          setError("Can't Fetch API");
        }
      } catch (error) {
        console.error(error);

        setLoading(false);
        setError("Can't Fetch API");
      }
    }

    if (accessToken) getPeople();
  }, [accessToken]);

  localStorage.setItem('people',people)

}

export default MasterGetPeople;
