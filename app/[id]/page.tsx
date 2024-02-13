'use client'

import { Container } from "@mui/material"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { BOARD_TYPES } from "../constants"
import Board from "../(components)/board/Board"
import { CardDto } from "../(components)/card/types"
import { ioClient } from "../(API)/io"

const TodosPage: React.FC = () => {
    const [newTodo, setTodo] = useState<CardDto>({})
    const [todos, setTodos] = useState<CardDto[]>([] as CardDto[])
    const [updatedTodo, setUpdatedTodo] = useState<CardDto>({})
    const [deletedTodo, setDeleted] = useState<string>()
    const { id } = useParams();
    useEffect(() => {
        ioClient.connect()
        ioClient.emit('join-board', { id })
        ioClient.on('populated-todos', ({ todos: fetchedTodos }: { todos: CardDto[] }) => {
            setTodos([...todos, ...fetchedTodos])
        })
        ioClient.on('new-todo', ({ todo }: { todo: CardDto }) => {
            setTodo(todo)
        })
        ioClient.on('updated-todo', ({ todo }: { todo: CardDto }) => {
            setUpdatedTodo(todo)
        })
        ioClient.on('deleted-todo', ({ todoId }: { todoId: string }) => {
            setDeleted(todoId)
        })
    }, [])
    useEffect(() => {
        setTodos([...todos, newTodo])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newTodo])
    useEffect(() => {
        setTodos(todos.map(e => e.id === updatedTodo.id ? updatedTodo : e))
    }, [updatedTodo])
    useEffect(() => {
        setTodos(todos.filter(e => e.id !== deletedTodo))
    }, [deletedTodo])
    const handleSave = (todo: CardDto, boardId: string) => {
        ioClient.emit('update-todo', { todo: todo, boardId })
    }
    const onSubmit = (todo: CardDto) => {
        ioClient.emit('created-todo', { todo, boardId: id })
    }
    const handleDelte = (id: string, boardId: string) => {
        ioClient.emit('delete-todo', {
            todoId: id,
            boardId
        })
    }
    return (
        <Container className=" flex justify-between">
            {BOARD_TYPES.map((e, i) => <Board handleDelete={handleDelte} boardId={id as string} handleSave={handleSave} onSubmit={onSubmit} key={e} boardType={e} todos={todos} />)}
        </Container>
    );
}
export default TodosPage