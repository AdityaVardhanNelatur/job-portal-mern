import { TrendingUp } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-3xl font-bold mt-1">{value}</h3>
      </div>

      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full ${color}`}
      >
        <Icon className="text-white" size={22} />
      </div>
    </div>
  );
};

export default StatCard;
