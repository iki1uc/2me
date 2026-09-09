inject(input) {
  // ZOLL-Flow ausführen
  const f = this.flow(input);

  // Innen → Übergang → Außen in den R-State schreiben
  this.state.momentum += f.innen * 0.3;
  this.state.orbit     += f.sprung * 0.2;

  // Tiefe aktualisieren
  this.depth = (this.state.momentum * 0.6) + (this.state.orbit * 0.4);

  // Memory erweitern
  this.memory.history.push({
    inject: input,
    innen: f.innen,
    sprung: f.sprung,
    außen: f.außen,
    depth: this.depth
  });

  return f;
}
