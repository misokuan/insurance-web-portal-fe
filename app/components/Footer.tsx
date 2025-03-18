'use client'

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Footer = () => {
  const { data: session } = useSession();
  const [classGroup, setClassGroup] = useState("footer");

  useEffect(() => {
    if (!session) {
      setClassGroup("fixed-footer")
    } else {
      setClassGroup("flexi-footer")
    }
  }, [session])

  return (
    <div className={classGroup}>
      &copy; 2025 Assessment
    </div>
  );
}

export default Footer;