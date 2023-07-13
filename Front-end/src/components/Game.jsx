import { useEffect, useState } from 'react'

import '../styles/game.css'
import gamePicture from './snakes-ladders.png'


import Grid from './Grid'
import axios, { Axios } from 'axios';
function Game() {
    const [data, setData] = useState(null);

    // Define an async function to get the data
    const getData = async () => {
      try {
        // Make a GET request with axios
        const response = await axios.get('http://localhost:8080/players/game');
        // Update the state with the data
        setData(response.data);
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    };

    const postData = async () => {
        try {
          // Make a GET request with axios
          const response = await axios.post('http://localhost:8080/players/game');
          // Update the state with the data
          setData(response.data);
        } catch (error) {
          // Handle the error
          console.error(error);
        }
      };
  
    // Call the async function in useEffect hook
    useEffect(() => {
      getData();
    }, []);
  
  async function handleClick(e) {
    e.preventDefault();
  }
 
    

  useEffect((req,res) => {
    //send post request that dice rolled
    
    
    //setButtonValue()
    
    //setPlayers()
    
    //setCurrentPlayer()
    //Check If Current Player is You
    setIsMyTurn(true);
  },[handleClick])


  
  const [newPosition, setNewPosition] = useState(0);
  const [isMyTurn,setIsMyTurn]=useState(false);
  const [buttonValue,setButtonValue]=useState();


  
  const [players, setPlayers] = useState();

  const [diceValue,setDicevalue]=useState()

  return (
    <>
   <div className="containerr">
   <div className="roww">
  <div className="column one" >
  {gamePicture?<Grid style={{ backgroundImage: `url(${gamePicture})`}} ArrayOfPlayersColorAndPosiotions = {players}></Grid>:null}

  </div>
  <div className="column two" >
    <div>
      
    </div>
    <div className='the-Button'>
    <button disabled={!isMyTurn} onClick={handleClick}>{buttonValue}</button>
    </div>

  </div>
</div>

   </div>
    </>
  )
}
export default Game;
