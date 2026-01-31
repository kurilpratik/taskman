'use client';

import React, { useState } from 'react';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Edit, Edit2, Edit2Icon, Edit3 } from 'lucide-react';
import { Confetti, ConfettiButton } from './ui/confetti';

const Task = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="mx-auto w-xl">
      <Card className="my-4 flex-row items-center justify-between gap-0 p-2 shadow-[0_8px_24px_rgba(149,157,165,0.2)]">
        <div className="flex-1">
          <h2
            className={`block font-semibold ${checked ? 'text-neutral-400 line-through' : ''}`}
          >
            Task Title
          </h2>
          <p
            className={`block text-xs ${checked ? 'text-neutral-300' : 'text-neutral-600'}`}
          >
            Created At: 2023-03-15
          </p>
        </div>
        <div className="flex items-center">
          <ConfettiButton className="m-0 h-6 w-5 bg-white p-0 hover:bg-white">
            <Checkbox
              checked={checked}
              onCheckedChange={(checked) => setChecked(checked === true)}
              className="h-6 w-6"
            />
          </ConfettiButton>
          <Button variant={'secondary'} size={'icon-xs'} className="ml-2">
            <Edit2Icon className="text-neutral-400" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Task;
