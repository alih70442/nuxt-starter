function sleeper(ms = 2000) {
    return function(x) {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
}

export default sleeper;