import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  username: string;
  wpm: number;
  accuracy: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: "SpeedDemon", wpm: 142, accuracy: 98 },
  { rank: 2, username: "TypeMaster", wpm: 138, accuracy: 97 },
  { rank: 3, username: "QuickFingers", wpm: 135, accuracy: 96 },
  { rank: 4, username: "KeyboardNinja", wpm: 128, accuracy: 95 },
  { rank: 5, username: "FastTyper", wpm: 125, accuracy: 94 },
  { rank: 6, username: "SwiftKeys", wpm: 122, accuracy: 93 },
  { rank: 7, username: "RapidWriter", wpm: 118, accuracy: 92 },
  { rank: 8, username: "TypePro", wpm: 115, accuracy: 91 },
  { rank: 9, username: "WordWarrior", wpm: 112, accuracy: 90 },
  { rank: 10, username: "QuickType", wpm: 108, accuracy: 89 },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-5 h-5 text-primary" />;
    case 2:
      return <Medal className="w-5 h-5 text-muted-foreground" />;
    case 3:
      return <Award className="w-5 h-5 text-amber-600" />;
    default:
      return <span className="w-5 text-center font-semibold text-muted-foreground">{rank}</span>;
  }
};

const Leaderboard = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
          <Trophy className="w-6 h-6" />
          Top Typists
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {mockLeaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`
                flex items-center justify-between p-3 rounded-lg 
                ${entry.rank <= 3 ? "bg-secondary/30" : "bg-background"}
                border border-border hover:border-primary/50 transition-colors
              `}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 flex justify-center">
                  {getRankIcon(entry.rank)}
                </div>
                <span className="font-semibold text-foreground">{entry.username}</span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">WPM</p>
                  <p className="text-lg font-bold text-primary">{entry.wpm}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <p className="text-lg font-bold text-success">{entry.accuracy}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
