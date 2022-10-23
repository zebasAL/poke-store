import { useState } from 'react';
import { Button, TextInput } from 'evergreen-ui';

export const QuantityBar = ({
  quantity,
  label,
}: { quantity?: number, label?: string }) => {
  const [value, setValue] = useState<number>(quantity ?? 1);

  const handleQuantity = {
    increment: () => {
      setValue((prevCount) => prevCount + 1);
    },
    decrement: () => {
      if (value >= 2) setValue((prevCount) => prevCount - 1);
    },
  };

  return (
    <div className="quantity-container" style={{ margin: "auto" }}>
      {label && (<p className="label">{label}</p>)}
      <div className="quantity-wrapper">
        <Button onClick={handleQuantity.decrement} borderRadius="0" borderRight="none">-</Button>
        <TextInput
          type="number"
          value={value}
          required
          onChange={() => {}}
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
