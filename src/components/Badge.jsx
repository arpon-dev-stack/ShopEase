import React from "react";

const Badge = ({ icon, title, sub }) => (
  <div className="flex items-center gap-3">
    <div className="text-primary">{React.cloneElement(icon, { size: 24 })}</div>
    <div>
      <div className="font-bold text-gray-900 text-sm">{title}</div>
      <div className="text-xs text-gray-500">{sub}</div>
    </div>
  </div>
);

export default Badge;