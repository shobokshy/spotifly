import React from 'react';
import { SpotifyPlayerContext } from '../SpotifyPlayer';

export const useSpotifyPlayer = () => React.useContext(SpotifyPlayerContext)!;
