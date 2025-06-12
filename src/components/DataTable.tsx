
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

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

interface DataTableProps {
  data: SensorData[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sample ID</TableHead>
            <TableHead>Temperature (°C)</TableHead>
            <TableHead>Pressure (PSI)</TableHead>
            <TableHead>Vibration (Hz)</TableHead>
            <TableHead>Humidity (%)</TableHead>
            <TableHead>Voltage (V)</TableHead>
            <TableHead>Prediction</TableHead>
            <TableHead>Confidence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{row.id}</TableCell>
              <TableCell>{row.temperature.toFixed(1)}</TableCell>
              <TableCell>{row.pressure.toFixed(1)}</TableCell>
              <TableCell>{row.vibration.toFixed(1)}</TableCell>
              <TableCell>{row.humidity.toFixed(1)}</TableCell>
              <TableCell>{row.voltage.toFixed(1)}</TableCell>
              <TableCell>
                <Badge variant={row.prediction ? "destructive" : "secondary"}>
                  {row.prediction ? "Failure Risk" : "Normal"}
                </Badge>
              </TableCell>
              <TableCell>{(row.confidence * 100).toFixed(1)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
