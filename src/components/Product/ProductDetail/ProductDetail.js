import "./ProductDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import UserService from "../../../service/UserService";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ProductDetail = ({ product, isMember }) => {
  const [isAdded, setAdded] = useState(false);
  const [isExist, setExist] = useState("");
  const navigate = useNavigate()
  const addToWishlist = async () => {
    const response = await UserService.addCurrentWishtlistByProductId(
      product.id
    );
    if (response == 500) {
      console.log("Some thing wrong");
    } else {
      setAdded(true);
      toast.success("Thêm vào yêu thích thành công!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const hanldeCheckout=(e) => {
    e.preventDefault()
    navigate("/member/checkout")
  }
  return (
    <div>
      <div className="text-center mb-5">
        <img
          src={product.product_image}
          className="middle-image img-fluid"
          alt=""
        />
      </div>
      <div id="product-info">
        <div className="info-row mb-3">
          <div className="info-key">Tên tài liệu:</div>
          <div className="info-value">{product.title}</div>
        </div>
        <div className="info-row mb-3">
          <div className="info-key">Người bán:</div>
          <div className="info-value">{product.owner_name}</div>
        </div>
        <div className="info-row  mb-3">
          <div className="info-key">Mô tả:</div>
          <div className="info-value">{product.description}</div>
        </div>
        <div className="info-row  mb-3">
          <div className="info-key">Giá:</div>
          <div className="info-value">{product.price}</div>
        </div>
        <div className="info-row mb-3">
          <div className="info-key">Còn lại:</div>
          <div className="info-value">{product.quantity}</div>
        </div>
        <div className="info-row mb-3">
          <div className="info-key">Phân loại:</div>
          <div className="info-value">
            {product?.tags?.map((tag, index) => (
              <button
                key={index}
                className={`btn btn-outline tag badge ${tag.color}`}
              >
                <Link
                  style={{ textDecoration: "None", color: "White" }}
                  to={`/search/?tag=${tag.id}`}
                >
                  {tag.name}
                </Link>
              </button>
            ))}
          </div>
        </div>

        <div className="info-row  mb-3">
          <div className="info-key">Tình trạng:</div>
          <div className="info-value">{product.condition}</div>
        </div>
        <div className="info-row  mb-3">
          <div className="info-key">Ngày cập nhật:</div>
          <div className="info-value">{product.last_updated}</div>
        </div>
        <div className="info-row  mb-3">
          <div className="info-key">Phương thức giao dịch:</div>
          <div className="info-value">
            <div className=" mb-3">
              <FontAwesomeIcon icon={faCheck} className="check-icon" />{" "}
              {product.transaction_method}
            </div>
          </div>
        </div>
      </div>
      {isMember === true ? (
        <></>
      ) : (
        <>
          <div className="d-flex">
            <div className="checkout-btn">
              <button className="btn" onClick={(e) => hanldeCheckout(e)}>
                <FontAwesomeIcon icon={faCartShopping} /> Mua ngay
              </button>
              {isExist !== "" ? (
                <>
                  <div className="alert alert-danger">{isExist}</div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="wishtlist-btn">
              <button className="btn" onClick={() => addToWishlist()}>
                <FontAwesomeIcon icon={faHeart} /> Yêu thích
              </button>
              {isExist !== "" ? (
                <>
                  <div className="alert alert-danger">{isExist}</div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}

      {isAdded ? (
        <>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductDetail;
