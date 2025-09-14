import React, { useState } from 'react';
import { Play, Square, Settings, Monitor, Languages, BookOpen, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ControlPanelProps {
  onRegionSelect: () => void;
  onVocabularyOpen: () => void;
  onSettingsOpen: () => void;
}

export function ControlPanel({ onRegionSelect, onVocabularyOpen, onSettingsOpen }: ControlPanelProps) {
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('ja');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [status, setStatus] = useState('Ready to translate');
  const [confidence, setConfidence] = useState(85);

  const languages = [
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  ];

  const handleTranslateToggle = () => {
    setIsTranslating(!isTranslating);
    setStatus(isTranslating ? 'Ready to translate' : 'Translating...');
  };

  return (
    <Card className="w-96 glass border-gradient">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Game-Lang Translator
          </CardTitle>
          <Badge variant={isTranslating ? "default" : "secondary"} className="animate-pulse-glow">
            {isTranslating ? 'Active' : 'Idle'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Language Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Languages className="h-4 w-4 text-primary" />
            Language Settings
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Source</label>
              <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass">
                  {languages.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        {lang.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Target</label>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass">
                  {languages.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        {lang.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Region Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Monitor className="h-4 w-4 text-primary" />
            Capture Region
          </div>
          <Button 
            onClick={onRegionSelect} 
            variant="glass" 
            className="w-full"
          >
            <Monitor className="h-4 w-4" />
            Select Screen Region
          </Button>
        </div>

        {/* Translation Control */}
        <div className="space-y-4">
          <Button
            onClick={handleTranslateToggle}
            variant={isTranslating ? "destructive" : "gaming"}
            className="w-full h-12 text-base font-semibold"
          >
            {isTranslating ? (
              <>
                <Square className="h-5 w-5" />
                Stop Translation
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                Start Translation
              </>
            )}
          </Button>

          {/* Status & Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status:</span>
              <span className={isTranslating ? "text-primary" : "text-foreground"}>
                {status}
              </span>
            </div>
            
            {isTranslating && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>OCR Confidence</span>
                  <span>{confidence}%</span>
                </div>
                <Progress value={confidence} className="h-2" />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={onVocabularyOpen} 
            variant="glass" 
            className="flex-1"
          >
            <BookOpen className="h-4 w-4" />
            Vocabulary
          </Button>
          <Button 
            onClick={onSettingsOpen} 
            variant="ghost" 
            size="icon"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}