import { createContext, useContext, useState } from "react";
import { menuAPI } from "../services/api";
import { toast } from 'react-toastify';
import { useRestaurantContext } from "./RestaurantContext";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const { token } = useRestaurantContext();

    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const fetchCategories = async () => {
        try {
            const { data } = await menuAPI.get("/categories", authHeader);
            setCategories(data);
        } catch (error) {
            toast.error("Não foi possível carregar as categorias.");
        }
    };

    const addCategory = async (payload) => {
        try {
            const { data } = await menuAPI.post("/categories", payload, authHeader);
            setCategories((prev) => [...prev, data]);
            toast.success("Categoria criada com sucesso!");
        } catch (error) {
            console.error("Erro ao criar categoria:", error.response ? error.response.data : error.message);
            toast.error("Erro ao criar categoria");
        }
    };

    return (
        <CategoryContext.Provider value={{ categories, fetchCategories, addCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategoryContext = () => useContext(CategoryContext);