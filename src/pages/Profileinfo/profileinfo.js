import React, { useState } from 'react';
import naijaNumber from 'naija-phone-number';
import Button from '../../components/button';
import Input from '../../components/input';
import colours from '../../lib/colours';

function Profileinfo() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const checkoutFirstName = localStorage.user && JSON.parse(localStorage.user).firstName;
  const checkoutLastName = localStorage.user && JSON.parse(localStorage.user).lastName;
  const checkoutEmail = localStorage.user && JSON.parse(localStorage.user).email;

  const validateField = !!phoneNumber.length && naijaNumber.isValid(phoneNumber);

  return (
    <div className="profile__gridRight">
      <p>
        Hi,{' '}
        {checkoutFirstName}
      </p>
      <span>See your profile details below</span>
      <div className="profile__a">
        <div className="profile__first-row">
          <div className="profile__formNo">
          <Input
            label="Firstname"
            name="firstname"
            type="text"
            placeholder="Firstname"
            value={checkoutFirstName}
            disabled
          />
        </div>
        <div className="profile__formNo">
          <Input
            label="Lastname"
            name="lastname"
            type="text"
            value={checkoutLastName}
            placeholder="Lastname"
            disabled
          />
        </div>
        </div>
        <div className="profile__formNo">
          <Input
            label="Email Address"
            name="Email Address"
            type="text"
            value={checkoutEmail}
            placeholder="Email Address"
            disabled
          />
        </div>
        <div className="profile__formNo">
          <Input
            label="Phone Number"
            name="phoneNumber"
            type="text"
            labelClassName="contact__form-label"
            className="contact__form-input"
            outClassName="contact__form-out"
            placeholder="Phone Number"
            style={{ color: '#000' }}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <Button
          text="SAVE CHANGES"
          backgroundColour={
            !validateField ? colours.primarygold400 : colours.primarygold600
          }
          className="update-info-btn"
          style={{
            cursor: validateField ? 'pointer' : '',
            height: '47px'
          }}
        />
      </div>
    </div>
  );
}

export default Profileinfo;
