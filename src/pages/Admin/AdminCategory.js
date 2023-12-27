import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import "./AdminProduct.css";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import CategoryService from "../../service/CategoryService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await CategoryService.getAllCategories()
        if (response?.status === 500) {
          console.log("Something went wrong");
        } else {
         
          setCategories(response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setLoading(false);
    };
    loadData();
  }, []);


  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const handleDownload = async () => {
    setHeaders([
      { label: "ID", key: "id" },
      { label: "Tên danh mục", key: "name" },
      { label: "Mô tả", key: "description" },
      { label: "Hình ảnh", key: "image" },
    ]);
    
    const response = await CategoryService.getAllCategories();
    const categories = response;

    if (Array.isArray(categories)) {
      setData(
        categories.map((category) => ({
          id: category?.id,
          name: category?.name,
          description: category?.description,
          image: category?.image,
        }))
      );
    } 
  }
    return (
      <>
        <div className="admin-product">
          <CSVLink
            data={data}
            headers={headers}
            asyncOnClick={true}
            style={{ textDecoration: "none" }}
            className="btn my-3"
            onClick={() => {
              handleDownload();
            }}
            filename={"categories.csv"}
          >
            Xuất toàn bộ dữ liệu
          </CSVLink>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col" width="10%" className="text-center" >Tên danh mục</th>
                <th scope="col"className="text-center" >Mô tả</th>
                <th scope="col" className="text-center" >Hình ảnh</th>
                <th scope="col"  className="text-center" width="14%">Cập nhật</th>
              </tr>
            </thead>
            {isLoading ? (
              <>
                <Loading />
              </>
            ) : (
              <>
                {" "}
                <tbody>
                  {categories?.map((category) => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>{category.description}</td>
                      <td className="text-center">
                        <Link to={"/home-page/category/" + category.id}>
                          <img
                            src={category.image}
                            alt=""
                            className="admin-small-img"
                            style={{ width: "90%", height: "100px" }}
                          />
                        </Link>
                      </td>
                      <td className="text-center"><button className="btn"><FontAwesomeIcon icon={faPencil}/>Chỉnh sửa</button></td>  
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
    

        </div>
      </>
    );

};

export default AdminCategory;
