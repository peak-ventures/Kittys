import axios from 'axios';

export const getAdAccounts = async (email, token) => {
    try {
        return await axios({
            url: '/v1/facebook/adaccounts?email=' + email + '&token=' + token,
            method: 'GET'
        });
    } catch (error) {
        throw new Error('There was an unexpected error. Please try again shortly')
    }
};

export const getPages = async (email, token) => {
    try {
        return await axios({
            url: '/v1/facebook/pages?email=' + email + '&token=' + token,
            method: 'GET'
        });
    } catch (error) {
        throw new Error('There was an unexpected error. Please try again shortly')
    }
};

export const savePage = async data => {
    try {
        await axios({
            url: '/v1/zapier/save',
            method: 'POST',
            data
        })
    } catch (error) {
        throw new Error('Could not send data to Zapier')
    }
};