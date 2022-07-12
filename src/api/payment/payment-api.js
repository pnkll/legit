import * as axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create(
    {
        baseURL: 'https://b2b-portal-dev.herokuapp.com/',
    }
)

const token = Cookies.get('jwt')


export const postInvoices = (data) => {
    return instance.post('invoices', data, {headers: {'Authorization': 'Bearer ' + token}})
}

export const cartTotal = (data) => {
    return instance.post('invoices/get-cart-total', data, {headers: {'Authorization': 'Bearer ' + token}})
}

export const getPrice = (data) => {
    if (data == null){
        return instance.get(`tariff-packages/get-price`, {headers: {Authorization: 'Bearer ' + token}})
    }
    return instance.get(`tariff-packages/get-price?productTypeId=${data.id}&volume=${data.volume}&answerTime=${data.answerTime}`, {headers: {Authorization: 'Bearer ' + token}})
}