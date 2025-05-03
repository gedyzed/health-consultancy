export const fetchDoctorDashboardSummaryAPI = async () => {
    const res = await fetch("/api/doctor/dashboard-summary"); //replace with real end point
  
    if (!res.ok) {
      throw new Error("Failed to fetch doctor dashboard data");
    }
  
    const data = await res.json();
    return data;
  };
  