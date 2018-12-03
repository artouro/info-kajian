export interface User {
	uid?: string;
	username?: string;
	email?: string;
	photoUrl?: any;
	nama?: string;
	level?;
	alamat?: string;
	location?: {
		lat?: string;
		long?: string;
	};
	telp?: string;
	kota?: string;
	profileSet?: boolean;
	following?: string[];
}
