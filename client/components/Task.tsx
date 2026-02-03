'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Edit2Icon, Trash2 } from 'lucide-react';
import { ConfettiButton } from './ui/confetti';
import { toast } from 'sonner';
import { formatDate } from '@/lib/helper';


type TaskProps = {
  id: string | number;
  title: string;
  completed: boolean;
  createdAt: string;
  onToggle: () => void;
  onDelete: () => void;
};

const Task: React.FC<TaskProps> = ({
  id,
  title: initialTitle,
  completed,
  createdAt,
  onToggle,
  onDelete,
}) => {
  const [title, setTitle] = useState<string>(initialTitle ?? 'Task Title');
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement | null>(null);


  useEffect(() => {
    if (isEditing) {
      setDraftTitle(title);
    }
  }, [isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => {
    setIsEditing(false);
    setDraftTitle(title);
  };
  const saveTitle = () => {
    const trimmed = draftTitle.trim();
    if (trimmed.length > 0) setTitle(trimmed);
    toast.success('Task updated successfully!');
    setIsEditing(false);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      saveTitle();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div className="mx-auto w-xl" key={id}>
      <Card className="my-4 flex-row items-center justify-between gap-0 border-0 p-4 shadow-[0_8px_24px_rgba(149,157,165,0.2)]">
        <div className="flex-1">
          {isEditing ? (
            <input
              ref={inputRef}
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onKeyDown={onKeyDown}
              className="w-[95%]"
            />
          ) : (
            <h2
              className={`block font-semibold ${completed ? 'text-neutral-400 line-through' : ''}`}
            >
              {title}
            </h2>
          )}
          <p
            className={`block text-xs ${completed ? 'text-neutral-300' : 'text-neutral-600'}`}
          >
            {formatDate(createdAt)}
          </p>
        </div>
        <div className="flex items-center">
          <ConfettiButton className="m-0 h-6 w-5 bg-white p-0 hover:bg-white">
            <Checkbox
              checked={completed}
              onCheckedChange={() => onToggle()}
              className="h-6 w-6 border-blue-200"
            />
          </ConfettiButton>
          {isEditing ? (
            <div className="ml-2 flex items-center gap-2">
              <Button size={'xs'} onClick={saveTitle} className="px-3">
                Save
              </Button>
              <Button
                variant={'destructive'}
                size={'xs'}
                onClick={cancelEditing}
                className="px-2"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant={'secondary'}
                size={'icon-xs'}
                className="ml-2"
                onClick={startEditing}
              >
                <Edit2Icon className="text-blue-800" />
              </Button>
              <Button
                variant={'secondary'}
                size={'icon-xs'}
                className="ml-2"
                onClick={onDelete}
              >
                <Trash2 className="text-red-800" />
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Task;
