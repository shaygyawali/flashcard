import { NextResponse } from 'next/server'
import Stripe from 'stripe'

/*
can be used for unit_amount to make code clearer
const formatAmountForStripe = (amount, currency) => {
    return Math.round(amount * 100)
   }
*/
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export async function POST(req) {
  try {
    const params = {
        mode: 'subscription', //recurring payment
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Test subscription',
              },
              unit_amount: 1, // $00.01 in cents
              recurring: {
                interval: 'month',
                interval_count: 1,
              },
            },
            quantity: 1,
          },
        ],
        //the following will redirect the user after a successful or cancelled payment
        success_url: `${req.headers.get('Referer',)} result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get('Referer',)} result?session_id={CHECKOUT_SESSION_ID}`,
      }
      
      const checkoutSession = await stripe.checkout.sessions.create(params)
      //return the created session as a JSON response with a 200 status code.
      return NextResponse.json(checkoutSession, {
        status: 200,
      })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new NextResponse(JSON.stringify({ error: { message: error.message } }), {
      status: 500,
    })
  }
}

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    //extracts the `session_id` from the query parameters of the request.
    const session_id = searchParams.get('session_id')
  
    try {
        //throws an error if there's no session id
      if (!session_id) {
        throw new Error('Session ID is required')
      }
  
      const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
      //checkout session details
      return NextResponse.json(checkoutSession)
    } catch (error) {
      console.error('Error retrieving checkout session:', error)
      return NextResponse.json({ error: { message: error.message } }, { status: 500 })
    }
  }