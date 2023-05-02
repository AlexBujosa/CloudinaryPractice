'use client';
import { useState, useEffect } from 'react';

interface Props {
  publicId: string;
}

export function Video({ publicId }: Props) {
  const [videoPublicId, setPublicId] = useState(publicId);
  useEffect(() => {
    setPublicId(publicId);
  }, [publicId]);
  if (videoPublicId.length === 0) {
    return <></>;
  }
  return (
    <video
      className={`${videoPublicId.length === 0 ? 'hidden' : 'block m-4'}`}
      autoPlay
      controls
      muted
      src={`https://res.cloudinary.com/tamas-demo/video/upload/vc_auto,q_auto,w_800/${videoPublicId}`}
    ></video>
  );
}
