import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddShoppingItemModalPage } from './add-shopping-item-modal';

@NgModule({
  declarations: [
    AddShoppingItemModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddShoppingItemModalPage),
  ],
})
export class AddShoppingItemModalPageModule {}
