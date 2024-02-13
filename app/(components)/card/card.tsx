
import { Box, Container, Input, Typography } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";
import { CardDto, ICard, InputValues } from "./types";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

const Card: React.FC<ICard> = ({ title, description, id, handleDelete, handleSave, order, type, boardId, totalCards }) => {
    const [inputValues, setValues] = useState<InputValues>({
        description,
        title
    });
    const [isOver, setOver] = useState<boolean>(false)
    const [isEdit, setEdit] = useState<boolean>(false)
    const [collected, drag, dragPreview] = useDrag(() => {
        return {
            type: 'card',
            item: {
                id,
                order: Number(order),
                type
            },
        }
    });
    const [collectedProps, drop] = useDrop(() => ({
        accept: ['card'],
        drop: (item: CardDto, monitor) => {
            if (item.id === id) {
                return;
            }
            if (item.type !== type) {
                handleSave({ ...item, type, order: totalCards + 1 }, boardId);
                return
            }
            handleSave({ ...item, type, order: order }, boardId);
            handleSave({ id, order: item.order }, boardId)
        },
        hover: (item, monitor) => {
            setOver(monitor.isOver())
        }
    }));
    const onEdit = () => {
        setEdit(true)
    }
    const cancelEdit = () => {
        setEdit(false)
    }
    return (
        <span ref={drag}>
            <Container className={`${isOver && 'bg-slate-600'} flex flex-col gap-1 border-x-indigo-700 border-2`} ref={drop}>
                {isEdit ? <Input value={inputValues.title} onChange={(e) => setValues({
                    ...inputValues,
                    title: e.target.value
                })} placeholder={title} /> : <Typography>{title}</Typography>}
                {isEdit ? <Input value={inputValues.description} onChange={(e) => setValues({
                    ...inputValues,
                    description: e.target.value
                })} placeholder={description} /> : <Typography>{description}</Typography>}
                {isEdit ? <Box><CheckIcon onClick={() => {
                    handleSave({
                        ...inputValues,
                        id
                    }, boardId)
                }} /><CancelIcon onClick={cancelEdit} /></Box> : <Box><EditIcon onClick={onEdit} /><DeleteIcon onClick={() => handleDelete(id, boardId)} /></Box>}
            </Container>
        </span>
    )
}

export default Card;