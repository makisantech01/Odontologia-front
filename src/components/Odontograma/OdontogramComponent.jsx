import React, { Component } from "react";
import PropTypes from "prop-types";
import Store from "./Store/Store.js";
import Tooth from "./Tooth.jsx";
import Toolbar from "./Toolbar.jsx";
import "./OdontogramComponent.css";

const TabContainer = (props) => {
  return <div component="div">{props.children}</div>;
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class OdontogramComponent extends Component {
  constructor(props) {
    super(props);

    this.state = Store;
    this.state.value = 0;
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleAction = (cor, nome) => {
    this.setState({ marked: { selecionado: nome, cor } });
  };
  toggleTooth = (data) => {
    if (data.status) {
      data.status = false;
      this.setState({ data });
    } else {
      data.status = true;
      this.setState({ data });
    }
  };
  setFace = (face, index, data) => {
    const acao = this.state.marked.cor;
    if (acao === data.faces[index].estado) {
      data.faces[index].estado = "white";
    } else {
      data.faces[index].estado = acao;
    }
    this.setState({ data });
  };

  render() {
    const { value } = this.state;
    console.log("value ->", value);

    return (
      <div className="w-[980px] h-auto m-0 p-0 items-center justify-center flex">
        <main className="bg-green-200 flex flex-col justify-center items-center p-0 m-0">
          <div>
            <nav position="static" className="bg-primary">
              <div
                className="bg-primary py-4 flex justify-evenly"
                value={value}
                onChange={this.handleChange}
              >
                <button className="text cursor-pointer">Adulto</button>
                <button className="text cursor-pointer">Infantil</button>
              </div>
            </nav>

            {value === 0 && (
              <div className="bg-blue-500 m-4">
                {this.state.arcada.adulto.map((item, index) => {
                  return (
                    <Tooth
                      key={item.id}
                      index={index}
                      data={item}
                      toggleTooth={this.toggleTooth}
                      setFace={this.setFace}
                    />
                  );
                })}
              </div>
            )}

            {value === 1 && (
              <div>
                {this.state.arcada.infantil.map((item, index) => {
                  return (
                    <Tooth
                      key={item.id}
                      index={index}
                      data={item}
                      toggleTooth={this.toggleTooth}
                      setFace={this.setFace}
                    />
                  );
                })}
              </div>
            )}
          </div>

          <Toolbar
            toolbar={this.state.toolbar}
            handleAction={this.handleAction}
            cor={this.state.marked.cor}
          />
        </main>
      </div>
    );
  }
}

export default OdontogramComponent;
