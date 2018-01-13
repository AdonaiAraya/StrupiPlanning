import { Injectable } from "@angular/core";
import * as firebase from "firebase";

import { CONFIG } from "../../config/config";
import { IFirebaseBaseItem } from "../../models/firebase/IFirebaseBaseItem";
import { Observable } from "rxjs/Observable";
import { IFirebaseQuery } from "../../models/firebase/IFirebaseQuery";

@Injectable()
export class FirebaseProvider {
	private database: firebase.database.Database;
	private auth: firebase.auth.Auth;

	constructor() {}

	setApp(){
		firebase.initializeApp({
			apiKey: CONFIG.FIREBASE.API_KEY,
			authDomain: CONFIG.FIREBASE.AUTH_DOMAIN,
			databaseURL: CONFIG.FIREBASE.DATABASE_URL,
			projectId: CONFIG.FIREBASE.PROJECT_ID
		});
		this.database = firebase.database();
		this.auth = firebase.auth();
		this.signIn();
	}

	on<TType>(ref: string): Observable<Array<TType>>{
		return new Observable<Array<TType>>((observer) => {
			let fbRef: firebase.database.Reference = this.database.ref(ref);
			fbRef.on("value", (rs: firebase.database.DataSnapshot) => {
				let items: Array<TType> = [];

				rs.forEach((snapshot: firebase.database.DataSnapshot) => {
					let item = snapshot.val();
					item.id = snapshot.key;

					items.push(item);

					return false;
				});

				observer.next(items);
			});
		});
	}

	onQuery<TType>(ref: string, queryParams: IFirebaseQuery): Observable<Array<TType>>{
		return new Observable<Array<TType>>((observer) => {
			let fbRef: firebase.database.Reference = this.database.ref(ref);
			let fbQuery: firebase.database.Query;

			if(queryParams.order){
				if(queryParams.order.key) fbQuery = fbRef.orderByKey();
				else if(queryParams.order.child) fbQuery = fbRef.orderByChild(queryParams.order.child);
				else if(queryParams.order.value) fbQuery = fbRef.orderByValue();
			}

			if(queryParams.limit){
				if(queryParams.limit.first) fbQuery = fbQuery ? fbQuery.limitToFirst(queryParams.limit.first) : fbRef.limitToFirst(queryParams.limit.first);
				else if(queryParams.limit.last) fbQuery = fbQuery ? fbQuery.limitToLast(queryParams.limit.last) : fbRef.limitToLast(queryParams.limit.last);
			}

			fbQuery.on("value", (rs: firebase.database.DataSnapshot) => {
				let items: Array<TType> = [];

				rs.forEach((snapshot: firebase.database.DataSnapshot) => {
					let item = snapshot.val();
					item.id = snapshot.key;

					items.push(item);

					return false;
				});

				observer.next(items);
			});
		});
	}

	off(ref: string): void{
		let fbRef: firebase.database.Reference = this.database.ref(ref);
		fbRef.off("value");
	}

	insert(ref: string, item: IFirebaseBaseItem): Promise<any> {
		return new Promise((resolve, reject) => {
			let fbRef: firebase.database.Reference = this.database.ref(ref);
			fbRef.push(item).then((rs) => {
				resolve();
			});
		});
	}

	update(ref: string, item: IFirebaseBaseItem): Promise<any>{
		return new Promise((resolve, reject) => {
			let fbRef: firebase.database.Reference = this.database.ref(ref + "/" + item.id);
			fbRef.set(item).then((rs) => {
				resolve();
			}).catch((re) => {
				reject(re);
			});
		});
	}

	remove(ref: string, item: IFirebaseBaseItem): Promise<any>{
		return new Promise((resolve, reject) => {
			let fbRef: firebase.database.Reference = this.database.ref(ref + "/" + item.id);
			fbRef.remove().then((rs) => {
				resolve();
			}).catch((re) => {
				reject(re);
			});
		});
	}

	removeAll(ref: string): Promise<any>{
		return new Promise((resolve, reject) => {
			let fbRef: firebase.database.Reference = this.database.ref(ref);
			fbRef.remove().then((rs) => {
				resolve();
			}).catch((re) => {
				reject(re);
			});
		});
	}

	private signIn(){
		this.auth.signInWithEmailAndPassword(CONFIG.FIREBASE.FIREBASE_AUTH.USER, CONFIG.FIREBASE.FIREBASE_AUTH.PASSWORD);
	}
}