import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Switch, FormControlLabel, ImageListItem, ImageList } from '@mui/material'
import React from 'react'
import PaperComponent from './PaperComponent'
import { red } from '@mui/material/colors'
import { styled } from '@mui/material/styles';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

export default function AddDialog({
    register, 
    formHandleSubmit, 
    errors, 
    open, 
    cancleAdd, 
    submitAdd, 
    user}) {

    const Roles = {
        Executor: 0,
        Supervisor: 1
    }
    const [state, setState] = React.useState({
        user: user,
        title: '',
        body: '',
        role: Roles.Executor,
        roleLable: 'Executor',
        rolePos: 'start'
    })

    const handleTitleChange = (e) => {
        e.preventDefault()
        setState({...state, title: e.target.value})
    }

    const handleBodyChange = (e) => {
        e.preventDefault()
        setState({...state, body:e.target.value})
    }
    const handleRoleChange = (e) => {
        e.preventDefault()
        console.log('role selected', e.target.checked)
        if (e.target.checked) {
            setState({...state, role: Roles.Supervisor , roleLable: 'Supervisor', rolePos: 'end'})

        } else {
            setState({...state, role: Roles.Executor, roleLable: 'Executor', rolePos: 'start'})
        }
    }
    const submitNew = (data) => {
        console.log(data)
        submitAdd(state.title, state.body)
    }

    return (
        <Dialog 
            open={open} 
            onClose={cancleAdd} 
            scroll='paper'
            maxWidth='sm' 
            fullWidth
            PaperComponent={PaperComponent}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
            <DialogTitle style={{ cursor: 'move', display:'flex' }} id="draggable-dialog-title">
              <img src={require("../resources/letsdo.png")} alt="text" />
              <Typography sx={{ml:1, lineHeight:'40px'}}></Typography>
            </DialogTitle>
            <Box component='form' onSubmit={formHandleSubmit(submitNew)} 
                sx={{ '& .MuiTextField-root': {mb:1}}} 
                noValidate autoComplete='off'>
                <DialogContent dividers>
                    <input
                        id='user'
                        label='user' 
                        name='user'
                        aria-label='user' 
                        value={state.user}
                        {...register('user')}
                        type="hidden"
                    />
                    <FormControlLabel
                        value="end"
                        control={<MaterialUISwitch value={state.role} onChange={handleRoleChange}/>}
                        label={state.roleLable}
                        labelPlacement={state.rolePos}
                    />
                    <TextField
                        id='title'
                        label='Quest' 
                        name='title'
                        aria-label='title' 
                        value={state.title}
                        {...register('title')}
                        variant="outlined"
                        color='primary'
                        fullWidth
                        required
                        onChange={handleTitleChange}
                        error={errors.title ? true: false}
                        helperText={errors.title ? errors.title.message : " "}
                    />
                    <TextField
                        id='body'
                        label='Chip' 
                        name='body'
                        aria-label='body' 
                        value={state.body}
                        {...register('body')}
                        variant="outlined"
                        color='primary'
                        multiline
                        fullWidth
                        required
                        onChange={handleBodyChange}
                        error={errors.body ? true: false}
                        helperText={errors.body ? errors.body.message : " "}
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={cancleAdd}>Cancel</Button>
                <Button type="submit">Add</Button>
                </DialogActions>
            </Box>
        </Dialog>
      )
}

