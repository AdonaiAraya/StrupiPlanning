import { Injectable } from "@angular/core";
import { FirebaseBaseProvider } from "../firebase/firebaseBase";
import { Observable } from "rxjs/Observable";
import { IShoppingListItem } from "../../models/shopping-list/IShoppingListItem";

@Injectable()
export class ShoppingListProvider extends FirebaseBaseProvider{
	protected ref: string = "shoppingList";

	on<IShoppingListItem>(): Observable<Array<IShoppingListItem>>{
		return super.on<IShoppingListItem>();
	}

	removeSelectedItems(items: Array<IShoppingListItem>): Promise<any>{
		let promises: Array<Promise<any>> = [];

		items.forEach((item) => {
			if(item.checked){
				promises.push(super.remove(item));
			}
		});

		return Promise.all(promises);
	}
}
