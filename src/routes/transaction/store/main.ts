import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "url";

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
  res.send(`
      <style>
        body {
          background-color:rgb(0, 0, 0);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        img {
          margin: 0 auto; 
          border-radius: 8%;
        }
      </style>
      <img src="/images/wellcome.jpg" alt="Wellcome" >
    `);
});

mainRouter.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default mainRouter;
