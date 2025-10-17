import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export default function Carousel(){
    return(
            
        <div className="carousel-container position-relative" style={{height: '600px'}}>
            {/* Карусель как фон */}
            <div id="carouselExampleSlidesOnly" className="carousel slide position-absolute top-0 start-0 w-100 h-100" data-bs-ride="carousel">
                <div className="carousel-inner h-100">
                    <div className="carousel-item active h-100">
                        <img src="src/components/Hero/imgs/carousel-cutted.png" className="d-block w-100 h-100" style={{objectFit: 'cover'}} />
                    </div>
                </div>
            </div>
            
            {/* Overlay блок с контентом */}
            <div className="position-absolute top-50 start-0 translate-middle-y w-100 h-100 d-flex align-items-center">
                <div className="hero-overlay bg-dark bg-opacity-75 text-white p-4  h-100" style={{maxWidth: '25%', fontFamily:'Montserrat, sans-serif'}}>
                    <h5 className="display-6 fw-bold mb-5" style={{marginTop: '5%'}}>Подбор и поставка оборудования в Россию</h5>
                    <ul style={{fontSize: '20px'}}>
                        <li className="mb-3">
                            <CheckCircleIcon style={{color: '#75FB4C', marginRight:'3%'}} />
                            Высокоточное оборудование
                        </li>
                        <li className="mb-3">
                            <CheckCircleIcon style={{color: '#75FB4C', marginRight:'3%'}} />
                            Оснастнка
                        </li>
                        <li className="mb-3">
                            <CheckCircleIcon style={{color: '#75FB4C', marginRight:'3%'}} />
                            Уникальные решения для бизнеса
                        </li>
                        <li className="mb-3">
                            <CheckCircleIcon style={{color: '#75FB4C', marginRight:'3%'}} />
                            Сырье и материалы
                        </li>
                        <li className="mb-3">
                            <CheckCircleIcon style={{color: '#75FB4C', marginRight:'3%'}} />
                            Запчасти для промышленного оборудования
                        </li>
                    </ul>
                    <div className="d-flex gap-3">
                    </div>
                </div>
            </div>
        </div>
    );
}