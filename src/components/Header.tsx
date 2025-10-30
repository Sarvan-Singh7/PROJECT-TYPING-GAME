import { Keyboard, User, LogIn, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onLoginClick: () => void;
  onSettingsClick: () => void;
  isLoggedIn: boolean;
  username?: string;
}

const Header = ({ onLoginClick, onSettingsClick, isLoggedIn, username }: HeaderProps) => {
  return (
    <header className="w-full border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Keyboard className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">TypoNinja</h1>
        </div>

        <nav className="flex items-center gap-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSettingsClick}
            className="text-muted-foreground hover:text-foreground"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-primary" />
              <span className="text-foreground">{username}</span>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onLoginClick}
              className="text-muted-foreground hover:text-primary"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
