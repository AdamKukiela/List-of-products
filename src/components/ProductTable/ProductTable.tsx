import React, { useState } from "react";
import { Product } from "../../api/types";
import ProductModal from "../ProductModal/ProductModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface ProductTableProps {
  products: Product | Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const productsArray = Array.isArray(products) ? products : [products];

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsArray.map((product) => (
            <TableRow
              key={product.id}
              style={{ backgroundColor: product.color, cursor: "pointer" }}
              onClick={() => handleRowClick(product)}
            >
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProductTable;
