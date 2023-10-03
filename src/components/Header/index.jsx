import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { FaChevronDown } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { RiShoppingBag2Line } from "react-icons/ri";

import Logo from "../../assets/logo.svg";
import iconSearch from "../../assets/search-icon.svg";

import { Input } from "../Input";
import { NavMenu } from "../Nav-Menu";

import { Container } from "./style";

export function Header() {
  const [ menuDesktop, setMenuDesktop ] = useState("close");

  const isAdmin = true;

  const navigate = useNavigate();
  const route = useLocation();

  function navigateMenu() {
    if(window.innerWidth < 1000) {
      if(route.pathname != "/menu") {
        navigate("/menu");
        return;
      }

      navigate(-1);
    }

  }

  function handleMenuDesktopDisplayBlock() {
    if(window.innerWidth >= 1000) {
      setMenuDesktop("open");
    }

    document.querySelector(".firstButton svg").style.animation = "rotate180 0.3s forwards";
  }

  function handleMenuDesktopDisplayNone() {
    if(window.innerWidth >= 1000) {
      setMenuDesktop("close");
    }

    document.querySelector(".firstButton svg").style.animation = "rotate180 reverse 0.3s forwards";
  }

  function navigateShopping() {
    if(route.pathname != "/shopping-cart") {
      navigate("/shopping-cart");
    }
    
  }

  function navigateFavorites() {
    navigate("/favorites");
  }

  function navigateNewOutfit() {
    navigate("/new-outfit");
  }

  useEffect(() => {
    const menu = document.querySelector(".boxButtons aside");
    const modal = sessionStorage.getItem("@zer01modas:modal");
    
    if(menu) {
      if(menuDesktop == "open") {
        menu.style.display = "flex";

      } else if(menuDesktop == "close" && !modal) {
        menu.style.display = "none";

      }
    }
    
  }, [ menuDesktop ]);

  return (
    <Container $pathname={ route.pathname } $isAdmin={ isAdmin }>

      <div>
        <p> Sua moda é feita aqui ;) </p>
        <ul>
          <li> <a href="#"> Política de privacidade </a> </li>
          <li> <a href="#"> Contato </a> </li>
          <li> <a href="#"> Ajuda </a> </li>
        </ul>
      </div>

      <div>
        <img src={ Logo } alt="Logomarca" />

        <div className="boxButtons">
          <button className="firstButton" onClick={ navigateMenu } onMouseOver={ handleMenuDesktopDisplayBlock } onMouseOut={ handleMenuDesktopDisplayNone } >
            <p> Olá, <strong> nane </strong> </p>
            <FaChevronDown size={ 20 } />
          </button>
          <NavMenu onMouseOver={ handleMenuDesktopDisplayBlock } onMouseOut={ handleMenuDesktopDisplayNone }  />

          {
            !isAdmin &&
          <button>
            <FiHeart size={ 25 } onClick={ navigateFavorites } />
            <span> 0 </span>
          </button>
          }
          {
            !isAdmin &&
          <button>
            <RiShoppingBag2Line size={ 25 } onClick={ navigateShopping } />
            <span> 0 </span>
          </button>
          }
        </div>

        <Input className="input" placeholder="O que vai querer hoje?" icon={ iconSearch } />
      </div>

    </Container>
  )
}