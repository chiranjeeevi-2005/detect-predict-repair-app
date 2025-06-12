
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  progress: number;
  status: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, status }) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Analyzing Sensor Data</h3>
        <p className="text-muted-foreground">{status}</p>
      </div>
      <Progress value={progress} className="w-full" />
      <p className="text-center text-sm text-muted-foreground">
        {progress}% Complete
      </p>
    </div>
  );
};

export default ProgressBar;
