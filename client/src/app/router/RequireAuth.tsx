import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import { toast } from 'react-toastify';

interface Props {
    roles?: string[];
}

export default function RequireAuth({roles}: Props) {
    const {user} = useAppSelector(state => state.account);
    const location = useLocation();

    if (!user) {
        toast.error('You need to be logged in to do that!');
        return <Navigate to='/login' state={{from: location}} />
    }

    if (roles && !roles?.some(r => user.roles?.includes(r))) {
        toast.error('Not authorised to access this area');
        return <Navigate to='/catalog' />
    }

    return <Outlet />
}