import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import { motion } from 'framer-motion'

const SignInn = () => {
  return (
    <motion.div
    initial={{ x: "100vw" }} 
      animate={{ x: 0 }} 
      transition={{ type: "spring", stiffness: 30 }}
       className='flex justify-center bg-slate-900 items-center'>
      <SignIn path="/sign-in" redirectUrl="" routing="path" signUpUrl="/sign-up" />
    </motion.div>
  )
}

export default SignInn
