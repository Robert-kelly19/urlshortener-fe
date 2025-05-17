import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'

export default Redirect=()=>{
    const validateSchema = Yup.object({
        short_code: Yup.string().required('please provide a short code'),
    })
    
    return (
        <>
        
        </>
    )
}