import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { red } from '@mui/material/colors'
import DeleteIcon from '@mui/icons-material/Delete'
import UpdateIcon from '@mui/icons-material/Update';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function QuestCard({id, title, body}) {

    return (
        <Card sx={{width:300, height:300, mb:2, mr:2}} elevation={10}>
          <CardHeader
            avatar={
              <Avatar sx={{bgcolor:red[500]}} aria-label='quest'>{id}</Avatar>
            }
            title={title}
            > 
          </CardHeader>
          <CardContent sx={{height:160, overflow:'hidden'}}>
              <Typography sx={{wordWrap: "break-word"}}>
              {body}
              </Typography>
            </CardContent>
        </Card>
      )
}

