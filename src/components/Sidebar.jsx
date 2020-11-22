import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";

export const ALL_TAGS = "all";
export const TAG_TYPE = "tag";
export const SEARCH_TYPE = "search";

export const Sidebar = ({ data, setSelectedFilter }) => {
  const [selectedOption, setSelectedOption] = useState(ALL_TAGS);
  const [search, setSearch] = useState("");

  const uniqueTags = useMemo(() => {
    // SET could be used also
    const tagsObject = {};
    data?.forEach((entity) => {
      entity.tags &&
        entity.tags.forEach((tag) => {
          if (!tagsObject[tag]) {
            tagsObject[tag] = 1;
          }
        });
    });
    const tags = Object.keys(tagsObject);
    tags.sort();
    tags.unshift(ALL_TAGS);
    return tags;
  }, [data]);

  useEffect(() => {
    let value;
    if (selectedOption === SEARCH_TYPE) {
      value = {
        type: SEARCH_TYPE,
        value: search,
      };
    } else {
      value = {
        type: TAG_TYPE,
        value: selectedOption,
      };
    }

    setSelectedFilter(value);
  }, [selectedOption, search, setSelectedFilter]);

  const handleInput = (event) => {
    setSearch(event.target.value.toLocaleLowerCase());
    setSelectedOption(SEARCH_TYPE);
  };

  return (
    <RadioGroup
      aria-label="filters"
      name="SDK filters"
      value={selectedOption}
      onChange={(event) => setSelectedOption(event.target.value)}
    >
      <FormControlLabel
        value={SEARCH_TYPE}
        control={<Radio />}
        label={
          <TextField
            value={search}
            onChange={handleInput}
            placeholder="Search"
          />
        }
      />
      {uniqueTags?.map((tag) => (
        <FormControlLabel
          key={tag}
          style={{ textTransform: "capitalize" }}
          value={tag}
          control={<Radio />}
          label={tag}
        />
      ))}
    </RadioGroup>
  );
};
