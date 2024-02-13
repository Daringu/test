import { cardType } from "../board/types";

export interface ICard {
    title: string;
    description: string;
    id: string;
    handleSave: (cardDto: CardDto, boardId: string) => void;
    handleDelete: (id: string, boardId: string) => void;
    order: number;
    type: cardType;
    boardId: string;
    totalCards: number
}

export interface CardDto {
    title?: string;
    description?: string;
    order?: number;
    type?: cardType;
    id?: string;
}

export interface InputValues {
    description?: string;
    title: string;
}