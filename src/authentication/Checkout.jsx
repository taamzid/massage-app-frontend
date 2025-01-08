import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "../assets/images/bg.svg";
import logo from "../assets/logos/logo.svg";
import { decodeToken } from "../utils/jwt";
const stripePromise = loadStripe(
  "pk_test_51PmF6FIR1dQbKMRJ28xNPIbFCxHC65QFFomrafKSTy5zGQoGqVFFwGO2USlidniImkfu0Gqy0VmHy6zxl8vJNiTe00ubMN0Mdw"
);

const Checkout = () => {
  const [isTargeted, setIsTargeted] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  // useEffect(() => {
  //   if (isPaid) {
  //     navigate("/welcome");
  //   }
  // }, [isPaid, navigate]);

  const toggleOption = () => {
    setIsTargeted((prev) => !prev);
  };

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      const decoded = decodeToken(cookieToken);
      setDecodedToken(decoded);
    }
  }, []);

  console.log("decoded token", decodedToken);

  const handleStripePayment = async (stripe, elements, e) => {
    e.preventDefault();

    if (!stripe || !elements || isProcessing) {
      return;
    }

    setIsProcessing(true);

    const cardNumberElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    if (!error) {
      try {
        const response = await axios.post(
          "http://localhost:8800/api/payment/stripe",
          {
            paymentMethodId: paymentMethod.id,
            amount:
              decodedToken?.role &&
              decodedToken.role.toLowerCase() === "customer"
                ? 150
                : 299,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${decodedToken.id}`,
            },
            withCredentials: true,
          }
        );

        const paymentResponse = response.data;
        if (paymentResponse.success) {
          localStorage.setItem("paymentToken", paymentResponse.paymentToken);
          setIsPaid(true);

          // Meta Stripe Purchase Event
          fbq("track", "Purchase", {
            value: 150.0,
            currency: "USD",
            // email: storedUser.email,
            // name: storedUser.name,
          });

          console.log(paymentResponse);
          // navigate('/dashboard/stressors')
        } else {
          console.error("Stripe payment failed");
        }
      } catch (error) {
        console.error("Stripe payment error:", error);
      }
    } else {
      console.error("Stripe error:", error.message);
    }

    setIsProcessing(false);
  };

  const handlePayPalPayment = (orderID, details) => {
    axios
      .post(
        "http://localhost:8800/api/payment/paypal",
        {
          orderID,
          payer: details.payer,
          purchase_units: details.purchase_units,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${decodedToken.id}`,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        const paymentResponse = response.data;
        if (paymentResponse.success) {
          localStorage.setItem("paymentToken", paymentResponse.paymentToken);
          setIsPaid(true);

          // Meta PayPal Purchase Event
          fbq("track", "Purchase", {
            value: 150.0,
            currency: "USD",
            // email: storedUser.email,
            // name: storedUser.name,
          });

          console.log(paymentResponse);
        } else {
          console.error("PayPal payment failed");
        }
      })
      .catch((err) => {
        console.error("Payment saving failed", err);
      });
  };

  useEffect(() => {
    if (isPaid) {
      if (decodedToken?.role === "customer") {
        navigate("/dashboard/home");
      } else {
        navigate("/thp/inbox");
      }
    }
  }, [isPaid, navigate,decodedToken?.role]);

  const openCenteredWindow = (url, name, width, height) => {
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      url,
      name,
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AfJTNS91Hm3tWZXdJsAMwP9xzYYGW8MkGZfvnEsOq-sPw13E1FKnuInXl8yd5aw-qNjrLlzbH3QdEMwF",
      }}
    >
      <div className="flex items-center justify-center min-h-screen w-full relative">
        <div className="absolute top-6 left-4 md:left-32">
          <Link to="/">
            <div className="flex flex-col items-center justify-center gap-2">
              <img src={logo} alt="" />
              <h2 className="text-[#152A16] font-[600] text-[20px] leading-[24px]">
                Zentitood
              </h2>
            </div>
          </Link>
        </div>
        <div
          className="md:w-[884px] lg:my-24 md:rounded-lg"
          style={{
            background: `url(${bgImg}) no-repeat center center`,
            backgroundSize: "cover",
            fontFamily: "PP Neue Montreal",
          }}
        >
          <div className="pt-[100px] md:pt-4 flex flex-col items-center justify-center w-full p-6 bg-custom-green backdrop-blur-[10px]">
            <h2 className="mr-[72%] lg:mr-[370px] text-[24px] lg:text-[40px] text-white mb-3 font-PPNeueMontreal500">
              Checkout
            </h2>

            <div
              className="w-full md:w-[440px] lg:w-[540px] px-5 py-3 rounded-lg text-white mb-6"
              style={{ background: "rgba(21, 42, 22, 0.32)" }}
            >
              <h1 className="text-[32px] lg:text-[42px] font-Cambon700 leading-[49px]">
                Zentitood.com
              </h1>
              <h2 className="text-[22px] lg:text-[32px] font-PPNeueMontreal500 mt-2">
                {decodedToken?.role &&
                decodedToken.role.toLowerCase() === "customer"
                  ? "$149.99 USD— One-Time Payment"
                  : "$299 USD— Monthly Payment"}
              </h2>
              <p className="font-PPNeueMontreal400 mt-2">
                Joining Zentitood is easy! For a one-time, non-refundable fee of
                {decodedToken?.role &&
                decodedToken.role.toLowerCase() === "customer"
                  ? " $149.99"
                  : " $299"}
                , you can create your account (one per person only). After that,
                there are no additional costs, except for the services provided.
                Welcome to our community!
              </p>
            </div>

            <div
              onClick={toggleOption}
              className="flex items-center justify-between w-[260px] p-1 rounded-full bg-gray-200 cursor-pointer transition-colors duration-300 mb-6"
            >
              <div
                className={`flex items-center justify-center w-1/2 py-1 h-[49px] rounded-full transition-all duration-300 ${
                  isTargeted ? "bg-white shadow-md" : "bg-transparent"
                }`}
              >
                <span
                  className={`text-lg ${
                    isTargeted
                      ? "text-[#3F002A] font-PPNeueMontreal500"
                      : "text-[#3F002A] font-PPNeueMontreal400"
                  }`}
                >
                  Credit Card
                </span>
              </div>
              <div
                className={`flex items-center justify-center w-1/2 py-1 h-[49px] rounded-full transition-all duration-300 ${
                  !isTargeted ? "bg-white shadow-md" : "bg-transparent"
                }`}
              >
                <span
                  className={`text-lg ${
                    !isTargeted
                      ? "text-[#3F002A] font-PPNeueMontreal500"
                      : "text-[#3F002A] font-PPNeueMontreal400"
                  }`}
                >
                  PayPal
                </span>
              </div>
            </div>
            {!isTargeted && (
              <p className="max-w-[520px] font-PPNeueMontreal500 text-sm md:text-lg lg:text-[20px] my-5 text-white">
                By clicking "Pay with PayPal", you confirm that you have read
                and agree to our{" "}
                <span
                  onClick={() =>
                    openCenteredWindow("/terms", "termsWindow", 800, 600)
                  }
                  className="underline cursor-pointer"
                >
                  terms of use,
                </span>{" "}
                <span
                  onClick={() =>
                    openCenteredWindow(
                      "/privacy-policy",
                      "privacyWindow",
                      1200,
                      600
                    )
                  }
                  className="underline cursor-pointer"
                >
                  privacy policy,
                </span>{" "}
                <span
                  onClick={() =>
                    openCenteredWindow(
                      "/cookies-policy",
                      "cookiesWindow",
                      1200,
                      600
                    )
                  }
                  className="underline cursor-pointer"
                >
                  cookies policy,
                </span>{" "}
                and{" "}
                <span
                  onClick={() =>
                    openCenteredWindow(
                      "/disclaimer",
                      "disclaimerWindow",
                      1200,
                      600
                    )
                  }
                  className="underline cursor-pointer"
                >
                  disclaimer
                </span>
                .
              </p>
            )}

            {isTargeted ? (
              <Elements stripe={stripePromise}>
                <StripeForm
                  handleStripePayment={handleStripePayment}
                  isProcessing={isProcessing}
                />
              </Elements>
            ) : (
              <div className="w-[222px] pb-[340px] md:pb-[190px]">
                <PayPalButtons
                  style={{
                    layout: "vertical",
                    color: "silver",
                    label: "pay",
                    shape: "pill",
                    width: 222,
                    height: 54,
                  }}
                  fundingSource="paypal"
                  funding={{
                    disallowed: [
                      window.paypal.FUNDING.PAYLATER,
                      window.paypal.FUNDING.CARD,
                    ],
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value:
                              decodedToken?.role &&
                              decodedToken.role.toLowerCase() === "customer"
                                ? "150"
                                : "299",
                          },
                        },
                      ],
                      application_context: {
                        shipping_preference: "NO_SHIPPING",
                      },
                    });
                  }}
                  onApprove={async (data, actions) => {
                    return await actions.order.capture().then((details) => {
                      handlePayPalPayment(data.orderID, details);
                    });
                  }}
                  onError={(err) => {
                    console.error("PayPal payment error:", err);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

const StripeForm = ({ handleStripePayment, isProcessing }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // Reset error message

    if (!stripe || !elements) {
      setErrorMessage("Stripe is not properly loaded. Please try again.");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    if (error) {
      setErrorMessage(error.message); // Set the error message
    } else {
      handleStripePayment(stripe, elements, e);
    }
  };

  const openCenteredWindow = (url, name, width, height) => {
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      url,
      name,
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  return (
    <form
      className="md:w-[440px] pb-28 md:py-0 lg:w-[540px] flex flex-col items-center"
      // onSubmit={(e) => handleStripePayment(stripe, elements, e)}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Name on Card"
        className="w-full py-3 rounded-xl mb-4 font-PPNeueMontreal400 text-white placeholder-white bg-custom-input px-4"
      />
      {errorMessage && errorMessage.includes("Name") && (
        <p className="text-green-800 text-sm ">{errorMessage}</p>
      )}
      <div className="w-full py-3 rounded-xl mb-4  text-white placeholder-white bg-custom-input px-4">
        <CardNumberElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                fontWeight: "300",
                color: "#fff",
                "::placeholder": {
                  color: "#fff",
                },
              },
            },
          }}
        />
      </div>
      {/* {errorMessage && errorMessage.includes("number") && (
        <p className="text-green-800 text-sm ">{errorMessage}</p>
      )} */}
      <div className="flex gap-4 w-full">
        <div className="w-1/2 py-3 rounded-xl mb-4  text-white placeholder-white bg-custom-input px-4">
          <CardExpiryElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  fontWeight: "300",
                  color: "#fff",
                  "::placeholder": {
                    color: "#fff",
                  },
                },
              },
            }}
          />
        </div>
        {errorMessage && errorMessage.includes("expiry") && (
          <p className="text-green-800 text-sm">{errorMessage}</p>
        )}
        <div className="w-1/2 py-3 rounded-xl mb-4  text-white placeholder-white bg-custom-input px-4">
          <CardCvcElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  fontWeight: "300",
                  color: "#fff",
                  "::placeholder": {
                    color: "#fff",
                  },
                },
              },
            }}
          />
        </div>
        {errorMessage && errorMessage.includes("CVC") && (
          <p className="text-green-800 text-sm  text-left  w-full">
            {errorMessage}
          </p>
        )}
      </div>

      {errorMessage && (
        <p className="text-green-800 text-sm text-left  w-full">
          {errorMessage}
        </p>
      )}
      <p className="max-w-[520px] font-PPNeueMontreal500 text-sm md:text-lg lg:text-[20px] my-5 text-white">
        By clicking "Pay Now", you confirm that you have read and agree to our{" "}
        <span
          onClick={() => openCenteredWindow("/terms", "termsWindow", 800, 600)}
          className="underline cursor-pointer"
        >
          terms of use,
        </span>{" "}
        <span
          onClick={() =>
            openCenteredWindow("/privacy-policy", "privacyWindow", 1200, 600)
          }
          className="underline cursor-pointer"
        >
          privacy policy,
        </span>{" "}
        <span
          onClick={() =>
            openCenteredWindow("/cookies-policy", "cookiesWindow", 1200, 600)
          }
          className="underline cursor-pointer"
        >
          cookies policy,
        </span>{" "}
        and{" "}
        <span
          onClick={() =>
            openCenteredWindow("/disclaimer", "disclaimerWindow", 1200, 600)
          }
          className="underline cursor-pointer"
        >
          disclaimer
        </span>
        .
      </p>

      <button
        type="submit"
        className="bg-white mt-5 rounded-full py-2 px-12 w-[222px] h-[54px] text-lg text-black font-PPNeueMontreal500"
        disabled={isProcessing}
      >
        Pay Now
      </button>
    </form>
  );
};

export default Checkout;
