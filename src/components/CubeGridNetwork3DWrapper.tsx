"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const CubeGridNetwork3D = dynamic(() => import('./CubeGridNetwork3D'), {
  ssr: false,
});

export default function CubeGridNetwork3DWrapper() {
  return <CubeGridNetwork3D />;
}
