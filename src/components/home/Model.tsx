"use client";

import Image from "next/image";
import AnimatedBackground from "../common/AnimatedBackground";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import { heroText } from "@/data/text";
import * as THREE from "three";

// --- MODEL OBJECT ---
const ModelObject = () => {
    // Load compressed (Draco) model
    const gltf = useGLTF("/model/scene_draco.glb");
    const modelRef = useRef<THREE.Group>(null);
    const [scrollY, setScrollY] = useState(0);

    // Track scroll position to animate rotation and scale
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Animate the model slightly based on scroll position
    useFrame(() => {
        const s = 5 + scrollY * 0.0045;
        if (modelRef.current) {
            modelRef.current.rotation.y = scrollY * 0.003;
            modelRef.current.rotation.z = 0.3;
            modelRef.current.scale.set(s, s, s);
        }
    });

    return <primitive ref={modelRef} object={gltf.scene} />;
};

// --- MAIN COMPONENT ---
const Model = () => {
    // Preload the GLB file as soon as the component mounts
    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "fetch";
        link.href = "/model/scene_draco.glb";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
    }, []);

    return (
        <section>
            <AnimatedBackground from="#b4b7f1" to="#7c7fbe">
                <div className="2xl:h-[100vh] w-full flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 gap-12">
                    {/* --- MODEL AREA --- */}
                    <div className="w-full lg:w-6/12 2xl:w-7/12 flex justify-center items-center max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] aspect-[4/3]">
                        <Canvas
                            shadows={false}
                            dpr={[1, 1.5]} // limit device pixel ratio for better perf
                            camera={{ position: [0, 0, 8], fov: 45 }}
                            className="w-full h-full pointer-events-auto touch-none -ml-5 -mt-10"
                        >
                            <ambientLight intensity={2} />
                            <directionalLight position={[20, 30, 60]} intensity={0.8} />
                            <Suspense fallback={null}>
                                <ModelObject />
                            </Suspense>
                            {/* Disable user camera control */}
                            <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
                        </Canvas>
                    </div>

                    {/* --- TEXT AREA --- */}
                    <div className="w-full -mt-20 lg:mt-0 lg:pt-10 lg:w-6/12 xl:w-5/12 2xl:pr-24">
                        <h1 className="font-glitch uppercase text-[1.3rem] sm:text-[1.75rem] 2xl:text-[2rem] mb-8 leading-tight">
                            Step into the legacy.
                            <br />
                            Scroll through innovation.
                        </h1>

                        {heroText.map((paragraph, index) => (
                            <p
                                key={index}
                                className={`font-adineu text-[1.1rem] md:text-[1.25rem] leading-relaxed ${index === heroText.length - 1 ? "mb-10" : "mb-5"
                                    }`}
                            >
                                {paragraph}
                            </p>
                        ))}

                        <Image
                            src="/other/logo-transparent.png"
                            alt="logo"
                            width={100}
                            height={100}
                            className="h-10 md:h-14 w-auto mx-auto mb-10 2xl:pb-0"
                        />
                    </div>
                </div>
            </AnimatedBackground>
        </section>
    );
};

export default Model;

// --- Preload the GLB model immediately when the app starts ---
useGLTF.preload("/model/scene_draco.glb");
