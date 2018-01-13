import { IFirebaseBaseItem } from "../firebase/IFirebaseBaseItem";

export interface IWeekPlanningItem extends IFirebaseBaseItem{
	dateUnix: number;
	date: Date;
	lunch: string;
	dinner: string;
}