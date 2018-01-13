import { Injectable } from "@angular/core";
import { FirebaseBaseProvider } from "../firebase/firebaseBase";

@Injectable()
export class WeekPlanningProvider extends FirebaseBaseProvider{
	protected ref: string = "weekPlanning";
}
