import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { EditShoppingItemModalPage } from "./edit-shopping-item-modal";

@NgModule({
	declarations: [
		EditShoppingItemModalPage,
	],
	imports: [
		IonicPageModule.forChild(EditShoppingItemModalPage),
	],
	exports: [
		EditShoppingItemModalPage,
	]
})
export class EditShoppingItemModalPageModule {
}
