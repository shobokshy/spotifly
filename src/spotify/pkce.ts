import pkceChallenge from 'pkce-challenge';

const state = pkceChallenge();

export const pkce = {
	challenge: state.code_challenge,
	verifier: state.code_verifier,
};
