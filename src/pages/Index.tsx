import React, { useState } from 'react';
import { ControlPanel } from '@/components/ControlPanel';
import { SubtitleOverlay } from '@/components/SubtitleOverlay';
import { RegionSelector } from '@/components/RegionSelector';
import { VocabularyPanel } from '@/components/VocabularyPanel';

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

          {/* Center: Demo Area */}
          <div className="flex-1 space-y-6">
            <div className="glass rounded-lg p-8 border-gradient">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                🎮 Live Translation Demo
              </h2>
              
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  This UI demonstrates the core interfaces for your Game-Lang Translator:
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="font-medium text-primary">Current Features:</div>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>✅ Control Panel with language selection</li>
                      <li>✅ Screen region selection interface</li>
                      <li>✅ Real-time subtitle overlay</li>
                      <li>✅ Vocabulary management system</li>
                      <li>✅ Gaming-focused dark theme</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-medium text-accent">Planned Features:</div>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>🔄 Interactive word highlighting</li>
                      <li>🔄 Dual-language subtitles</li>
                      <li>🔄 Advanced OCR settings</li>
                      <li>🔄 Export/import functionality</li>
                      <li>🔄 Performance optimizations</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                  <div className="text-sm font-medium mb-2">💡 Design Philosophy</div>
                  <div className="text-xs text-muted-foreground">
                    Unobtrusive overlay design that enhances gaming without distraction. 
                    Clean, readable typography with excellent contrast for subtitle readability.
                    Gaming aesthetic with cyber-punk inspired colors and glass morphism effects.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Components */}
      <SubtitleOverlay {...mockSubtitleData} />

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
