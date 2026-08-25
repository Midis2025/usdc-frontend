"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const UnifiedOpsHub3D = dynamic(() => import('./UnifiedOpsHub3D'), {
  ssr: false,
});

export default function UnifiedOpsHub3DWrapper() {
  return <UnifiedOpsHub3D />;
}
