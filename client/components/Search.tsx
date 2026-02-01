import React from 'react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <div className="flex-1">
      <Field>
        {/* <FieldLabel htmlFor="input-button-group">Search</FieldLabel> */}
        <ButtonGroup>
          <Input
            id="input-button-group"
            placeholder="Type to search..."
            className="rounded-full bg-white/50"
          />
          <Button variant="outline" className="bg-accent rounded-full">
            <SearchIcon />
          </Button>
        </ButtonGroup>
      </Field>
    </div>
  );
};

export default Search;
