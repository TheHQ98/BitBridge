import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddEvent from "./AddEvent.tsx";
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isWide, setIsWide] = useState(false); // 新增状态用于控制宽度

    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    const handleNavigate = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    const handleToggleWidth = () => {
        setIsWide(!isWide);
    };

    return (
        <Box
            sx={{
                position: 'fixed', // 使用 position: fixed
                top: 0,
                left: 0,
                width: isWide ? '40vw' : '10vw',
                backgroundColor: 'pink',
                height: '100vh',
                transition: 'width 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // 将内容水平居中
            }}
        >
            <Box
                sx={{
                    maxHeight: 'calc(100vh - 48px)', // 减去 Header 的高度
                    width: '100%', // 使滚动区域填满 Header 宽度
                }}
            >
                <List>
                    <ListItem sx={{ height: '3vw' }} />
                    {['Item 1', 'Item 2', 'Item 3', 'Item 1', 'Item 2', 'Item 3', 'Item 1', 'Item 2', 'Item 3'].map((text, index) => (
                        <ListItem button key={text} onClick={() => handleNavigate(`/path${index + 1}`)}>
                            <ListItemText sx = {{
                                textAlign: 'center',
                                height: isWide ? '3vw' : '10px',
                            }} primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}
            >
                <IconButton onClick={handleToggleWidth}>
                    <MenuIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    paddingBottom: '16px',
                    width: '100%',
                    transition: 'padding-left 0.3s ease', // 添加过渡效果
                    display: 'flex',
                    justifyContent: 'center', // 水平居中
                    alignItems: 'center'
                }}
            >
                <AddEvent />
            </Box>
        </Box>
    );
}