import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { HexColorPicker } from 'react-colorful';

import { Model } from './LaysModel';

function Scene() {
   // Cursor showing current color
   const [state, setState] = useState({
    current: null,
    items: {
      Lays: "#ffffff",
    },
  });
  const [hovered, setHover] = useState(null)

  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${state.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
      return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`)
    }
  }, [hovered])

  function Picker() {
    return (
      <div style={
        {
          display: state.current ? "block" : "none",
          position: "absolute",
          top: "50px",
          left: "50px",
  
       }
      }>
        <HexColorPicker
          className="picker"
          color={state.items[state.current]}
          onChange={(color) => {
            let items = state.items;
            items[state.current] =  color
          }}
        />
        <h1>{state.current}</h1>
      </div>
    )
  }
  return (
    <div className='scene'>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <spotLight intensity={0.2} angle={0.5} penumbra={1} position={[10, 15, 10]} castShadow />
        <Suspense fallback={null}>
          <Model
            currentState={ state }
            setCurrentState={(curState) => {
              setState({
                ...state,
                current: curState
              })
            }}
            setHover={ setHover}
          />
          <Environment preset="city" />
        <ContactShadows rotateX={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} />
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
      </Canvas>
      <Picker />
    </div>
  )
}

function BlenderScene() {
  return (
      <Scene />
  );
}

export default BlenderScene;