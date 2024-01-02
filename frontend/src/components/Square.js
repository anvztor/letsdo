import { Fab, IconButton, Snackbar, DialogTitle, Tabs, Tab, ListSubheader } from '@mui/material'
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
    "SPORT",
    "COOKING",
    "STUDYING",
    "OUTSIDE",
    "CIRCUITS",
    "WOODWORK",
    "GAME"
  ]
  return (
    <Container>
      <Box style={{ cursor: 'move', display:'flex' }}>
        <img src={require("../resources/letsdoit.png")} alt="text" />
        <Tabs
          // value={value}
          // onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          orientation="vertical"
        >
          <Tab label="SPORT" />
          <Tab label="COOKING" />
          <Tab label="STUDYING" />
          <Tab label="OUTSIDE" />
          <Tab label="CIRCUITS" />
          <Tab label="WOODWORK" />
          <Tab label="GAME" />
          <Tab label="Favourite" />
        </Tabs>
      </Box>
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

