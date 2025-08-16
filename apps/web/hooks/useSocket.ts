"use client";

import { useEffect, useRef, type RefObject } from "react";
import { io, type Socket } from "socket.io-client";

export default function useSocket(): RefObject<Socket | null> {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:3002", {
      withCredentials: true
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  return socketRef;
}
