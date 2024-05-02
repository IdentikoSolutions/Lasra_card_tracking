import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

export function AnimatedBanner() {
  const [letters, setLetters] = useState([]);
  const [lightAngle, setLightAngle] = useState(0);

  useEffect(() => {
    // Load alphabet images
    const alphabetImages = []; // Array to hold loaded textures

    // Simulate loading alphabet images (replace with your actual loading logic)
    const loadImage = (letter) => {
      return new Promise((resolve) => {
        const loader = new THREE.TextureLoader();
        loader.load(`/path/to/${letter}.png`, (texture) => {
          resolve({ letter, texture });
        });
      });
    };

    const loadAlphabets = async () => {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (const letter of alphabet) {
        const image = await loadImage(letter);
        alphabetImages.push(image);
      }
      setLetters(alphabetImages);
    };

    loadAlphabets();

    // Setup interval for flickering lighting
    const flickerInterval = setInterval(() => {
      setLightAngle((prevAngle) => prevAngle === 0 ? Math.PI : 0);
    }, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(flickerInterval);
  }, []);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight
        intensity={2}
        angle={Math.PI / 8}
        penumbra={1}
        color="white"
        position={[lightAngle === 0 ? -5 : 5, 5, 5]}
      />
      <OrbitControls />
      {letters.map(({ letter, texture }, index) => (
        <Html key={index} center>
          <div style={{ fontSize: '24px', textAlign: 'center' }}>
            <img src={texture.image.src} alt={letter} />
          </div>
        </Html>
      ))}
    </Canvas>
  );
}

// export default AnimatedBanner;