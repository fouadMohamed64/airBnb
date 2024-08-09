import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51PltsCJN5EJQOewnmQcCxrNbwWu4WX3qFvE0Nkj6G133BzcjZiOPspVJDTfvk8nA4scCP3QqRSBQOGLONIadJefD00cOYnB6Kx"); 
 
export const payment = async (req, res) => {
    const { listingId } = req.params;
    const { payment_method_id, currency, email } = req.body;

    if (!payment_method_id || !currency || !email) {
        return res.status(400).json({ error: 'Validation error: Missing payment details' });
    }

    try {

        const amount = 40;
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, 
            currency: currency,
            payment_method: payment_method_id,
            confirm: true, 
            automatic_payment_methods: { 
                enabled: true, 
                allow_redirects: 'never'
            },
            metadata: { 
                listingId: listingId, 
                email_user: email,
            },
        });

        return res.status(200).json({
            message: 'Payment initiated',
            payment_intent_id: paymentIntent.id,
            status: paymentIntent.status,
            metadata:paymentIntent.metadata
        });
    } catch (error) {
        if (error.type === 'StripeCardError') {
            return res.status(402).json({ error: 'Payment failed', details: error.message });
        }
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

