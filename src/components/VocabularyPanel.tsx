import React, { useState } from 'react';
import { BookOpen, Download, Search, Trash2, Star, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface VocabularyEntry {
  id: string;
  sourceText: string;
  translation: string;
  context?: string;
  timestamp: Date;
  isFavorite: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface VocabularyPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VocabularyPanel({ isOpen, onClose }: VocabularyPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('words');
  
  // Mock vocabulary data
  const [vocabularyEntries] = useState<VocabularyEntry[]>([
    {
      id: '1',
      sourceText: 'こんにちは',
      translation: 'Hello',
      context: 'Common greeting used throughout the day',
      timestamp: new Date(),
      isFavorite: true,
      difficulty: 'easy'
    },
    {
      id: '2', 
      sourceText: 'ありがとうございます',
      translation: 'Thank you very much',
      context: 'Polite way to express gratitude',
      timestamp: new Date(),
      isFavorite: false,
      difficulty: 'medium'
    },
    {
      id: '3',
      sourceText: '冒険者よ、この危険な洞窟に入る前に装備を確認せよ',
      translation: 'Adventurer, check your equipment before entering this dangerous cave',
      context: 'RPG game dialogue',
      timestamp: new Date(),
      isFavorite: true,
      difficulty: 'hard'
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'destructive';
      default: return 'secondary';
    }
  };

  const exportVocabulary = () => {
    const csv = vocabularyEntries.map(entry => 
      `"${entry.sourceText}","${entry.translation}","${entry.context || ''}","${entry.timestamp.toISOString()}"`
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vocabulary.csv';
    a.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="w-[700px] h-[600px] glass border-gradient">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Vocabulary Manager
              <Badge variant="secondary">{vocabularyEntries.length} entries</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="glass" size="sm" onClick={exportVocabulary}>
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vocabulary..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass"
            />
          </div>

          {/* Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass">
              <TabsTrigger value="words">Words</TabsTrigger>
              <TabsTrigger value="sentences">Sentences</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            
            <TabsContent value="words" className="mt-4">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {vocabularyEntries
                    .filter(entry => entry.sourceText.length < 20)
                    .map(entry => (
                    <div key={entry.id} className="glass rounded-lg p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <div className="font-medium text-primary text-lg">
                            {entry.sourceText}
                          </div>
                          <div className="text-foreground">
                            {entry.translation}
                          </div>
                          {entry.context && (
                            <div className="text-xs text-muted-foreground">
                              {entry.context}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge variant={getDifficultyColor(entry.difficulty)}>
                            {entry.difficulty}
                          </Badge>
                          <Button 
                            size="sm" 
                            variant={entry.isFavorite ? "accent" : "ghost"}
                          >
                            <Star className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="sentences" className="mt-4">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {vocabularyEntries
                    .filter(entry => entry.sourceText.length >= 20)
                    .map(entry => (
                    <div key={entry.id} className="glass rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <Badge variant={getDifficultyColor(entry.difficulty)}>
                          {entry.difficulty}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant={entry.isFavorite ? "accent" : "ghost"}
                          >
                            <Star className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground border-l-2 border-accent pl-3">
                          {entry.sourceText}
                        </div>
                        <div className="text-foreground font-medium">
                          {entry.translation}
                        </div>
                        {entry.context && (
                          <div className="text-xs text-muted-foreground italic">
                            Context: {entry.context}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="favorites" className="mt-4">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {vocabularyEntries
                    .filter(entry => entry.isFavorite)
                    .map(entry => (
                    <div key={entry.id} className="glass rounded-lg p-4 border-l-4 border-accent">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <div className="font-medium text-primary">
                            {entry.sourceText}
                          </div>
                          <div className="text-foreground">
                            {entry.translation}
                          </div>
                        </div>
                        <Badge variant={getDifficultyColor(entry.difficulty)}>
                          {entry.difficulty}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          {/* Add new entry button */}
          <Button variant="gaming" className="w-full">
            <Plus className="h-4 w-4" />
            Add New Entry
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}