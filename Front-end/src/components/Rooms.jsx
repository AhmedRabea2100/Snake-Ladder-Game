import React from 'react';
import axios from 'axios';
import '../styles/rooms.css';
import io from 'socket.io-client';

export default class Rooms extends React.Component {
  
  state = {
    rooms: [],
    numberOfPlayers: 2,
  };

  socket = null; // Socket.IO instance

  componentDidMount() {
    const token = localStorage.getItem('token');

    this.socket = io('http://localhost:8080', {
      query: { token }, // Pass the token as a query parameter
    }); // Establish socket connection

    this.socket.on('message', (message) => {
      alert(message); // Display the received message as an alert
    });

    // Fetch rooms
    axios
      .get('http://localhost:8080/rooms')
      .then((res) => {
        const rooms = res.data;
        this.setState({ rooms });
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to fetch rooms.'); // Display an error message if the request fails
      });
  }

  componentWillUnmount() {
    this.socket.disconnect(); // Disconnect socket connection when the component unmounts
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
      await axios.post('http://localhost:8080/game',data.data.data)
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
        <div className="header">
          <h2>Available Rooms</h2>
          <button type="button" className="btn2" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Create Room
          </button>

          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Create Room</h5>
                  <button type="button"  className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form id='create-room-form' className="form-outline" method="post" action='#'>
                    <input
                      type="number"
                      placeholder="Enter Number"
                      className="form-control"
                      min="2"
                      max="10"
                      defaultValue="2"
                      onChange={(e) => this.setState({ numberOfPlayers: e.target.value })}
                    />
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" id="btnn2" className="btn btn-success"  form="create-room-form" onClick={(e) => this.createRoom(e)}>Create</button>
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
        <button class="btn2"  onClick={(e) => this.handleJoin(e, room)}>Join Room</button>
      </div>
    </div>
  ))
}
       </div>
    );
  }
}