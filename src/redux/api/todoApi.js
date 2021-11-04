import client from '../../services/callApi';

// const toQueryString = (paramsObject) => {
//     return (
//         Object.keys(paramsObject)
//             .filter(
//                 key =>
//                     paramsObject[key] !== null && typeof paramsObject[key] !== 'undefined'
//             )
//             .map(key => `${key}=${encodeURIComponent(paramsObject[key])}`)
//             .join('&')
//     );
// }

// 取得 todo 資料
export const getTodoListApi = async() => {
    return await client.get(`/api/todolist`)
};

// 新增資料
export const postTodoItemApi = async(params = {}) => (
    await client.post(`/api/todolist`, params)
);

// 更新資料
export const putTodoItemApi = async(params = {}) => (
    await client.put(`/api/todolist`, params)
);

// 刪除
export const deleteTodoItemApi = async(params = {}) => (
    await client.delete(`/api/todolist`, params)
);