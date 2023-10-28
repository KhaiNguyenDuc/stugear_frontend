import { Outlet } from 'react-router'

import './ProductLayout.css'
import { Container } from 'react-bootstrap'
import SideBar from '../../components/SideBar/SideBar'

import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header'
import CategoryService from '../../service/CategoryService'
import { useState, useEffect } from 'react'
import Loading from '../../components/Loading'
import TitleBox from '../../components/TitleBox/TitleBox'
const ProductLayout = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setLoading] = useState(true)
  const getCategories = async () => {
    const response = await CategoryService.getAllCategories()
    if (response?.status === 500) {
      console.log('Something wentwrong')
    } else {
      setCategories(response)
      setLoading(false)
    }
  }
  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <Header sticky={false}/>
      <TitleBox title={"Trang chủ"} sub_title={"Chi tiết sản phẩm"}/>
      <Container>

        <div className="row">
          <div className="col-2 ">
          {isLoading
            ? (
              <Loading/>
              )
            : (
              <SideBar categories={categories} />
              )}
          </div>
          <div className="col content">
            <Outlet />
          </div>
        </div>
      </Container>
      <Footer/>
    </>
  )
}
export default ProductLayout
