export const getUsers = async ({ pageParam = 1 }) => {
  const response = await fetch(
    `https://api.github.com/users?per_page=10&page=${pageParam}`
  );
  const data = await response.json();
  return data;
};
