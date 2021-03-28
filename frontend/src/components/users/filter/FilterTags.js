import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  inputTags: {
    display: 'flex'
  }
}));

const defaultValue = [];
export default function FilterPanelTags({ filters, setFilters }) {
  const classes = useStyles();
  const [tags, setTags] = useState(defaultValue);
  const [isDisableInput, setIsDisableInput] = useState(false);

  const tagRef = useRef(null);

  useEffect(() => {
    if (Object.keys(filters).length === 0) {
      setTags(defaultValue);
    }
  }, [filters]);

  const handleOnClickButton = () => {
    if (tagRef.current.value === '') {
      return;
    }
    if (tags.length < 3) {
      const value = tagRef.current.value;
      setTags([...tags, value]);
      setFilters({ ...filters, [tagRef.current.name]: [...tags, value] });
      tagRef.current.value = '';
      // console.log("NAME", tagRef.current.name);
      // console.log("VALUE", tags);
    }
    if (tags.length === 2) {
      setIsDisableInput(true);
    }
  };

  const handleOnDeleteTag = i => event => {
    if (tags.length > 0) {
      setTags([...tags.slice(0, i), ...tags.slice(i + 1)]);
      setFilters({
        ...filters,
        [tagRef.current.name]: [...tags.slice(0, i), ...tags.slice(i + 1)]
      });
      setIsDisableInput(false);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.inputTags}>
        <TextField
          inputRef={tagRef}
          id="tags"
          label="Tags"
          variant="outlined"
          className={classes.input}
          size="small"
          inputProps={{
            minLength: 2,
            maxLength: 10,
            pattern: '[a-zA-Z]+',
            disabled: isDisableInput,
            name: 'tags'
          }}
        />
        <Button startIcon={<AddIcon />} onClick={handleOnClickButton}>
          add
        </Button>
      </div>
      <div className={classes.root}>
        {tags.map((tag, i) => (
          <Chip label={tag} key={i} onDelete={handleOnDeleteTag(i)} />
        ))}
      </div>
    </div>
  );
}
