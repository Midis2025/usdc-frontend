"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const EnergyHeroCanvas = dynamic(() => import('./EnergyHeroCanvas'), {
  ssr: false,
});

export default function EnergyHeroCanvasWrapper() {
  return <EnergyHeroCanvas />;
}
