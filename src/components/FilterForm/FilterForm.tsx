import React, { useState, ChangeEvent, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import TextField from "@mui/material/TextField";

interface FilterFormProps {
  onFilter: (id: number | undefined) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onFilter }) => {
  const [inputValue, setInputValue] = useState("");

  const debouncedValue = useDebounce<string>(inputValue, 500);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "");
    setInputValue(value);
  };

  useEffect(() => {
    const id = debouncedValue ? parseInt(debouncedValue, 10) : undefined;
    onFilter(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div>
      <TextField
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        label="Filter by ID"
        variant="outlined"
        fullWidth
      />
    </div>
  );
};

export default FilterForm;
