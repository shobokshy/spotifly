export interface ListOf<T> {
	href: string;
	next: string;
	limit: number;
	total: number;
	offset: number;
	items: T[];
}

export interface User {
	display_name: string;
	email: string;
	id: string;
	images: Image[];
}

export interface Image {
	height?: number;
	url: string;
	width?: number;
}

export interface Playlist {
	id: string;
	uri: string;
	name: string;
	owner: User;
	images: Image[];
	tracks: ListOf<TrackInfo>;
	type: string;
}

export interface TrackInfo {
	added_at: Date;
	added_by: User;
	track: Track;
}

export interface Track {
	id: string;
	uri: string;
	type: string;
	linked_from_uri?: string;
	linked_from: {
		uri?: string;
		id?: string;
	};
	media_type: string;
	name: string;
	duration_ms: number;
	artists: Artist[];
	album: Album;
	is_playable: boolean;
}

export interface Artist {
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

export interface Album {
	album_type: string;
	artists: Artist[];
	available_markets: string[];
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: Image[];
	tracks: ListOf<Track>;
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

export interface PlaybackState {
	context: {
		uri: string;
		metadata: object;
	};
	bitrate: number;
	position: number;
	duration: number;
	paused: boolean;
	shuffle: boolean;
	repeat_mode: number;
	track_window: {
		current_track: Track;
		next_tracks: Track[];
		previous_tracks: Track[];
	};
	timestamp: number;
	restrictions: {
		disallow_resuming_reasons: [];
		disallow_skipping_prev_reasons: [];
	};
	disallows: {
		resuming: boolean;
		skipping_prev: boolean;
	};
}

export type PlaybackStatuses = 'ready' | 'not_ready';
export type PlaybackStates = 'player_state_changed';
export type PlaybackErrors =
	| 'initialization_error'
	| 'authentication_error'
	| 'account_error'
	| 'playback_error';

export interface PlaybackError {
	message: PlaybackErrors;
}

export interface PlaybackPlayer {
	_options: {
		getOAuthToken: () => () => void;
		name: string;
		id: string;
		volume: number;
	};
	addListener: {
		(event: PlaybackErrors, callback: (d: PlaybackError) => void): boolean;
		(
			event: PlaybackStates,
			callback: (d: PlaybackState | null) => void
		): boolean;
		(
			event: PlaybackStatuses,
			callback: (d: PlaybackReady) => void
		): boolean;
	};
	connect: () => Promise<void>;
	disconnect: () => void;
	getCurrentState: () => Promise<PlaybackState | null>;
	getVolume: () => Promise<number>;
	nextTrack: () => Promise<void>;
	pause: () => Promise<void>;
	previousTrack: () => Promise<void>;
	removeListener: (
		event: PlaybackErrors | PlaybackStates | PlaybackStatuses,
		callback?: () => void
	) => boolean;
	resume: () => Promise<void>;
	seek: (positionMS: number) => Promise<void>;
	setName: (n: string) => Promise<void>;
	setVolume: (n: number) => Promise<void>;
	togglePlay: () => Promise<void>;
}

export interface PlaybackReady {
	device_id: string;
}
