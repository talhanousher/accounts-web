import { request } from '../shared/http.service';
export const addGeneralEntry = (data) => {
    return new Promise((resolve, reject) => {
        request('/general/entry', data, 'post')
            .then(res => {
                return resolve(res);
            })
            .catch(err => {
                return reject(err.response);
            })
    })
}

export const getAllGeneralEnteries = () => {
    return new Promise((resolve, reject) => {
        request('/general/entry', null, 'get')
            .then(res => {
                return resolve(res);
            })
            .catch(err => {
                return reject(err.response);
            })
    });
};