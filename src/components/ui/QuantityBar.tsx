import { useState } from 'react';
import { Button, TextInput } from 'evergreen-ui';

export const QuantityBar = ({
  quantity,
  setQuantity,
  label,
}: { quantity: number, label?: string, setQuantity: (value: number) => void }) => {

  const handleQuantity = {
    increment: () => {
      setQuantity(quantity + 1);
    },
    decrement: () => {
      if (quantity >= 2) setQuantity(quantity - 1);
    },
  };

  return (
    <div className="quantity-container" style={{ margin: "auto" }}>
      {label && (<p className="label">{label}</p>)}
      <div className="quantity-wrapper">
        <Button onClick={handleQuantity.decrement} borderRadius="0" borderRight="none">-</Button>
        <TextInput
          type="number"
          value={quantity}
          onChange={() => {}}
          required
          borderRadius="1"
          borderLeft="none"
          borderRight="none"
          borderColor="#c1c4d6"
          width={50}
          min="0"
          display="flex"
          alignContent="center"
          paddingX={5}
        />
        <Button onClick={handleQuantity.increment} borderRadius="0" borderLeft="none">+</Button>
      </div>
    </div>
  );
};
