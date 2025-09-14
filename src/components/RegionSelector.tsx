import React, { useState } from 'react';
import { Monitor, Crosshair, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RegionSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onRegionSelected: (region: { x: number; y: number; width: number; height: number }) => void;
}

export function RegionSelector({ isOpen, onClose, onRegionSelected }: RegionSelectorProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [presetRegions] = useState([
    { name: 'Bottom Center', x: 25, y: 75, width: 50, height: 15 },
    { name: 'Top Right', x: 70, y: 10, width: 25, height: 20 },
    { name: 'Full Screen', x: 0, y: 0, width: 100, height: 100 },
    { name: 'Left Panel', x: 5, y: 20, width: 30, height: 60 },
  ]);

  const handleStartSelection = () => {
    setIsSelecting(true);
    // In real implementation, this would minimize the window and start screen selection
    setTimeout(() => {
      // Simulate selection
      const mockRegion = { x: 200, y: 400, width: 600, height: 200 };
      setSelectedRegion(mockRegion);
      setIsSelecting(false);
    }, 2000);
  };

  const handleConfirmRegion = () => {
    if (selectedRegion) {
      onRegionSelected(selectedRegion);
      onClose();
    }
  };

  const handlePresetSelect = (preset: typeof presetRegions[0]) => {
    // Convert percentage to pixels (mock values for demo)
    const region = {
      x: (preset.x / 100) * 1920,
      y: (preset.y / 100) * 1080,
      width: (preset.width / 100) * 1920,
      height: (preset.height / 100) * 1080,
    };
    setSelectedRegion(region);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="w-[500px] glass border-gradient">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              Select Capture Region
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Manual Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Crosshair className="h-4 w-4 text-primary" />
              Manual Selection
            </div>
            
            <Button 
              onClick={handleStartSelection}
              variant={isSelecting ? "destructive" : "gaming"}
              className="w-full"
              disabled={isSelecting}
            >
              {isSelecting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Selecting Region...
                </>
              ) : (
                <>
                  <Crosshair className="h-4 w-4" />
                  Draw Selection Area
                </>
              )}
            </Button>
            
            {selectedRegion && (
              <div className="p-3 glass rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Selected Region:</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Position: {selectedRegion.x}, {selectedRegion.y}</div>
                  <div>Size: {selectedRegion.width} × {selectedRegion.height}</div>
                </div>
              </div>
            )}
          </div>

          {/* Preset Regions */}
          <div className="space-y-4">
            <div className="text-sm font-medium">Quick Presets</div>
            <div className="grid grid-cols-2 gap-2">
              {presetRegions.map((preset, index) => (
                <Button
                  key={index}
                  variant="glass"
                  className="h-auto p-3 flex flex-col items-start"
                  onClick={() => handlePresetSelect(preset)}
                >
                  <div className="font-medium text-xs">{preset.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {preset.width}% × {preset.height}%
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-3">
            <div className="text-sm font-medium">Preview</div>
            <div className="relative bg-muted rounded-lg p-4 h-32 overflow-hidden">
              <div className="absolute inset-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded border-2 border-dashed border-primary/50">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
                  Capture Area
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              variant="gaming" 
              onClick={handleConfirmRegion}
              disabled={!selectedRegion}
              className="flex-1"
            >
              <Check className="h-4 w-4" />
              Confirm Region
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}