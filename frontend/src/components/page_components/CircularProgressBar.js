import React from 'react';
import { CircularProgressbarWithChildren,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgressBar = ({ percentage = 65, divStyles=" h-32 w-32 " }) => {

  return (
    <div className={divStyles}>
        <CircularProgressbarWithChildren 
            value={percentage} 
            styles={buildStyles({
                pathTransitionDuration: 1.5,
                pathColor: `#FF004D`,
                trailColor: '#000',
                backgroundColor: '#3e98c7',
            })}
        >
            <h1 className=' text-pink-600 text-2xl font-bold'>{`${percentage}%`}</h1>
        </CircularProgressbarWithChildren>
    </div>
  );
};

export default CircularProgressBar;
