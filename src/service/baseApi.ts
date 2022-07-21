import request from '../utils/request';

const baseApi = '/baseline';

// export async function getDocument(params: any) {
//   return request(`${baseApi}/document/getDocument`, {
//     method: 'POST',
//     body: JSON.stringify(params),
//     headers: { 'Content-Type': 'application/json' },
//   });
// }

export async function getLongList(params: any) {
  return request(`${baseApi}/test/longList`);
}
