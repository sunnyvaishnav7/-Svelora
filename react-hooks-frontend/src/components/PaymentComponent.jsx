import React, { useState } from 'react';
import './PaymentComponent.css';
import phonepeQR from '../assets/phonepayqr.jpg';

const PaymentComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('basic');
  
  // Card details state
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const plans = {
    basic: "10",
    standard: "29",
    premium: "79"
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    // Reset card details when switching payment methods
    setCardDetails({
      number: '',
      name: '',
      expiry: '',
      cvv: ''
    });
  };

  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
  };

  // Handle card input changes
  const handleCardInputChange = (field, value) => {
    let formattedValue = value;
    
    // Format card number with spaces
    if (field === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    }
    
    // Format expiry date
    if (field === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    }
    
    // Format CVV (3-4 digits only)
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    
    // Format name (uppercase)
    if (field === 'name') {
      formattedValue = value.toUpperCase();
    }
    
    setCardDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  // Get card type based on number
  const getCardType = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'mastercard';
    if (cleanNumber.startsWith('3')) return 'amex';
    return 'default';
  };

  return (
    <div className="payment-container">
      <h2>Choose Your Plan</h2>
      <select value={selectedPlan} onChange={handlePlanChange}>
        <option value="basic">Basic - $10</option>
        <option value="standard">Standard - $29</option>
        <option value="premium">Premium - $79</option>
      </select>

      <h3>Amount to Pay: ${plans[selectedPlan]}</h3>

      <h2>Choose Payment Method</h2>
      <div className="payment-options">
        <label>
          <input
            type="radio"
            value="debit"
            checked={selectedOption === 'debit'}
            onChange={handleOptionChange}
          />
          Debit Card
        </label>
        <label>
          <input
            type="radio"
            value="credit"
            checked={selectedOption === 'credit'}
            onChange={handleOptionChange}
          />
          Credit Card
        </label>
        <label>
          <input
            type="radio"
            value="gpay"
            checked={selectedOption === 'gpay'}
            onChange={handleOptionChange}
          />
          Google Pay / PhonePe
        </label>
        <label>
          <input
            type="radio"
            value="upi"
            checked={selectedOption === 'upi'}
            onChange={handleOptionChange}
          />
          UPI ID
        </label>
      </div>

      {/* Debit Card Section */}
      {selectedOption === 'debit' && (
        <div className="payment-section card-payment-section">
          <h3>Debit Card Details</h3>
          
          {/* Interactive Card Display */}
          <div className="card-display">
            <div className={`credit-card debit-card ${getCardType(cardDetails.number)}`}>
              <div className="card-background">
                <div className="card-chip"></div>
                <div className="card-logo">
                  {getCardType(cardDetails.number) === 'visa' && <span className="visa-logo">VISA</span>}
                  {getCardType(cardDetails.number) === 'mastercard' && <span className="mastercard-logo">Mastercard</span>}
                  {getCardType(cardDetails.number) === 'amex' && <span className="amex-logo">AMEX</span>}
                </div>
                
                <div className="card-number">
                  {cardDetails.number || '•••• •••• •••• ••••'}
                </div>
                
                <div className="card-details">
                  <div className="card-holder">
                    <div className="label">Card Holder</div>
                    <div className="value">{cardDetails.name || 'YOUR NAME'}</div>
                  </div>
                  <div className="card-expiry">
                    <div className="label">Expires</div>
                    <div className="value">{cardDetails.expiry || 'MM/YY'}</div>
                  </div>
                </div>
              </div>
              
              {/* Card Back (for CVV) */}
              <div className="card-back">
                <div className="magnetic-strip"></div>
                <div className="cvv-panel">
                  <div className="cvv-label">CVV</div>
                  <div className="cvv-value">{cardDetails.cvv || '•••'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Fields */}
          <div className="card-inputs">
            <input 
              type="text" 
              placeholder="Card Number"
              value={cardDetails.number}
              onChange={(e) => handleCardInputChange('number', e.target.value)}
              maxLength="19"
            />
            <input 
              type="text" 
              placeholder="Card Holder Name"
              value={cardDetails.name}
              onChange={(e) => handleCardInputChange('name', e.target.value)}
            />
            <div className="card-row">
              <input 
                type="text" 
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                maxLength="5"
              />
              <input 
                type="text" 
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                maxLength="4"
              />
            </div>
          </div>
        </div>
      )}

      {/* Credit Card Section */}
      {selectedOption === 'credit' && (
        <div className="payment-section card-payment-section">
          <h3>Credit Card Details</h3>
          
          {/* Interactive Card Display */}
          <div className="card-display">
            <div className={`credit-card credit-card-type ${getCardType(cardDetails.number)}`}>
              <div className="card-background">
                <div className="card-chip"></div>
                <div className="card-logo">
                  {getCardType(cardDetails.number) === 'visa' && <span className="visa-logo">VISA</span>}
                  {getCardType(cardDetails.number) === 'mastercard' && <span className="mastercard-logo">Mastercard</span>}
                  {getCardType(cardDetails.number) === 'amex' && <span className="amex-logo">AMEX</span>}
                </div>
                
                <div className="card-number">
                  {cardDetails.number || '•••• •••• •••• ••••'}
                </div>
                
                <div className="card-details">
                  <div className="card-holder">
                    <div className="label">Card Holder</div>
                    <div className="value">{cardDetails.name || 'YOUR NAME'}</div>
                  </div>
                  <div className="card-expiry">
                    <div className="label">Expires</div>
                    <div className="value">{cardDetails.expiry || 'MM/YY'}</div>
                  </div>
                </div>
              </div>
              
              {/* Card Back (for CVV) */}
              <div className="card-back">
                <div className="magnetic-strip"></div>
                <div className="cvv-panel">
                  <div className="cvv-label">CVV</div>
                  <div className="cvv-value">{cardDetails.cvv || '•••'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Fields */}
          <div className="card-inputs">
            <input 
              type="text" 
              placeholder="Card Number"
              value={cardDetails.number}
              onChange={(e) => handleCardInputChange('number', e.target.value)}
              maxLength="19"
            />
            <input 
              type="text" 
              placeholder="Card Holder Name"
              value={cardDetails.name}
              onChange={(e) => handleCardInputChange('name', e.target.value)}
            />
            <div className="card-row">
              <input 
                type="text" 
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                maxLength="5"
              />
              <input 
                type="text" 
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                maxLength="4"
                onFocus={() => document.querySelector('.credit-card').classList.add('flipped')}
                onBlur={() => document.querySelector('.credit-card').classList.remove('flipped')}
              />
            </div>
          </div>
        </div>
      )}

      {/* Google Pay / PhonePe Section */}
      {selectedOption === 'gpay' && (
        <div className="payment-section">
          <h3>Google Pay / PhonePe</h3>
          <p>Scan the QR code below or proceed using your mobile app.</p>
          <img
            src={phonepeQR}
            alt="QR code"
            className="qr-code"
          />
        </div>
      )}

      {/* UPI Section */}
      {selectedOption === 'upi' && (
        <div className="payment-section">
          <h3>Pay via UPI</h3>
          <input type="text" placeholder="Enter your UPI ID" />
          <button>Pay Now</button>
        </div>
      )}

      {selectedOption && (
        <button className="pay-btn">Proceed to Pay ${plans[selectedPlan]}</button>
      )}
    </div>
  );
};

export default PaymentComponent;