
import {
  faCaretUp,
  faCaretDown,
  faBookmark
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SubMenu.css'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService';
import Loading from '../Loading';


const SubMenu = ({ category, buyActive, sellActive, isAll }) => {
  const [submenuOpen, setSubmenuOpen] = useState(buyActive)
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen)
  }

  const handleUpload = async (categoryId) => {
    setLoading(true)
    const response = await UserService.getCurrentUser()
    if (response?.is_verify == "false"){
      UserService.sendVerifyEmail(response?.email)
      navigate("/verify")
    }else{
      navigate(`/member/upload/category-id=${categoryId}`)
    }
    setLoading(false)
  }

  return (
    <>
      <li >
        <div className={`sub-menu ${buyActive || sellActive ? 'menu-active' : ''}`}>

        <Link onClick={toggleSubmenu} >
          {category.name}{' '}
          <FontAwesomeIcon
            icon={submenuOpen ? faCaretUp : faCaretDown}
          />
        </Link>
        </div>

        {submenuOpen && (
          <ul>
            <li className={`sub-menu ${buyActive ? 'sub-menu-active' : ''}`} >
              <Link to={`/home-page/category/${category.id}`} >
              <FontAwesomeIcon
                icon={faBookmark}
                style={{ color: '#111414', marginRight: '8px' }}
              />Mua</Link>
            </li>
            {isLoading ?(
              <><Loading/></>
            ): (
              <>
                    <li className={`sub-menu ${sellActive ? 'sub-menu-active' : ''}`}>
              <Link onClick={() => handleUpload(category.id)} >
              <FontAwesomeIcon
                icon={faBookmark}
                style={{ color: '#F3787A', marginRight: '8px' }}
              />Bán</Link>
            </li>
              </>
            )}
      
          </ul>
        )}
      </li>
    </>
  )
  
}



export default SubMenu
