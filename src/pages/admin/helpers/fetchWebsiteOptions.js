export const fetchWebsiteOptions = async () => {
  const response = await fetch(
    "https://phonepe-be.onrender.com/api/admin/get-all-website-views"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
