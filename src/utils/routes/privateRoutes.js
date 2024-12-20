import { path, allowedRoles } from "../constants";
import {
    UserProfile,
    Transaction,
    AccountManage,
    Home,
    ExampleCommonFunction,
    ExampleMultiLang,
    ExampleServices
} from "../../pages";

export const PrivateRoutes = [
    {
        path: `${path.example.common}`,
        exact: true,
        component: <ExampleCommonFunction />,
        main: () => <ExampleCommonFunction />,
        role: [allowedRoles[2]],
    },
    {
        path: `${path.example.multilang}`,
        exact: true,
        component: <ExampleMultiLang />,
        main: () => <ExampleMultiLang />,
        role: [allowedRoles[2]],
    },
    {
        path: `${path.example.services}`,
        exact: true,
        component: <ExampleServices />,
        main: () => <ExampleServices />,
        role: [allowedRoles[2]],
    },

    {
        path: `${path.common.Home}`,
        exact: true,
        component: <Home />,
        main: () => <Home />,
        role: [allowedRoles[2]],
    },
    {
        path: `${path.private.UserProfile}`,
        exact: true,
        component: <UserProfile />,
        main: () => <UserProfile />,
        role: [allowedRoles[1]],
    },
    {
        path: `${path.private.Transaction}`,
        exact: true,
        component: <Transaction />,
        main: () => <Transaction />,
        role: [allowedRoles[2]],
    },
    {
        path: `${path.private.AccountManage}`,
        exact: true,
        component: <AccountManage />,
        main: () => <AccountManage />,
        role: [allowedRoles[2]],
    }
];
