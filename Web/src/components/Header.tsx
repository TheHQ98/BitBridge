import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // 菜单图标，用于触发侧边栏打开和关闭
import { useState } from "react";

export default function Header() {
    const [drawerWidth, setDrawerWidth] = useState(240); // 初始宽度设置为240px
    const [isOpen] = useState(true);

    // 切换侧边栏宽度的函数
    const toggleDrawerSize = () => {
        setDrawerWidth(drawerWidth === 240 ? 60 : 240); // 如果当前宽度是240px，则缩小到60px，否则扩大到240px
    };

    return (
        <div style={{ display: 'flex' }}>
            <IconButton onClick={toggleDrawerSize} sx={{ marginLeft: drawerWidth }}>
                <MenuIcon />
            </IconButton>
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
                {/* Drawer items */}
                <List>
                    {['Item 1', 'Item 2', 'Item 3'].map((text) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}
