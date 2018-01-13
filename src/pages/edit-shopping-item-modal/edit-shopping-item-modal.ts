import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ShoppingListProvider } from "../../providers/shopping-list/shopping-list";
import { IShoppingListItem } from "../../models/shopping-list/IShoppingListItem";

@IonicPage({
	name: "edit-shopping-item-modal"
})
@Component({
	selector: "page-edit-shopping-item-modal",
	templateUrl: "edit-shopping-item-modal.html",
})
export class EditShoppingItemModalPage {
	editForm: FormGroup;
	item: IShoppingListItem;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public shoppingService: ShoppingListProvider
	) {
		this.item = this.navParams.data.item;

		this.editForm = new FormGroup({
			description: new FormControl(this.item.description, Validators.compose([Validators.required])),
			quantity: new FormControl(this.item.quantity, Validators.compose([Validators.min(1), Validators.max(50), Validators.required])),
			priority: new FormControl(this.item.priority)
		});
	}

	ionViewWillEnter(){

	}

	save(){
		if(this.editForm.valid){
			this.item.description = this.editForm.value.description;
			this.item.quantity = this.editForm.value.quantity;
			this.item.priority = this.editForm.value.priority;

			this.shoppingService.update(this.item).then(
				() => {
					let toast = this.toastCtrl.create({
						message: `El elemento '${this.item.description}' ha sido actualizado correctamente`,
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
