const api = "http://localhost:3001";

let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = { Authorization: token };
const postEntity = "posts";
const commentEntity = "comments";

export const get = (entityName, id) =>
  fetch(`${api}/${entityName}/${id}`, { headers })
    .then(res => res.json())
    .catch(err => console.error("Error in fetch: \n", err));

export const getAll = entityName =>
  fetch(`${api}/${entityName}`, { headers }).then(res => res.json());

export const updatePUT = (entityName, id, object) =>
  fetch(`${api}/${entityName}/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(object)
  }).then(res => res.json());

export const updatePOST = (entityName, id, object) =>
  fetch(`${api}/${entityName}/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(object)
  }).then(res => res.json());

export const create = (entityName, object) =>
  fetch(`${api}/${entityName}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(object)
  }).then(res => res.json());

export const getComments = postId =>
  fetch(`${api}/${postEntity}/${postId}/${commentEntity}`, { headers })
    .then(res => res.json())
    .catch(err => console.error("Error in fetch: \n", err));

export const remove = (entityName, id) =>
  fetch(`${api}/${entityName}/${id}`, { method: "DELETE", headers })
    .then(res => res.json())
    .catch(err => console.error("Error in fetch: \n", err));

export default {
  getAll,
  get,
  getComments,
  updatePUT,
  updatePOST,
  remove,
  create
};
