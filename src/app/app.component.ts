import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { registerLocaleData } from '@angular/common';
import localeEs from "@angular/common/locales/es"

import { FirebaseProvider } from "../providers/firebase/firebase";

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any = "TabsPage";

	constructor(
		public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		public firebaseService: FirebaseProvider
	) {
		platform.ready().then(() => {
			registerLocaleData(localeEs);

			this.firebaseService.setApp();

			statusBar.styleDefault();
			splashScreen.hide();
		});
	}
}
