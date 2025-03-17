import { useEffect, useState } from 'react';

export default function useFetch(fetchFunction, defaultState = []) {
    const [state, setState] = useState(defaultState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const abortController = new AbortController();
        const signal = abortController.signal;

        fetchFunction(signal)
            .then(response => setState(response))
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoading(false));

        return () => {
            abortController.abort();
        };
    }, [fetchFunction]);

    return { loading, state };
}

