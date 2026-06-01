import fs from "fs";
import path from "path";
import { Building, Business, Floor, Suite } from "./types";

const dataFile = path.join(process.cwd(), "data.json");

interface DbData {
  building: Building;
  floors: Floor[];
  suites: Suite[];
  businesses: Business[];
}

export function getDb(): DbData {
  try {
    const raw = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return {
      building: {} as Building,
      floors: [],
      suites: [],
      businesses: []
    };
  }
}

export function saveDb(data: DbData) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}
