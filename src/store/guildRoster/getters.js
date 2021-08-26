export function isLoading(state) {
    return state.isLoading;
}

export function hasError(state) {
    return state.error !== null;
}

export function error(state) {
    return state.error;
}

export function hasRoster(state) {
    return state.entities.length > 0;
}

export function roster(state) {
    return state.entities;
}

export function member(state) {
    return state.selectedEntity;
}