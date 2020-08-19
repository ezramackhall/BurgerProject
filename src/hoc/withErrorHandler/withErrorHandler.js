import React, {useEffect, useState} from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null);

        const setAxios = async () => {
            await axios.interceptors.request.use(req => {
                return req;
            });
            await axios.interceptors.response.use(res => res, (err) => {
                return err;
            });
        };
        useEffect(() => {
            setError(setAxios());
        }, []);


        // const errorConfirmedHandler = () => {
        //     setError(null);
        // };

        return (
            <Aux>
                <Modal
                    show={error}
                    closeModal={() =>{}}

                >
                    {error ? error.message : null}
                </Modal>
                <button onClick={() =>{setAxios();console.log(error)}}>Hello</button>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
};

export default withErrorHandler;