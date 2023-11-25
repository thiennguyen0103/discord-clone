import {
  ClientToServerEvents,
  NextApiResponseWithSocket,
  ServerToClientEvents,
} from "../../../types";

import { NextApiRequest } from "next";
import { Server } from "socket.io";

export default function ioHandler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    const io = new Server<ClientToServerEvents, ServerToClientEvents>(
      res.socket.server
    );

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
