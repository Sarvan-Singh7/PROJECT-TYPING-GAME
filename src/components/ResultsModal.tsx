import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Trophy, Target, AlertCircle, TrendingUp } from "lucide-react";

interface ResultsModalProps {
  open: boolean;
  onClose: () => void;
  wpm: number;
  accuracy: number;
  errors: number;
  onRestart: () => void;
}

const ResultsModal = ({ open, onClose, wpm, accuracy, errors, onRestart }: ResultsModalProps) => {
  // Generate mock historical data for the chart
  const chartData = [
    { test: 1, wpm: Math.max(20, wpm - 15) },
    { test: 2, wpm: Math.max(25, wpm - 10) },
    { test: 3, wpm: Math.max(30, wpm - 8) },
    { test: 4, wpm: Math.max(35, wpm - 5) },
    { test: 5, wpm },
  ];

  const accuracyData = [
    { metric: "Current", value: accuracy },
    { metric: "Average", value: Math.min(100, accuracy + 5) },
    { metric: "Best", value: Math.min(100, accuracy + 10) },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            Test Complete!
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 my-6">
          <div className="text-center p-4 bg-background rounded-lg border border-border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <p className="text-sm text-muted-foreground">WPM</p>
            </div>
            <p className="text-3xl font-bold text-primary">{wpm}</p>
          </div>
          
          <div className="text-center p-4 bg-background rounded-lg border border-border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-5 h-5 text-success" />
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </div>
            <p className="text-3xl font-bold text-success">{accuracy}%</p>
          </div>
          
          <div className="text-center p-4 bg-background rounded-lg border border-border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-error" />
              <p className="text-sm text-muted-foreground">Errors</p>
            </div>
            <p className="text-3xl font-bold text-error">{errors}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">WPM Progress</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="test" 
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: "Test Number", position: "insideBottom", offset: -5 }}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="wpm" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Accuracy Comparison</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--success))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button 
            onClick={onRestart} 
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Try Again
          </Button>
          <Button 
            variant="secondary" 
            onClick={onClose}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultsModal;
