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
import QuestCard from './QuestCard';

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
  const quests = [
    {"id":0,"title":"Shot Ball","type":1,"body":"ipfs://***.wasm","args":[{"score":0,"target":10}]},
    {"id":1,"title":"Make a Pet Feeder","type":1,"body":"ipfs://***","args":[{"score":0,"target":5}]},
    {"id":2,"title":"Make a Electronic Fruit Music","type":1,"body":"ipfs://***.wasm","args":[{"score":0,"target":5}]},
    {"id":3,"title":"Make a Chinese Gongbaojiding","type":1,"body":"ipfs://***.html","args":[{"score":0,"target":5}]},
    {"id":4,"title":"Start a Citywalk around Longxiangqiao","type":1,"body":"ipfs://***","args":[{"score":0,"target":5}]},
    {"id":5,"title":"Time Limit Shot","type":0,"body":"ipfs://***","args":[{"score":0,"target":5}]}
  ]

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  return (
    <Container>
      <CssBaseline/>
      <Grid container spacing={2}>
        <Box 
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
        >
          <img src={require("../resources/letsdoit.png")} alt="letsdoit" />
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            scrollButtons
            allowScrollButtonsMobile
            aria-label="Vertical tabs example"
            sx={{ borderLeft: 1, borderColor: 'divider' }}
          >
            {
              categories.map( (cata) => (
                <Tab key={cata} label={cata} />
              ))
            }
          </Tabs>
        </Box>
      </Grid>
      <Stack style={{ cursor: 'move', display:'flex' }}>
        <ListSubheader sx={{ bgcolor: 'background.paper' }}>
          Quests to Be Done
        </ListSubheader>
        <Box style={{ cursor: 'move', display:'flex' }}>
            {
              quests.map( (quest) => (
                <QuestCard id={quest.id} title={quest.title} body={quest.body} />
              ))
            }
        </Box>
      </Stack>
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

