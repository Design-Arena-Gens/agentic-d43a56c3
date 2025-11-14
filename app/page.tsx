"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("../components/Scene"), { ssr: false });

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <h1>Red Ferrari Next to a House</h1>
        <p>Enjoy a tranquil 3D scene of a red sports car parked beside a cozy home.</p>
      </section>
      <section className="canvas-wrap">
        <Scene />
      </section>
    </main>
  );
}
