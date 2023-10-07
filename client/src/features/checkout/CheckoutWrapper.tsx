import {Elements} from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import {loadStripe} from "@stripe/stripe-js";
import { useState, useEffect } from 'react';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch } from '../../app/store/configureStore';
import { setBasket } from '../basket/basketSlice';

const stripePromise = loadStripe('pk_test_51NyAuoEC6xY0kJuUzLTr6XXlHULBlNJb9f9MJfrsyceFm008XH8KvzATWlPK11181jMgqlYOm4Q7Sd5yHnuJpl5l00Ghzq3JiO');

export default function CheckoutWrapper() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Payments.createPaymentIntent()
            .then(response => dispatch(setBasket(response)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [dispatch]);

    if (loading) return <LoadingComponent message='Loading checkout' />

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}