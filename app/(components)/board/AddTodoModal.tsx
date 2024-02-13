import { Box, Button, Modal, TextField } from "@mui/material"
import { IAddTodoModal } from "./types"
import { useState } from "react"
import { CardDto } from "../card/types"

const AddTodoModal: React.FC<IAddTodoModal> = ({ isOpen, onClose, onSubmitTodo, type, totalCards }) => {
    const [todo, setTodo] = useState<CardDto>({})
    return (
        <Modal className=" flex justify-center items-center" onBackdropClick={onClose} open={isOpen}>
            <Box className=' p-5 flex flex-col bg-white'>
                <TextField onChange={(e) => setTodo({
                    ...todo,
                    title: e.target.value
                })} placeholder="title" />
                <TextField onChange={(e) => setTodo({
                    ...todo,
                    description: e.target.value
                })} placeholder="description" />
                <Button onClick={() => { onSubmitTodo({ ...todo, type, order: totalCards + 1 }) }}>Create todo</Button>
            </Box>
        </Modal>
    )
}

export default AddTodoModal