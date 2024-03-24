import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { fetchProducts } from "./api/api";
import FilterForm from "./components/FilterForm/FilterForm";
import Pagination from "./components/Pagination/Pagination";
import ProductTable from "./components/ProductTable/ProductTable";
import Alert from "@mui/material/Alert";

const AppContent = () => {
  const { state, dispatch } = useContext(AppContext);
  const location = useLocation();

  const handleFilter = (id: number | undefined) => {
    dispatch({ type: "SET_FILTER_ID", payload: id });
    updateURLParams({ id });
  };

  const handlePageChange = (page: number) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
    updateURLParams({ page });
  };

  const handleClearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const updateURLParams = (params: any) => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== undefined) {
        searchParams.set(key, value.toString());
      } else {
        searchParams.delete(key);
      }
    });
    url.search = searchParams.toString();
    window.history.pushState({ path: url.href }, "", url.href);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page") || "1";
    const id = searchParams.get("id") || undefined;
    dispatch({ type: "SET_CURRENT_PAGE", payload: parseInt(page) });
    dispatch({ type: "SET_FILTER_ID", payload: id });
  }, [dispatch, location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProducts(state.currentPage, state.filterId);
        dispatch({ type: "SET_PRODUCTS", payload: products });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error });
      }
    };

    fetchData();
  }, [state.currentPage, state.filterId, dispatch]);

  return (
    <div>
      <FilterForm onFilter={handleFilter} />
      <ProductTable products={state.products} />
      <Pagination
        currentPage={state.currentPage}
        onPageChange={handlePageChange}
      />
      {state.error && (
        <Alert severity="error" onClose={handleClearError}>
          {state.error.message}
        </Alert>
      )}
    </div>
  );
};

export default AppContent;
