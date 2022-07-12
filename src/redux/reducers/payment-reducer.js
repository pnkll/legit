import { createAction, createReducer } from "@reduxjs/toolkit"

export const addCategory = createAction('ADD_CATEGORY')
export const setTotal = createAction('SET_TOTAL')
export const setInvoiceLink = createAction('SET_INVOICE_LINK')
export const setCategoryError = createAction('SET_ERROR_CATEGORY')
export const setPrice = createAction('SET_PRICE')

const initialState = {
  cart: {
    userTariffPackages: [],
    total: null,
    price: {
      package: null,
      certificate: null
    },
  },
  invoice: {
    link: null
  },
  form: {
    errors: {category: null,}
  }  
}



const paymentReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('ADD_CATEGORY', (state = initialState, action) => {
            if (action.payload != null) {
                state.cart.userTariffPackages.push(action.payload)
            }
        })
        .addCase('SET_TOTAL', (state = initialState, action) => {
          state.cart.total = action.payload
        })
        .addCase('SET_INVOICE_LINK', (state = initialState, action) => {
          state.invoice.link = action.payload
        })
        .addCase('SET_ERROR_CATEGORY', (state = initialState, action) => {
          state.form.errors.category = action.payload
        })
        .addCase('SET_PRICE', (state = initialState, action) => {
          if (action.payload.package != null){
            state.cart.price.package = action.payload.package
          } 
          state.cart.price.certificate = action.payload.certificate
        })        
})

export default paymentReducer