import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

export default function CircularDeterminate({id, title, body}) {
  const [progress, setProgress] = React.useState(0);
  const [success, setSuccess] = React.useState(0);
  
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };
  const quest = JSON.parse(title)
  const completeness = parseInt(quest.args[0].score) / parseInt(quest.args[0].target) * 100
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (completeness >= 100) {
        setSuccess(true);
        setProgress(0);
      } else {
        setProgress(completeness);
      }
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Fab
          aria-label="save"
          color="primary"
          sx={buttonSx}
        >
          {success ? <CheckIcon /> : <CatchingPokemonIcon />}
        </Fab>
        
          <CircularProgress
            size={68}
            variant="determinate"
            value={progress}
            sx={{
              color: green[500],
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        
      </Box>
      
    </Box>
  );
}