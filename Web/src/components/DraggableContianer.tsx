// CardsContainer.tsx
import React, { useState, useCallback } from 'react';
import DraggableCard from './DraggableCardold.tsx';
import Card from '@mui/material/Card';


interface Card {
    id: number;
    content: string;
    position: { x: number; y: number };
    children?: Card[];
}

const CardsContainer: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([
        { id: 1, content: 'Task 1', position: { x: 15, y: 40 } },
        { id: 2, content: 'Task 2', position: { x: 15, y: 140 } },
        { id: 3, content: 'Task 3', position: { x: 15, y: 240 } },
        { id: 4, content: 'Task 4', position: { x: 15, y: 340 } },
    ]);

    const onMove = useCallback((id: number, newPosition: { x: number; y: number }) => {
        setCards(currentCards =>
            currentCards.map(card => card.id === id ? { ...card, position: newPosition } : card)
        );
    }, []);

    const onMergeCheck = useCallback(() => {
        let mergedCards = [...cards];
        let mergeOccurred = false;
        for (let i = 0; i < mergedCards.length && !mergeOccurred; i++) {
            for (let j = 0; j < mergedCards.length; j++) {
                if (i !== j) {
                    const dx = mergedCards[i].position.x - mergedCards[j].position.x;
                    const dy = mergedCards[i].position.y - mergedCards[j].position.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) { // Assuming cards within 100px should merge

                        let newContent;
                        // Determine the order of content based on the x positions
                        if (mergedCards[i].position.x < mergedCards[j].position.x) {
                            newContent = `${mergedCards[i].content}->${mergedCards[j].content}`;
                        } else {
                            newContent = `${mergedCards[j].content}->${mergedCards[i].content}`;
                        }
                        const newCard = {
                            id: Math.random(), // Create a unique ID for the merged card
                            content: newContent,
                            position: {
                                x: (mergedCards[i].position.x + mergedCards[j].position.x) / 2, // Position at the midpoint
                                y: (mergedCards[i].position.y + mergedCards[j].position.y) / 2, // Position at the midpoint
                            },
                            children: [mergedCards[i], mergedCards[j]],
                        };
                        mergedCards = mergedCards.filter(card => card.id !== mergedCards[i].id && card.id !== mergedCards[j].id);
                        mergedCards.push(newCard);
                        mergeOccurred = true;
                        break;
                    }
                }
            }
        }
        if (mergeOccurred) {
            setCards(mergedCards);
        }
    }, [cards]);


    const onDivide = useCallback((id: number) => {
        setCards(currentCards => {
            // Find the index and details of the card to be divided
            const cardToDivideIndex = currentCards.findIndex(card => card.id === id);
            const cardToDivide = currentCards[cardToDivideIndex];

            if (cardToDivide && cardToDivide.children) {
                // Define the horizontal distance between the divided components
                const gap = 10; // Adjust this value to increase or decrease the gap

                // Calculate the total width that the children will occupy
                const totalWidth = cardToDivide.children.length * gap;

                // Starting x position for the first child card
                let startingX = cardToDivide.position.x - totalWidth / 2;

                // Generate the new cards array without the merged card
                const newCards = currentCards.filter(card => card.id !== id);

                // Insert the children cards back into the array, positioned horizontally
                cardToDivide.children.forEach((child, index) => {
                    const childCard = {
                        ...child,
                        position: {
                            x: startingX + index * gap, // Position each child with the specified gap
                            y: cardToDivide.position.y, // Keep the y position the same as the merged card
                        },
                    };
                    newCards.push(childCard);
                });

                return newCards;
            }

            return currentCards; // Return the original cards array if no division occurs
        });
    }, [cards]);

    return (

        <div>
            {cards.map(card => (
                <DraggableCard
                    key={card.id}
                    id={card.id}
                    content={card.content}
                    position={card.position}
                    onMove={onMove}
                    onMergeCheck={() => onMergeCheck()}
                    onDivide={() => onDivide(card.id)}
                />
            ))}
        </div>

    );
};

export default CardsContainer;