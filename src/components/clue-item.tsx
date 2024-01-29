import { Textfit } from 'react-textfit';

export default function ClueItem({ category, value, isMatch }: { category: string, value: string | number, isMatch:  boolean})
{
  return (
    <div className="flex flex-col-reverse max-w-14 gap-1">
      <h4 className='text-base text-center font-semibold'>{category}</h4>
      <div className="grid place-items-center aspect-square text-white font-bold w-10 md:w-12 text-center rounded-full" style={{ backgroundColor: ( isMatch ? '#22C55E' : '#94A3B8')}}>
        <Textfit mode="single" style={{ maxWidth: 30}} max={12}>
          {value}
        </Textfit>
      </div>
    </div>
  )
}