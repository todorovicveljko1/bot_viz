export function ms_time(time: number): string {
  if (time < 1000) return time.toString() + "ns";
  else if (time < 1000000) return (time / 1000).toFixed(2) + "μs";
  else return (time / 1000000).toFixed(2) + "ms";
}
