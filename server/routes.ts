import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { electionData } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  app.get("/api/election-data", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(electionData);
  });

  const httpServer = createServer(app);
  return httpServer;
}
