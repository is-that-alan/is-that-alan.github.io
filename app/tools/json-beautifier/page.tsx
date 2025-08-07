"use client";

import { useState, useEffect, useRef } from 'react';
import type { editor } from 'monaco-editor';
import Header from '@/components/header';
import Editor from '@monaco-editor/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { format, applyEdits, parse, parseTree, findNodeAtOffset, getNodePath } from 'jsonc-parser';

export default function JsonBeautifierPage() {
  const [rawJson, setRawJson] = useState('{\n  "hello": "world"\n}');
  const [outputJson, setOutputJson] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [jsonPath, setJsonPath] = useState('$');
  const [foldLevel, setFoldLevel] = useState(2);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    handleBeautify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    setRawJson(value || '');
  };

  useEffect(() => {
    handleCursorChange();
    handleBeautify();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawJson]);

  const handleBeautify = () => {
    try {
      const errors: any[] = [];
      parse(rawJson, errors);
      if (errors.length > 0) {
        const firstError = errors[0];
        setOutputJson(`Invalid JSON: ${firstError.error} at offset ${firstError.offset}`);
        return;
      }

      const edits = format(rawJson, undefined, {
        tabSize: 2,
        insertSpaces: true,
        keepLines: false,
        eol: '\n'
      });
      const beautified = applyEdits(rawJson, edits);
      setOutputJson(beautified);
    } catch (e) {
      // Ignore errors while typing
    }
  };

  const handleCompact = () => {
    try {
      const errors: any[] = [];
      const parsed = parse(rawJson, errors);
      if (errors.length > 0) {
        const firstError = errors[0];
        throw new Error(`Invalid JSON at offset ${firstError.offset}, length ${firstError.length}: ${firstError.error}`);
      }
      const compacted = JSON.stringify(parsed);
      setOutputJson(compacted);
    } catch (e) {
      if (e instanceof Error) {
        setOutputJson(e.message);
      }
    }
  };

  const handleCopy = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(outputJson).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  const handleUseAsInput = () => {
    setRawJson(outputJson);
  };

  const handleFoldAll = () => {
    editorRef.current?.getAction('editor.foldAll')?.run();
  };

  const handleUnfoldAll = () => {
    editorRef.current?.getAction('editor.unfoldAll')?.run();
  };

  const handleCursorChange = () => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    const text = editor.getValue();
    const position = editor.getPosition();
    if (!position) return;
    const offset = editor.getModel()?.getOffsetAt(position) || 0;

    try {
      const root = parseTree(text);
      if (!root) {
        setJsonPath('Invalid JSON');
        return;
      }
      const node = findNodeAtOffset(root, offset);
      if (node) {
        const path = getNodePath(node);
        setJsonPath('$' + path.map(p => typeof p === 'string' ? `.${p}` : `[${p}]`).join(''));
      } else {
        setJsonPath('$');
      }
    } catch (e) {
      // Ignore parsing errors while typing
    }
  };

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
    editor.onDidChangeCursorPosition(handleCursorChange);
    handleCursorChange(); // Initial path check
  }

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
        <div className="flex justify-center space-x-2 mb-2">
          <button onClick={handleFoldAll} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-xs hover:bg-gray-300 transition-colors">Collapse All</button>
          <button onClick={handleUnfoldAll} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-xs hover:bg-gray-300 transition-colors">Expand All</button>
        </div>
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg overflow-hidden flex flex-col">
            <div className="p-2 bg-gray-100 text-sm text-gray-600 font-mono">
              JSON Path: {jsonPath}
            </div>
            <div className="flex-grow">
              <Editor
                height="100%"
                language="json"
                value={rawJson}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                theme="vs-light"
                options={{ minimap: { enabled: false }, automaticLayout: true }}
              />
            </div>
          </div>

          <div className="relative bg-gray-50 border rounded-lg overflow-auto">
            <div className="absolute top-2 right-2 z-10 flex space-x-2">
              <button
                onClick={handleUseAsInput}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-xs hover:bg-gray-300 transition-colors disabled:bg-gray-400"
                disabled={!outputJson}
              >
                Use as Input
              </button>
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-xs hover:bg-gray-300 transition-colors disabled:bg-gray-400"
                disabled={!outputJson}
              >
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <SyntaxHighlighter
              language="json"
              style={materialLight}
              customStyle={{ margin: 0, height: '100%', width: '100%', background: 'transparent' }}
              showLineNumbers={true}
            >
              {outputJson}
            </SyntaxHighlighter>
          </div>
        </div>
      </main>
    </div>
  );
}
