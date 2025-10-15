import { useMemo, useEffect } from 'react'; 

import { createTheme, ThemeProvider } from '@mui/material/styles'; 

import { useColorScheme } from '@mui/material/styles'; 

import colorSchemes from './primitives/color-schemes'; 

import typography from './primitives/typography'; 

import shape from './primitives/shape'; 

import componentsOverride from './components'; 

import { usePreferences } from '@/context/PreferencesContext'; 

 

interface AppThemeProps { 

children: React.ReactNode; 

} 

 

function ThemeApplier({ children }: { children: React.ReactNode }) { 

const { mode, setMode } = useColorScheme(); 

const { preferences } = usePreferences(); 

 

useEffect(() => { 

const themeMode = preferences.themeMode || 'system'; 

if (mode !== themeMode) { 

setMode(themeMode); 

} 

}, [preferences.themeMode, mode, setMode]); 

 

return <>{children}</>; 

} 

 

export default function AppTheme({ children }: AppThemeProps) { 

const theme = useMemo(() => { 

return createTheme({ 

colorSchemes, 

typography, 

shape, 

cssVariables: { 

colorSchemeSelector: 'data-mui-color-scheme', 

cssVarPrefix: 'quickmeet', 

}, 

}); 

}, []); 

 

theme.components = componentsOverride(); 

 

return ( 

<ThemeProvider theme={theme}> 

<ThemeApplier>{children}</ThemeApplier> 

</ThemeProvider> 

); 

} 

 