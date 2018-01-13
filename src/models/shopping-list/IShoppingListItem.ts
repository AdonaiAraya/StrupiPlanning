import { IFirebaseBaseItem } from "../firebase/IFirebaseBaseItem";

export interface IShoppingListItem extends IFirebaseBaseItem{
	description: string;
	quantity: number;
	checked: boolean;
	priority: boolean;
}