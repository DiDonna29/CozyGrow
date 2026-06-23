
"use client"

import React, { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, ListChecks } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export const TaskBoard: React.FC = () => {
  const { t } = useAppContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('farmTasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('farmTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Card className="h-full border-2 border-primary/20 bg-card/60 backdrop-blur-md shadow-lg overflow-hidden flex flex-col">
      <CardHeader className="bg-primary/5 pb-4">
        <CardTitle className="flex items-center gap-3 font-headline text-2xl text-foreground">
          <ListChecks className="w-6 h-6 text-primary" />
          {t.dailyTasks}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-6 overflow-hidden">
        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <Input 
            placeholder={t.addTask}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 rounded-xl bg-background border-2 focus-visible:ring-primary h-11"
          />
          <Button type="submit" size="icon" className="rounded-xl h-11 w-11 shadow-md">
            <Plus className="w-5 h-5" />
          </Button>
        </form>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-primary/20">
          {tasks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-60 text-center py-12">
              <span className="text-5xl mb-4">🏠</span>
              <p className="font-body italic">{t.noTasks}</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div 
                key={task.id} 
                className={cn(
                  "group flex items-center justify-between p-3 rounded-xl transition-all duration-300",
                  task.completed ? "bg-muted/30" : "bg-background shadow-sm hover:shadow-md border-border/50 border"
                )}
              >
                <div className="flex items-center gap-3">
                  <Checkbox 
                    checked={task.completed} 
                    onCheckedChange={() => toggleTask(task.id)}
                    className="w-5 h-5 rounded-md data-[state=checked]:bg-primary"
                  />
                  <span className={cn(
                    "font-body text-base transition-all",
                    task.completed ? "line-through text-muted-foreground opacity-70" : "text-foreground"
                  )}>
                    {task.text}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 rounded-full transition-opacity h-8 w-8"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
