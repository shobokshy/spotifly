import { SpotifyContext } from '../SpotifyProvider';
import React from 'react';

export const useSpotify = () => React.useContext(SpotifyContext)!;
