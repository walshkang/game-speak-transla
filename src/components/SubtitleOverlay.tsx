import React, { useState, useEffect } from 'react';
import { Volume2, Eye, EyeOff, Copy, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SubtitleOverlayProps {
  position: { x: number; y: number };
  sourceText: string;
  translatedText: string;
  confidence: number;
  isVisible: boolean;
}

export function SubtitleOverlay({ 
  position, 
  sourceText, 
  translatedText, 
  confidence,
  isVisible 
}: SubtitleOverlayProps) {
  const [showOriginal, setShowOriginal] = useState(true);
  const [opacity, setOpacity] = useState(0.95);

  // Simulate real-time translation updates
  useEffect(() => {
    const interval = setInterval(() => {
      // This would be connected to your real translation service
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const handleCopy = () => {
    const textToCopy = `${sourceText}\n${translatedText}`;
    navigator.clipboard.writeText(textToCopy);
  };

  const handleSave = () => {
    // This would save to vocabulary
    console.log('Saving to vocabulary:', { sourceText, translatedText });
  };

  return (
    <div 
      className="fixed z-50 min-w-80 max-w-md animate-fade-in"
      style={{ 
        left: position.x, 
        top: position.y,
        opacity: opacity 
      }}
    >
      <div className="glass rounded-lg border-gradient p-4 space-y-3">
        {/* Header with controls */}
        <div className="flex items-center justify-between">
          <Badge 
            variant={confidence > 80 ? "success" : confidence > 60 ? "warning" : "destructive"} 
            className="text-xs"
          >
            {confidence}% confidence
          </Badge>
          
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowOriginal(!showOriginal)}
            >
              {showOriginal ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCopy}>
              <Copy className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleSave}>
              <Save className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Subtitle Content */}
        <div className="space-y-2">
          {showOriginal && sourceText && (
            <div className="text-sm text-muted-foreground border-l-2 border-accent pl-3">
              {sourceText}
            </div>
          )}
          
          <div className="text-lg font-medium text-primary leading-relaxed">
            {translatedText || "Waiting for text..."}
          </div>
        </div>

        {/* Interactive word highlighting for future */}
        <div className="hidden">
          <div className="text-sm space-y-1">
            <div className="text-muted-foreground">Click words to learn:</div>
            <div className="flex flex-wrap gap-1">
              {sourceText.split(' ').map((word, index) => (
                <span 
                  key={index}
                  className="cursor-pointer px-1 py-0.5 rounded hover:bg-accent/30 transition-colors"
                  onClick={() => console.log('Word clicked:', word)}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Opacity Control */}
      <div className="mt-2 flex justify-end">
        <input
          type="range"
          min="0.3"
          max="1"
          step="0.1"
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
          className="w-20 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}