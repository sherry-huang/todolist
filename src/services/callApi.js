/* eslint-disable import/no-anonymous-default-export */
// import Cookie from 'universal-cookie';

// const cookie = new Cookie();
// const cookieConfig = { path: '/', domain: window.__env.REACT_APP_COOKIE_DOMAIN, SameSite: 'Strict', secure: true }

async function getPostJsonData(params, method) {
    if (method === 'GET' || method === 'HEAD') return null;
    return JSON.stringify(params);
}

export async function callApi(requestUrl, method, params = {}) {
    const fullUrl = `.${requestUrl}`;
    // const fullUrl = `http://localhost:3001${requestUrl}`;
    const postJson = await getPostJsonData(params, method);
    // const accessToken = cookie.get('jwt', cookieConfig) || '';
    const credentials = process.env.NODE_ENV === 'production' && { credentials: 'include' };

    return fetch(fullUrl, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${accessToken}`,
        },
        body: postJson,
        method: method,
        ...credentials
    })
        .then((response) => {
            return response.status === 200 && response.json().then((json) => ({ json, response }))
        })
        .then(({ json, response }) => {
            if (!response.ok) { return Promise.reject(json) }
            return Object.assign({}, json);
        })
}

export default {
    get: (requestUrl, params) => callApi(requestUrl, 'GET', params),
    post: (requestUrl, params) => callApi(requestUrl, 'POST', params),
    put: (requestUrl, params) => callApi(requestUrl, 'PUT', params),
    patch: (requestUrl, params) => callApi(requestUrl, 'PATCH', params),
    delete: (requestUrl, params) => callApi(requestUrl, 'DELETE', params),
};
