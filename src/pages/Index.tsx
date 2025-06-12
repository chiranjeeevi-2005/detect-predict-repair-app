
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Brain, Upload } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import ProgressBar from '@/components/ProgressBar';
import ResultsDisplay from '@/components/ResultsDisplay';
import { parseCSV, generateSampleData, SensorData } from '@/utils/csvParser';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [analysisData, setAnalysisData] = useState<SensorData[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const { toast } = useToast();

  const analyzeFile = async (file: File) => {
    setIsAnalyzing(true);
    setProgress(0);
    setStatus('Reading CSV file...');

    try {
      const text = await file.text();
      setProgress(25);
      setStatus('Parsing sensor data...');

      await new Promise(resolve => setTimeout(resolve, 500));
      
      const data = parseCSV(text);
      setProgress(50);
      setStatus('Applying Random Forest Classifier...');

      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(75);
      setStatus('Generating predictions...');

      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(100);
      setStatus('Analysis complete!');

      setAnalysisData(data);
      
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${data.length} sensor readings.`,
      });

    } catch (error) {
      console.error('Error analyzing file:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error processing your CSV file.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
        setProgress(0);
        setStatus('');
      }, 1000);
    }
  };

  const loadSampleData = () => {
    const sampleData = generateSampleData();
    setAnalysisData(sampleData);
    toast({
      title: "Sample Data Loaded",
      description: "Loaded 50 sample sensor readings for demonstration.",
    });
  };

  const resetAnalysis = () => {
    setAnalysisData(null);
    setIsAnalyzing(false);
    setProgress(0);
    setStatus('');
  };

  const totalSamples = analysisData?.length || 0;
  const failurePredictions = analysisData?.filter(d => d.prediction).length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Activity className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Predictive Maintenance AI
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload sensor data to predict equipment failures using advanced machine learning algorithms
          </p>
        </div>

        {/* Main Content */}
        {!analysisData && !isAnalyzing && (
          <div className="space-y-8">
            <Card className="border-primary/20 bg-card/80 backdrop-blur">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>AI-Powered Analysis</span>
                </CardTitle>
                <CardDescription>
                  Our Random Forest Classifier analyzes multiple sensor parameters to predict equipment failures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FileUpload onFileSelect={analyzeFile} isAnalyzing={isAnalyzing} />
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Don't have sensor data? Try our sample dataset
                  </p>
                  <Button onClick={loadSampleData} variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Load Sample Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg">Multi-Sensor Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Analyzes temperature, pressure, vibration, humidity, and voltage data simultaneously
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg">Real-Time Predictions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get instant failure risk assessments with confidence scores for each reading
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg">Visual Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Interactive charts and graphs to understand failure patterns and trends
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {isAnalyzing && <ProgressBar progress={progress} status={status} />}

        {analysisData && !isAnalyzing && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Analysis Results</h2>
              <Button onClick={resetAnalysis} variant="outline">
                New Analysis
              </Button>
            </div>
            <ResultsDisplay 
              data={analysisData} 
              totalSamples={totalSamples}
              failurePredictions={failurePredictions}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
