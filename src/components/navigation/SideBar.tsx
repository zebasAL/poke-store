import { useState } from 'react';
import {
  SideSheet, Pane, Heading, Tablist, Button, Icon, MenuIcon, Pill, ShoppingCartIcon, BankAccountIcon
} from 'evergreen-ui';
import { Link } from "react-router-dom";
import { default as Cart } from "../ui/Cart"

export const SideBar = () => {
  const [isSideBarShown, setIsSideBarShown] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);

  return (
    <div className="aside-navbar">
      <SideSheet
        width={200}
        isShown={isSideBarShown}
        onCloseComplete={() => setIsSideBarShown(false)}
        containerProps={{
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
        }}
      >
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16}><Heading className="aside-navbar-header" size={600} textAlign="center">MENU</Heading></Pane>
          <Tablist display="flex" flexDirection="column" flex="1" padding={8}>

            <Button
              is={Link}
              to={`/user/account-founds`}
              appearance="minimal"
              id="shopping-cart-btn"
            >
              <Icon id="shopping-cart-label" icon={BankAccountIcon} paddingRight={5} size={25} />
              Account founds
            </Button>

            <Button
              type="button"
              appearance="minimal"
              id="shopping-cart-btn"
            >
              <Icon id="shopping-cart-label" icon={ShoppingCartIcon} padding={0} size={25} />
              <Pill data-cy="cart-products-number" marginY="10px" paddingX={4} display="block">
                4
              </Pill>
            </Button>

          </Tablist>
        </Pane>
      </SideSheet>
      <Button data-cy="aside-navbar" border="none" height={30} onClick={() => setIsSideBarShown(true)}>
        <Icon icon={MenuIcon} size={20} />
      </Button>

      {/* {showCart && (<Cart cart={null} />)} */}

    </div>
  );
};
