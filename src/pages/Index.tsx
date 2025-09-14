import React, { useState } from 'react';
import { Copy, Save } from 'lucide-react';
import { ControlPanel } from '@/components/ControlPanel';
import { SubtitleOverlay } from '@/components/SubtitleOverlay';
import { RegionSelector } from '@/components/RegionSelector';
import { VocabularyPanel } from '@/components/VocabularyPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [showRegionSelector, setShowRegionSelector] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  // Mock subtitle data for demonstration
  const mockSubtitleData = {
    position: { x: 400, y: 500 },
    sourceText: "冒険者よ、この危険な洞窟に入る前に装備を確認せよ。",
    translatedText: "Adventurer, check your equipment before entering this dangerous cave.",
    confidence: 87,
    isVisible: true
  };

  const handleRegionSelect = () => {
    setShowRegionSelector(true);
  };

  const handleRegionSelected = (region: { x: number; y: number; width: number; height: number }) => {
    setSelectedRegion(region);
    setShowRegionSelector(false);
  };

  const handleVocabularyOpen = () => {
    setShowVocabulary(true);
  };

  const handleSettingsOpen = () => {
    setShowSettings(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Gaming Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(-45deg, hsl(var(--accent)) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Game-Lang Translator
              </h1>
              <p className="text-muted-foreground text-sm">
                Real-time translation for gaming and media
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              Phase 1: Standalone Tool (MVP)
            </div>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex gap-8 p-6">
          {/* Left: Control Panel */}
          <div className="flex-shrink-0">
            <ControlPanel
              onRegionSelect={handleRegionSelect}
              onVocabularyOpen={handleVocabularyOpen}
              onSettingsOpen={handleSettingsOpen}
            />
          </div>

          {/* Right: Screen Region Display */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Screen Region Area */}
            <div className="glass rounded-lg border-gradient flex-1 min-h-[400px]">
              <div className="p-4 border-b border-border/50">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  📺 Selected Region
                  {selectedRegion && (
                    <Badge variant="secondary" className="text-xs">
                      {selectedRegion.width}×{selectedRegion.height}
                    </Badge>
                  )}
                </h2>
              </div>
              
              <div className="p-6 h-full flex items-center justify-center">
                {selectedRegion ? (
                  <div className="w-full h-full bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="text-2xl">🎮</div>
                      <div className="text-sm text-muted-foreground">
                        Screen region content will appear here
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {selectedRegion.width} × {selectedRegion.height} pixels
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="text-4xl opacity-30">📱</div>
                    <div className="space-y-2">
                      <div className="text-lg font-medium text-muted-foreground">
                        No Region Selected
                      </div>
                      <div className="text-sm text-muted-foreground max-w-sm">
                        Use the control panel to select a screen region for translation
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Subtitle Interface */}
            <div className="glass rounded-lg p-4 border-gradient">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-muted-foreground">LIVE TRANSLATION</h3>
                <Badge variant={mockSubtitleData.confidence > 80 ? "success" : "secondary"} className="text-xs">
                  {mockSubtitleData.confidence}% confidence
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground border-l-2 border-accent pl-3">
                  {mockSubtitleData.sourceText}
                </div>
                <div className="text-base font-medium text-foreground leading-relaxed">
                  {mockSubtitleData.translatedText}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Save className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  Japanese → English
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Components */}
      <RegionSelector
        isOpen={showRegionSelector}
        onClose={() => setShowRegionSelector(false)}
        onRegionSelected={handleRegionSelected}
      />
      
      <VocabularyPanel
        isOpen={showVocabulary}
        onClose={() => setShowVocabulary(false)}
      />
    </div>
  );
};

export default Index;
