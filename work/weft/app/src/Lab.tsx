// Field lab (#/lab): four field variants side by side at hero proportions, to pick by eye before building.
import Field, { type FieldProps } from './Field'

const V: (Partial<FieldProps> & { name: string; bg: string })[] = [
  { name: 'glass default', bg: '#eef0f4' },
  { name: 'glass, cool, big', bg: '#eceef3', colors: ['#5b6cff', '#9b7bff', '#59c3ff', '#ff8fc8'], scale: 1.6, rotation: 90, blur: 22 },
  { name: 'glass warm sides', bg: '#f1eff2', colors: ['#ff7a59', '#ff4fa0', '#8a6cff', '#ffc46b'], scale: 1.3, rotation: 128, offsetY: 0.1, blur: 14 },
  { name: 'glass sharp', bg: '#eef0f4', blur: 4, scale: 1.2 },
]

export default function Lab() {
  return (
    <div className="grid grid-cols-2 gap-4 bg-white p-4">
      {V.map(({ name, bg, ...p }) => (
        <div key={name} className="relative overflow-hidden rounded-[16px]" style={{ width: 720, height: 450, background: bg }}>
          <Field w={720} h={450} {...p} />
          <span className="absolute left-3 top-3 rounded-full bg-white/80 px-2 py-1 text-[12px]">{name}</span>
        </div>
      ))}
    </div>
  )
}
