import { get, post, remove } from "./httpClient";

export function getContacts() {
  return get("/contacts");
}

export function addContact(data) {
  return post("/contacts", data);
}

export function deleteContact(id) {
  return remove(`/contacts/${id}`);
}

export function searchContacts(keyword, signal) {
  return get(
    "/contacts",
    keyword ? { q: keyword } : {},
    { signal }
  );
}
