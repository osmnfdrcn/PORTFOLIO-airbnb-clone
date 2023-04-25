"use client";

import React, { useState, useEffect } from "react";

interface HydrationErrorFixProps {
  children: React.ReactNode;
}

const HydrationErrorFix = ({ children }: HydrationErrorFixProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
};

export default HydrationErrorFix;
