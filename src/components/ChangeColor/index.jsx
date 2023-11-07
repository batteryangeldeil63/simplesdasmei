import { useEffect, useState } from "react";

import { createErrorMessage, removeErrorMessage } from "../../scripts/messages-inputs";
import { useProductAttributes } from "../../hooks/productAttributes";

import { BiUpload } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

import { Button } from "../Button";

import { Container } from "./style";

export function ChangeColor({ ...rest }) {
  const { saveStorage } = useProductAttributes();

  const [ hexColor, setHexColor ] = useState("");
  const [ nameColor, setNameColor ] = useState("");
  const [ images, setImages ] = useState([]);
  const [ sizes, setSizes ] = useState([]);
  const [ sections, setSections ] = useState([]);

  function handleAddSize(button, value) {
    const alreadyExists = sizes.some(size => size == value);

    if(alreadyExists) {
      setSizes(sizes.filter(size => size != value));
      button.style.background = "#d9d2d2";
      button.style.color = "black";
    } else {
      setSizes([...sizes, value]);
      button.style.background = "#A332A5";
      button.style.color = "white";
    }
  }

  async function handleNewSection() {
    if(hexColor == "" || nameColor == "" || images.length == 0 || sizes.length == 0) {
      createErrorMessage(document.querySelector(".new"));
      document.querySelector(".divMessage").style.position = "absolute";
      document.querySelector(".divMessage").style.bottom = "-1rem";
      return;
    }

    setSections([...sections, {
      colors: { name: nameColor, hex: hexColor },
      images: images,
      sizes: sizes
    }]);

    clearInputNew();
  }

  function clearInputNew() {
    setHexColor("");
    setNameColor("");
    setImages([]);
    setSizes([]);

    const inputs = document.querySelectorAll(".new input");
    Array.from(inputs).map(input => input.value = "");

    const buttonsNewSize = document.querySelectorAll(".new .size button");
    Array.from(buttonsNewSize).map(button => {
      button.style.background = "#d9d2d2";
      button.style.color = "black";
    });
  }

  function handleDeleteSection(value) {
    const newSectionList = sections.filter(item => item != value);
    setSections(newSectionList);
  }

  useEffect(() => {
    const divMessage = document.querySelector(".divMessage");
    if(divMessage) {
      removeErrorMessage(document.querySelector(".new"));
    }

  }, [ hexColor, nameColor, images, sizes, sections ]);

  useEffect(() => {
    saveStorage(sections);

  }, [ sections ]);

  return (
    <Container>
        <div className="new">
          <input type="color" name="" id="input-color" onChange={e => setHexColor(e.target.value) }  />

          <input type="text" placeholder="cor" onChange={e => setNameColor(e.target.value) } />

          <label htmlFor="input-newImage">
            <BiUpload size={ 25 } />
            { 
              images && images.length > 1 ? 
              `${ images.length } arquivos escolhidos` 
              : images && images.length == 1 ? 
              "1 arquivo escolhido" 
              : 
              "Nenhum arquivo" 
            }
            <input type="file" name="" id="input-newImage" accept="image/*" multiple onChange={e => setImages(Array.from(e.target.files)) }  />
          </label>

          <div className="size">
            <button onClick={(e) => handleAddSize(e.target, "P") }> P </button>
            <button onClick={(e) => handleAddSize(e.target, "M") }> M </button>
            <button onClick={(e) => handleAddSize(e.target, "G") }> G </button>
            <button onClick={(e) => handleAddSize(e.target, "GG") }> GG </button>
          </div>

          <Button icon={ <AiOutlinePlus /> } onClick={ handleNewSection } />
        </div>

        {
          sections.length > 0 &&
          sections.map((item, index) => (
            <div key={ index }>
              <input type="color" name="" id="input-color" value={ item.colors.hex } disabled />
              <input type="text" defaultValue={ item.colors.name } readOnly />

              <label htmlFor="input-image">
                <BiUpload size={ 25 } />
                { item.images.length > 1 ? `${ item.images.length } arquivos escolhidos` : "1 arquivo escolhido" }
                <input type="file" name="" id="input-image" accept="image/*" multiple disabled />
              </label>

              <div className="size">
                {
                  item.sizes.map((size, index) => (
                    <button key={ index } >{ size }</button>
                  ))
                }
              </div>

              <Button icon={ <AiOutlineClose /> } onClick={(e) => handleDeleteSection(item) } />             
            </div>
          )).reverse()
        }
    </Container>
  )
}