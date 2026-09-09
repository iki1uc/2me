// Mini-Event-Bus
const listeners = [];

export function report(name, payload) {
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
