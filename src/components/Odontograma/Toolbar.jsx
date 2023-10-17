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
      {props.toolbar.opcoes.map((item) => {
        let colors = item.cor;
        let nome = item.nome;
        console.log("colores -->", colors);

        // const buttonStyle = {
        //   backgroundColor:
        //     selectedButton === nome ? `bg-${colors}-700` : `bg-${colors}-800`,
        // };

        return (
          <button
            type="primary"
            key={nome}
            className={`bg-gray-400 py-2 px-3 rounded-lg flex flex-row gap-3 items-center`}
            // style={buttonStyle}
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
