"use client";

import { ClientToServerEvents, ServerToClientEvents } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!socket) {
      void fetch("/api/socket");
      const socketInstance = io();

      socketInstance.on("connect", () => {
        console.log("connected");
        setIsConnected(true);
      });

      socketInstance.on("disconnect", () => {
        setIsConnected(false);
        console.log("Disconnected");
      });

      setSocket(socketInstance);

      return () => {
        if (socket) {
          socketInstance.disconnect();
          setSocket(null);
        }
      };
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
