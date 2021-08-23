import React from 'react';
import styled from 'styled-components';

const FooterBox = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
`;

const Logo = styled.img`
  margin-left: auto;
  margin-right: auto;
  width: 235px;
  height: 39px;
`;

const Line = styled.div`
  width: 100%;
  height: 10px;
  background-color: #1c6434;
`;

const Footer = () => (
  <FooterBox>
    <Logo src={`${process.env.PUBLIC_URL}/assets/img/logo_zakopane_3.svg`} alt="Logo" />
    <Line />
  </FooterBox>
);

export default Footer;
