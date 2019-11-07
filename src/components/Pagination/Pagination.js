import React, { useState } from "react";
import MatchReducer from "../../Reducers/MatchReducer";
import { Pagination as PaginationBootStrap } from "react-bootstrap";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import "./Pagination.scss";

function Pagination({
  totalMatches,
  matchesPerPage,
  navigateToClickedPage,
  recordsPerPage,
  currentPage
}) {
  const PaginationNumbers = [];
  const [selectValue, setSelectValue] = useState(5);
  console.log(selectValue, "SELECT");
  for (var i = 1; i <= Math.ceil(totalMatches / matchesPerPage); i++) {
    PaginationNumbers.push(i);
  }
  const handleSelectChange = event => {
    setSelectValue(event.target.value);
    recordsPerPage(event.target.value);
  };
  return (
    <div className="pagination-grid">
      <PaginationBootStrap>
        {PaginationNumbers.map(PageNumber => (
          <PaginationBootStrap.Item
            onClick={() => navigateToClickedPage(PageNumber)}
            key={PageNumber}
            className={`${
              currentPage === PageNumber ? "active page-item" : "page-item"
            }`}
          >
            {PageNumber}
          </PaginationBootStrap.Item>
        ))}
      </PaginationBootStrap>
      <FormControl>
        <InputLabel id="demo-customized-select-label">
          Records Per Page
        </InputLabel>
        <Select
          onChange={handleSelectChange}
          id="records-per-page"
          value={selectValue}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={25}>25</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Pagination;
