import { database } from "./database.js";

const DELAY_MS = 800;
export default function apiMiddleware() {
  return {
    name: "api-middleware",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url.startsWith("/api/")) {
          return next();
        }

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method === "OPTIONS") {
          res.statusCode = 200;
          return res.end();
        }

        if (req.url === "/api/booking/today") {
          setTimeout(() => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(database.today));
          }, DELAY_MS);
          return;
        }

        const url = new URL(req.url, "http://localhost");
        if (url.pathname === "/api/slots") {
          setTimeout(() => {
            const day = parseInt(url.searchParams.get("day"));
            const month = parseInt(url.searchParams.get("month"));
            const year = parseInt(url.searchParams.get("year"));

            if (isNaN(day) || isNaN(month) || isNaN(year)) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ error: "Нужны параметры day, month, year" }));
            }

            const isEven = day % 2 === 0;
            const slots = isEven ? database.slotsEvenDay : database.slotsOddDay;

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ date: { day, month, year }, slots }));
          }, DELAY_MS);
          return;
        }

        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "API endpoint not found" }));
      });
    }
  };
}