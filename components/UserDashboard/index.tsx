import React, { JSX } from "react";
import { Mail, CheckCircle, Box, MapPin } from "lucide-react";

interface UserDashboardStatus {
  status: "requested" | "confirmed" | "shipped" | "awaitingArrival";
}

const UserDashboard: React.FC<UserDashboardStatus> = ({ status }) => {
  const steps = ["requested", "confirmed", "shipped", "awaitingArrival"];

  // Helper to create a single line with dots connecting the icons
  const getStatusLine = () => {
    return (
      <div className="relative flex justify-between items-center w-full mt-4">
        {/* Create the line */}
        <div className="absolute inset-0 h-[2px] bg-black top-1/2" /> {/* Thinner line and vertically centered */}
        
        {/* Render dots above the line */}
        {steps.map((step, index) => (
          <div
            key={step}
            className={`h-4 w-4 rounded-full absolute ${index <= steps.indexOf(status) ? "bg-green-500" : "bg-red-500"}`}
            style={{ left: `${(index * 100) / (steps.length - 1)}%`, transform: "translateX(-50%)" }}
          />
        ))}
      </div>
    );
  };

  const getStatusStep = (label: string, icon: JSX.Element) => (
    <div className="flex flex-col items-center">
      <div className="p-2">{icon}</div>
      <span className="text-gray-400 mt-2">{label}</span> {/* Text below the dots */}
    </div>
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <h2 className="text-xl font-bold">Current Order Status</h2>
      <div className="flex justify-between items-center mt-4">
        {getStatusStep("Requested", <Mail />)}
        {getStatusStep("Confirmed", <CheckCircle />)}
        {getStatusStep("Shipped", <Box />)}
        {getStatusStep("Awaiting Arrival", <MapPin />)}
      </div>
      {getStatusLine()} {/* Render the connection line with dots */}
    </div>
  );
};

export default UserDashboard;
