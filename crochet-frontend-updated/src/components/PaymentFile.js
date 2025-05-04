function makePayment() {
    const upiId = 'sasidhar.nyshadham@okhdfcbank'; // Replace with actual UPI ID
    const name = 'Iswarya'; // Replace with the merchant or receiver name
    const amount = '100';         // Amount to be paid
    const txnNote = 'Payment for service';

    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(txnNote)}`;

    // Redirect user to UPI app
    window.location.href = upiUrl;
}

export default makePayment