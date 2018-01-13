import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IonicPage, NavController, ToastController } from "ionic-angular";

import { IShoppingListItem } from "../../models/shopping-list/IShoppingListItem";
import { ShoppingListProvider } from "../../providers/shopping-list/shopping-list";

@IonicPage({
	name: "add-shopping-item-modal"
})
@Component({
	selector: "page-add-shopping-item-modal",
	templateUrl: "add-shopping-item-modal.html",
})
export class AddShoppingItemModalPage {
	addForm: FormGroup;

	constructor(
		public navCtrl: NavController,
		public toastCtrl: ToastController,
		public shoppingService: ShoppingListProvider
	) {
		this.addForm = new FormGroup({
			description: new FormControl("", Validators.compose([Validators.required])),
			quantity: new FormControl(1, Validators.compose([Validators.min(1), Validators.max(50), Validators.required])),
			priority: new FormControl(false)
		});
	}

	save(){
		if(this.addForm.valid){
			let item: IShoppingListItem = {
				description: this.addForm.value.description,
				quantity: this.addForm.value.quantity,
				priority: this.addForm.value.priority,
				checked: false
			};

			this.shoppingService.insert(item).then(
				() => {
					let toast = this.toastCtrl.create({
						message: `El elemento '${item.description}' ha sido creado`,
						position: "bottom",
						duration: 2000
					});

					toast.present();

					this.navCtrl.pop();
				}
			);
		}
	}
}
