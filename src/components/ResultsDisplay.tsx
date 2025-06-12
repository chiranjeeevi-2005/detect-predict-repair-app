
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DataTable from './DataTable';

interface SensorData {
  id: number;
  temperature: number;
  pressure: number;
  vibration: number;
  humidity: number;
  voltage: number;
  prediction: boolean;
  confidence: number;
}

interface ResultsDisplayProps {
  data: SensorData[];
  totalSamples: number;
  failurePredictions: number;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data, totalSamples, failurePredictions }) => {
  const pieData = [
    { name: 'Normal Operation', value: totalSamples - failurePredictions, color: '#10B981' },
    { name: 'Failure Risk', value: failurePredictions, color: '#EF4444' }
  ];

  const failureReasons = [
    { reason: 'High Temperature', count: Math.floor(failurePredictions * 0.4) },
    { reason: 'Excessive Vibration', count: Math.floor(failurePredictions * 0.3) },
    { reason: 'Low Voltage', count: Math.floor(failurePredictions * 0.2) },
    { reason: 'High Pressure', count: Math.floor(failurePredictions * 0.1) }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Samples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSamples}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Failure Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{failurePredictions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Failure Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((failurePredictions / totalSamples) * 100).toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Failure Distribution</CardTitle>
            <CardDescription>Overall equipment health status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Failure Reasons</CardTitle>
            <CardDescription>Primary causes of predicted failures</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={failureReasons}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="reason" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Results</CardTitle>
          <CardDescription>Individual sensor readings and predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
