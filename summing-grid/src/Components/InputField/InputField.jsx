import React from 'react'
import classNames from 'classnames/bind';
import styles from "./InputField.css"



const InputField = ({type,value,onChange,onBlur,name,err} )=>{
  const cx = classNames.bind(styles);
  return(
    <div className={cx('input')}>
      <input type={type} value={value} onChange={onChange} onBlur={onBlur} className={cx('inputField',err&&'error')} name={name}/> 
      
    </div>
  )
}

export default InputField