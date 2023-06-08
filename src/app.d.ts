// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {

	type User = {}

	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
