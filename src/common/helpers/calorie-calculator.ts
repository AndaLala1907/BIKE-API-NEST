export class CalorieCalculator {
  static estimateMET(
    bikeType?: string,
    roadTypeName?: string,
    speedTypeName?: string,
  ): number {
    if (speedTypeName === 'fast') return 10.0;
    if (bikeType === 'mountain') return 8.5;
    if (roadTypeName === 'gravel') return 7.0;
    return 6.0;
  }
  static calculate({
    weight,
    durationHours,
    bikeType,
    roadType,
    speedType,
  }: {
    weight: number;
    durationHours: number;
    bikeType?: string;
    roadType?: string;
    speedType?: string;
  }): number {
    const MET = this.estimateMET(bikeType, roadType, speedType);
    return Math.round(MET * weight * durationHours);
  }
}
