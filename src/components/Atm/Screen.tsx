
export function Screen({ mainText, typedText, buttonLabels, buttonHandlers }:
                       { mainText: string,
                         typedText: string,
                         buttonLabels: Array<string | null>,
                         buttonHandlers: Array<null | (() => void)>}) {
  return (
    <div className="atm-screen">
      <div className="buttons">
        {[0,1,2,3].map(n =>
          <div className="button" key={n}
               onClick={() => buttonHandlers[n]?.() }>
            <div className="right-line" />
          </div>
        )}
      </div>
      <div className="screen">
        <p className="main-text">{mainText}</p>
        <p className="typed-text">{typedText}</p>
        <div className="labels-left">
          {[0,1,2,3].map(n =>
            <div className="label" key={n}>
              {buttonLabels[n] &&
                <div>
                  <span>{buttonLabels[n]}</span>
                  <div className="left-line" />
                </div>
              }
            </div>)}
        </div>
        <div className="labels-right">
          {[4,5,6,7].map(n =>
            <div className="label" key={n}>
              {buttonLabels[n] &&
                <div>
                  <span>{buttonLabels[n]}</span>
                  <div className="right-line" />
                </div>
              }
            </div>)}
        </div>
      </div>
      <div className="buttons">
        {[4,5,6,7].map(n =>
          <div className="button" key={n}
               onClick={() => buttonHandlers[n]?.() }>
            <div className="left-line" />
          </div>
        )}
      </div>
    </div>
  )
}
