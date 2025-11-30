import { ColumnStats } from '../App';
import { BarChart3 } from 'lucide-react';

interface DataQualityStatsProps {
  stats: ColumnStats[];
}

export function DataQualityStats({ stats }: DataQualityStatsProps) {
  const getQualityColor = (percent: number) => {
    if (percent >= 90) return 'text-green-600';
    if (percent >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (percent: number) => {
    if (percent >= 90) return 'bg-green-500';
    if (percent >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <h3 className="text-slate-700">2. Check Data - Quality Statistics</h3>
        <p className="text-sm text-slate-500 mt-1">
          Data quality metrics for each column
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-slate-600">Column</th>
              <th className="px-4 py-3 text-center text-xs text-slate-600">Null %</th>
              <th className="px-4 py-3 text-center text-xs text-slate-600">Unique %</th>
              <th className="px-4 py-3 text-center text-xs text-slate-600">Completeness</th>
              <th className="px-4 py-3 text-left text-xs text-slate-600">Top Values</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {stats.map((stat, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded">
                    {stat.column}
                  </code>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`${getQualityColor(100 - stat.nullPercent)}`}>
                    {stat.nullPercent}%
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-slate-700">{stat.uniquePercent}%</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${getProgressColor(stat.completeness)} transition-all`}
                        style={{ width: `${stat.completeness}%` }}
                      />
                    </div>
                    <span className={`text-xs ${getQualityColor(stat.completeness)} min-w-[3rem] text-right`}>
                      {stat.completeness}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {stat.topValues.slice(0, 3).map((value, i) => (
                      <div
                        key={i}
                        className="text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200"
                      >
                        <span className="font-mono text-slate-700">{value.value}</span>
                        <span className="text-slate-400 ml-1">({value.count})</span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-slate-50 border-t border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <BarChart3 className="size-3" />
          <span>
            Analyzed {stats.length} columns • 
            Avg completeness: {Math.round(stats.reduce((sum, s) => sum + s.completeness, 0) / stats.length)}%
          </span>
        </div>
      </div>
    </div>
  );
}
