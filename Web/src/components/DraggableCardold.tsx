// DraggableCard.tsx
import React, { useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface DraggableCardProps {
    id: number;
    content: string;
    position: { x: number; y: number };
    onMove: (id: number, newPosition: { x: number; y: number }) => void;
    onMergeCheck: () => void;
    onDivide?: () => void;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
                                                         id,
                                                         content,
                                                         position,
                                                         onMove,
                                                         onMergeCheck,
                                                         onDivide,
                                                     }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

    const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setDragStartPos({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
        e.preventDefault();
    };

    const handleDragging = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            const newX = e.clientX - dragStartPos.x;
            const newY = e.clientY - dragStartPos.y;
            onMove(id, { x: newX, y: newY });
        }
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        onMergeCheck();
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                zIndex: 1000,
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragging}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onDoubleClick={onDivide}
        >
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {content}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Drag me around!
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default DraggableCard;
