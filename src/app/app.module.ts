import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CONFIG } from "../config/config";

import { FirebaseProvider } from '../providers/firebase/firebase';
import { ShoppingListProvider } from '../providers/shopping-list/shopping-list';
import { WeekPlanningProvider } from '../providers/week-planning/week-planning';

@NgModule({
	declarations: [
		MyApp
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp, {
			preloadModules: CONFIG.IONIC_APP.PRELOAD_MODULES,
			tabsPlacement: CONFIG.IONIC_APP.TABS_PLACEMENT
		})
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp
	],
	providers: [
		StatusBar,
		SplashScreen,
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		FirebaseProvider,
		ShoppingListProvider,
		WeekPlanningProvider
	]
})
export class AppModule {
}
