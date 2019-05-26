import { request } from '../shared/http.service';

export const getAllTrialBalance = () => {
    return new Promise((resolve, reject) => {
        request('/trial/balance', null, 'get')
            .then(res => {
                return resolve(res);
            })
            .catch(err => {
                return reject(err.response);
            })
    });
};