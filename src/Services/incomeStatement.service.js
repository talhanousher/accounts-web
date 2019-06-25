import { request } from '../shared/http.service';

export const getIncomeStatement = () => {
    return new Promise((resolve, reject) => {
        request('/income/statement', null, 'get')
            .then(res => {
                return resolve(res);
            })
            .catch(err => {
                return reject(err.response);
            });
    });
};