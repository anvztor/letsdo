import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TodoAvatar(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.id)}`}
        </Typography>
      </Box>
    </Box>
  );
}

TodoAvatar.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel({id, title, body}) {
  const [progress, setProgress] = React.useState(10);
  
  React.useEffect(() => {
    const quest = JSON.parse(title)
    const completeness = parseInt(quest.args[0].score) / parseInt(quest.args[0].target) * 100
    const completerate = (completeness > 100) ? 100 : completeness
    setProgress(completerate);
  }, []);

  return <TodoAvatar id={id} title={title} body={body} value={progress} />;
}