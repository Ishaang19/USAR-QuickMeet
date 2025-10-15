import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'; 

import LightModeIcon from '@mui/icons-material/LightMode'; 

import DarkModeIcon from '@mui/icons-material/DarkMode'; 

import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'; 

import { usePreferences } from '@/context/PreferencesContext'; 

 

export default function ThemeModeToggle() { 

const { preferences, setPreferences } = usePreferences(); 

 

const handleThemeChange = (_event: React.MouseEvent<HTMLElement>, newMode: 'system' | 'light' | 'dark' | null) => { 

if (newMode !== null) { 

setPreferences({ 

...preferences, 

themeMode: newMode, 

}); 

} 

}; 

 

return ( 

<Box> 

<Typography variant="body2" color="text.secondary" sx={{ mb: 1, ml: 1 }}> 

Theme 

</Typography> 

<ToggleButtonGroup 

value={preferences.themeMode || 'system'} 

exclusive 

onChange={handleThemeChange} 

fullWidth 

sx={{ 

bgcolor: 'background.paper', 

borderRadius: 2, 

}} 

> 

<ToggleButton 

value="light" 

sx={{ 

py: 1.5, 

textTransform: 'none', 

borderRadius: 2, 

'&.Mui-selected': { 

bgcolor: 'action.selected', 

}, 

}} 

> 

<Box display="flex" flexDirection="column" alignItems="center" gap={0.5}> 

<LightModeIcon /> 

<Typography variant="body2">Light</Typography> 

</Box> 

</ToggleButton> 

<ToggleButton 

value="system" 

sx={{ 

py: 1.5, 

textTransform: 'none', 

borderRadius: 2, 

'&.Mui-selected': { 

bgcolor: 'action.selected', 

}, 

}} 

> 

<Box display="flex" flexDirection="column" alignItems="center" gap={0.5}> 

<SettingsBrightnessIcon /> 

<Typography variant="body2">System</Typography> 

</Box> 

</ToggleButton> 

<ToggleButton 

value="dark" 

sx={{ 

py: 1.5, 

textTransform: 'none', 

borderRadius: 2, 

'&.Mui-selected': { 

bgcolor: 'action.selected', 

}, 

}} 

> 

<Box display="flex" flexDirection="column" alignItems="center" gap={0.5}> 

<DarkModeIcon /> 

<Typography variant="body2">Dark</Typography> 

</Box> 

</ToggleButton> 

</ToggleButtonGroup> 

</Box> 

); 

} 

 