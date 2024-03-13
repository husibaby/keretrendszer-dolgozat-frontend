
import { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css'
import WineCard from './components/WineCard';
import WineForm from './components/WineForm';


function App() {
  const url = "http://localhost:8000/api/wines";
  const [wines, setWines] = useState([]);
  const [updateId, setUpdateId] = useState(0);
  const [updateWineData, setUpdateWineData] = useState(null);

  const getAllWines = async () => {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setWines(data);
    }
  }


  useEffect(() => {
    getAllWines();
  }, []);


  const createWine = async (wine) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(wine),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const data = await response.json();
    if (response.ok) {
      getAllWines();
      return true;
    } else {
      alert(data.message);
      return false;
    }
  }

  const deleteWine = async (id) => {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json"
      }
    });
    if (response.ok) {
      getAllWines();
    } else {
      const data = await response.json();
      alert(data.message);
    }
  }

  const loadUpdateForm = async (id) => {
    setUpdateId(id);
  }

  const getOneWine = async () => {
    const response = await fetch(`${url}/${updateId}`, {
      headers: {
        Accept: "application/json"
      }
    });
    const data = await response.json();
    if (response.ok) {
      setUpdateWineData(data);
    } else {
      alert(data.message);
    }
  }

  const updateWine = async (wine) => {
    const response = await fetch(`${url}/${updateId}`, {
      method: "PATCH",
      body: JSON.stringify(wine),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });
    const data = await response.json();
    if (response.ok) {
      getAllWines();
      setUpdateId(0);
      return true;
    } else {
      alert(data.message);
      return false;
    }
  }

  useEffect(() => {
    if (updateId == 0) {
      setUpdateWineData(null);
    } else {
      getOneWine();
    }
  }, [updateId]);



  return (
    <main className='container'>
      <section>
        {
          updateWineData == null ?
            <>
              <h2>Új ember felvétele</h2>
              <WineForm onSubmit={createWine} />
            </>
            :
            <>
              <h2>{updateWineData.name} adatainak módosítása</h2>
              <WineForm onSubmit={updateWine} buttonText={"Módosítás"} wine={updateWineData}/>
            </>
        }
      </section>
      <section>
        <h2>Borok listája</h2>
        <div className='row row-cols-lg-2 row-cols-1 gy-3'>
          {wines.map(wine => <WineCard wine={wine} key={wine.id} updateClick={loadUpdateForm} deleteClick={deleteWine} />)}
        </div>
      </section>
    </main>);
}

export default App;
