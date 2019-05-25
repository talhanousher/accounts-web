import axios from 'axios';

const api = 'http://localhost:3000';

export const request = (url, data, type, noHeaders, params) => new Promise((resolve, reject) => {
    let request = {
        'method': type,
        'url': api + url
    }
    if (type !== 'get') {
        request.data = data;
    }
    if (params) {
        request.params = params;
    }
    axios(request)
        .then(res => {
            return resolve(res);
        })
        .catch(err => {
            return reject(err);
        });
});