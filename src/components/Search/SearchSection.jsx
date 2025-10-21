import { useState } from 'react';
import Dropdown from "../UI/dropdown.jsx";
import Button from "../UI/button.jsx";
import FileInput from "../UI/fileinput.jsx";
import Search from "../UI/searchstring.jsx";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes.jsx';

export default function SearchSection(){
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    
    // Состояния для отображения названий выбранных элементов
    const [classes, setClasses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    
    const truncateText = (text, maxLength = 20) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };
    
    const navigate = useNavigate();
    const handleSearch = () => {
        if (selectedSubcategory) {
            navigate(ROUTES.MANUFACTURERS, {
                state: {
                    classId: selectedClass,
                    categoryId: selectedCategory,
                    subcategoryId: selectedSubcategory
                }
            });
        } else if (selectedCategory) {
            navigate(ROUTES.MANUFACTURERS, {
                state: {
                    classId: selectedClass,
                    categoryId: selectedCategory,
                    subcategoryId: null
                }
            });
        } else if (selectedClass) {
            navigate(ROUTES.MANUFACTURERS, {
                state: {
                    classId: selectedClass,
                    categoryId: null,
                    subcategoryId: null
                }
            });
        } else {
            alert('Выберите хотя бы класс оборудования')
        }
    }

    return(
        <section className="search-section py-5" style={{backgroundColor: '#2c3e50', fontFamily:'Montserrat, sans-serif'}}>
            <h5 style={{
                color: 'white',
                textAlign: 'center',
                marginBottom: '2%'
            }}>Фильтрация по категориям оборудования</h5>
            <div className="container" style={{marginBottom: '5%'}}>
                <div className="row g-3 justify-content-center" style = {{marginBottom: '2%'}}>
                {/* Выпадающий список классов */}
                <div className="col-md-3">
                    <Dropdown 
                    title={selectedClass ? classes.find(cls => cls.id === selectedClass)?.name : "Класс"}
                    dataType="classes"
                    variant="primary"
                    onDataLoad={setClasses}
                    onSelect={(item) => {
                        setSelectedClass(item.id);
                        setSelectedCategory(''); // Сбрасываем категорию при смене класса
                        setSelectedSubcategory('');
                        setCategories([]); // Очищаем категории
                        setSubcategories([]); // Очищаем подкатегории
                    }}
                    />
                </div>

                {/* Выпадающий список категорий */}
                <div className="col-md-3">
                    <Dropdown 
                    title={selectedCategory ? categories.find(cat => cat.id === selectedCategory)?.name : "Категория"}
                    dataType="categories"
                    parentId={selectedClass}
                    variant="outline-primary"
                    disabled={!selectedClass}
                    onDataLoad={setCategories}
                    onSelect={(item) => {
                        setSelectedCategory(item.id);
                        setSelectedSubcategory('');
                        setSubcategories([]); // Очищаем подкатегории
                    }}
                    />
                </div>

                {/* Выпадающий список подкатегорий */}
                <div className="col-md-3">
                    <Dropdown 
                    title={selectedSubcategory ? subcategories.find(sub => sub.id === selectedSubcategory)?.name : "Подкатегория"}
                    dataType="subcategories"
                    parentId={selectedCategory}
                    variant="outline-primary"
                    disabled={!selectedCategory}
                    onDataLoad={setSubcategories}
                    onSelect={(item) => setSelectedSubcategory(item.id)}
                    />
                </div>

                {/* Кнопка поиска */}
                <div className="col-md-2"style={{width: '5%'}}>
                    <Button className="w-100" onClick={handleSearch}>
                        <SearchIcon />
                    </Button>
                </div>
                </div>
            </div>

            <h5 style={{
                color: 'white',
                textAlign: 'center',
                marginBottom: '2%'
            }}>Поиск по техническому заданию</h5>
            <div className="container" style={{marginBottom: '5%'}}>
                <div className="row g-3 justify-content-center" style = {{marginBottom: '2%'}}>
                    <div style = {{width: '50%'}}>
                        <FileInput/>
                    </div>
                    <div className="col-md-2" style={{width: '5%'}}>
                        <Button className="w-100" >
                            <SearchIcon />
                        </Button>
                    </div>
                </div>
            </div>



            <h5 style={{
                color: 'white',
                textAlign: 'center',
                marginBottom: '2%'
            }}>Интеллектуальный поиск</h5>
            <div className="container" style={{marginBottom: '5%'}}>
                <div className="row g-3 justify-content-center" style = {{marginBottom: '2%'}}>
                    <div style = {{width: '50%'}}>
                        <Search placeholder='Введите запрос'/>
                    </div>
                    <div className="col-md-2" style={{width: '5%'}}>
                        <Button className="w-100" >
                            <SearchIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}