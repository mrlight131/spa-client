//тут импорты компонентов
import HeroSection from '../components/Hero/HeroSection.jsx';
import SearchSection from '../components/Search/SearchSection.jsx';

export default function HomePage(){
    return(
        <main className="homepage">
            <HeroSection />
            <SearchSection />
        </main>
    )
}