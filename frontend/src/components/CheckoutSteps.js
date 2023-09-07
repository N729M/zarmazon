const CheckoutSteps = {
    render: (props) =>{
        return `
            <div class="checkout-steps">
                <div class="${props.step1}? 'active' : '' ">Sign In</div>
                <div class="${props.step1}? 'active' : '' ">Shipping</div>
                <div class="${props.step1}? 'active' : '' ">Payment</div>
                <div class="${props.step1}? 'active' : '' ">Place order</div>
            </div>
        `;
    },
}
 
export default CheckoutSteps;