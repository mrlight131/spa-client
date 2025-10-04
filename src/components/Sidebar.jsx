import { useFetch } from "../hooks/useFetch.jsx";

export default function Sidebar() {
    const { data, isLoading } = useFetch("/bff-client/categories", {});

    if (isLoading) return <div>Загрузка...</div>;
    if (!data) return <div>Нет данных</div>;

    return (
        <div className="h-screen bg-amber-200 w-3xs p-4">
            <button className="mb-4 px-2 py-1 bg-blue-500 text-white rounded">
            </button>
            <ul>
                {data.map(cat => (
                    <li key={cat.id} className="mb-1">
                        {cat.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
