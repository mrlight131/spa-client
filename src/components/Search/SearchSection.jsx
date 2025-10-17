import { useState } from 'react';
import Dropdown from "../UI/dropdown.jsx";
import Button from "../UI/button.jsx";
import FileInput from "../UI/fileinput.jsx";
import Search from "../UI/searchstring.jsx";
import SearchIcon from '@mui/icons-material/Search';
// import { equipmentClasses } from '../../data/mockData.js';
import { useClasses, useCategories, useSubcategories } from '/src/hooks/useFetch.jsx';

export default function SearchSection(){
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    
    // Используем кастомные хуки для каскадной загрузки
    const { classes, isLoading: classesLoading } = useClasses();
    const { categories, isLoading: categoriesLoading } = useCategories(selectedClass);
    const { subcategories, isLoading: subcategoriesLoading } = useSubcategories(selectedCategory);
    
    const truncateText = (text, maxLength = 20) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };
    
    // Показываем загрузку если любой из запросов в процессе
    if (classesLoading) return <div>Загрузка классов...</div>;
    if (categoriesLoading) return <div>Загрузка категорий...</div>;
    if (subcategoriesLoading) return <div>Загрузка подкатегорий...</div>;

    return(
        <section className="search-section py-5" style={{backgroundColor: '#2c3e50', fontFamily:'Montserrat, sans-serif'}}>
            {/* <h5 style={{
                color: 'white',
                textAlign: 'center',
                marginBottom: '2%'
            }}>Фильтрация по категориям оборудования</h5>
            <div className="container" style={{marginBottom: '5%'}}>
                <div className="row g-3 justify-content-center" style = {{marginBottom: '2%'}}>
                <div className="col-md-3">
                    <Dropdown 
                    title={selectedClassObj ? truncateText(selectedClassObj.label, 30) : "Класс"}
                    items={equipmentClasses.map(cls => ({ 
                        label: cls.label, 
                        href: "#",
                        onClick: () => {
                        setSelectedClass(cls.id);
                        setSelectedCategory(''); 
                        setSelectedSubcategory('');
                        }
                    }))}
                    variant="primary"
                    />
                </div>

                <div className="col-md-3">
                    <Dropdown 
                    title={selectedCategoryObj ? truncateText(selectedCategoryObj.label, 30) : "Категория"}
                    items={currentCategories.map(cat => ({ 
                        label: cat.label, 
                        href: "#",
                        onClick: () => {
                        setSelectedCategory(cat.id);
                        setSelectedSubcategory('');
                        }
                    }))}
                    variant="outline-primary"
                    disabled={!selectedClass}
                    />
                </div>

                <div className="col-md-3">
                    <Dropdown 
                    title={selectedSubcategory ? truncateText(selectedSubcategory, 30) : "Подкатегория"}
                    items={currentSubcategories.map(sub => ({ 
                        label: sub, 
                        href: "#",
                        onClick: () => setSelectedSubcategory(sub)
                    }))}
                    variant="outline-primary"
                    disabled={!selectedCategory}
                    />
                </div> */}

                    {/* Кнопка поиска */}
                    {/* <div className="col-md-2" style={{width: '5%'}}>
                        <Button className="w-100" >
                            <SearchIcon />
                        </Button>
                    </div>
                </div>
            </div> */}
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
                    items={classes.map(cls => ({ 
                        label: cls.name, 
                        href: "#",
                        onClick: () => {
                        setSelectedClass(cls.id);
                        setSelectedCategory(''); // Сбрасываем категорию при смене класса
                        }
                    }))}
                    variant="primary"
                    />
                </div>

                {/* Выпадающий список категорий */}
                <div className="col-md-3">
                    <Dropdown 
                    title={selectedCategory ? categories.find(cat => cat.id === selectedCategory)?.name : "Категория"}
                    items={categories.map(cat => ({ 
                        label: cat.name, 
                        href: "#",
                        onClick: () => setSelectedCategory(cat.id)
                    }))}
                    variant="outline-primary"
                    disabled={!selectedClass || categories.length === 0}
                    />
                </div>

                {/* Выпадающий список подкатегорий */}
                <div className="col-md-3">
                    <Dropdown 
                    title={subcategories.length > 0 ? "Подкатегория" : "Подкатегория"}
                    items={subcategories.map(sub => ({ 
                        label: sub.name, 
                        href: "#" 
                    }))}
                    variant="outline-primary"
                    disabled={!selectedCategory || subcategories.length === 0}
                    />
                </div>

                {/* Кнопка поиска */}
                <div className="col-md-2"style={{width: '5%'}}>
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
