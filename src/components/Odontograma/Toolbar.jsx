import React, { useState } from "react";
import "react-awesome-button/dist/styles.css";

const Toolbar = (props) => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (colors, nome) => {
    if (selectedButton === nome) {
      setSelectedButton(null);
    } else {
      setSelectedButton(nome);
      props.handleAction(colors, nome);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 w-full justify-evenly py-3">
      {props?.toolbar?.opcoes.map((item) => {
        let colors = item?.cor;
        let nome = item?.nome;

        const buttonStyle = {
          backgroundColor:
            selectedButton === nome ? `bg-${colors}-500` : `bg-${colors}-900`,
        };

        return (
          <button
            type="primary"
            key={nome}
            className={`bt-toolbar text-black bg-${colors}-500 py-2 px-3 rounded-lg`}
            style={buttonStyle}
            onClick={() => handleButtonClick(colors, nome)}
          >
            <p>{nome}</p>
            <p className={`rounded-full p-2 bg-${colors}-700`}></p>
          </button>
        );
      })}
    </div>
  );
};

export default Toolbar;
