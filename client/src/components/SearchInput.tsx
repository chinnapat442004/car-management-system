import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = 'ค้นหา...',
}: SearchInputProps) {
  return (
    <div className="flex w-full max-w-md items-center gap-2">
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />

      <Button className="bg-blue-400 hover:bg-blue-500" onClick={onSearch}>
        <Search className="h-4 w-4 " />
      </Button>
    </div>
  );
}
