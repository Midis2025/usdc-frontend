"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const GlobalNetworkHeroVisual3D = dynamic(() => import('./GlobalNetworkHeroVisual3D'), {
  ssr: false,
});

export default function GlobalNetworkHeroVisual3DWrapper() {
  return <GlobalNetworkHeroVisual3D />;
}
