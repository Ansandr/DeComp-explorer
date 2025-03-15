// compiler.js
const instructionsDict = {
  "LOAD":     "0000",
  "STORE":    "0001",
  "ADD":      "0010",
  "SUB":      "0011",
  "AND":      "0100",
  "OR":       "0101",
  "XOR":      "0110",
  "NOT":      "0111 00",
  "INPUT":    "0111 01",
  "OUTPUT":   "0111 10",
  "HALT":     "0111 11",
  "JNZ":      "1000",
  "JZ":       "1001",
  "JP":       "1010",
  "JM":       "1011",
  "JNC":      "1100",
  "JC":       "1101",
  "JMP":      "1110",
  "LSL":      "1111 000",
  "LSR":      "1111 001",
  "ASL":      "1111 010",
  "ASR":      "1111 011",
  "ROL":      "1111 100",
  "ROR":      "1111 101",
  "RCL":      "1111 110",
  "RCR":      "1111 111"
};

// Вспомогательная функция для преобразования десятичного числа в двоичное
function dec_to_bin(decimal, length = 0) {
  let binary = (decimal >>> 0).toString(2); // Преобразуем в двоичное число
  if (length > 0) {
    // Дополняем нулями до нужной длины
    while (binary.length < length) {
      binary = '0' + binary;
    }
  }
  return binary;
}

// Функция для преобразования команды в двоичный код
function command_to_bin(instr) {
  return instructionsDict[instr];
}

// Функция для перевода строки ассемблера в двоичный код
function translateRow(row) {
  const parts = row.split(' ');

  const command = parts[0];
  let ins_cmd = command_to_bin(command);
  ins_cmd = ins_cmd.replace(' ', '');

  let ins = '';

  if (parts.length === 2) {
    const address = parseInt(parts[1], 10);
    const ins_adr = dec_to_bin(address);

    const len_zeros = 16 - ins_cmd.length - ins_adr.length;
    const zeros = '0'.repeat(len_zeros);

    ins = ins_cmd + zeros + ins_adr;
  } else if (parts.length === 1) {
    const len_zeros = 16 - ins_cmd.length;
    const zeros = '0'.repeat(len_zeros);

    ins = ins_cmd + zeros;
  }

  // Добавляем пробелы для удобства чтения
  return ins.match(/.{1,4}/g).join(' ');
}

// Основная функция для перевода программы ассемблера
function translateAssembler(program) {
  const instruction_list = program.split('\n'); // Разделяем программу на строки
  const compiled_program = []; // array

  for (const line of instruction_list) {
    if (line.trim() === '') continue; // Пропускаем пустые строки
    const ins = translateRow(line.trim());
    compiled_program.push(ins);
  }

  

  return compiled_program.join('\n');;
}

export const processor = {

  compile(text) {
    return translateAssembler(text);
  }



};