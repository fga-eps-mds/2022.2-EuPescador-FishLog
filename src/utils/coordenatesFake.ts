function coordenatesFake(coordinate: number) {
  const signal = Math.round(Math.random());
  const correctionFactor = Math.random() * 0.008;
  const correctionFactorWithSignal = signal
    ? correctionFactor
    : -correctionFactor;

  const data = coordinate + correctionFactorWithSignal;
  return data;
}

export default coordenatesFake;