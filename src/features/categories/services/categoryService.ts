import axiosInstance from "../../../api/axios";

export interface CategoryResponse {
  id: number;
  name: string;
}

export const fetchCategories = async (): Promise<CategoryResponse[]> => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

export const createCategory = async (
  name: string
): Promise<CategoryResponse> => {
  const response = await axiosInstance.post("/categories", { name });
  return response.data;
};

export const updateCategory = async (
  category: CategoryResponse
): Promise<CategoryResponse> => {
  const response = await axiosInstance.put(
    `/categories/${category.id}`,
    category
  );
  return response.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/categories/${id}`);
};
