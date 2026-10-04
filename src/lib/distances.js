export const METERS_PER_MILE = 1609.344;

export const DISTANCES = {
  '5k': { label: '5K', meters: 5000, goals: { from: '15:00', to: '45:00', step: 60 } },
  '10k': { label: '10K', meters: 10000, goals: { from: '30:00', to: '1:30:00', step: 60 } },
  'half-marathon': { label: 'Half Marathon', meters: 21097.5, goals: { from: '1:10:00', to: '3:30:00', step: 300 } },
  marathon: { label: 'Marathon', meters: 42195, goals: { from: '2:30:00', to: '6:30:00', step: 300 } },
};
