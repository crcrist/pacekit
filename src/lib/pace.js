import { METERS_PER_MILE } from './distances.js';

export function pacePerMile(seconds, meters) {
  return seconds / (meters / METERS_PER_MILE);
}

export function pacePerKm(seconds, meters) {
  return seconds / (meters / 1000);
}

export function mileSplits(seconds, meters) {
  const pace = pacePerMile(seconds, meters);
  const fullMiles = Math.floor(meters / METERS_PER_MILE);
  const splits = [];
  for (let mile = 1; mile <= fullMiles; mile++) splits.push({ mile, elapsed: pace * mile });
  return splits;
}

export function predictTime(knownSeconds, knownMeters, targetMeters, exponent = 1.06) {
  return knownSeconds * (targetMeters / knownMeters) ** exponent;
}
