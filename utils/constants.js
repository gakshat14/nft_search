export const Actions = {
    CHANGE_TOKENS: 'CHANGE_TOKENS',
}

export function createAPIResource(resp = null, isFetching = false, error = false) {
    return {resp, isFetching, error};
}