import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";

@IonicPage()
@Component({
	selector: "page-tabs",
	templateUrl: "tabs.html",
})
export class TabsPage {
	tab1 = "shopping-list";
	tab2 = "week-planning";

	constructor() {
	}
}
