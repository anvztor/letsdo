import { CssBaseline, Fab, IconButton, Snackbar, DialogTitle, Grid, Tabs, Tab, ListSubheader } from '@mui/material'
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

export default function Square() {

  const categories = [
    "sport",
    "cook",
    "study",
    "DIYs",
    "wood",
    "go out",
    "game",
    "favour"
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
            <Tab label="sport" />
            <Tab label="cook" />
            <Tab label="study" />
            <Tab label="DIYs" />
            <Tab label="wood" />
            <Tab label="go out" />
            <Tab label="game" />
            <Tab label="favour" />
          </Tabs>
        </Box>
      </Grid>
      <Box style={{ cursor: 'move', display:'flex' }}>
        <ListSubheader sx={{ bgcolor: 'background.paper' }}>
          Tasks to Be Done
        </ListSubheader>
      </Box>
      <Box style={{ cursor: 'move', display:'flex' }}>
        <ListSubheader sx={{ bgcolor: 'background.paper' }}>
          Chips to Be Choosen
        </ListSubheader>
      </Box>
      <Box style={{ cursor: 'move', display:'flex' }}>
        <ListSubheader sx={{ bgcolor: 'background.paper' }}>
          People to Be Followed
        </ListSubheader>
      </Box>
    </Container>
  )
}

