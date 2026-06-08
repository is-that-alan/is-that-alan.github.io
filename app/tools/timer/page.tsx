"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Helper function to format time
const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const OFF_TOPIC_POOL = 5 * 60; // total allowed per pomodoro
const OFF_TOPIC_SESSION = 5 * 60; // max per tap (cap)

const TimerPage = () => {
  const [time, setTime] = useState(25 * 60); // Default to 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [laps, setLaps] = useState<number[]>([]);
  const [agendaItems, setAgendaItems] = useState<{ description: string; duration: number }[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [originalAgendaItem, setOriginalAgendaItem] = useState<{ description: string; duration: number } | null>(null);
  const [newAgendaItem, setNewAgendaItem] = useState({ description: '', duration: 5 });
  const [offTopicTimeUsed, setOffTopicTimeUsed] = useState(0); // Track total off-topic time used in seconds
  const [offTopicAllocated, setOffTopicAllocated] = useState(0); // seconds allocated to current OT session
  const [wasActiveBeforeOffTopic, setWasActiveBeforeOffTopic] = useState(false);
  const [previousMainTime, setPreviousMainTime] = useState(0);
  const [previousMode, setPreviousMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [previousAgendaIndex, setPreviousAgendaIndex] = useState<number | null>(null);
  const [isOffTopicActive, setIsOffTopicActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/sounds/notification.mp3'); // Add a notification sound

      // Load agenda items from local storage on mount
      try {
        const storedAgenda = localStorage.getItem('meetingAgenda');
        if (storedAgenda) {
          setAgendaItems(JSON.parse(storedAgenda));
        }
      } catch (error) {
        console.error("Failed to load agenda from local storage:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Save agenda items to local storage whenever they change
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('meetingAgenda', JSON.stringify(agendaItems));
      } catch (error) {
        console.error("Failed to save agenda to local storage:", error);
      }
    }
  }, [agendaItems]);

  useEffect(() => {
    if (isActive && time > 0) {
      timerRef.current = setTimeout(() => {
        setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (time === 0) {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      if (isOffTopicActive) {
        // commit full allocation
        setOffTopicTimeUsed(prev => Math.min(OFF_TOPIC_POOL, prev + offTopicAllocated));
        setIsOffTopicActive(false);
        setOffTopicAllocated(0);

        // restore main timer
        if (previousAgendaIndex !== null) {
          setCurrentItemIndex(previousAgendaIndex);
          setTime(previousMainTime);
          setPreviousAgendaIndex(null);
        } else {
          setMode(previousMode);
          setTime(previousMainTime);
        }
        setIsActive(true); // it was running when it ran down
      } else {
        // Pomodoro timer finished
        if (mode === 'work') {
          handleModeChange('shortBreak');
        } else {
          handleModeChange('work');
        }
      }
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, time, isOffTopicActive, previousMainTime, previousMode, previousAgendaIndex]);

  const toggleTimer = () => {
    if (agendaItems.length > 0 && currentItemIndex === null) {
      // Start agenda from beginning if not already started
      setCurrentItemIndex(0);
      setTime(totalDuration);
      setIsActive(true);
    } else {
      setIsActive(!isActive);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setLaps([]);
    setCurrentItemIndex(null);
    setAgendaItems([]); // Clear agenda when resetting

    setIsOffTopicActive(false);
    setOffTopicAllocated(0);
    setOffTopicTimeUsed(0);

    switch (mode) {
      case 'work':
        setTime(25 * 60);
        break;
      case 'shortBreak':
        setTime(5 * 60);
        break;
      case 'longBreak':
        setTime(15 * 60);
        break;
    }
  };

  const handleModeChange = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsActive(false);
    setLaps([]);
    setCurrentItemIndex(null);
    switch (newMode) {
      case 'work':
        setTime(25 * 60);
        break;
      case 'shortBreak':
        setTime(5 * 60);
        break;
      case 'longBreak':
        setTime(15 * 60);
        break;
    }
  };

  const addLap = () => {
    setLaps(prevLaps => [...prevLaps, time]);
  };

  const handleAddAgendaItem = () => {
    if (newAgendaItem.description.trim() && newAgendaItem.duration > 0) {
      setAgendaItems(prevItems => [...prevItems, { ...newAgendaItem, duration: newAgendaItem.duration * 60 }]);
      setNewAgendaItem({ description: '', duration: 5 }); // Reset form
    }
  };

  const handleClearAgenda = () => {
    setAgendaItems([]);
    setCurrentItemIndex(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('meetingAgenda');
    }
  };

  const handleOffTopicClick = () => {
    const remainingBudget = OFF_TOPIC_POOL - offTopicTimeUsed;
    if (remainingBudget <= 0) {
      alert(`You only have ${formatTime(0)} of off-topic time left.`);
      return;
    }
    const alloc = Math.min(OFF_TOPIC_SESSION, remainingBudget);

    // snapshot current main timer state
    setPreviousMainTime(time);
    setPreviousMode(mode);
    setPreviousAgendaIndex(currentItemIndex);
    setWasActiveBeforeOffTopic(isActive);

    // enter off-topic
    setIsOffTopicActive(true);
    setOffTopicAllocated(alloc);
    setTime(alloc);
    setIsActive(true);
  };

  const handleStopOffTopic = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    // commit only the elapsed portion
    setOffTopicTimeUsed(prev => Math.min(OFF_TOPIC_POOL, prev + (offTopicAllocated - time)));

    setIsOffTopicActive(false);
    setOffTopicAllocated(0);

    // restore main timer context
    if (previousAgendaIndex !== null) setCurrentItemIndex(previousAgendaIndex);
    setMode(previousMode);
    setTime(previousMainTime);
    setPreviousAgendaIndex(null);

    setIsActive(wasActiveBeforeOffTopic);
  };

  const totalDuration = useMemo(() => {
    return mode === 'work' && agendaItems.length > 0
      ? agendaItems.reduce((acc, item) => acc + item.duration, 0)
      : (mode === 'work' ? 25 * 60 : mode === 'shortBreak' ? 5 * 60 : 15 * 60);
  }, [mode, agendaItems]);

  const radius = 120;
  const circumference = 2 * Math.PI * radius;

  const progress = useMemo(() => {
    return ((totalDuration - time) / totalDuration) * circumference;
  }, [time, totalDuration, circumference]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header showLogo={false} />
      <main className="flex-grow flex flex-col items-center justify-center p-4 space-y-8">
        <div className="flex space-x-4">
          <Button onClick={() => handleModeChange('work')} variant={mode === 'work' ? 'default' : 'outline'}>Pomodoro</Button>
          <Button onClick={() => handleModeChange('shortBreak')} variant={mode === 'shortBreak' ? 'default' : 'outline'}>Short Break</Button>
          <Button onClick={() => handleModeChange('longBreak')} variant={mode === 'longBreak' ? 'default' : 'outline'}>Long Break</Button>
        </div>

        <div className="relative w-72 h-72 flex items-center justify-center">
          <svg className="absolute w-full h-full" viewBox="0 0 288 288">
            <circle
              className="text-gray-200"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              r={radius}
              cx="144"
              cy="144"
            />
            <circle
              className={`transition-all duration-1000 ease-linear ${isOffTopicActive ? 'text-red-600' : 'text-blue-600'}`}
              stroke="currentColor"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              fill="transparent"
              r={radius}
              cx="144"
              cy="144"
              transform="rotate(-90 144 144)"
            />
          </svg>
          <div className="text-6xl font-mono font-bold z-10">
            {formatTime(time)}
          </div>
        </div>

        <div className="flex space-x-4">
          <Button onClick={toggleTimer} className="w-24">{isActive ? 'Pause' : 'Start'}</Button>
          <Button onClick={resetTimer} variant="secondary">Reset</Button>
          <Button onClick={addLap} variant="secondary" disabled={!isActive || isOffTopicActive}>Lap</Button>
          {isOffTopicActive ? (
            <Button onClick={handleStopOffTopic} variant="outline">
              Stop Off-Topic
            </Button>
          ) : (
            <Button 
              onClick={handleOffTopicClick} 
              variant="destructive" 
              disabled={offTopicTimeUsed >= 5 * 60 || isOffTopicActive}
            >
              Off-Topic ({formatTime(5 * 60 - offTopicTimeUsed)} left)
            </Button>
          )}
        </div>

        {laps.length > 0 && (
          <div className="w-full max-w-md p-4 bg-gray-50 rounded-lg border">
            <h3 className="font-semibold mb-2">Laps:</h3>
            <ul className="space-y-1 text-sm font-mono">
              {laps.map((lap, index) => (
                <li key={index} className="flex justify-between">
                  <span>Lap {index + 1}</span>
                  <span>{formatTime(totalDuration - lap)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="w-full max-w-md p-4 bg-gray-50 rounded-lg border">
          <h3 className="font-semibold mb-2">Add Agenda Item</h3>
          <div className="flex space-x-2 mb-2">
            <Input
              type="text"
              placeholder="Item description"
              value={newAgendaItem.description}
              onChange={(e) => setNewAgendaItem({ ...newAgendaItem, description: e.target.value })}
              className="flex-grow"
            />
            <Input
              type="number"
              placeholder="Min"
              value={newAgendaItem.duration}
              step={5}
              onChange={(e) => setNewAgendaItem({ ...newAgendaItem, duration: parseInt(e.target.value) || 0 })}
              className="w-20"
            />
            <Button onClick={handleAddAgendaItem}>Add</Button>
            <Button onClick={handleClearAgenda} variant="destructive">Clear Agenda</Button>
          </div>

          {agendaItems.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Current Agenda (Total: {formatTime(agendaItems.reduce((acc, item) => acc + item.duration, 0))})</h3>
              <ul className="space-y-2">
                {agendaItems.map((item, index) => (
                  <li key={index} className={`p-2 rounded-md ${index === currentItemIndex ? 'bg-blue-100' : ''}`}>
                    {editingIndex === index ? (
                      <div className="space-y-2">
                        <Input
                          type="text"
                          value={item.description}
                          onChange={(e) => {
                            const newAgendaItems = [...agendaItems];
                            newAgendaItems[index].description = e.target.value;
                            setAgendaItems(newAgendaItems);
                          }}
                        />
                        <Input
                          type="number"
                          value={item.duration / 60}
                          onChange={(e) => {
                            const newAgendaItems = [...agendaItems];
                            newAgendaItems[index].duration = parseInt(e.target.value) * 60;
                            setAgendaItems(newAgendaItems);
                          }}
                        />
                        <div className="flex space-x-2 mt-2">
                          <Button onClick={() => {
                            if (originalAgendaItem) {
                              const newAgendaItems = [...agendaItems];
                              newAgendaItems[editingIndex!] = originalAgendaItem;
                              setAgendaItems(newAgendaItems);
                            }
                            setEditingIndex(null);
                            setOriginalAgendaItem(null);
                          }} size="sm" variant="secondary">Cancel</Button>
                          <Button onClick={() => setEditingIndex(null)} size="sm">Save</Button>
                        </div>
                      </div>
                    ) : (
                      <div onClick={() => {
                        setEditingIndex(index);
                        setOriginalAgendaItem(item);
                      }}>
                        <div className="font-medium">{item.description}</div>
                        <div className="text-sm text-gray-500">{item.duration / 60} minutes</div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TimerPage;