export interface IFirebaseQuery {
	order?: {
		child?: string,
		key?: boolean,
		value?: boolean
	},
	limit?: {
		first?: number,
		last?: number
	}
}