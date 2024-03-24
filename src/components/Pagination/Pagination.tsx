import React from "react";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
}) => {
  const handlePreviousClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div>
      <IconButton disabled={currentPage === 1} onClick={handlePreviousClick}>
        <NavigateBeforeIcon />
      </IconButton>
      <span>Page {currentPage}</span>
      <IconButton onClick={handleNextClick}>
        <NavigateNextIcon />
      </IconButton>
    </div>
  );
};

export default Pagination;
