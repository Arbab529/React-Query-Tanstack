export const getPosts = async (pageNumber) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${pageNumber}&_limit=3`
  );
  const data = await response.json();
  return data;
};

export const getPostById = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const data = await response.json();
  return data;
};

export const deletePostById = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { method: "DELETE" }
  );
  const data = await response.json();
  return data;
};

export const updatePostById = async (id, updatedData) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(updatedData),
    }
  );
  const data = await response.json();
  return data;
};
