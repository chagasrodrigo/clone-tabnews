/*
test("nome do teste", function () {
  console.log("Executou o teste");
});

test("outro teste", () => {
  console.log("Mensagem do Outro Teste");
});

test("teste nivel 3, que 1 seja 1", () => {
  expect(2).toBe(1);
});

const calculadora = require("../models/calculadora.js");
test("deve somar 2 + 2 e retornar 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});
*/

const calculadora = require("../../models/calculadora.js");

test("deve somar 5 + 100 e retornar 105", () => {
  const resultado = calculadora.somar(5, 100);
  expect(resultado).toBe(105);
});

test("somar 'banana' + 100 deveria retornar 'Erro'", () => {
  const resultado = calculadora.somar("banana", 100);
  expect(resultado).toBe("Erro");
});
