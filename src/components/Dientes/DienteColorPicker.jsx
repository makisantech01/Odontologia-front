import React from "react";
import { SketchPicker } from "react-color";

const DienteColorPicker = ({ color, onChange }) => {
  return (
    <div>
      <label>Color:</label>
      <SketchPicker color={color} onChange={(color) => onChange(color.hex)} />
    </div>
  );
};

export default DienteColorPicker;
