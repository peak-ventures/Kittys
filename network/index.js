import axios from 'axios';

export const getConfig = async () => {
    try {
        const { data } = await axios({
            url: 'http://localhost:4000/v1/facebook/config',
            method: 'GET'
        });
        return data;
    } catch (error) {
        throw new Error('There was an unexpected error. Please try again shortly')
    }
};

export const getAdAccounts = async (email, token) => {
    try {
        const { data } = await axios({
            url: '/v1/facebook/adaccounts?email=' + email + '&token=' + token,
            method: 'GET'
        });
        return data;
    } catch (error) {
        throw new Error('There was an unexpected error. Please try again shortly')
    }
};

export const getPages = async (email, token) => {
    try {
        const { data } = await axios({
            url: '/v1/facebook/pages?email=' + email + '&token=' + token,
            method: 'GET'
        });
        return data;
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
