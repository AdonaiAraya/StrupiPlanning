import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditWeekPlanningItemModalPage } from './edit-week-planning-item-modal';

@NgModule({
  declarations: [
    EditWeekPlanningItemModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditWeekPlanningItemModalPage),
  ],
})
export class EditWeekPlanningItemModalPageModule {}
