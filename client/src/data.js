import axios from 'axios';

const cache = new Map();

export function fetchData(url) {
    if (!cache.has(url)) {
        cache.set(
            url,
            axios.get(url)
        );
    }
    return cache.get(url);
}
