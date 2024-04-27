import {  useAnimationFrame, useMotionValue, useTransform,motion } from 'framer-motion';
import { wrap } from '@motionone/utils';
import PropTypes from 'prop-types';
import './scrolltext.css'
ScrollProps.propTypes = {
    titulo: PropTypes.string,
    v: PropTypes.number
}
function ScrollProps({titulo,v=100}) {
    const baseX=useMotionValue(0);
    const totalW=600;  
    const x = useTransform(baseX,(v)=>`${wrap(-totalW*2*100/3000,-totalW*1*100/3000,v)}%`);
    useAnimationFrame((t,delta)=>{
        let move= v * delta/1000;//unidad de delta es ms a unidad segundo
        baseX.set(baseX.get()+move);
    });
    const spans=Array(5).fill(titulo)
    return (
       <motion.h1 style={{x}} className='scrolltext'>
            {spans.map((texto, index) => (
                <span key={index}>{texto}</span>
            ))}
       </motion.h1>
      );
}




export default ScrollProps;