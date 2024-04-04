import { To, useNavigate} from 'react-router-dom';
import {Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); // 使用useNavigate钩子

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    // 定义一个函数，根据传入的路径来导航
    const handleNavigate = (path: To) => {
        navigate(path);
        setIsOpen(false); // 可选：导航后关闭Drawer
    };

    return (
        <div>
            <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
                <List>
                    {['Item 1', 'Item 2', 'Item 3'].map((text, index) => (
                        <ListItem button key={text} onClick={() => handleNavigate(`/path${index + 1}`)}>
                            <ListItemIcon>
                                {/* 这里可以根据需要放置图标 */}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}
