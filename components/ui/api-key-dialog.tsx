"use client";

import { useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./dialog";

interface ApiKeyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

export function ApiKeyDialog({ isOpen, onClose, onSave }: ApiKeyDialogProps) {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setApiKey(""); // Clear input when dialog closes
    }
  }, [isOpen]);

  const handleSave = () => {
    if (apiKey.trim()) {
      onSave(apiKey.trim());
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Your Gemini API Key</DialogTitle>
          <DialogDescription>
            <span className="font-semibold text-orange-500">Warning:</span> Your API key will be sent directly to Google's servers from your browser.
            This is for demonstration purposes only. Do not use a key associated with a production environment.
            The key is stored only for this session.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="api-key"
            type="password"
            placeholder="YOUR_GEMINI_API_KEY"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
