// import { useFetch } from "../hooks/useFetch.jsx";

// export default function Sidebar() {
//     const { classes, isLoading, error } = useClasses();

//     if (isLoading) return <div>Загрузка...</div>;
//     if (error) return <div>Ошибка: {error}</div>;
//     if (!classes || classes.length === 0) return <div>Нет данных</div>;

//     return (
//         <div className="h-screen bg-amber-200 w-3xs p-4">
//             <button className="mb-4 px-2 py-1 bg-blue-500 text-white rounded">
//             </button>
//             <ul>
//                 {classes.map(cls => (
//                     <li key={cls.id} className="mb-1">
//                         {cls.name}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
