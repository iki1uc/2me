// ================================================================
// RESPO-MASTER · Event-Bus + R-KERNEL
// ================================================================

// -----------------------------
// R-KERNEL (Continuum)
// -----------------------------
export const R = {
  clock: 0,
  time: 0,
  depth: 0,

  state: {
    alive: true,
    continuum: true,
    momentum: 0,   // SOCCER
    orbit: 0,      // WETTER
    fix: 0.7,
  },

  memory: {
    lastUpdate: Date.now(),
    history: [],
  },

  flow(input) {
    return {
      innen: input,
      sprung: input + 1,
      außen: input * 2
    };
  },

  update() {
    const now = Date.now();
    const dt = (now - this.memory.lastUpdate) / 1000;

    this.clock = (this.clock + dt) % 24;
    this.time = (this.time + dt * 0.5) % 12;
    this.depth = (this.state.momentum * 0.6) + (this.state.orbit * 0.4);

    this.memory.lastUpdate = now;
    this.memory.history.push({
      clock: this.clock,
      time: this.time,
      depth: this.depth
    });

    return { clock: this.clock, time: this.time, depth: this.depth };
  },

  inject(moduleName, payload) {
    if (moduleName === 'SOCCER') {
      this.state.momentum = payload.mismatch ? 1 : 0.3;
    }
    if (moduleName === 'WETTER') {
      this.state.orbit = payload.fix || 0;
    }
  }
};

// -----------------------------
// EVENT-BUS
// -----------------------------
const listeners = [];

export function report(name, payload) {
  R.inject(name, payload);
  const data = { name, payload, timestamp: Date.now() };
  listeners.forEach(fn => fn(data));
}

export function autoReport(name, fn, interval = 5000) {
  setInterval(() => {
    report(name, fn());
  }, interval);
}

export function getGlobalStatus() {
  return {
    clock: R.clock,
    time: R.time,
    depth: R.depth,
    alive: R.state.alive,
    continuum: R.state.continuum,
  };
}

export function onUpdate(callback) {
  listeners.push(callback);
}
