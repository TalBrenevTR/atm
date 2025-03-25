const cards = ["star",
               "pulse",
               "maestro",
               "mastercard",
               "plus",
               "visa"];

export function Cards({ activeCard } : { activeCard: string | null}) {
  return (
    <div className="atm-cards">
      {cards.map((card) => 
                 <img src={"img/cards/" + 
                           card +
                           (card === activeCard ? "_active" : "_inactive") +
                           ".png"} 
                      alt={card}
                      key={card} />)}
    </div>
  )
}
