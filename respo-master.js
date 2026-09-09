// ================================================================
// R-KERNEL — Continuum · Alive · 24H · Height/Width/Depth
// ================================================================

export const R = {
  // Zeitkörper (Height / Width / Depth)
  clock: 0,        // Höhe (lineare Zeit)
  time: 0,         // Breite (relative Zeit)
  depth: 0,        // Tiefe (Mystery-Lane)

  // R-State (lebender Zustand)
  state: {
    alive: true,
    continuum: true,
    momentum: 0,     // aus Soccer
    orbit: 0,        // aus Wetter
    fix: 0.7,        // RUN3-kompatibel
  },

  // R-Memory (24H)
  memory: {
    lastUpdate: Date.now(),
    history: [],
  },

  // R-Flow (Innen → Übergang → Außen)
  flow(input) {
    return {
      innen: input,
      sprung: input + 1,
      außen: input * 2
    };
  },

  // R-Update (Höhe/Breite/Tiefe)
  update() {
    const now = Date.now();
    const dt = (now - this.memory.lastUpdate) / 1000;

    // Höhe = CLOCK
    this.clock = (this.clock + dt) % 24;

    // Breite = TIME
    this.time = (this.time + dt * 0.5) % 12;

    // Tiefe = Mystery-Lane (Soccer + Wetter)
    this.depth = (this.state.momentum * 0.6) + (this.state.orbit * 0.4);

    this.memory.lastUpdate = now;
    this.memory.history.push({ clock: this.clock, time: this.time, depth: this.depth });

    return { clock: this.clock, time: this.time, depth: this.depth };
  },

  // R-Inject (Module → R)
  inject(moduleName, payload) {
