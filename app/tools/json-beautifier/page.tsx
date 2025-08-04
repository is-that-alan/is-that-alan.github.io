"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import Editor from '@monaco-editor/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function JsonBeautifierPage() {
  const [rawJson, setRawJson] = useState('{\n  "hello": "world"\n}');
  const [outputJson, setOutputJson] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    handleBeautify();
  }, [rawJson]);

  const handleEditorChange = (value: string | undefined) => {
    setRawJson(value || '');
  };

  const handleBeautify = () => {
    try {
      const parsed = JSON.parse(rawJson);
      const beautified = JSON.stringify(parsed, null, 2);
      setOutputJson(beautified);
    } catch (e) {
      // Error is handled by Monaco Editor's validation
      setOutputJson('');
    }
  };

  const handleCompact = () => {
    try {
      const parsed = JSON.parse(rawJson);
      const compacted = JSON.stringify(parsed);
      setOutputJson(compacted);
    } catch (e) {
      // Error is handled by Monaco Editor's validation
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputJson).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header showLogo={false} />
      <main className="flex-grow flex flex-col p-4 space-y-4">
        <h1 className="text-3xl font-bold text-center">Advanced JSON Editor</h1>
        <div className="flex justify-center space-x-4 mb-2">
          <button 
            onClick={handleBeautify}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            disabled={!rawJson}
          >
            Beautify
          </button>
          <button 
            onClick={handleCompact}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400"
            disabled={!rawJson}
          >
            Compact
          </button>
        </div>
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input Panel with Monaco Editor */}
          <div className="border rounded-lg overflow-hidden">
            <Editor
              height="100%"
              language="json"
              value={rawJson}
              onChange={handleEditorChange}
              theme="vs-light"
              options={{ minimap: { enabled: false }, automaticLayout: true }}
            />
          </div>

          {/* Output Panel */}
          <div className="relative bg-gray-50 border rounded-lg overflow-auto">
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-xs hover:bg-gray-300 transition-colors disabled:bg-gray-400"
              disabled={!outputJson}
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
            <SyntaxHighlighter language="json" style={materialLight} customStyle={{ margin: 0, height: '100%', width: '100%', background: 'transparent' }}>
              {outputJson}
            </SyntaxHighlighter>
          </div>
        </div>
      </main>
    </div>
  );
}