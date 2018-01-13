import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { WeekPlanningPage } from "./week-planning";

@NgModule({
	declarations: [
		WeekPlanningPage,
	],
	imports: [
		IonicPageModule.forChild(WeekPlanningPage),
	],
	exports: [
		WeekPlanningPage
	]
})
export class WeekPlanningPageModule {
}
