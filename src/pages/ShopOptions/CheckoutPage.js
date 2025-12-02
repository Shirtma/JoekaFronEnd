import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  FiLock,
  FiArrowLeft,
  FiCheck,
  FiCreditCard,
  FiTruck,
  FiShield,
  FiPhone,
  FiMail,
  FiMapPin,
  FiUser,
} from "react-icons/fi";
import { useProductsContext } from "../../context/products_context";

const CheckoutPage = () => {
  const { cart, total, quantity, clearCart } = useProductsContext();
  const navigate = useNavigate();

  // Checkout Steps
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { id: 1, title: "Shipping", icon: FiTruck },
    { id: 2, title: "Payment", icon: FiCreditCard },
    { id: 3, title: "Review", icon: FiCheck },
  ];

  // Form Data
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    // postalCode: "",
    country: "Nigeria",

    // Payment Information
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",

    // Additional Options
    saveInfo: false,
    sameAsShipping: true,
    specialInstructions: "",
  });

  // Form Validation
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Shipping Options
  const getShippingOptions = useCallback(() => {
    const subtotal = calculateSubtotal();
    const isLagos = formData.state === "Lagos";
    const isNigeria = formData.country === "Nigeria";

    if (!isNigeria) {
      return [
        {
          id: "international",
          name: "International Shipping",
          price: "TBC",
          time: "Contact for delivery time",
          description:
            "Shipping cost will be calculated after entering your address and communicated via email before dispatch",
        },
      ];
    }

    // Free delivery for orders ₦200,000 and above
    const isFreeDelivery = subtotal >= 200000;

    return [
      {
        id: "within-lagos",
        name: isLagos ? "Lagos Delivery" : "Within Lagos",
        price: isFreeDelivery ? 0 : 3500,
        time: "1-3 working days",
        available: isLagos,
        description: isLagos
          ? isFreeDelivery
            ? "Free delivery (order above ₦200,000)"
            : "Standard Lagos delivery"
          : "Not available for your location",
      },
      {
        id: "outside-lagos",
        name: "Outside Lagos (Other States)",
        price: isFreeDelivery ? 0 : 8000,
        time: "3-4 working days",
        available: !isLagos,
        description: !isLagos
          ? isFreeDelivery
            ? "Free delivery (order above ₦200,000)"
            : "Delivery to other Nigerian states"
          : "Not available for Lagos addresses",
      },
    ];
  }, [formData.state, formData.country, total]);

  const [selectedShipping, setSelectedShipping] = useState("");

  // Auto-select appropriate shipping option when state/country changes
  useEffect(() => {
    const options = getShippingOptions();
    const availableOption = options.find((opt) => opt.available !== false);
    if (
      availableOption &&
      (!selectedShipping || !options.find((opt) => opt.id === selectedShipping))
    ) {
      setSelectedShipping(availableOption.id);
    }
  }, [
    formData.state,
    formData.country,
    total,
    selectedShipping,
    getShippingOptions,
  ]);

  // Payment Methods
  const paymentMethods = [
    // { id: "card", name: "Credit/Debit Card", icon: FiCreditCard },
    { id: "paystack", name: "Paystack", icon: FiShield },
    { id: "bank", name: "Bank Transfer", icon: FiShield },
  ];

  const [selectedPayment, setSelectedPayment] = useState("paystack");

  // Nigerian States
  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Federal Capital Territory",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  // Redirect to cart if empty
  useEffect(() => {
    if (cart.length === 0) {
      //   navigate("/cart");
    }
  }, [cart.length, navigate]);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate Form Step
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      // Shipping validation
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email is invalid";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.country) newErrors.country = "Country is required";
      if (formData.country === "Nigeria" && !formData.state)
        newErrors.state = "State is required";
    }

    if (step === 2 && selectedPayment === "card") {
      // Payment validation
      if (!formData.cardNumber.trim())
        newErrors.cardNumber = "Card number is required";
      if (!formData.expiryDate.trim())
        newErrors.expiryDate = "Expiry date is required";
      if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
      if (!formData.cardholderName.trim())
        newErrors.cardholderName = "Cardholder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Next Step
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  // Handle Previous Step
  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Handle Order Submission
  const handleSubmitOrder = async () => {
    if (!validateStep(currentStep)) return;

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart and redirect to success page
      clearCart();
      navigate("/order-success", {
        state: {
          orderNumber: `JK${Date.now()}`,
          total: calculateTotal(),
        },
      });
    } catch (error) {
      console.error("Order submission failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate totals
  const calculateSubtotal = () => total;
  const calculateShipping = () => {
    const options = getShippingOptions();
    const selectedOption = options.find((opt) => opt.id === selectedShipping);
    return selectedOption && typeof selectedOption.price === "number"
      ? selectedOption.price
      : 0;
  };
  const calculateTax = () => Math.round(calculateSubtotal() * 0.075); // 7.5% VAT
  const calculateTotal = () => {
    const shippingCost = calculateShipping();
    return calculateSubtotal() + shippingCost + calculateTax();
  };

  // Format card number display
  const formatCardNumber = (value) => {
    return (
      value
        .replace(/\s+/g, "")
        .replace(/[^0-9]/gi, "")
        .match(/.{1,4}/g)
        ?.join(" ") || value
    );
  };

  if (cart.length === 0) {
    return (
      <CheckoutContainer>
        <div className="container">
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <h2>Your cart is empty</h2>
            <p>Add some items to your cart to proceed with checkout.</p>
            <button
              style={{
                background: "#000",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "1rem",
              }}
              onClick={() => navigate("/shop")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <div className="container">
        {/* Header */}
        <div className="checkout-header">
          <Link to="/cart" className="back-link">
            <FiArrowLeft /> Back to Cart
          </Link>
          <div className="security-badge">
            <FiLock /> Secure Checkout
          </div>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`step ${currentStep >= step.id ? "active" : ""} ${
                currentStep > step.id ? "completed" : ""
              }`}
            >
              <div className="step-icon">
                {currentStep > step.id ? <FiCheck /> : <step.icon />}
              </div>
              <div className="step-info">
                <div className="step-number">Step {step.id}</div>
                <div className="step-title">{step.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="checkout-content">
          {/* Main Form */}
          <div className="checkout-form">
            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <div className="form-section">
                <h2>Shipping Information</h2>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="firstName">
                      <FiUser /> First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? "error" : ""}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <span className="error-text">{errors.firstName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? "error" : ""}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <span className="error-text">{errors.lastName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <FiMail /> Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "error" : ""}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <span className="error-text">{errors.email}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      <FiPhone /> Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? "error" : ""}
                      placeholder="+234 xxx xxx xxxx"
                    />
                    {errors.phone && (
                      <span className="error-text">{errors.phone}</span>
                    )}
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="address">
                      <FiMapPin /> Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? "error" : ""}
                      placeholder="Enter your street address"
                    />
                    {errors.address && (
                      <span className="error-text">{errors.address}</span>
                    )}
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="apartment">
                      Apartment, Suite, etc. (Optional)
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      placeholder="Apartment, suite, unit, building, floor, etc."
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? "error" : ""}
                      placeholder="Enter your city"
                    />
                    {errors.city && (
                      <span className="error-text">{errors.city}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="country">Country *</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={errors.country ? "error" : ""}
                    >
                      <option value="">Select Country</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Australia">Australia</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.country && (
                      <span className="error-text">{errors.country}</span>
                    )}
                  </div>

                  {formData.country === "Nigeria" && (
                    <div className="form-group">
                      <label htmlFor="state">State *</label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={errors.state ? "error" : ""}
                      >
                        <option value="">Select State</option>
                        {nigerianStates.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <span className="error-text">{errors.state}</span>
                      )}
                    </div>
                  )}

                  {formData.country && formData.country !== "Nigeria" && (
                    <div className="form-group">
                      <label htmlFor="state">State/Province/Region</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Enter your state/province/region"
                      />
                    </div>
                  )}

                  {/* <div className="form-group">
                    <label htmlFor="postalCode">Postal Code *</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={errors.postalCode ? "error" : ""}
                      placeholder="Enter postal code"
                    />
                    {errors.postalCode && (
                      <span className="error-text">{errors.postalCode}</span>
                    )}
                  </div> */}
                </div>

                {/* Shipping Options */}
                <div className="shipping-options">
                  <h3>Delivery Options</h3>
                  {formData.state && formData.country && (
                    <>
                      {getShippingOptions().map((option) => (
                        <label
                          key={option.id}
                          className={`shipping-option ${
                            option.available === false ? "disabled" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="shipping"
                            value={option.id}
                            checked={selectedShipping === option.id}
                            onChange={(e) =>
                              setSelectedShipping(e.target.value)
                            }
                            disabled={option.available === false}
                          />
                          <div className="shipping-info">
                            <div className="shipping-name">{option.name}</div>
                            <div className="shipping-time">{option.time}</div>
                            {option.description && (
                              <div className="shipping-description">
                                {option.description}
                              </div>
                            )}
                          </div>
                          <div className="shipping-price">
                            {option.price === "TBC"
                              ? "TBC"
                              : option.price === 0
                              ? "Free"
                              : `₦${option.price.toLocaleString()}`}
                          </div>
                        </label>
                      ))}

                      {calculateSubtotal() >= 200000 &&
                        formData.country === "Nigeria" && (
                          <div className="free-delivery-notice">
                            🎉 You qualify for free delivery! Orders above
                            ₦200,000 get free shipping within Nigeria.
                          </div>
                        )}

                      {formData.country !== "Nigeria" && (
                        <div className="international-notice">
                          📧 For international orders, we'll contact you via
                          email with the calculated shipping cost before
                          dispatching your order.
                        </div>
                      )}
                    </>
                  )}

                  {(!formData.state || !formData.country) && (
                    <div className="shipping-placeholder">
                      Please select your country and state to see delivery
                      options.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="form-section">
                <h2>Payment Information</h2>

                {/* Payment Methods */}
                <div className="payment-methods">
                  <h3>Payment Method</h3>
                  {paymentMethods.map((method) => (
                    <label key={method.id} className="payment-method">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                      />
                      <method.icon />
                      <span>{method.name}</span>
                    </label>
                  ))}
                </div>

                {/* Card Details */}
                {selectedPayment === "card" && (
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label htmlFor="cardNumber">Card Number *</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formatCardNumber(formData.cardNumber)}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\s+/g, "")
                            .replace(/[^0-9]/gi, "");
                          if (value.length <= 16) {
                            handleInputChange({
                              target: { name: "cardNumber", value },
                            });
                          }
                        }}
                        className={errors.cardNumber ? "error" : ""}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                      {errors.cardNumber && (
                        <span className="error-text">{errors.cardNumber}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date *</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, "");
                          if (value.length >= 2) {
                            value =
                              value.substring(0, 2) +
                              "/" +
                              value.substring(2, 4);
                          }
                          handleInputChange({
                            target: { name: "expiryDate", value },
                          });
                        }}
                        className={errors.expiryDate ? "error" : ""}
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                      {errors.expiryDate && (
                        <span className="error-text">{errors.expiryDate}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="cvv">CVV *</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 4) {
                            handleInputChange({
                              target: { name: "cvv", value },
                            });
                          }
                        }}
                        className={errors.cvv ? "error" : ""}
                        placeholder="123"
                        maxLength="4"
                      />
                      {errors.cvv && (
                        <span className="error-text">{errors.cvv}</span>
                      )}
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="cardholderName">Cardholder Name *</label>
                      <input
                        type="text"
                        id="cardholderName"
                        name="cardholderName"
                        value={formData.cardholderName}
                        onChange={handleInputChange}
                        className={errors.cardholderName ? "error" : ""}
                        placeholder="Name as it appears on card"
                      />
                      {errors.cardholderName && (
                        <span className="error-text">
                          {errors.cardholderName}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Other Payment Methods Info */}
                {selectedPayment === "paystack" && (
                  <div className="payment-info">
                    <p>
                      You will be redirected to Paystack to complete your
                      payment securely.
                    </p>
                  </div>
                )}

                {selectedPayment === "bank" && (
                  <div className="payment-info">
                    <p>
                      Bank transfer details will be provided after order
                      confirmation.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="form-section">
                <h2>Order Review</h2>

                {/* Shipping Details */}
                <div className="review-section">
                  <h3>Shipping Address</h3>
                  <div className="review-details">
                    <p>
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p>{formData.address}</p>
                    {formData.apartment && <p>{formData.apartment}</p>}
                    {/* <p>
                      {formData.city}, {formData.state} {formData.postalCode}
                    </p> */}
                    <p>{formData.phone}</p>
                    <p>{formData.email}</p>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="review-section">
                  <h3>Payment Method</h3>
                  <div className="review-details">
                    <p>
                      {
                        paymentMethods.find((m) => m.id === selectedPayment)
                          ?.name
                      }
                    </p>
                    {selectedPayment === "card" && formData.cardNumber && (
                      <p>**** **** **** {formData.cardNumber.slice(-4)}</p>
                    )}
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="form-group full-width">
                  <label htmlFor="specialInstructions">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    placeholder="Any special delivery instructions..."
                    rows="3"
                  />
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="form-actions">
              {currentStep > 1 && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handlePrevStep}
                >
                  Previous
                </button>
              )}

              {currentStep < steps.length ? (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleNextStep}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleSubmitOrder}
                  disabled={isProcessing}
                >
                  {isProcessing
                    ? "Processing..."
                    : `Place Order - ₦${calculateTotal().toLocaleString()}`}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>

              {/* Cart Items */}
              <div className="summary-items">
                {cart.map((item) => (
                  <div key={item.cartId || item.id} className="summary-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      {(item.size || item.selectedSize) && (
                        <p>Size: {item.size || item.selectedSize}</p>
                      )}
                      {/* {(item.color || item.selectedColor) && (
                        <p>Color: {item.color || item.selectedColor}</p>
                      )} */}
                      <p>Qty: {item.amount}</p>
                    </div>
                    <div className="item-total">
                      ₦{(item.price * item.amount).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal ({quantity} items)</span>
                  <span>₦{calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span>
                    {calculateShipping() === 0
                      ? "Free"
                      : `₦${calculateShipping().toLocaleString()}`}
                  </span>
                </div>
                <div className="total-row">
                  <span>Tax (VAT 7.5%)</span>
                  <span>₦{calculateTax().toLocaleString()}</span>
                </div>
                <div className="total-divider"></div>
                <div className="total-row total-final">
                  <span>Total</span>
                  <span>₦{calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              {/* Security Badges */}
              <div className="security-info">
                <div className="security-item">
                  <FiShield />
                  <span>SSL Secured</span>
                </div>
                <div className="security-item">
                  <FiLock />
                  <span>Safe & Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CheckoutContainer>
  );
};

const CheckoutContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  padding-top: 1.2rem;
  min-height: 100vh;
  background: #fafafa;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem;

    @media (max-width: 768px) {
      padding: 2rem 1rem;
    }
  }

  .checkout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }

    .back-link {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: #333;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.4rem;

      &:hover {
        text-decoration: underline;
      }
    }

    .security-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #28a745;
      font-weight: 600;
      font-size: 1.4rem;
    }
  }

  .progress-steps {
    display: flex;
    justify-content: center;
    margin-bottom: 4rem;
    gap: 2rem;

    @media (max-width: 768px) {
      gap: 1rem;
      margin-bottom: 3rem;
    }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      opacity: 0.5;
      transition: all 0.3s ease;

      &.active {
        opacity: 1;
      }

      &.completed {
        opacity: 1;
        color: #28a745;
      }

      .step-icon {
        width: 50px;
        height: 50px;
        border: 2px solid #ddd;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        font-size: 2rem;
        transition: all 0.3s ease;

        @media (max-width: 768px) {
          width: 40px;
          height: 40px;
          font-size: 1.6rem;
        }
      }

      &.active .step-icon {
        border-color: #333;
        background: #d4af37;
        color: white;
      }

      &.completed .step-icon {
        border-color: #28a745;
        background: #28a745;
        color: white;
      }

      .step-info {
        text-align: center;

        .step-number {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 0.2rem;

          @media (max-width: 768px) {
            font-size: 1rem;
          }
        }

        .step-title {
          font-weight: 600;
          font-size: 1.4rem;

          @media (max-width: 768px) {
            font-size: 1.2rem;
          }
        }
      }
    }
  }

  .checkout-content {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 4rem;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }

  .checkout-form {
    background: white;
    border-radius: 12px;
    padding: 3rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

    @media (max-width: 768px) {
      padding: 2rem;
    }

    h2 {
      font-family: "Space Grotesk", sans-serif;
      font-size: 2.4rem;
      font-weight: 600;
      margin-bottom: 2rem;
      color: #333;

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    h3 {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #333;
    }
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .full-width {
      grid-column: 1 / -1;
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    label {
      font-weight: 600;
      font-size: 1.4rem;
      color: #333;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    input,
    select,
    textarea {
      padding: 1.2rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1.4rem;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: #333;
      }

      &.error {
        border-color: #dc3545;
      }

      &::placeholder {
        color: #999;
      }
    }

    textarea {
      resize: vertical;
      min-height: 100px;
    }

    .error-text {
      color: #dc3545;
      font-size: 1.2rem;
      margin-top: -0.5rem;
    }
  }

  .shipping-options {
    margin-top: 3rem;

    .shipping-option {
      display: flex;
      align-items: center;
      padding: 1.5rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      margin-bottom: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover:not(.disabled) {
        border-color: #333;
      }

      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background-color: #f8f9fa;
      }

      input[type="radio"] {
        margin-right: 1rem;
      }

      .shipping-info {
        flex: 1;

        .shipping-name {
          font-weight: 600;
          font-size: 1.4rem;
        }

        .shipping-time {
          font-size: 1.2rem;
          color: #666;
        }

        .shipping-description {
          font-size: 1.2rem;
          color: #888;
          margin-top: 0.5rem;
          font-style: italic;
        }
      }

      .shipping-price {
        font-weight: 600;
        font-size: 1.4rem;
        color: #333;
      }
    }

    .free-delivery-notice {
      background: #d4edda;
      color: #155724;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      font-weight: 500;
      font-size: 1.3rem;
    }

    .international-notice {
      background: #fff3cd;
      color: #856404;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      font-weight: 500;
      font-size: 1.3rem;
    }

    .shipping-placeholder {
      background: #f8f9fa;
      color: #666;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      font-size: 1.4rem;
    }
  }

  .payment-methods {
    margin-bottom: 2rem;

    .payment-method {
      display: flex;
      align-items: center;
      padding: 1.5rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      margin-bottom: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      gap: 1rem;

      &:hover {
        border-color: #333;
      }

      input[type="radio"] {
        margin: 0;
      }

      svg {
        font-size: 2rem;
      }

      span {
        font-weight: 600;
        font-size: 1.4rem;
      }
    }
  }

  .payment-info {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 8px;
    margin-top: 2rem;

    p {
      margin: 0;
      font-size: 1.4rem;
      color: #666;
    }
  }

  .review-section {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e0e0e0;

    h3 {
      margin-bottom: 1rem;
    }

    .review-details {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;

      p {
        margin: 0.5rem 0;
        font-size: 1.4rem;
      }
    }
  }

  .form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    gap: 1rem;

    @media (max-width: 480px) {
      flex-direction: column;
    }

    .btn-primary,
    .btn-secondary {
      padding: 1.5rem 3rem;
      border-radius: 8px;
      font-size: 1.6rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      @media (max-width: 480px) {
        padding: 1.5rem 2rem;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .btn-primary {
      border: 1px solid #0a0a0a;
      background: rgba(245, 236, 225, 0.95);
      color: #0a0a0a;

      &:hover:not(:disabled) {
        background: rgba(245, 236, 225, 1);
        transform: translateY(-2px);
      }
    }

    .btn-secondary {
      background: transparent;
      color: #0a0a0a;
      border: 1px solid #0a0a0a;

      &:hover {
        background: #f8f8f5;
        color: white;
      }
    }
  }

  .order-summary {
    .summary-card {
      background: white;
      border-radius: 12px;
      padding: 2.5rem;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      position: sticky;
      top: 2rem;

      @media (max-width: 992px) {
        position: static;
      }

      h3 {
        font-family: "Space Grotesk", sans-serif;
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 2rem;
        color: #333;
      }
    }
  }

  .summary-items {
    .summary-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 8px;
      }

      .item-details {
        flex: 1;

        h4 {
          font-size: 1.4rem;
          margin: 0 0 0.5rem 0;
        }

        p {
          font-size: 1.2rem;
          color: #666;
          margin: 0.2rem 0;
        }
      }

      .item-total {
        font-weight: 600;
        font-size: 1.4rem;
        color: #333;
      }
    }
  }

  .summary-totals {
    margin-top: 2rem;

    .total-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      font-size: 1.4rem;

      &.total-final {
        font-size: 1.8rem;
        font-weight: 700;
        color: #333;
      }
    }

    .total-divider {
      height: 1px;
      background: #e0e0e0;
      margin: 1.5rem 0;
    }
  }

  .security-info {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e0e0e0;

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 1rem;
    }

    .security-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.2rem;
      color: #28a745;
    }
  }
`;

export default CheckoutPage;
