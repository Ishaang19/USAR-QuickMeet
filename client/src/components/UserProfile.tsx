import { useApi } from '@/context/ApiContext'; 

import { Box, Avatar, Typography, Skeleton, Divider } from '@mui/material'; 

import { useEffect, useState } from 'react'; 

import { UserInfoResponse } from '@quickmeet/shared'; 

import EmailIcon from '@mui/icons-material/Email'; 

import BusinessIcon from '@mui/icons-material/Business'; 

 

export default function UserProfile() { 

const [userInfo, setUserInfo] = useState<UserInfoResponse | null>(null); 

const [loading, setLoading] = useState(true); 

const api = useApi(); 

 

useEffect(() => { 

let isMounted = true; 

 

const fetchUserInfo = async () => { 

try { 

const res = await api.getUserInfo(); 

 

if (!isMounted) return; 

 

if (res.status === 'success' && res.data) { 

setUserInfo(res.data); 

} 

} catch (error) { 

console.error('Failed to fetch user info:', error); 

} finally { 

if (isMounted) { 

setLoading(false); 

} 

} 

}; 

 

fetchUserInfo(); 

 

return () => { 

isMounted = false; 

}; 

}, []); 

 

if (loading) { 

return ( 

<Box sx={{ mx: 2, mt: 2 }}> 

<Box 

sx={{ 

bgcolor: 'background.paper', 

borderRadius: 2, 

p: 2, 

display: 'flex', 

alignItems: 'center', 

gap: 2, 

}} 

> 

<Skeleton variant="circular" width={64} height={64} /> 

<Box sx={{ flex: 1 }}> 

<Skeleton variant="text" width="60%" height={28} /> 

<Skeleton variant="text" width="80%" height={20} /> 

</Box> 

</Box> 

</Box> 

); 

} 

 

if (!userInfo) { 

return null; 

} 

 

return ( 

<Box sx={{ mx: 2, mt: 2 }}> 

<Typography variant="body2" color="text.secondary" sx={{ mb: 1, ml: 1 }}> 

Account 

</Typography> 

<Box 

sx={{ 

bgcolor: 'background.paper', 

borderRadius: 2, 

overflow: 'hidden', 

}} 

> 

<Box 

sx={{ 

p: 2, 

display: 'flex', 

alignItems: 'center', 

gap: 2, 

}} 

> 

<Avatar 

src={userInfo.picture} 

alt={userInfo.name} 

sx={{ 

width: 64, 

height: 64, 

border: (theme) => `2px solid ${theme.palette.divider}`, 

}} 

/> 

<Box sx={{ flex: 1, minWidth: 0 }}> 

<Typography variant="h6" fontWeight={600} noWrap> 

{userInfo.name} 

</Typography> 

<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}> 

<EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} /> 

<Typography variant="body2" color="text.secondary" noWrap> 

{userInfo.email} 

</Typography> 

</Box> 

{userInfo.hd && ( 

<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}> 

<BusinessIcon sx={{ fontSize: 16, color: 'text.secondary' }} /> 

<Typography variant="body2" color="text.secondary" noWrap> 

{userInfo.hd} 

</Typography> 

</Box> 

)} 

</Box> 

</Box> 

</Box> 

</Box> 

); 

} 