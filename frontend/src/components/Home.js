import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useOutlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;
const UserContext = React.createContext({})
export { UserContext }

export default function Home() {
  const outlet = useOutlet()
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user')
  const [user, setUser] = React.useState(userStr ? JSON.parse(userStr) : null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('user')
    navigate('/login')
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box sx={{ m: 1, width: `${drawerWidth}px)` }}>
        <UserContext.Provider value={user}>
          {outlet}
        </UserContext.Provider>
      </Box>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels>
          <BottomNavigationAction label="Profile" icon={<PersonOutlineIcon />} component={Link} to='profile' disableRipple selected={selectedIndex === 0} onClick={() => setSelectedIndex(0)} />
          <BottomNavigationAction label="Square" icon={<PlaylistAddIcon />} component={Link} to='square' disableRipple selected={selectedIndex === 1} onClick={() => setSelectedIndex(1)} />
          <BottomNavigationAction label="Logout" icon={<LogoutIcon />} onClick={handleLogout} />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
