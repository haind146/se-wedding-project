import * as migration_20251208_175436_initial_schema from './20251208_175436_initial_schema';

export const migrations = [
  {
    up: migration_20251208_175436_initial_schema.up,
    down: migration_20251208_175436_initial_schema.down,
    name: '20251208_175436_initial_schema'
  },
];
