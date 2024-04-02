import axios, { AxiosError } from 'axios'
import { HttpStatusCode } from 'src/constants/httpStatusCode.enum'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessError<FormError>(error: unknown): error is AxiosError<FormError> {
  return axios.isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const formatMoney = (props: number) => {
  return new Intl.NumberFormat('de-DE').format(props)
}
export const formatNumber = (props: number) => {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 2 })
    .format(props)
    .replace('.', ',')
    .toLowerCase()
}

export const saleRate = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'

const removeSpecialCharacter = (str: string) => {
  // Loại bỏ các ký tự đặc biệt
  const removedSpecialChars = str.replace(/[^a-zA-Z0-9\s]/g, '');
  // Loại bỏ dấu cách và chuyển đổi chữ hoa thành chữ thường
  return removedSpecialChars.replace(/\s+/g, '-').toLowerCase();
};

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  const cleanName = removeSpecialCharacter(name);
  const cleanedAndHyphenatedName = cleanName.replace(/\s+/g, '-').toLowerCase();
  return `${cleanedAndHyphenatedName}-i-${id}`;
};


export const getIdFromNameID = (nameId: string) => {
  const arr = nameId.split('-i')
  return arr[arr.length - 1]
}
