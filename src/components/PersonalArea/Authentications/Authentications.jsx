import PersonalAreaLayout from "../PersonalAreaLayout"
import SvgSelector from "../../../common/icons/SvgSelector"
import './Authentications.scss'
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { takeProducts, takeResultStatuses } from "../../../redux/selectors/product-selectors"
import { addCertificateThunk, getProductsThunk } from "../../../redux/thunks/product-thunk"
import { setProducts } from "../../../redux/reducers/product-reducer"
import Paginator from "../../Paginator/Paginator"

const Authentications = (props) => {

    const PageSize = 8

    const products = useSelector(takeProducts)

    //for pagination

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const PageSize = 8
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return products && products.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, products]);

    //




    const resultStatuses = useSelector(takeResultStatuses)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const [page, setPage] = useState(null)

    useEffect(() => {
        setPage(params.page === 'completed' ? 'complete' : params.page === 'in-progress' && 'progress')
    })

    useEffect(() => {
        products === null && resultStatuses !== null && dispatch(getProductsThunk(
            {
                resultStatuses: resultStatuses.filter(el => params.page === 'completed' ? el.name === 'COMPLETED' : el.name !== 'COMPLETED'),
                sort: `createdAt:${sortData ? 'DESC' : 'ASC'}`
            }))

    })

    useEffect(() => {
        return () => {
            dispatch(setProducts(null))
        }
    }, [])




    const [sortData, setSortData] = useState(true)
    const [searchValue, setSearchValue] = useState()


    function onCompletedClick() {
        setSortData(true)
        navigate('../authentications/completed')
        const data = {
            resultStatuses: [
                resultStatuses.filter(el => el.name === 'COMPLETED')[0]],
            sort: 'createdAt:DESC'
        }
        dispatch(setProducts(null))
        dispatch(getProductsThunk(data))
    }

    function onProgressClick() {
        navigate('../authentications/in-progress')
        const data = {
            sort: 'createdAt:DESC',
            resultStatuses: resultStatuses.filter(el => el.name !== 'COMPLETED')
        }
        dispatch(setProducts(null))
        dispatch(getProductsThunk(data))
    }

    function handleSort(sort) {
        setSortData(!sortData)
        dispatch(getProductsThunk({
            resultStatuses: resultStatuses.filter(el => page === 'progress' ? el.name !== 'COMPLETED' : el.name === 'COMPLETED'),
            sort: `createdAt:${!sort ? 'DESC' : 'ASC'}`
        }))
    }

    function handleSearch() {
        const data = {
            resultStatuses: resultStatuses.filter(el => page === 'progress' ? el.name !== 'COMPLETED' : el.name === 'COMPLETED')
        }
        dispatch(getProductsThunk(searchValue !== '' ? { ...data, search: searchValue } : data))
    }

    function getPhotoUrl(file) {
        return process.env.NODE_ENV !== 'production' ? '/mockimage.png' : '/assets' + file.path + '/' + file.name
    }

    async function addViewCertificate(el) {
        console.log(el.certificateAvailable)
        if (el.certificateAvailable !== null) {
            console.log('view')
        } else {
            const response = await dispatch(addCertificateThunk(el))
            !response && navigate('../payment')
        }
    }

    useEffect(() => {

    }, [currentTableData])




    return (
        <>

            <PersonalAreaLayout>
                <div className='authent-container'>
                    <div className='authent__buttons-wrapper'>
                        <div className={page !== 'complete' ? `authent__buttons-elem` : `authent__buttons-elem selected`} onClick={onCompletedClick}>Completed</div>
                        <div className={page !== 'progress' ? `authent__buttons-elem` : `authent__buttons-elem selected`} onClick={onProgressClick}>In progress</div>
                    </div>
                    <div className='authent-wrapper'>
                        <div className='authent__nav-wrapper'>
                            {page === 'progress' ? <div className='authent__nav-label'>In progress authentications</div> : <div className='authent__nav-label'>Completed authentications</div>}
                            <input className='authent__nav-search' placeholder='Search' onChange={(e) => setSearchValue(e.target.value)} onBlur={handleSearch}/>
                            <div className='authent__nav__buttons-wrapper'>
                                <div className='authent__nav__buttons__elem-wrapper'><SvgSelector id='filter-icon' />Filter</div>
                                {page === 'complete' && <div className='authent__nav__buttons__elem-wrapper'><SvgSelector id='download-icon' />Download</div>}
                            </div>
                        </div>
                        {page === 'complete' && <div className="authent__table">
                            <div className="authent__table__label-wrapper">
                                <div className="authent__table__label__elems-wrapper">
                                    <div className="authent__table__label__elem-checkbox">
                                        <input type="checkbox" className='custom-checkbox__table' id='check' />
                                        <label htmlFor="check" />
                                    </div>
                                    <div className="authent__table__label__elem-category">Item category</div>
                                </div>
                                <div className="authent__table__label__elems-wrapper">
                                    <div className="authent__table__label__elems-brand">Brand</div>
                                    <div className="authent__table__label__elems-model">Model name</div>
                                    <div className="authent__table__label__elems-outcome">Outcome</div>
                                    <div className={`authent__table__label__elems-date${!sortData ? ' arrow-up' : ''}`} onClick={() => handleSort(sortData)}>Submission date <SvgSelector id='down-arrow-icon' /></div>
                                    <div className="authent__table__label__elems-pdf">Pdf certificate</div>
                                </div>
                            </div>
                            {currentTableData ? currentTableData.map((el, index) => <div key={index} className="authent__table__elem">
                                <div className="authent__table__elems-wrapper">
                                    <div className="authent__table__elem-checkbox">
                                        <input key={index} type="checkbox" className='custom-checkbox__table' id={`check-for-elem-${index}`} />
                                        <label htmlFor={`check-for-elem-${index}`} />
                                    </div>
                                    <div className="authent__table__elem__category" onClick={() => navigate(`../request/${el.id}`)}>
                                        <div className="authent__table__elem__category-image" style={{ background: `url(${getPhotoUrl(el)})` }}>
                                            {/*<img src={el.image} alt="" />*/}
                                        </div>
                                        <div className="authent__table__elem__category-label">{el.productType.publicName}</div>
                                        <div className="authent__table__elem__category-number">#{el.publicId}</div>
                                    </div>
                                </div>
                                <div className="authent__table__elems-wrapper">
                                    <div className="authent__table__elem-brand">{el.brand.publicName}</div>
                                    <div className="authent__table__elem-model">{el.modelName}</div>
                                    <div className="authent__table__elem-outcome">{el.checkStatus}</div>
                                    <div className="authent__table__elem-date">{(new Date(el.createdAt)).getDate() + '/' + (Number((new Date(el.createdAt)).getMonth()) + 1) + '/' + (new Date(el.createdAt)).getYear()}</div>
                                    <div className="authent__table__elem-pdf" onClick={() => addViewCertificate(el)}>{el.certificateAvailable ? 'View' : 'Add certificate'}</div>
                                </div>
                            </div>) : 'loader'}
                        </div>}

                        {page !== 'complete' && <div className="authent__table">
                            <div className="authent__table__label-wrapper">
                                <div className="authent__table__label__elems-wrapper">
                                    <div className="authent__table__label__elem-category">Item category</div>
                                </div>
                                <div className="authent__table__label__elems-wrapper">
                                    <div className="authent__table__label__elems-brand">Brand</div>
                                    <div className="authent__table__label__elems-model">Model name</div>
                                    <div className="authent__table__label__elems-status">Status</div>
                                    <div className="authent__table__label__elems-answer">Answer time</div>
                                    <div className={`authent__table__label__elems-date${!sortData ? ' arrow-up' : ''}`} onClick={() => handleSort(sortData)}>Submission date <SvgSelector id='down-arrow-icon' /></div>
                                </div>
                            </div>
                            {currentTableData ? currentTableData.map((el, index) => <div key={index} className="authent__table__elem">
                                <div className="authent__table__elems-wrapper">
                                    <div className="authent__table__elem__category" onClick={() => navigate(`../request/${el.id}`)}>
                                        <div className="authent__table__elem__category-image" style={{ background: `url(${getPhotoUrl(el)})` }}>
                                            {/*<img src={el.image} alt="" />*/}
                                        </div>
                                        <div className="authent__table__elem__category-label">{el.productType.publicName}</div>
                                        <div className="authent__table__elem__category-number">#{el.publicId}</div>
                                    </div>
                                </div>
                                <div className="authent__table__elems-wrapper">
                                    <div className="authent__table__elem-brand">{el.brand.publicName}</div>
                                    <div className="authent__table__elem-model">{el.modelName}</div>
                                    <div className="authent__table__elem-status">{el.resultStatus.publicName}</div>
                                    <div className="authent__table__elem-answer">{el.answerTime} hours</div>
                                    <div className="authent__table__elem-date">{(new Date(el.createdAt)).getDate() + '/' + (Number((new Date(el.createdAt)).getMonth()) + 1) + '/' + (new Date(el.createdAt)).getYear()}</div>
                                </div>
                            </div>) : 'loader'}

                        </div>}
                        {products && currentTableData && <Paginator
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={products.length}
                            pageSize={PageSize}
                            onPageChange={page => setCurrentPage(page)}
                        />}
                    </div>
                </div>
            </PersonalAreaLayout>
        </>
    )
}

export default Authentications