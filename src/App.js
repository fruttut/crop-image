import { fabric } from 'fabric';
import React, {useEffect, useRef, useState} from 'react';
import {loadFabricImageFromFile} from "./utils";
import './App.css';

const MAX_IMAGE_WIDTH = 500;
const MAX_IMAGE_HEIGHT = 500;

const CANVAS_ID = 'canvas';

export const App = () => {
  const canvas = useRef();
  const image = useRef();

  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => setEditMode(prev => !prev);

  const handleImageUpload = async (event) => {
    const newImage = await loadFabricImageFromFile(event.target.files[0], {
      controls: {
        ml: fabric.Object.prototype.controls.ml,
        mr: fabric.Object.prototype.controls.mr,
      },
    });
    setImage(newImage);
  };

  const setImage = (newImage) => {
    if (image.current) {
      image.current.off();
      canvas.current.remove(image.current);
    }
    image.current = newImage;
    image.current.setControlsVisibility({
      ml: false,
      mr: false,
    });
    canvas.current.add(image.current).renderAll();
    image.current.on('mousedblclick', toggleEditMode);
    setEditMode(false);
  };

  useEffect(() => {
    canvas.current = new fabric.Canvas(CANVAS_ID, {
      renderOnAddRemove: false,
      backgroundColor: '#ccc',
    });
    return () => canvas.current.dispose();
  }, []);

  useEffect(() => {
    image.current?.setControlsVisibility({
      ml: editMode,
      mr: editMode,
    });
    canvas.current?.renderAll();
  }, [editMode]);

  return (
    <div className="container">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <canvas id={CANVAS_ID} width={MAX_IMAGE_WIDTH} height={MAX_IMAGE_HEIGHT} />
    </div>
  );
}
