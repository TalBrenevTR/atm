import React from 'react';

export function CardReader ({ setCardNumber } :
                            { setCardNumber: (cardNumber: string) => void }) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {cardNumber: { value: string }};
    setCardNumber(target.cardNumber.value);
  }

  return (
    <div className="CardReader">
      <form onSubmit={handleSubmit}>
        <p>Enter Card Number:</p>
        <input type="text" name="cardNumber" />
        <input type="submit" />
      </form>
    </div>
  );
}
