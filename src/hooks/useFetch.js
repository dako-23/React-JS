import { useCallback, useEffect, useState } from 'react';

export default function useFetch(fetchFunction, defaultState = []) {
    const [state, setState] = useState(defaultState);
    const [loading, setLoading] = useState(true);

    const stableFetchFunction = useCallback(fetchFunction, []);

    useEffect(() => {
        setLoading(true);

        const abortController = new AbortController();
        const signal = abortController.signal;

        stableFetchFunction(signal)
            .then(response => setState(response))
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoading(false));

        return () => {
            abortController.abort();
        };
    }, [stableFetchFunction]);

    return { loading, state };
}

