import "./style.css";
import ClipboardJS from "clipboard";
import { processor } from "./compiler";

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("inputText");
    const outputField = document.getElementById("outputText");
    const translateBtn = document.getElementById("translateBtn");
    const copyInputBtn = document.getElementById("copyInput");
    const copyOutputBtn = document.getElementById("copyOutput");
    const downloadBtn = document.getElementById("downloadBtn");


    // localStorage
    inputField.value = localStorage.getItem("inputText") || assemblyProgram;

    inputField.addEventListener("input", () => {
        localStorage.setItem("inputText", inputField.value);
    });

    translateBtn.addEventListener("click", () => {
        outputField.value = processor.compile(inputField.value);
    });

    new ClipboardJS("#copyInput", { text: () => inputField.value });
    new ClipboardJS("#copyOutput", { text: () => outputField.value });

    downloadBtn.addEventListener("click", () => {
        const blob = new Blob([outputField.value], { type: "application/octet-stream" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "output.bin";
        link.click();
    });
});

const assemblyProgram = `
LOAD 200
AND 203
STORE 222
AND 204
JZ 11
LOAD 200
NOT
AND 203
OR 204
ADD 202
STORE 222
LOAD 201
AND 203
STORE 223
AND 204
JZ 22
LOAD 201
NOT
AND 203
OR 204
ADD 202
STORE 223
LOAD 222
SUB 223
AND 203
STORE 225
AND 204
JZ 34
LOAD 225
NOT
AND 203
OR 204
ADD 202
STORE 225
LOAD 225
AND 205
STORE 226
STORE 220
LOAD 200
AND 207
STORE 227
LOAD 201
AND 207
STORE 228
LOAD 226
JZ 91
LOAD 225
AND 204
JNZ 70
LOAD 228
AND 209
STORE 221
LOAD 221
LSR
STORE 221
LOAD 220
SUB 202
STORE 220
JNZ 52
LOAD 221
STORE 228
LOAD 201
AND 208
OR 228
STORE 228
LOAD 223
OR 212
ADD 226
STORE 224
JMP 93
LOAD 227
AND 209
STORE 221
LOAD 221
LSR
STORE 221
LOAD 220
SUB 202
STORE 220
JNZ 73
LOAD 221
STORE 227
LOAD 200
AND 208
OR 227
STORE 227
LOAD 222
OR 212
ADD 226
STORE 224
JMP 93
LOAD 222
STORE 224
LOAD 227
AND 208
JZ 102
LOAD 227
NOT
AND 207
OR 208
ADD 206
STORE 227
LOAD 228
AND 208
JZ 111
LOAD 228
NOT
AND 207
OR 208
ADD 206
STORE 228
LOAD 227
OR 205
ADD 228
AND 207
STORE 229
AND 208
JZ 141
XOR 208
JNZ 130
LOAD 229
AND 208
STORE 221
LOAD 229
NOT
AND 207
OR 221
ADD 206
STORE 229
JMP 141
LOAD 229
AND 208
STORE 221
LOAD 229
AND 209
LSR
OR 221
STORE 229
LOAD 224
ADD 202
STORE 224
LOAD 229
AND 211
JNZ 156
LOAD 229
AND 208
STORE 221
LOAD 229
AND 209
LSR
OR 221
STORE 229
LOAD 224
ADD 202
STORE 224
JMP 143
LOAD 229
OR 224
STORE 230
HALT
`