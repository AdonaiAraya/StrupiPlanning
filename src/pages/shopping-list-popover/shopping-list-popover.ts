import { Component } from "@angular/core";
import { AlertController, IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { ShoppingListProvider } from "../../providers/shopping-list/shopping-list";

@IonicPage({
	name: "shopping-list-popover"
})
@Component({
	selector: "page-shopping-list-popover",
	templateUrl: "shopping-list-popover.html",
})
export class ShoppingListPopoverPage {
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public toastCtrl: ToastController,
		public shoppingService: ShoppingListProvider
	) {
	}

	deleteSelectedItems(){
		let dialog = this.alertCtrl.create({
			title: "Borrar seleccionados",
			message: "¿Estás seguro de que deseea borrar todos los elementos seleccionados?",
			buttons: [
				{
					text: "Cancelar",
					role: "Cancel",
					handler: () => {
						setTimeout(() => {
							this.navCtrl.pop();
						});
					}
				},
				{
					text: "Borrar",
					handler: () => {
						console.log(this.navParams);

						let items = this.navParams.data.items;
						this.shoppingService.removeSelectedItems(items).then(
							() => {
								let toast = this.toastCtrl.create({
									message: "Los elementos seleccionados se han borrado correctamente",
									position: "bottom",
									duration: 2000
								});
								toast.present();

								this.navCtrl.pop();
							}
						);
					}
				}
			]
		});
		dialog.present();
	}

	deleteAll(){
		let dialog = this.alertCtrl.create({
			title: "Borrar la lista",
			message: "¿Estás seguro de que deseea borrar todos los elementos de la lista?",
			buttons: [
				{
					text: "Cancelar",
					role: "Cancel",
					handler: () => {
						setTimeout(() => {
							this.navCtrl.pop();
						});
					}
				},
				{
					text: "Borrar",
					handler: () => {
						this.shoppingService.removeAll().then(
							() => {
								let toast = this.toastCtrl.create({
									message: "La lista se ha borrado correctamente",
									position: "bottom",
									duration: 2000
								});
								toast.present();

								this.navCtrl.pop();
							}
						);
					}
				}
			]
		});
		dialog.present();
	}
}
