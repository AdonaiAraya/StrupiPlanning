import { Component } from "@angular/core";
import { IonicPage, ModalController } from "ionic-angular";
import { IWeekPlanningItem } from "../../models/week-planning/IWeekPlanningItem";
import { WeekPlanningProvider } from "../../providers/week-planning/week-planning";

@IonicPage({
	name: "week-planning"
})
@Component({
	selector: "page-week-planning",
	templateUrl: "week-planning.html",
})
export class WeekPlanningPage {
	currentWeekItems: Array<IWeekPlanningItem> = [];
	nextWeekItems: Array<IWeekPlanningItem> = [];

	constructor(
		public modalCtrl: ModalController,
		public weekPlanningService: WeekPlanningProvider
	) {

	}

	ionViewWillEnter() {
		this.weekPlanningService.onQuery<IWeekPlanningItem>({
			order: {
				child: "dateUnix"
			},
			limit: {
				last: 14
			}
		}).subscribe((items: Array<IWeekPlanningItem>) => {
			let currentDate = new Date();
			currentDate.setHours(0, 0, 0);
			this.currentWeekItems = this.generateWeekItems(new Date(currentDate), items);

			let daysToNextWeek = (7 - (currentDate.getDay() == 0 ? 7 : currentDate.getDay())) + 1;
			currentDate.setDate(currentDate.getDate() + daysToNextWeek);
			this.nextWeekItems = this.generateWeekItems(new Date(currentDate), items);
		});
	}

	ionViewWillLeave() {
		this.weekPlanningService.off();
	}

	presentEditWeekPlanningItem(item: IWeekPlanningItem){
		let modal = this.modalCtrl.create("edit-week-planning-item-modal", {
			item: item
		});
		modal.present();
	}

	private generateWeekItems(currentDate: Date, items: Array<IWeekPlanningItem>): Array<IWeekPlanningItem>{
		let days: Array<IWeekPlanningItem> = [];

		do{
			let day: IWeekPlanningItem = {
				dateUnix: currentDate.getTime(),
				date: new Date(currentDate),
				lunch: "",
				dinner: ""
			};

			for(let c = 0; c < items.length; c++){
				let item = items[c];
				//Is same day (not counting milliseconds)
				if(Math.abs(day.dateUnix - item.dateUnix) < 1000){
					day.id = item.id;
					day.lunch = item.lunch;
					day.dinner = item.dinner;

					break;
				}
			}

			days.push(day);

			currentDate.setDate(currentDate.getDate() + 1);
		}
		while(currentDate.getDay() != 1);

		return days;
	}
}
