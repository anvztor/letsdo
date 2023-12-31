import React, { useState } from "react";
import Card from "../components/Card"; // Importing the card component
import Grid from "@material-ui/core/Grid";  //Importing the Grid component

const Container = () => {  
  const { profiles, setProfiles } = useState([]);

  const getProfiles = () => { //fetching data
    fetch("https://jsonplaceholder.typicode/users")
      .then((response) => {
        setProfiles(response.profiles); //updating state with new information
      })
      .catch((err) => console.log(JSON.stringify(err))); // catching any errors
  };

  useEffect(() => { 
    getProfiles();
  }, []);

  return (
    <section className={style.root}>
      <Grid container spacing={4}>
        {profile.map((users) => {
          return (
            <Grid
              xs={12}
              sm={6}
              lg={4}
              key={users.id}
              className={`cont-card`}
            >
              <Card>
                <div className={style.avatar}>
                  <img
                    src={`https://avatars.dicebear.com/v2/avataaars/{{${users.name}}}.svg?options[mood][]=happy`} //updating image
                  />
                </div>
                <div className={style.details}>
                  <h2 className={`text-center`}>{users.name}</h2>
                  <div className={style.userInfo}>
                    <p>{users.email}</p> // insert infor to card
                    <p>{users.phone}</p>
                    <p>
                      ${users.address.street} ${users.address.suite}
                    </p>
                    <p>
                      <a href={`https://${users.website}`}>{users.website}</a>
                    </p>
                    <p>{users.company.name}</p>
                  </div>
                </div>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default Container;
