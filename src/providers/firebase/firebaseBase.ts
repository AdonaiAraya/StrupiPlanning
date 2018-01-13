import { Injectable } from "@angular/core";
import { FirebaseProvider } from "./firebase";
import { IFirebaseBaseItem } from "../../models/firebase/IFirebaseBaseItem";
import { Observable } from "rxjs/Observable";

@Injectable()
export abstract class FirebaseBaseProvider {
	protected abstract ref: string;

	constructor(public firebaseService: FirebaseProvider) {

	}

	on<TType>(): Observable<Array<TType>>{
		return this.firebaseService.on<TType>(this.ref);
	}

	off(){
		return this.firebaseService.off(this.ref);
	}

	insert(item: IFirebaseBaseItem): Promise<any>{
		return this.firebaseService.insert(this.ref, item);
	}

	update(item: IFirebaseBaseItem): Promise<any>{
		return this.firebaseService.update(this.ref, item);
	}

	remove(item: IFirebaseBaseItem): Promise<any>{
		return this.firebaseService.remove(this.ref, item);
	}

	removeAll(): Promise<any>{
		return this.firebaseService.removeAll(this.ref);
	}
}