import { Component } from "@angular/core";
import {
	IonicPage, ModalController, AlertController, ToastController, PopoverController,
	ItemSliding
} from "ionic-angular";
import { IShoppingListItem } from "../../models/shopping-list/IShoppingListItem";
import { ShoppingListProvider } from "../../providers/shopping-list/shopping-list";

@IonicPage({
	name: "shopping-list"
})
@Component({
	selector: "page-shopping-list",
	templateUrl: "shopping-list.html",
})
export class ShoppingListPage {
	items: Array<IShoppingListItem> = [];

	constructor(
		public modalCtrl: ModalController,
		public alertCtrl: AlertController,
		public toastCtrl: ToastController,
		public popoverCtrl: PopoverController,
		public shoppingService: ShoppingListProvider
	) {
	}

	ionViewWillEnter() {
		this.shoppingService.on().subscribe(
			(items: Array<IShoppingListItem>) => {
				this.items = items.sort((item1, item2) => {
					if(item1.priority && !item2.priority) return -1;
					else if(!item1.priority && item2.priority) return 1;
					else {
						return item1.description.toLowerCase() < item2.description.toLowerCase() ? -1 : 1;
					}
				});
			}
		);
	}

	ionViewWillLeave() {
		this.shoppingService.off();
	}

	presentAddShoppingListItemModal() {
		let modal = this.modalCtrl.create("add-shopping-item-modal");
		modal.present();
	}

	presentEditShoppingListItemModal(item: IShoppingListItem, slidingItem: ItemSliding){
		slidingItem.close();

		let modal = this.modalCtrl.create("edit-shopping-item-modal", {
			item: item
		});
		modal.present();
	}

	presentPopover(event){
		let popover = this.popoverCtrl.create("shopping-list-popover", {
			items: this.items
		});
		popover.present({
			ev: event
		});
	}

	updateItem(item: IShoppingListItem){
		this.shoppingService.update(item);
	}

	deleteItem(item: IShoppingListItem, slidingItem: ItemSliding){
		slidingItem.close();

		let dialog = this.alertCtrl.create({
			title: "Borrar elemento",
			message: `¿Estás seguro de que deseea borrar '${item.description}'?`,
			buttons: [
				{
					text: "Cancelar",
					role: "Cancel"
				},
				{
					text: "Borrar",
					handler: () => {
						this.shoppingService.remove(item);

						let toast = this.toastCtrl.create({
							message: `El elemento '${item.description}' ha sido borrado`,
							position: "bottom",
							duration: 2000
						});

						toast.present();
					}
				}
			]
		});

		dialog.present();
	}
}
