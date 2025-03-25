const keys = [...Array(9).keys()].map((x) => (x+1).toString()).concat(["DEL","0"]);

export function Keypad({ onKeyPress } :
                       { onKeyPress: (key: string) => void }) {
  return (
    <div className="keypad">
       {keys.map((key) => 
        <div className="key"
             key={key}
             onClick={(e) => onKeyPress(key)}>
          <span>{key}</span>
        </div>
        )}
    </div>
  );
}
