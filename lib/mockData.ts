import { getDb } from "./db";

export function getBuilding() {
  return getDb().building;
}

export function getFloors() {
  return getDb().floors;
}

export function getSuites() {
  return getDb().suites;
}

export function getBusinesses() {
  return getDb().businesses;
}
