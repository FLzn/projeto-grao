export function isValidCnpj(cnpj: string) {
  const cleanCNPJ = cnpj.replace(/[^\d]+/g, '');

  if (cleanCNPJ.length !== 14) {
    return false;
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cleanCNPJ)) {
    return false;
  }

  // Validação dos dígitos verificadores
  let tamanho = cleanCNPJ.length - 2;
  let numeros = cleanCNPJ.substring(0, tamanho);
  const digitos = cleanCNPJ.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += +numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== +digitos.charAt(0)) {
    return false;
  }

  tamanho = tamanho + 1;
  numeros = cleanCNPJ.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += +numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== +digitos.charAt(1)) {
    return false;
  }

  return true;
}