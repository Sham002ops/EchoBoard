import React from 'react'

const ColorPicker = ({open, onClose}: {open: boolean; onClose: () => void}) => {

  const HandleClick = () => {
      onClose()
  }


  return (<>
    {open && <div className='  top-40 absolute right-32 z-50 bg-gradient-to-b from-slate-800 to-slate-950  border-2 border-slate-600 w-60 h-56 rounded-xl' >
      <div className=' text-xl text-slate-400 font-bold pl-3 p-2'>
          Chose Color
      </div>
      <div className=' border-2 border-gray-800 w-56 h-40 mt-2 rounded-xl  ml-1.5'>
         <div className='flex gap-2 flex-wrap m-3'>
         <div onClick={HandleClick} className='bg-[rgba(89,68,188,255)] w-8 h-8 p-0.5 rounded-md'>     
          </div>
          <div className='bg-[rgba(89,68,188,255)] w-8 h-8 p-0.5 rounded-md'>     
          </div>
          <div className='bg-[rgba(89,68,188,255)] w-8 h-8 p-0.5 rounded-md'>     
          </div>
          <div className='bg-[rgba(89,68,188,255)] w-8 h-8 p-0.5 rounded-md'>     
          </div>
          <div className='bg-[rgba(89,68,188,255)] w-8 h-8 p-0.5 rounded-md'>     
          </div>
          <div className='bg-[rgba(89,68,188,255)] w-8 h-8 mt-2 p-0.5 rounded-md'>     
          </div>
          <div className='bg-[rgba(89,68,188,255)] w-8 h-8 mt-2 p-0.5 rounded-md'>     
          </div>
          <div className='bg-[rgba(89,68,188,255)] w-8 h-8 mt-2 p-0.5 rounded-md'>     
          </div>
          <div className='bg-[rgba(89,68,188,255)] w-8 h-8 mt-2 p-0.5 rounded-md'>     
          </div>
          <div className='bg-[rgba(89,68,188,255)] w-8 h-8 mt-2 p-0.5 rounded-md'>     
          </div>
          <div className='bg-[rgba(89,68,188,255)] w-8 h-8 mt-2 p-0.5 rounded-md'>     
          </div>
          <div className='bg-[rgba(89,68,188,255)] w-8 h-8 mt-2 p-0.5 rounded-md'>     
          </div>
          <div className='bg-[rgba(89,68,188,255)] w-8 h-8 mt-2 p-0.5 rounded-md'>     
          </div>
          <div className='bg-[rgba(89,68,188,255)] w-8 h-8 mt-2 p-0.5 rounded-md'>     
          </div>
          <div className='bg-[rgba(89,68,188,255)] w-8 h-8 mt-2 p-0.5 rounded-md'>     
          </div>
         </div>
      </div>
      </div>}
      </>
  )
}

export default ColorPicker