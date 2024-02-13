import { Box, Typography } from "@mui/material"
import { IBoard } from "./types"
import AddCard from "./components/AddCard"
import { useDrop } from "react-dnd"
import Card from "../card/card"
import { useMemo, useState } from "react"
import { CardDto } from "../card/types"
import AddTodoModal from "./AddTodoModal"

const Board: React.FC<IBoard> = ({ boardType, todos, onSubmit, handleSave, handleDelete, boardId }) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [collectedProps, drop] = useDrop(() => {
        return {
            accept: ['card'],
            drop: (item: CardDto, monitor) => {

                handleSave({ ...item, type: boardType, order: todos.length + 1 }, boardId)
            }
        }
    });
    const handleAddClick = () => {
        setOpen(true)
        return;
    }
    const onClose = () => {
        setOpen(false)
    }
    const filteredCards: CardDto[] = useMemo(() => {
        //@ts-ignore
        return [...todos].sort((a, b) => a.order as number - b.order as number).filter(e => e.type === boardType)
    }, [todos, boardType])
    return (
        <div ref={drop}>
            <Box className=' pr-3 pl-3 pt-2 gap-2 pb-3 border-x-indigo-700 border-2'>
                <Typography className=" capitalize text-lg">{boardType}</Typography>
                {filteredCards.map(e => {
                    return <Card
                        type={e.type || 'done'}
                        order={e.order || 1}
                        description={e.description || 'error'}
                        title={e.title || 'error'}
                        key={e.id}
                        id={e.id || '1'}
                        handleSave={handleSave}
                        handleDelete={handleDelete}
                        boardId={boardId}
                        totalCards={filteredCards.length}
                    >
                    </Card>
                })}
                <AddTodoModal totalCards={filteredCards.length} type={boardType} onSubmitTodo={onSubmit} isOpen={isOpen} onClose={onClose} />
                <AddCard handleClick={handleAddClick} />
            </Box>
        </div>
    )
}

export default Board