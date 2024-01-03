import { CssBaseline, Fab, IconButton, Snackbar, DialogTitle, Stack, Grid, Tabs, Tab, ListSubheader } from '@mui/material'
import { tabsClasses } from '@mui/material/Tabs'
import { Box, Container } from '@mui/system'
import React, { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import DeleteDialog from './DeleteDialog'
import ViewDialog from './ViewDialog'
import TodoCard from './TodoCard'
import { UserContext } from './Home';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import UpdateDialogForm from './UpdateDialogForm';
import AddDialogForm from './AddDialogForm';
import ProfileAvatar from './ProfileAvatar';

export default function Square() {

  const categories = [
    'SPORT',
    'COOK',
    'STUDY',
    'DIYS',
    'WOOD',
    'GOOUT',
    'GAME',
    'FAVOUR'
  ]
  return (
    <Container>
      <CssBaseline/>
      <Grid container spacing={2}>
        <Box 
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
        >
          <img src={require("../resources/letsdoit.png")} alt="text" />
          <Tabs
            orientation="vertical"
            variant="scrollable"
            // value={value}
            // onChange={handleChange}
            scrollButtons
            allowScrollButtonsMobile
            aria-label="Vertical tabs example"
            sx={{ borderLeft: 1, borderColor: 'divider' }}
          >
            {
              categories.map( (cata) => (
                <Tab label={cata} />
              ))
            }
          </Tabs>
        </Box>
      </Grid>
      <Box style={{ cursor: 'move', display:'flex' }}>
        <ListSubheader sx={{ bgcolor: 'background.paper' }}>
          Quests to Be Done
        </ListSubheader>
      </Box>
      <Box style={{ cursor: 'move', display:'flex' }}>
        <ListSubheader sx={{ bgcolor: 'background.paper' }}>
          Chips to Be Choosen
        </ListSubheader>
      </Box>
      <Stack style={{ cursor: 'move', display:'flex' }}>
        <ListSubheader sx={{ bgcolor: 'background.paper' }}>
          People to Be Followed
        </ListSubheader>
        <Box style={{ cursor: 'move', display:'flex' }}>
          <ProfileAvatar name={'justor95'}/>
          <ProfileAvatar name={'tenony'}/>
          <ProfileAvatar name={'jenessa'}/>
        </Box>
      </Stack>
    </Container>
  )
}

