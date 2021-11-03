import { NavLink } from "react-router-dom";
import styled from "styled-components";
import theme from "theme";
import { Button, Toolbar as MToolbar } from "@material-ui/core";

export const Header = styled.header`
  background-color: black;
  color: white;
`;

export const LogoLink = styled(NavLink)`
  padding: 2rem 1rem 0.5rem 1rem;
`;

export const HeaderToolbar = styled(MToolbar)`
  max-height: "64px";
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  min-height: 4rem;
  box-sizing: border-box;
`;

export const LeftToolbar = styled.div`
  display: flex;
  padding: 0;
  align-items: center;
`;

export const RightToolbar = styled.div`
  display: flex;
  padding: 0;
  align-items: center;
`;

export const MainMenuBox = styled.div`
  cursor: pointer;
`;

export const MenuItem = styled(Button)`
  &.MuiButtonBase-root {
    width: 100%;
    height: 3rem;
    justify-content: flex-start;
    font-size: 0.8125rem;
  }
`;

export const MainMenuLink = styled(NavLink)`
  text-transform: uppercase;
  padding: 1.5rem 1rem 20px 1rem;
  color: white;
  font-weight: 500;
  line-height: 20px;
  font-size: 0.8125rem;
  &.active {
    background-color: #424242;
    border-bottom: 4px solid white;
  }
`;
