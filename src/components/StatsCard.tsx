import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subtitle: string;
  accentColor?: 'blue' | 'indigo' | 'purple' | 'emerald';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  label,
  value,
  subtitle,
  accentColor = 'indigo'
}) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50 text-blue-700 border-blue-200/60',
      iconBg: 'bg-blue-600 text-white'
    },
    indigo: {
      bg: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
      iconBg: 'bg-indigo-600 text-white'
    },
    purple: {
      bg: 'bg-purple-50 text-purple-700 border-purple-200/60',
      iconBg: 'bg-purple-600 text-white'
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      iconBg: 'bg-emerald-600 text-white'
    }
  };

  const currentTheme = colorMap[accentColor];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl ${currentTheme.iconBg} flex items-center justify-center shrink-0 shadow-sm`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-0.5 tracking-tight">{value}</p>
        <p className="text-xs text-slate-600 mt-1 font-medium">{subtitle}</p>
      </div>
    </div>
  );
};
