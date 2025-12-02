import React from "react";
import styled, { keyframes } from "styled-components";

const GlobalModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        {children}
      </ModalBox>
    </Overlay>
  );
};

export default GlobalModal;

/* ---- Animations ---- */
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  animation: ${fadeIn} 0.25s ease-out forwards;
`;

const ModalBox = styled.div`
  background: #fff;
  width: 90%;
  max-width: 450px;
  padding: 30px;
  border-radius: 10px;
  position: relative;
  animation: ${slideUp} 0.3s ease-out forwards;

  .close-btn {
    position: absolute;
    top: 10px;
    right: 14px;
    border: none;
    background: transparent;
    font-size: 22px;
    cursor: pointer;
  }
`;
