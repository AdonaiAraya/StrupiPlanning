import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { FormControl, FormGroup } from "@angular/forms";
import { IWeekPlanningItem } from "../../models/week-planning/IWeekPlanningItem";
import { WeekPlanningProvider } from "../../providers/week-planning/week-planning";

@IonicPage({
	name: "edit-week-planning-item-modal"
})
@Component({
	selector: "page-edit-week-planning-item-modal",
	templateUrl: "edit-week-planning-item-modal.html",
})
export class EditWeekPlanningItemModalPage {
	item: IWeekPlanningItem;
	editForm: FormGroup;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public weekPlanningService: WeekPlanningProvider
	) {
		this.item = this.navParams.data.item;

		this.editForm = new FormGroup({
			lunch: new FormControl(this.item.lunch),
			dinner: new FormControl(this.item.dinner)
		});
	}

	save(){
		if(this.editForm.valid){
			this.item.lunch = this.editForm.value.lunch;
			this.item.dinner = this.editForm.value.dinner;

			let promise;
			if(this.item.id) promise = this.weekPlanningService.update(this.item);
			else promise = this.weekPlanningService.insert(this.item);

			promise.then(
				() => {
					let toast = this.toastCtrl.create({
						message: `Se ha actualizado el planning con éxito`,
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
