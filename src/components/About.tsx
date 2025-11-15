// PaymentInfo.js

const PaymentInfo = () => {
    const features = [
        { id: 1, text: "All payment methods available" },
        { id: 2, text: "Easy returns" },
        { id: 3, text: "24 Support" },
        { id: 4, text: "Fast delivery for all orders" },
    ];

    const paymentMethods = [
        { id: 1, name: "Vodafone Cash", image: "/payment/vodafone-cash.webp" },
        { id: 2, name: "Instapay", image: "/payment/instapay.webp" },
    ];

    return (
        <section className="w-full p-8 bg-gray-950 shadow-md">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-6 text-white">Order Benefits</h2>
                <ul className="flex flex-wrap justify-center gap-6 mb-8">
                    {features.map((feature) => (
                        <li
                            key={feature.id}
                            className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-sm"
                        >
                            <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
                            {feature.text}
                        </li>
                    ))}
                </ul>

                <h3 className="text-xl font-semibold mb-4 text-white">Payment Methods</h3>
                <div className="flex flex-wrap justify-center gap-12">
                    {paymentMethods.map((method) => (
                        <div key={method.id} className="flex flex-col items-center transition-transform hover:scale-105">

                            <img
                                src={method.image}
                                alt={method.name}
                                className="w-[100px] h-[100px] mb-2"
                            />
                            <span className="font-medium text-white">{method.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PaymentInfo;
