import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizIcon from '@mui/icons-material/Quiz';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import LogoutIcon from '@mui/icons-material/Logout';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CachedIcon from '@mui/icons-material/Cached';
import TimelineIcon from '@mui/icons-material/Timeline';
import GavelIcon from '@mui/icons-material/Gavel';

export const mainNavbarItems = [
    {
        id: 0,
        icon: <DashboardIcon />,
        label: 'My Account',
        route: '/my-account',
    },
    {
        id: 1,
        icon: <CompareArrowsIcon />,
        label: 'Trade',
        route: '/trade',
    },

    {
        id: 2,
        icon: <CachedIcon />,
        label: 'Borrow',
        route: '/borrow',
    },
    {
        id: 3,
        icon: <TimelineIcon />,
        label: 'Farm',
        route: '/farm',
    },
    {
        id: 4,
        icon: <GavelIcon />,
        label: 'Govern',
        route: '/govern',
    },
    {
        id: 5,
        icon: <LogoutIcon />,
        label: 'Logout',
        route: '/logout',
    },
]