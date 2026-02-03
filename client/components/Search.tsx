import React from 'react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};


const Search: React.FC<SearchProps> = ({ value, onChange, onSearch }) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="mt-2 w-full flex-1 sm:mt-0 sm:w-auto">
      <Field>
        <ButtonGroup className="w-full sm:w-auto">
          <Input
            id="input-button-group"
            placeholder="Type to search..."
            className="w-full rounded-full bg-white/50"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="outline"
            className="bg-accent rounded-full"
            onClick={onSearch}
          >
            <SearchIcon />
          </Button>
        </ButtonGroup>
      </Field>
    </div>
  );
};


export default Search;
