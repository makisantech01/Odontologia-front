import React, { Component } from "react";
import "react-awesome-button/dist/styles.css";

export default class Toolbar extends Component {
  render(props) {
    return (
      <div className="box-toolbar clear">
        {this.props.toolbar.opcoes.map((item) => {
          let cor = item.cor;
          let nome = item.nome;

          return (
            <button
              type="primary"
              key={nome}
              className="bt-toolbar bg-primary hover:bg-secondary-300 py-2 px-3 rounded-lg"
              onClick={() => this.props.handleAction(cor, nome)}
            >
              {nome}
            </button>
          );
        })}
      </div>
    );
  }
}
