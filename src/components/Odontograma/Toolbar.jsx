import React, { useState } from "react";
import "react-awesome-button/dist/styles.css";

const Toolbar = (props) => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (cor, nome) => {
    if (selectedButton === nome) {
      setSelectedButton(null);
    } else {
      setSelectedButton(nome);
      props.handleAction(cor, nome);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 w-full justify-evenly py-3">
      {props.toolbar.opcoes.map((item) => {
        let cor = item.cor;
        let nome = item.nome;

        const buttonStyle = {
          backgroundColor:
            selectedButton === nome ? `bg-${cor}-500` : `bg-${cor}-800`,
        };

        return (
          <button
            type="primary"
            key={nome}
            className={`bt-toolbar bg-${cor}-500 py-2 px-3 rounded-lg`}
            style={buttonStyle}
            onClick={() => handleButtonClick(cor, nome)}
          >
            {nome}
          </button>
        );
      })}
    </div>
  );
};

export default Toolbar;
