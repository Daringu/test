import { ReactNode } from "react";
import { CardDto } from "../../card/types";

export type cardType = 'todo' | 'inprogress' | 'done';

export interface IAddCard {
    handleClick: () => void;
};

export interface IBoard {
    boardType: cardType;
    todos: CardDto[];
    onSubmit: (todo: CardDto) => void;
    handleSave: (cardDto: CardDto, boardId: string) => void;
    handleDelete: (id: string, boardId: string) => void;
    boardId: string;
}

export interface IAddTodoModal {
    isOpen: boolean;
    onClose: () => void;
    onSubmitTodo: (todo: CardDto) => void;
    type: cardType;
    totalCards: number
}