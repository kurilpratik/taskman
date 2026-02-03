'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Edit2Icon, Trash2 } from 'lucide-react';
import { ConfettiButton } from './ui/confetti';
import { toast } from 'sonner';
import { formatDate } from '@/lib/helper';
import { updateTask } from '@/lib/tasks';


type TaskProps = {
  id: string | number;
  title: string;
  completed: boolean;
  createdAt: string;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate?: () => void;
};

const Task: React.FC<TaskProps> = ({
  id,
  title: initialTitle,
  completed,
  createdAt,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const [title, setTitle] = useState<string>(initialTitle ?? 'Task Title');
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [isUpdating, setIsUpdating] = useState(false);
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

  // Update local title when prop changes
  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => {
    setIsEditing(false);
    setDraftTitle(title);
  };
  
  const saveTitle = async () => {
    const trimmed = draftTitle.trim();
    if (trimmed.length === 0) {
      toast.error('Task title cannot be empty');
      return;
    }
    
    if (trimmed === title) {
      // No changes, just exit edit mode
      setIsEditing(false);
      return;
    }

    try {
      setIsUpdating(true);
      const updatedTask = await updateTask(id.toString(), { title: trimmed });
      setTitle(trimmed);
      setIsEditing(false);
      toast.success('Task updated successfully!');
      
      // Trigger refresh if callback provided
      // if (onUpdate) {
      //   onUpdate();
      // }
      // No need to trigger refresh as the updates task is visible right then and there
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task. Please try again.');
      setDraftTitle(title); // Revert draft on error
    } finally {
      setIsUpdating(false);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      saveTitle();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl px-1 sm:px-6 lg:px-0" key={id}>
      <Card className="my-3 flex flex-row items-start justify-between gap-3 border-0 p-4 shadow-[0_8px_24px_rgba(149,157,165,0.2)] sm:my-4 sm:flex-row sm:items-center sm:gap-0">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              ref={inputRef}
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={isUpdating}
              className="w-full max-w-full"
            />
          ) : (
            <h2
              className={`block wrap-break-word-words text-base font-semibold sm:text-lg ${completed ? 'text-neutral-400 line-through' : ''}`}
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
        <div className="flex items-center gap-0 self-stretch justify-between sm:self-auto sm:justify-end">
          <ConfettiButton className="m-0 h-6 w-5 bg-white p-0 hover:bg-white">
            <Checkbox
              checked={completed}
              onCheckedChange={() => onToggle()}
              className="h-6 w-6 border-blue-200"
            />
          </ConfettiButton>
          {isEditing ? (
            <div className="ml-2 flex items-center gap-1 sm:gap-2">
              <Button 
                size={'xs'} 
                onClick={saveTitle} 
                className="px-3"
                disabled={isUpdating}
              >
                {isUpdating ? 'Saving...' : 'Save'}
              </Button>
              <Button
                variant={'destructive'}
                size={'xs'}
                onClick={cancelEditing}
                className="px-2"
                disabled={isUpdating}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant={'secondary'}
                size={'icon-xs'}
                className="ml-1.5 sm:ml-2"
                onClick={startEditing}
              >
                <Edit2Icon className="text-blue-800" />
              </Button>
              <Button
                variant={'secondary'}
                size={'icon-xs'}
                className="ml-1.5 sm:ml-2"
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