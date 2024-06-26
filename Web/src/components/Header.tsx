import  { useState } from 'react';
import { IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddEvent from "./AddEvent.tsx";
import CardsContainer from "./DraggableContianer.tsx";
import MergeEvents from "./MergeEvents";

export default function Header() {
    const [isWide, setIsWide] = useState(false); // 新增状态用于控制宽度


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
                background: 'linear-gradient(to right, #4F6CBA, #AD86D2)',
                height: '100vh',
                transition: 'width 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // 将内容水平居中
                zIndex:2000
            }}
        >
            <Box
                sx={{
                    maxHeight: 'calc(100vh - 48px)', // 减去 Header 的高度
                    width: '100%', // 使滚动区域填满 Header 宽度
                }}
            >
                <div>
                    <CardsContainer/>
                </div>

                {/*<DndContext>*/}
                {/*    <DraggableCard id="1" content="Task 1" />*/}
                {/*    <DraggableCard id="2" content="Task 2" />*/}
                {/*    /!* Add more draggable cards as needed *!/*/}
                {/*</DndContext>*/}
                {/*<List>*/}
                {/*    <ListItem sx={{ height: '3vw' }} />*/}
                {/*    {['Item 1', 'Item 2', 'Item 3', 'Item 1', 'Item 2', 'Item 3', 'Item 1', 'Item 2', 'Item 3'].map((text, index) => (*/}
                {/*        <ListItem button key={text} onClick={() => handleNavigate(`/path${index + 1}`)}>*/}
                {/*            <ListItemText sx = {{*/}
                {/*                textAlign: 'center',*/}
                {/*                height: isWide ? '3vw' : '10px',*/}
                {/*            }} primary={text}/>*/}
                {/*        </ListItem>*/}
                {/*    ))}*/}
                {/*</List>*/}
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
                <MergeEvents />
            </Box>
        </Box>
    );
}