/**
 * DTO representing summarized statistics for the user dashboard.
 * This structure is typically returned in GET /home/overview.
 */
export class HomeOverviewDto {
  totalDistance: number; // Total kilometers ridden
  totalDuration: number; // Total time spent riding (in minutes)
  totalCalories: number; // Total calories burned
  averageSpeed: number; // Average speed across all journeys
}
