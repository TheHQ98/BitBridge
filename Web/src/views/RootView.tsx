import { useState } from 'react';
import {Drawer, IconButton, List, ListItem, ListItemText} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeView from "./HomeView.tsx";

export default function RootView() {
    const [drawerWidth, setDrawerWidth] = useState(240); // 初始宽度设置为240px
    const [isOpen] = useState(true);

    // 切换侧边栏宽度的函数
    const toggleDrawerSize = () => {
        setDrawerWidth(drawerWidth === 240 ? 60 : 240); // 如果当前宽度是240px，则缩小到60px，否则扩大到240px
    };

    return (
        <div style={{ display: 'flex' }}>
            <Drawer
                variant="persistent"
                anchor="left"
                open={isOpen}
                sx={{
                    width: drawerWidth, // 使用状态变量作为宽度值
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth, // 使用状态变量作为宽度值
                        boxSizing: 'border-box',
                    },
                }}
            >
                <IconButton onClick={toggleDrawerSize}>
                    <MenuIcon />
                </IconButton>
                {/* Drawer items */}
                <List>
                    {['Item 1', 'Item 2', 'Item 3'].map((text) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main style={{ flexGrow: 1, padding: '20px' }}>
                <HomeView/>
            </main>
        </div>
    );
}
