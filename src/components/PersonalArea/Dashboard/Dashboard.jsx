import SvgSelector from '../../../common/icons/SvgSelector'
import './Dashboard.scss'
import storeLogo from '../../../common/images/logo-of-store.png'
import dashboardIcon from '../../../common/images/dashboard-icon.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { takeBalance } from '../../../redux/selectors/authRequest-selectors'
import { getProductsThunk } from '../../../redux/thunks/product-thunk'

const Dashboard = (props) =>{


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const balance = useSelector(takeBalance)

    //temp


    return(
        <>
        <div className='dashboard-container'>
            <div className='dashboard-wrapper'>
                <div className='dashboard__elem'>
                    <div className='dashboard__elem__top-wrapper'>
                        <div className='dashboard__elem__top-img'><img alt='' src={storeLogo}/></div>
                        <div className='dashboard__elem__top-label'>Luxury store <SvgSelector id='arrow'/></div>
                        <div className='dashboard__elem__top__icon-wrapper'>
                            <div className='dashboard__elem__top__icon-elem'><img src={dashboardIcon} alt="" /></div>
                            <div className='dashboard__elem__top__icon-elem'><SvgSelector id='bell' /></div>
                        </div>
                    </div>
                    <div className='dashboard__elem__child-wrapper'>
                        <div className='dashboard__elem__child-img'><img src={dashboardIcon} alt="" /></div>
                        <div className='dashboard__elem__child__label'>Dashboard</div>
                    </div>
                </div>
                <div className='dashboard__elem__auth_balance__balance-button mobile' onClick={()=>navigate('../authentication-request')}>New authentication</div>
                <div className='dashboard__elem__auth_balance-wrapper'>
                    <div className='dashboard__elem__auth_balance-label'>Authentication balance <SvgSelector id='arrow'/></div>
                    <div className='dashboard__elem__auth_balance__balance-wrapper'>
                        {balance.length > 0 && balance.map((el, index)=>
                        <div key={index} className='dashboard__elem__auth_balance__balance__elem'>
                            <div className='dashboard__elem__auth_balance__balance-category'>{el.productType.publicName}</div>
                            {el.answerTime !== '' && <div className='dashboard__elem__auth_balance__balance-answer'>{el.answerTime} h</div>}
                            <div className='dashboard__elem__auth_balance__balance-count'>{el.volume}</div>
                        </div>)}
                        <div className='dashboard__elem__auth_balance__balance-button' onClick={()=>navigate('../payment')}>Top up now</div>
                        <div className='dashboard__elem__auth_balance__balance-button' onClick={()=>navigate('../authentication-request')}>New authentication</div>
                    </div>
                </div>
                <div className='dashboard__elem__authentications-wrapper'>
                    <div className='dashboard__elem__authentications-label'>Authentications <SvgSelector id='arrow'/></div>
                    <div className='dashboard__elem__authentications-control__elements'>
                        <div className='dashboard__elem__authentications-control__elem-wrapper' onClick={()=>navigate('../authentications/completed')}>
                            <SvgSelector id='check-icon'/>All authentication
                        </div>
                        <div className='dashboard__elem__authentications-control__elem-wrapper' onClick={()=>navigate('../photo-requests/all')}>
                            <SvgSelector id='camera-icon'/>Photo requests
                        </div>
                    </div>
                </div>
                <div className='dashboard__elem__tools-wrapper'>
                    <div className='dashboard__elem__tools-label'>Tools</div>
                    <div className='dashboard__elem__tools-control__elements'>
                        <div  className='dashboard__elem__tools-control__elem-wrapper'>
                            <SvgSelector id='card-icon'/>Billing 
                        </div>
                    </div>
                </div>

            </div>
            <label htmlFor="dashboard-open" className='dashboard__cross-container'><SvgSelector id='cross-icon'/></label>
        </div>
        </>
    )
}

export default Dashboard