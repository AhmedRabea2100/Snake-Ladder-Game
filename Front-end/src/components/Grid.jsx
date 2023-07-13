import React, { useState,useRef,useEffect } from "react";
import '../styles/grid.css'


function Canvas({color}) {
  const canvasRef = useRef(null);
 
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // draw a circle
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI * 2); // x, y, radius, startAngle, endAngle
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }, []);

  return <canvas ref={canvasRef} width={200} height={200} />;
}



const Grid = ({style, ArrayOfPlayersColorAndPosiotions = [] }) => {

 //function to check  that there iss  more than one player in the same cell or not
  
 

  // create a state variable to store the grid as a 2D array of numbers
  const [grid, setGrid] = useState(() => {
    // initialize the grid with numbers from 1 to 100
    let grid = [];
    let num = 1;
    for (let i = 0; i < 10; i++) {
      // create a row array
      let row = [];
      for (let j = 0; j < 10; j++) {
        // push the number to the row array
        row.push(num);
        num++;
      }
      // reverse the row array if it is an odd row
      if (i % 2 === 1) {
        row.reverse();
      }
      // push the row array to the grid array
      grid.push(row);
    }
    // reverse the grid array to start from bottom left
    grid.reverse();
    return grid;
  });

  return (
    <div className="gridd" style={style}>
      {grid.map((row, i) => (
        <div className="roww" key={i}>
          {row.map((num, j) => (
            <div className="celll" key={j}>
             
             {ArrayOfPlayersColorAndPosiotions && ArrayOfPlayersColorAndPosiotions.filter(
  (item) => item.position === num
).map((item) => (
  <Canvas key={item.color} color={item.color} />
))}


            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
