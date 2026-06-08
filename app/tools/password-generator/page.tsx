"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [memorablePhrase, setMemorablePhrase] = useState('');
  const [separator, setSeparator] = useState('-');
  const [appendRandom, setAppendRandom] = useState(4); // Number of random chars to append

  const classicSongs = [
    { title: "Bohemian Rhapsody", artist: "Queen", lyric: "Is this the real life is this just fantasy" },
    { title: "Hotel California", artist: "Eagles", lyric: "Welcome to the Hotel California Such a lovely place" },
    { title: "Sweet Child o' Mine", artist: "Guns N' Roses", lyric: "She's got a smile that it seems to me" },
    { title: "Smells Like Teen Spirit", artist: "Nirvana", lyric: "Load up on guns bring your friends It's fun to lose and to pretend" },
    { title: "Billie Jean", artist: "Michael Jackson", lyric: "She was more like a beauty queen from a movie scene" },
    { title: "Like a Rolling Stone", artist: "Bob Dylan", lyric: "How does it feel to be on your own" },
    { title: "Imagine", artist: "John Lennon", lyric: "Imagine there's no heaven It's easy if you try" },
    { title: "One", artist: "U2", lyric: "One love one life one dream It's one soul one fire one cry" },
    { title: "Hallelujah", artist: "Leonard Cohen", lyric: "I've heard there was a secret chord That David played and it pleased the Lord" },
    { title: "Stairway to Heaven", artist: "Led Zeppelin", lyric: "There's a lady who's sure all that glitters is gold" },
  ];

  const [selectedSongLyric, setSelectedSongLyric] = useState('');

  const generatePassword = () => {
    let charset = '';
    let newPassword = '';

    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{};:,.<>/?';

    if (charset === '') {
      setPassword('Please select at least one character type.');
      return;
    }

    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const handleCopy = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(password).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  const transformMemorablePhrase = () => {
    let transformed = memorablePhrase.toLowerCase();

    // Simplified Leet speak substitutions
    const leetMap: { [key: string]: string } = {
      'a': '@', 's': '$', 'i': '1', 'o': '0', 'e': '3'
    };

    for (const char in leetMap) {
      transformed = transformed.replace(new RegExp(char, 'g'), leetMap[char]);
    }

    // Word-based capitalization (first letter of each word)
    transformed = transformed.split(' ').map(word => {
      if (word.length === 0) return '';
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(separator);

    // Append random characters/numbers/symbols
    let randomChars = '';
    const allChars = '0123456789!@#$%^&*()_+-=[]{};:,.<>/?'; // Only numbers and symbols for appended randomness
    for (let i = 0; i < appendRandom; i++) {
      randomChars += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    let finalPassword = transformed + randomChars;

    // Ensure minimum length and truncate if necessary
    if (finalPassword.length < length) {
      while (finalPassword.length < length) {
        finalPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
      }
    } else if (finalPassword.length > length) {
      finalPassword = finalPassword.substring(0, length);
    }

    setPassword(finalPassword);
  };

  const generateFromSong = () => {
    if (!selectedSongLyric) {
      setPassword('Please select a song first.');
      return;
    }

    let transformed = selectedSongLyric.toLowerCase();

    // Simplified Leet speak substitutions
    const leetMap: { [key: string]: string } = {
      'a': '@', 's': '$', 'i': '1', 'o': '0', 'e': '3'
    };

    for (const char in leetMap) {
      transformed = transformed.replace(new RegExp(char, 'g'), leetMap[char]);
    }

    // Word-based capitalization (first letter of each word)
    transformed = transformed.split(' ').map(word => {
      if (word.length === 0) return '';
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('_'); // Use underscore as default separator for song lyrics

    // Append random digits
    let randomDigits = '';
    const digits = '0123456789';
    for (let i = 0; i < 2; i++) { // Append 2 random digits
      randomDigits += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    let finalPassword = transformed + randomDigits;

    // Ensure minimum length and truncate if necessary
    if (finalPassword.length < length) {
      while (finalPassword.length < length) {
        finalPassword += digits.charAt(Math.floor(Math.random() * digits.length));
      }
    } else if (finalPassword.length > length) {
      finalPassword = finalPassword.substring(0, length);
    }

    setPassword(finalPassword);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header showLogo={false} />
      <main className="flex-grow flex flex-col items-center justify-center p-4 space-y-8">
        <h1 className="text-3xl font-bold text-center">Password Generator</h1>

        <div className="w-full max-w-md p-6 bg-gray-50 rounded-lg border space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              readOnly
              value={password}
              className="flex-grow font-mono text-lg"
            />
            <Button onClick={handleCopy} className="shrink-0">
              {isCopied ? 'Copied!' : 'Copy'}
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="length">Password Length: {length}</Label>
            <Input
              id="length"
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={(checked: boolean) => setIncludeUppercase(checked)}
              />
              <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={(checked: boolean) => setIncludeLowercase(checked)}
              />
              <Label htmlFor="lowercase">Lowercase (a-z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={(checked: boolean) => setIncludeNumbers(checked)}
              />
              <Label htmlFor="numbers">Numbers (0-9)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={(checked: boolean) => setIncludeSymbols(checked)}
              />
              <Label htmlFor="symbols">Symbols (!@#$)</Label>
            </div>
          </div>

          <Button onClick={generatePassword} className="w-full">
            Generate New Password
          </Button>

          <div className="space-y-2">
            <Label htmlFor="memorablePhrase">Memorable Phrase (e.g., "My dog's name is Buddy")</Label>
            <Input
              id="memorablePhrase"
              type="text"
              value={memorablePhrase}
              onChange={(e) => setMemorablePhrase(e.target.value)}
              placeholder="Enter a memorable phrase"
            />
            <div className="flex items-center space-x-2">
              <Label htmlFor="separator">Separator:</Label>
              <Input
                id="separator"
                type="text"
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="w-16"
                maxLength={1}
              />
              <Label htmlFor="appendRandom">Append Random Chars:</Label>
              <Input
                id="appendRandom"
                type="number"
                value={appendRandom}
                onChange={(e) => setAppendRandom(parseInt(e.target.value) || 0)}
                className="w-16"
                min={0}
                max={10}
              />
            </div>
            <Button onClick={transformMemorablePhrase} className="w-full" disabled={!memorablePhrase.trim()}>
              Transform to Secure Password
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="songSelect">Generate from Classic Song:</Label>
            <Select onValueChange={setSelectedSongLyric}>
              <SelectTrigger className="w-full" id="songSelect">
                <SelectValue placeholder="Select a song" />
              </SelectTrigger>
              <SelectContent>
                {classicSongs.map((song, index) => (
                  <SelectItem key={index} value={song.lyric}>
                    {song.title} - {song.artist}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={generateFromSong} className="w-full" disabled={!selectedSongLyric}>
              Generate from Song
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}