import React from "react";
import { Product } from "../../api/types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface ProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  product,
  onClose,
}) => {
  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  if (!product) {
    return null;
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Product Details
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          ID: {product.id}
          <br />
          Name: {product.name}
          <br />
          Year: {product.year}
          <br />
          Color: {product.color}
          <br />
          Pantone Value: {product.pantone_value}
        </Typography>
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default ProductModal;
