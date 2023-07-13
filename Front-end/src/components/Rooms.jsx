import React from 'react';
import axios from 'axios';
import '../styles/rooms.css'

export default class Rooms extends React.Component {
  
  state = {
    rooms: [],
    numberOfPlayers: 2
  }

  createRoom(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = axios.post('http://localhost:8080/create',
    {
      'numberOfPlayers': this.state.numberOfPlayers,
      'authorization': token
    })    
     window.location.href='/game'
  }
  async handleJoin  (e,room) {
    e.preventDefault();
    console.log(room.id)
    const token = localStorage.getItem('token');
    const data = await axios.post('http://localhost:8080/api/join',
    {
      'roomId': room.id,
      'authorization': token
    })
    console.log(data)
    if (data.data.status == 2){
      alert(JSON.stringify(data.data.data))
      window.location.href='/game'
    }
    else{
      const msg=JSON.stringify(data.data.message)
      alert(msg)
    }

  }


  componentDidMount() {
    axios.get(`http://localhost:8080/rooms`)
      .then(res => {
        const rooms = res.data;
        this.setState({ rooms });
      })
  }

  render() {
    return (

      <div className="cards">

        <div className='header'>
          <h2>Available Rooms</h2>
          <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Create Room</button>
          
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog  modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Create Room</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <form id='create-room-form' class="form-outline" method="post" action='#'>
                    <input type="number" placeholder="Enter Number" class="form-control" min="2" max="10" defaultValue="2" onChange={(e) => this.setState({ numberOfPlayers: e.target.value })}/>
                </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-success" form="create-room-form" onClick={(e) => this.createRoom(e)}>Create</button>
                </div>
              </div>
            </div>
          </div>


        </div>
      
        {
  this.state.rooms.map((room) => (
    <div class="card" key={room.id}>
      <h5 class="card-header">Room ID: {room.id}</h5>
      <div class="card-body">
        <p class="card-text">Number of Players: {room.numberOfPlayers}</p>
        <button class="btn btn-primary" onClick={(e) => this.handleJoin(e, room)}>Join Room</button>
      </div>
    </div>
  ))
}
       </div>
    );
  }
}

