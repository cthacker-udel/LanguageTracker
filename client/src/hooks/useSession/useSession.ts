/* eslint-disable no-console -- disabled */
/* eslint-disable unicorn/no-document-cookie -- disabled */
import React from "react";
import { useNavigate } from "react-router-dom";

import { ServerSideApi } from "../../common";

type useSessionReturn = {
    backToLogin: () => void;
    validating: boolean;
    sessionValid: boolean;
};

/**
 * A custom hook to validate the user session and have an optional direct navigation if the user wishes
 * if the session is invalid, or propagate that result up to the caller
 *
 * @param document - The document instance we are passing into the session
 */
const useSession = (navigateOnFail = false): useSessionReturn => {
    const navigate = useNavigate();
    const [validating, setValidating] = React.useState(true);
    const [sessionValid, setSessionValid] = React.useState<boolean>(true);

    const backToLogin = React.useCallback(() => {
        navigate("/login");
    }, [navigate]);

    React.useEffect(() => {
        setValidating(true);
        ServerSideApi.post<Response>("/user/validateSession")
            .then((response: Response) => {
                if (response.status === 204) {
                    setSessionValid(true);
                    setValidating(false);
                } else {
                    if (navigateOnFail) {
                        navigate("/");
                    } else {
                        document.cookie = "";
                    }
                    setSessionValid(false);
                    setValidating(false);
                }
            })
            .catch((error: unknown) => {
                setValidating(false);
                setSessionValid(false);
                navigate("/");
                console.error(
                    `Failed validating session ${(error as Error)?.stack}`,
                );
            });
        return () => {
            setValidating(false);
            setSessionValid(false);
        };
    }, [navigate, navigateOnFail]);

    return {
        backToLogin,
        sessionValid,
        validating,
    };
};

export { type useSessionReturn, useSession };
