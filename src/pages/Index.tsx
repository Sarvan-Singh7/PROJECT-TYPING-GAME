import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TypingTest from "@/components/TypingTest";
import ResultsModal from "@/components/ResultsModal";
import AuthModal from "@/components/AuthModal";
import SettingsModal, { Settings } from "@/components/SettingsModal";
import Leaderboard from "@/components/Leaderboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [duration, setDuration] = useState(15);
  const [showResults, setShowResults] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [testResults, setTestResults] = useState({ wpm: 0, accuracy: 0, errors: 0 });
  const [testKey, setTestKey] = useState(0);
  const [settings, setSettings] = useState<Settings>({
    punctuation: false,
    numbers: false,
    language: "english",
    soundOnClick: false,
    smoothCaret: true,
    confidenceMode: false,
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      // Ctrl + Shift + S for settings
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        setShowSettings(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, []);

  // Reset test when settings change
  useEffect(() => {
    setTestKey((prev) => prev + 1);
  }, [settings.punctuation, settings.numbers]);

  const handleTestComplete = (wpm: number, accuracy: number, errors: number) => {
    setTestResults({ wpm, accuracy, errors });
    setShowResults(true);
  };

  const handleRestart = () => {
    setShowResults(false);
    setTestKey((prev) => prev + 1);
  };

  const handleLogin = (user: string) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onLoginClick={() => setShowAuth(true)}
        onSettingsClick={() => setShowSettings(true)}
        isLoggedIn={isLoggedIn}
        username={username}
      />

      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="test" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="test">Typing Test</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="test" className="space-y-8">
            <div className="flex justify-center gap-4">
              {[15, 30, 60].map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    setDuration(time);
                    setTestKey((prev) => prev + 1);
                  }}
                  className={`
                    px-4 py-2 rounded-lg font-semibold transition-colors
                    ${duration === time 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }
                  `}
                >
                  {time}s
                </button>
              ))}
            </div>

            <TypingTest 
              key={testKey}
              duration={duration} 
              onComplete={handleTestComplete}
              settings={settings}
            />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard />
          </TabsContent>
        </Tabs>
      </main>

      <ResultsModal
        open={showResults}
        onClose={() => setShowResults(false)}
        wpm={testResults.wpm}
        accuracy={testResults.accuracy}
        errors={testResults.errors}
        onRestart={handleRestart}
      />

      <AuthModal
        open={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={handleLogin}
      />

      <SettingsModal
        open={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </div>
  );
};

export default Index;
