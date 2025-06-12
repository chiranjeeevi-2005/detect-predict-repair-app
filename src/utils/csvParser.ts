
export interface SensorData {
  id: number;
  temperature: number;
  pressure: number;
  vibration: number;
  humidity: number;
  voltage: number;
  prediction: boolean;
  confidence: number;
}

export const parseCSV = (csvText: string): SensorData[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
  
  console.log('CSV Headers:', headers);
  
  const data: SensorData[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    
    if (values.length < 5) continue; // Skip incomplete rows
    
    // Try to map common column names to our expected format
    const getColumnValue = (possibleNames: string[], defaultValue: number = 0): number => {
      for (const name of possibleNames) {
        const index = headers.findIndex(h => h.includes(name));
        if (index !== -1 && values[index]) {
          const parsed = parseFloat(values[index]);
          return isNaN(parsed) ? defaultValue : parsed;
        }
      }
      return defaultValue;
    };
    
    const temperature = getColumnValue(['temp', 'temperature'], Math.random() * 100 + 20);
    const pressure = getColumnValue(['press', 'pressure'], Math.random() * 50 + 10);
    const vibration = getColumnValue(['vib', 'vibration'], Math.random() * 20 + 5);
    const humidity = getColumnValue(['hum', 'humidity'], Math.random() * 100);
    const voltage = getColumnValue(['volt', 'voltage'], Math.random() * 12 + 220);
    
    // Simulate ML prediction based on sensor values
    const prediction = simulateMLPrediction(temperature, pressure, vibration, humidity, voltage);
    
    data.push({
      id: i,
      temperature,
      pressure,
      vibration,
      humidity,
      voltage,
      prediction: prediction.failure,
      confidence: prediction.confidence
    });
  }
  
  return data;
};

const simulateMLPrediction = (temp: number, pressure: number, vibration: number, humidity: number, voltage: number) => {
  // Simulate a Random Forest Classifier prediction
  let riskScore = 0;
  
  // Temperature risk
  if (temp > 80) riskScore += 0.3;
  else if (temp < 10) riskScore += 0.2;
  
  // Pressure risk
  if (pressure > 45) riskScore += 0.25;
  else if (pressure < 5) riskScore += 0.15;
  
  // Vibration risk
  if (vibration > 18) riskScore += 0.2;
  
  // Humidity risk
  if (humidity > 90 || humidity < 10) riskScore += 0.15;
  
  // Voltage risk
  if (voltage < 200 || voltage > 240) riskScore += 0.1;
  
  // Add some randomness to simulate model uncertainty
  riskScore += (Math.random() - 0.5) * 0.2;
  
  const confidence = Math.min(0.95, Math.max(0.65, Math.abs(riskScore - 0.5) + 0.5));
  const failure = riskScore > 0.5;
  
  return { failure, confidence };
};

export const generateSampleData = (): SensorData[] => {
  const sampleData: SensorData[] = [];
  
  for (let i = 1; i <= 50; i++) {
    const temperature = Math.random() * 100 + 20;
    const pressure = Math.random() * 50 + 10;
    const vibration = Math.random() * 20 + 5;
    const humidity = Math.random() * 100;
    const voltage = Math.random() * 12 + 220;
    
    const prediction = simulateMLPrediction(temperature, pressure, vibration, humidity, voltage);
    
    sampleData.push({
      id: i,
      temperature,
      pressure,
      vibration,
      humidity,
      voltage,
      prediction: prediction.failure,
      confidence: prediction.confidence
    });
  }
  
  return sampleData;
};
