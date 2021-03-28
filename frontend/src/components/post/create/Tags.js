import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  inputTagsWrapper: {
    display: 'flex',
  },
  inputTags: {
    width: '100%',
    '& input + fieldset': {
      borderRadius: 0,
    },
  },
  tags: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
  },
}));

export default function Tags({ tags, setTags }) {
  const classes = useStyles();
  const [isDisableInput, setIsDisableInput] = useState(false);

  const tagRef = useRef(null);

  const handleOnClickButton = () => {
    if (tagRef.current.value === '') {
      return;
    }
    if (tags.length < 3) {
      const value = tagRef.current.value;
      setTags([...tags, value]);
      tagRef.current.value = '';
    }
    if (tags.length === 2) {
      setIsDisableInput(true);
    }
  };

  const handleOnDeleteTag = (i) => (event) => {
    if (tags.length > 0) {
      setTags([...tags.slice(0, i), ...tags.slice(i + 1)]);
      setIsDisableInput(false);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.inputTagsWrapper}>
        <TextField
          inputRef={tagRef}
          id="tags"
          placeholder="Tags"
          variant="outlined"
          className={classes.inputTags}
          size="small"
          inputProps={{
            minLength: 2,
            maxLength: 10,
            pattern: '[a-zA-Z]+',
            disabled: isDisableInput,
            name: 'tags',
          }}
        />
        <Button startIcon={<AddIcon />} onClick={handleOnClickButton}>
          add
        </Button>
      </div>
      <div className={classes.tags}>
        {tags.map((tag, i) => (
          <Chip label={tag} key={i} onDelete={handleOnDeleteTag(i)} />
        ))}
      </div>
    </div>
  );
}
