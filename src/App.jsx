import React, { useRef, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Poker from './components/Poker'
import Cube from './components/Cube'
import Resourcerer from './components/Resourcerer'
import Pagecat from './components/Pagecat'
import Diskette from './components/Diskette'


function App() {

  const handleDragStart = (event) => {
    event.dataTransfer.setData('pageToLoad', event.target.dataset.pageToLoad);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const pageToLoad = event.dataTransfer.getData('pageToLoad');
    window.location.href =`${pageToLoad}`
  };

  return (
    <>
      
      <div className={'top_bezel'}></div>
      <div className={'left_bezel'}></div>
      <div className={'right_bezel'}>
        <div className={'disk_container'}>
          <Diskette src="./img/disk/videopokerDiskette.png" pageToLoad="./Poker" onDragStart={handleDragStart} />
          <Diskette src="./img/disk/cubeDiskette.png" pageToLoad="./Cube" onDragStart={handleDragStart} />  
          <Diskette src="./img/disk/resourcererDiskette.png" pageToLoad="./Resourcerer" onDragStart={handleDragStart} />  
          <Diskette src="./img/disk/pagecatDiskette.png" pageToLoad="./Pagecat" onDragStart={handleDragStart} />  
        </div>
      </div>

      <div className={'bottom_bezel'}>  
        <div className={'disk_drive'} onDragOver={handleDragOver} onDrop={handleDrop} ></div>
      </div>


      <BrowserRouter>
        <Routes>
          <Route path="/poker" element={<Poker />} />   
          <Route path="/cube" element={<Cube />} />   
          <Route path="/Resourcerer" element={<Resourcerer />} />   
          <Route path="/Pagecat" element={<Pagecat />} />    
                
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


{/* <img src='./img/disk/insert_disk.png' alt='drag a diskette on to this drive' className={'insert_disk'}/> */}