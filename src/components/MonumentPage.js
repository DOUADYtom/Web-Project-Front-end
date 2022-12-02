import { useSearchParams } from "react-router-dom";

const MonumentPage = () => {

    const [searchParams] = useSearchParams();
    const monumentId = searchParams.get('id');

    return (
        <div>MonumentPage: {monumentId}</div>
    );
};

export default MonumentPage;