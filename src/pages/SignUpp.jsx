import { SignUp } from '@clerk/clerk-react'
import React from 'react'
import { motion } from 'framer-motion'

const SignUpp = () => {
  return (
    <motion.div
    initial={{ x: "-100vw" }} 
      animate={{ x: 0 }} 
      transition={{ type: "spring", stiffness: 30 }}
       className='flex justify-center bg-slate-900 items-center'>
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </motion.div>
  )
}

export default SignUpp
