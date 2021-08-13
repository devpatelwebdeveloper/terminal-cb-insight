import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind';
import styles from "./Calculator.css"
import InputField from "../InputField"
import { numberValidation,addition } from '../utils';


const Calculator = () =>
{
  const [values, setValues] = useState({
    number1:'0',
    number3:'0',
    number2:'0',
  })
  const{number1,number2,number3}=values
  const [total, setTotal] = useState(0)
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const cx = classNames.bind(styles);
  const validate={
    number1:numberValidation,
    number3:numberValidation,
    number2:numberValidation,
  }
  
  const handleChange = (evt) => {
    const { name, value: newValue, type } = evt.target;

    // keep number fields as numbers
    const value = type === "number" ? +newValue : newValue;

    // save field values
    setValues({
      ...values,
      [name]: value
    });

    // was the field modified
    setTouched({
      ...touched,
      [name]: true
    });
  };
  const handleBlur = (evt) => {
    const { name, value } = evt.target;
    // remove whatever error was there previously
    const { [name]: removedError, ...rest } = errors;
    // check for a new error
    const error = validate[name](value);
    // validate the field if the value has been touched
    setErrors({
      ...rest,
      ...(error && { [name]: touched[name] && error })
    });
  };
  
  const handleTotal = () => {
    const validationCheck = Object.keys(values).reduce(
      (acc, key) => {
        const newError = validate[key](values[key]);
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError })
          },
          touched: {
            ...acc.touched,
            ...newTouched
          }
        };
      },
      {
        errors: { ...errors },
        touched: { ...touched }
      }
    );
    setErrors(validationCheck.errors);
    setTouched(validationCheck.touched);

    if (
      !Object.values(validationCheck.errors).length && // errors object is empty
      Object.values(validationCheck.touched).length ===
        Object.values(values).length && // all fields were touched
      Object.values(validationCheck.touched).every((t) => t === true) // every touched field is true
    ) {
      setTotal(addition(number1,number2,number3))
    }
    
  };
  
  useEffect(()=>{
    handleTotal()
  },[number1,number2,number3])

  return (
    <div className={cx('calculator')}>
      <InputField
        type="text"
        value={number1}
        onChange={handleChange}
         onBlur={handleBlur}
        name="number1"
        err={touched.number1 && errors.number1}
      />
      <InputField
        type="text"
        value={number2}
        onChange={handleChange}
         onBlur={handleBlur}
        name="number2"
        err={touched.number2 && errors.number2}
      />
      
      <InputField
        type="text"
        value={number3}
        onChange={handleChange}
         onBlur={handleBlur}
        name="number3"
        err={touched.number3 && errors.number3}
      /> 
      <div className={cx('total')}>{total}</div>
    </div>
  )
}

export default Calculator