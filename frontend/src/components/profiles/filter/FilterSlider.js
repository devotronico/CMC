import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  title: {
    color: '#546e7a',
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: 0.33
  },
  sliderBox: {
    display: 'flex',
    '& > p': {
      marginTop: 2
    }
  },
  slider: {
    marginLeft: 20,
    marginRight: 20
  }
}));

const defaultValue = [1, 99];
export default function FilterSlider({ filters, setFilters }) {
  const classes = useStyles();
  const [values, setValues] = useState([1, 99]);

  const handleChange = (event, newValue) => {
    setValues(newValue);
    setFilters({ ...filters, ages: newValue });
  };

  useEffect(() => {
    if (Object.keys(filters).length === 0) {
      setValues(defaultValue);
    }
  }, [filters]);

  return (
    <div>
      <Typography
        variant="overline"
        display="block"
        gutterBottom
        className={classes.title}
      >
        Range del prezzo
      </Typography>
      <div className={classes.sliderBox}>
        <Typography variant="body1" gutterBottom>
          {`${values[0]}€`}
        </Typography>
        <Slider
          className={classes.slider}
          value={values}
          onChange={handleChange}
          aria-labelledby="range-slider"
          step={1}
          valueLabelDisplay="auto"
          min={defaultValue[0]}
          max={defaultValue[1]}
        />
        <Typography variant="body1" gutterBottom>
          {`${values[1]}€`}
        </Typography>
      </div>
    </div>
  );
}
