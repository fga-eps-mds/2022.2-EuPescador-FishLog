function coordenatesFake(coordinate: number) {
  const signal = Math.random() > 0.5 ? 1 : 0;
  const correctionFactor = Math.random() * 1.018;
  const correctionFactorWithSignal = signal
    ? correctionFactor
    : -correctionFactor;

  const data = coordinate + correctionFactorWithSignal;
  return data;
}

export default coordenatesFake;
