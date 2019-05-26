import { request } from '../shared/http.service';

export const getAllTAccounts = () => {
    return new Promise((resolve, reject) => {
        request('/t/accounts', null, 'get')
            .then(res => {
                return resolve(res.data);
            })
            .catch(err => {
                return reject(err.response);
            })
    });
}