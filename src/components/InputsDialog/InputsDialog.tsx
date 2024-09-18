import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/Dialog/Dialog'
import { Controller } from 'react-hook-form'

type InputsDialogProps = {
  open: boolean
  handleClose: () => void
  title: string
  label: string
  control: any
  fieldPath: string
  fields: { name: string; placeholder: string }[]
}

const InputsDialog = ({ open, handleClose, title, label, control, fieldPath, fields }: InputsDialogProps) => {
  const handleSave = () => {
    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='lg:max-w-[788px] sm:max-w-[425px] h-auto px-10 pt-10 flex flex-col gap-6 top-[50px] bottom-[50px] translate-y-0 overflow-y-scroll sm:left-0 sm:top-auto sm:bottom-0 sm:transform-none sm:max-w-full sm:items-center sm:px-4 pb-4 pt-8'>
        <DialogHeader className='text-left'>
          <DialogTitle className='text-2xl'>{title}</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-6'>
          <div className='flex gap-4'>
            {fields.map(field => (
              <div className='w-full' key={field.name}>
                <label className='text-sm font-semibold text-secondary-black'>
                  {field.name.charAt(0).toUpperCase() + field.name.slice(1).replace('_', ' ')}
                </label>
                <Controller
                  control={control}
                  name={fieldPath === 'tax_fee' ? 'tax_fee' : `${fieldPath}.${field.name}`} // Правильне використання tax_fee
                  render={({ field: controllerField }) => (
                    <Input {...controllerField} placeholder={field.placeholder} className='mt-2' />
                  )}
                />
              </div>
            ))}
          </div>
          <DialogFooter className='flex flex-row gap-4 items-end justify-end pt-4'>
            <DialogClose asChild className='sm:w-1/3'>
              <Button variant='outlineBlack'>Cancel</Button>
            </DialogClose>
            <Button type='button' onClick={handleSave} className='sm:w-2/3'>
              {label}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InputsDialog
