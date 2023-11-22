import { Member, Profile, Server } from "@prisma/client";
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import { NextApiResponse } from "next";
import type { Server as IOServer } from "socket.io";

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export interface ServerToClientEvents {
  userServerConnection: () => void;
  hello: (msg: string) => void;
  userServerDisconnection: (socketId: string) => void;
}

export interface ClientToServerEvents {
  hello: (msg: string) => void;
  userServerConnection: () => void;
  userServerDisconnection: (socketId: string) => void;
}
