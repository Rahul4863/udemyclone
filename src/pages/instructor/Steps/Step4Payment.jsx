export default function Step4Payment({ payment, setPayment, back }) {

    const calculateFinalPrice = (price, discount) => {
        price = Number(price);
        discount = Number(discount);

        if (!price || price <= 0) return "";
        if (!discount || discount <= 0) return price;

        const final = price - (price * discount) / 100;
        return final.toFixed(2);
    };

    return (
        <div className="card p-4 shadow-sm">
            <h4>Payment & Pricing</h4>

            {/* Currency */}
            <div className="mt-2">
                <label className="form-label fw-semibold">Select Currency</label>
                <select
                    className="form-select"
                    value={payment.currency}
                    onChange={(e) =>
                        setPayment({ ...payment, currency: e.target.value })
                    }
                >
                    <option value="INR">INR ₹</option>
                    <option value="USD">USD $</option>
                    <option value="EUR">EUR €</option>
                    <option value="GBP">GBP £</option>
                </select>
            </div>

            {/* Price + Discount */}
            <div className="row">
                <div className="col-md-6 mt-3">
                    <label className="form-label fw-semibold">Course Price</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Price"
                        value={payment.price}
                        onChange={(e) => {
                            const price = e.target.value;
                            const final = calculateFinalPrice(price, payment.discount);
                            setPayment({ ...payment, price, finalPrice: final });
                        }}
                    />
                </div>

                <div className="col-md-6 mt-3">
                    <label className="form-label fw-semibold">Discount (%)</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Discount %"
                        value={payment.discount}
                        onChange={(e) => {
                            const discount = e.target.value;
                            const final = calculateFinalPrice(payment.price, discount);
                            setPayment({ ...payment, discount, finalPrice: final });
                        }}
                    />
                </div>
            </div>

            {/* Final Amount */}
            <div className="mt-3">
                <label className="form-label fw-semibold text-success">
                    Final Payable Amount
                </label>
                <input
                    className="form-control fw-bold"
                    value={
                        payment.finalPrice
                            ? `${payment.currency} ${payment.finalPrice}`
                            : ""
                    }
                    disabled
                />
            </div>

            {/* Buttons */}
            <div className="mt-4 d-flex justify-content-between align-items-center">
                <button className="btn btn-secondary" onClick={back}>
                    ← Back
                </button>

                <div className="d-flex gap-3">
                    <button
                        className="btn btn-success px-4"
                        onClick={() => alert("Course Published 🎉")}
                    >
                        Submit
                    </button>


                </div>
            </div>
        </div>
    );
}
