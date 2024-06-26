import { inputSet } from "./inputSet.js";
import { buttonSet } from "./buttonSet.js";

const formData = ["actionPath", "method", "path"];
const inputData = ["type", "name", "placeholder"];
const buttonData = ["submit", "누르시오"];

export const formSet2 = function formSet(formData, inputData, buttonData) {
  const form = document.createElement("form");
  form.setAttribute("action", formData[0]);
  form.setAttribute("method", formData[1]);
  form.id = "writeHTML";
  const titleform = form.appendChild(
    inputSet(inputData[0], inputData[1][0], inputData[2][0])
  );
  titleform.setAttribute("required", "required");
  // form.appendChild(inputSet(inputData[0], inputData[1][1], inputData[2][1]));
  const textArea = document.createElement("textarea");
  textArea.id = "content";
  textArea.name = "content";
  textArea.placeholder = "내용 작성";
  textArea.cols = "50";
  textArea.rows = "30";
  form.appendChild(textArea);
  form.appendChild(inputSet(inputData[0], inputData[1][2], inputData[2][2]));
  form.appendChild(buttonSet(buttonData[0], buttonData[1]));
  formData[2].appendChild(form);
  return form;
};
//* 매개변수 작성법
//* formSet2(formData, inputData, placeholder, buttonData);

//? export한 데이터 받아오는 명령어
//? import { formSet2 } from "./formSet2.js";
