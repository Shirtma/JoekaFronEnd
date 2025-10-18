import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FiEdit3,
  FiSave,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const ProfileTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+234 803 123 4567",
    address: "123 Main Street",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    dateJoined: "2024-01-15",
  });
  const [editData, setEditData] = useState({ ...profileData });
  const [errors, setErrors] = useState({});

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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!editData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!editData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!editData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(editData.email))
      newErrors.email = "Email is invalid";
    if (!editData.phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save
  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/profile/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Add authorization header if needed
          },
          body: JSON.stringify(editData),
        }
      );

      if (response.ok) {
        setProfileData({ ...editData });
        setIsEditing(false);
        // Show success message
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      // Show error message
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setEditData({ ...profileData });
    setErrors({});
    setIsEditing(false);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <ProfileContainer>
      <div className="profile-header">
        <div className="profile-info">
          <div className="avatar">
            <FiUser />
          </div>
          <div className="user-info">
            <h2>
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p>Member since {formatDate(profileData.dateJoined)}</p>
          </div>
        </div>

        {!isEditing && (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            <FiEdit3 />
            Edit Profile
          </button>
        )}
      </div>

      <div className="profile-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="firstName">
              <FiUser /> First Name
            </label>
            {isEditing ? (
              <>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={editData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? "error" : ""}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <span className="error-text">{errors.firstName}</span>
                )}
              </>
            ) : (
              <div className="form-display">{profileData.firstName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            {isEditing ? (
              <>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={editData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? "error" : ""}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <span className="error-text">{errors.lastName}</span>
                )}
              </>
            ) : (
              <div className="form-display">{profileData.lastName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <FiMail /> Email Address
            </label>
            {isEditing ? (
              <>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "error" : ""}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </>
            ) : (
              <div className="form-display">{profileData.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <FiPhone /> Phone Number
            </label>
            {isEditing ? (
              <>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={editData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? "error" : ""}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <span className="error-text">{errors.phone}</span>
                )}
              </>
            ) : (
              <div className="form-display">{profileData.phone}</div>
            )}
          </div>

          <div className="form-group full-width">
            <label htmlFor="address">
              <FiMapPin /> Address
            </label>
            {isEditing ? (
              <input
                type="text"
                id="address"
                name="address"
                value={editData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
            ) : (
              <div className="form-display">
                {profileData.address || "Not provided"}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            {isEditing ? (
              <input
                type="text"
                id="city"
                name="city"
                value={editData.city}
                onChange={handleInputChange}
                placeholder="Enter your city"
              />
            ) : (
              <div className="form-display">
                {profileData.city || "Not provided"}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            {isEditing ? (
              <select
                id="state"
                name="state"
                value={editData.state}
                onChange={handleInputChange}
              >
                <option value="">Select State</option>
                {nigerianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            ) : (
              <div className="form-display">
                {profileData.state || "Not provided"}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            {isEditing ? (
              <select
                id="country"
                name="country"
                value={editData.country}
                onChange={handleInputChange}
              >
                <option value="Nigeria">Nigeria</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <div className="form-display">{profileData.country}</div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="form-actions">
            <button className="cancel-btn" onClick={handleCancel}>
              <FiX />
              Cancel
            </button>
            <button
              className="save-btn"
              onClick={handleSave}
              disabled={isLoading}
            >
              <FiSave />
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  .profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e0e0e0;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 2rem;
      align-items: flex-start;
    }

    .profile-info {
      display: flex;
      align-items: center;
      gap: 2rem;

      .avatar {
        width: 80px;
        height: 80px;
        background: #d4af37;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 3rem;

        @media (max-width: 768px) {
          width: 60px;
          height: 60px;
          font-size: 2.4rem;
        }
      }

      .user-info {
        h2 {
          font-family: "Space Grotesk", sans-serif;
          font-size: 2.4rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: #333;

          @media (max-width: 768px) {
            font-size: 2rem;
          }
        }

        p {
          font-size: 1.4rem;
          color: #666;
          margin: 0;
        }
      }
    }

    .edit-btn {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      background: #0a0a0a;
      color: white;
      border: none;
      padding: 1.2rem 2rem;
      border-radius: 8px;
      font-size: 1.4rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #000;
        transform: translateY(-1px);
      }
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
    select {
      padding: 1.2rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1.4rem;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: #d4af37;
      }

      &.error {
        border-color: #dc3545;
      }

      &::placeholder {
        color: #999;
      }
    }

    .form-display {
      padding: 1.2rem 0;
      font-size: 1.4rem;
      color: #333;
      border-bottom: 1px solid #f0f0f0;
    }

    .error-text {
      color: #dc3545;
      font-size: 1.2rem;
      margin-top: -0.5rem;
    }
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e0e0e0;

    @media (max-width: 480px) {
      flex-direction: column;
    }

    button {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 1.2rem 2rem;
      border-radius: 8px;
      font-size: 1.4rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .cancel-btn {
      background: transparent;
      color: #666;
      border: 2px solid #e0e0e0;

      &:hover {
        background: #f8f9fa;
        border-color: #333;
        color: #333;
      }
    }

    .save-btn {
      background: #0a0a0a;
      color: white;

      &:hover:not(:disabled) {
        background: #000;
        transform: translateY(-1px);
      }
    }
  }
`;

export default ProfileTab;
