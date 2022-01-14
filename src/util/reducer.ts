import { Action, Card } from "./types";

export function cardsReducer(cards: Card[], action: Action) {
  switch (action.type) {
    case "ADD":
      return [...cards, action.payload];
    case "REMOVE":
      return cards.filter((card) => card.id !== action.payload);
    case "UPDATE":
      const updatedCards = cards.map((card) => {
        if (card.id === action.payload.id) {
          return action.payload;
        }
        return card;
      });
      return updatedCards;
    case "UPDATE-ALL":
      return action.payload;
    default:
      return cards;
  }
}
