import '../css/Cube.css'
import {useState, useEffect} from "react"
var bgSelect = document.querySelector(':root');

export default function Cube () {


  const setBackground = (e) => {
    bgSelect.style.setProperty('--hoverBackground', `url('${e.target.src}')`)
    
    
  }
  
const setLocation = (e) => {
  e.preventDefault();
  let x = e.pageX-150
  let y = e.pageY-150
  if (x<100){ x = 100}
  if (x>window.innerWidth - 400){x=window.innerWidth - 400}
  if (y<100){ y = 100}
  if (y>window.innerHeight - 400){y=window.innerHeight - 400}
  bgSelect.style.setProperty('--cube_top', `${y}px`)
  bgSelect.style.setProperty('--cube_left', `${x}px`)
  
  console.log(e.pageX)
  console.log(e.pageY)
  
  
}

const liveMove = (e) => {
  e.preventDefault();
  let x = e.pageX-150
  let y = e.pageY-150
  if (x<100){ x = 100}
  if (x>window.innerWidth - 400){x=window.innerWidth - 400}
  if (y<100){ y = 100}
  if (y>window.innerHeight - 400){y=window.innerHeight - 400}
  bgSelect.style.setProperty('--cube_top', `${y}px`)
  bgSelect.style.setProperty('--cube_left', `${x}px`)
}
const prevention = (e) => {
  e.preventDefault();
}



  return(
    <>

      <div className="cubeTable">
        <div className="cube"> 
          <div className="box box1">
              <img src="./img/employeeTracker.png" alt="employee tracker page"  onMouseOver={setBackground} onDrag={liveMove} onDragEnd={setLocation} /> 
          </div> 

          <div className="box box2">
              <img src="./img/roboMurderMystery.jpg" alt="robo murder mystery web game"  onMouseOver={setBackground} onDrag={liveMove} onDragEnd={setLocation} />
          </div> 

          <div className="box box3"> 
              <img src="./img/saleBlazers.jpg" alt="saleblazers wikipedia at fandom"  onMouseOver={setBackground} onDrag={liveMove}  onDragEnd={setLocation} /> 
          </div> 

          <div className="box box4"> 
              <img src="./img/wortcg.png" alt="warlords of ravegea trading card game" onMouseOver={setBackground} onDrag={liveMove} onDragEnd={setLocation} /> 
          </div> 

          <div className="box box5"> 
              <img src="./img/socialNetwork.png" alt="social network framework" onMouseOver={setBackground} onDrag={liveMove}  onDragEnd={setLocation}/> 
          </div> 

          <div className="box box6"> 
              <img src="./img/devCard.png" alt="arthur henningfield quick info card" onMouseOver={setBackground} onDrag={liveMove}  onDragEnd={setLocation}/> 
          </div> 
        </div> 

        <div className="cubeBody">

        </div>

      </div>

    </>
  )
}