import React from 'react';
import { Shield } from 'lucide-react';

interface RiskCardProps {
  risk: {
    title: string;
    severity: string;
    mitigation: string;
  };
}

export const RiskCard: React.FC<RiskCardProps> = ({ risk }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      default:
        return 'text-green-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-medium text-orange-400">{risk.title}</h3>
        </div>
        <span className={`text-sm font-medium ${getSeverityColor(risk.severity)}`}>
          {risk.severity} Risk
        </span>
      </div>
      <div className="mt-3">
        <h4 className="text-sm font-medium text-gray-300">Mitigation Strategy</h4>
        <p className="mt-1 text-sm text-gray-400">{risk.mitigation}</p>
      </div>
    </div>
  );
};