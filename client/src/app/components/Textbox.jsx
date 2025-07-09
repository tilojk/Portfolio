import React, { forwardRef } from 'react';

const Textbox = forwardRef(({ title, text, opacity = false }, ref) => {
  return (
    <div ref={ref} className={`bg-neutral-3/20 rounded-xl p-6 backdrop-blur-sm will-change-[transform,opacity,backdrop-filter] transform-gpu ${opacity ? 'opacity-0' : ''}`} style={{ backfaceVisibility: 'hidden' }}>
        <h3 className="text-xl md:text-2xl 2xl:text-3xl mb-1 3xl:mb-4" dangerouslySetInnerHTML={{ __html: title }} />
        <p className='text-base 3xl:text-lg'>{text}</p>
    </div>
  )
});

export default Textbox