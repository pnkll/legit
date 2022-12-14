import CategoryForm from "./CategoryForm"
import CertificatesForm from "./CertificatesForm"
import React from "react"

const PaymentForm = (props) => {

    return (
        <div className="payment__form-wrapper">
            <CategoryForm but={props.btnAdd} cartTotal={props.cartTotal} getPrice={props.getPrice}/>
            <CertificatesForm but={props.btnPay} cartTotal={props.cartTotal}/>
        </div>


    )
}

export default PaymentForm