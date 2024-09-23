'use client'
import { Controller, useForm } from 'react-hook-form'
// import { Input, Button } from '@/components/ui'
import { useState } from 'react'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import PageHeader from '@/components/PageHeader/PageHeader'
import Select, { StylesConfig } from 'react-select'
import Label from '@/components/ui/Label/Label'
import { TOption } from '@/types/types'
import { useGetStatesQuery } from '@/api/Locations'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/Checkbox/Checkbox'
import { usePatchProfileMutation } from '@/api/Auth'

const customStyles: StylesConfig<{ value: string | number; label: string }> = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '42px',
    marginTop: '0',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '42px',
    display: 'flex',
    alignItems: 'center',
  }),
  input: (provided, state) => ({
    ...provided,
    height: '42px',
    padding: '0',
    margin: '0',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '42px',
  }),
}

const AddressBookPage = () => {
  const { data: states, isSuccess } = useGetStatesQuery({})
  const [patchProfile, { isLoading }] = usePatchProfileMutation()

  const [showShippingForm, setShowShippingForm] = useState(false)
  const [showBillingForm, setShowBillingForm] = useState(false)
  const [shippingData, setShippingData] = useState(null)
  const [billingData, setBillingData] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      is_shipping_address_equals_billing: false,
      billing_address: {
        firstName: '',
        lastName: '',
        address: '',
        region: '',
        state: '',
        city: '',
        zipCode: '',
        apartment: '',
      },
      shipping_address: {
        firstName: '',
        lastName: '',
        address: '',
        region: '',
        state: '',
        city: '',
        zipCode: '',
        apartment: '',
      },
    },
  })

  const onSubmit = async (data: any) => {
    let combinedData = {
      billing_address: data.billing_address,
      shipping_address: data.is_shipping_address_equals_billing ? data.billing_address : data.shipping_address,
    }

    await patchProfile(combinedData)
    setBillingData(combinedData.billing_address)
    setShippingData(combinedData.shipping_address)

    setShowBillingForm(false)
    setShowShippingForm(false)
  }

  const getStateOptions = (region: string, states: Record<string, string[]>): TOption[] => {
    if (!states || !region) return []
    return (
      states[region]?.map((state: string) => ({
        value: state,
        label: state,
      })) || []
    )
  }

  const handleEdit = (type: any) => {
    if (type === 'shipping') {
      setShowShippingForm(true)
    } else if (type === 'billing') {
      setShowBillingForm(true)
    }
  }

  const regionOptions = [
    {
      value: 'United States',
      label: 'United States',
    },
    {
      value: 'Canada',
      label: 'Canada',
    },
    {
      value: 'Mexico',
      label: 'Mexico',
    },
  ]

  const renderAddress = (address: any) => (
    <>
      <div>
        <div>{`${address.firstName} ${address.lastName}`}</div>
        <div>{`${address.address}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.region}`}</div>
      </div>
    </>
  )
  const billingRegion = watch('billing_address.region')
  const billingStateOptions = getStateOptions(billingRegion, states)

  const shippingRegion = watch('shipping_address.region')
  const shippingStateOptions = getStateOptions(shippingRegion, states)
  const isShippingEqualsBilling = watch('is_shipping_address_equals_billing')

  return (
    <div className='flex w-full h-full flex-col gap-8'>
      <PageHeader title='Address book' />
      <div>
        <div className='flex flex-col gap-5'>
          <h2 className='text-lg uppercase'>Shipping Address</h2>
          {!shippingData && !showShippingForm && (
            <div className='cursor-pointer font-semibold text-base capitalize' onClick={() => setShowShippingForm(true)}>
              + Add Shipping Address
            </div>
          )}
        </div>

        {shippingData && !showShippingForm && (
          <div className='flex justify-between items-center'>
            {renderAddress(shippingData)}
            <div className='flex gap-2'>
              <button onClick={() => handleEdit('shipping')}>✏️</button>
              <button onClick={() => setShippingData(null)}>🗑️</button>
            </div>
          </div>
        )}

        {showShippingForm && (
          <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-6 mt-4'>
            <div>
              <Label required text='First name' />
              <Input
                placeholder='First name'
                {...register('shipping_address.firstName', { required: 'First name is required' })}
              />
              {errors?.shipping_address?.firstName && (
                <span className='text-red-500'>{errors.shipping_address.firstName.message}</span>
              )}
            </div>
            <div>
              <Label text='Last name' required />
              <Input placeholder='Last name' {...register('shipping_address.lastName', { required: 'Last name is required' })} />
              {errors?.shipping_address?.lastName && (
                <span className='text-red-500'>{errors.shipping_address.lastName.message}</span>
              )}
            </div>
            <div>
              <Label required text='Address' />
              <Input
                placeholder='Street address'
                {...register('shipping_address.address', { required: 'Address is required' })}
              />
              {errors?.shipping_address?.address && (
                <span className='text-red-500'>{errors.shipping_address.address.message}</span>
              )}
            </div>
            <div className='flex flex-col gap-1'>
              <Label text='Region' required />
              <Controller
                name='shipping_address.region'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    styles={customStyles}
                    value={regionOptions.find((option: TOption) => option.value === field.value)}
                    options={regionOptions}
                    placeholder='Region'
                    onChange={option => {
                      field.onChange((option as { value: string; label: string })?.value)
                      setValue('shipping_address.state', '')
                    }}
                  />
                )}
              />
              {errors?.shipping_address?.region && <span className='text-red-500'>{errors.shipping_address.region.message}</span>}
            </div>
            <div>
              <Label text='Apartment' required />
              <Input
                placeholder='Aprt, Suite, Bldg.'
                {...register('shipping_address.apartment', { required: 'Apartment is required' })}
              />
              {errors?.shipping_address?.apartment && (
                <span className='text-red-500'>{errors.shipping_address.apartment.message}</span>
              )}
            </div>
            <div>
              <Label text='State' required />
              <Controller
                name='shipping_address.state'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    styles={customStyles}
                    value={shippingStateOptions.find((option: TOption) => option.value === field.value) || null}
                    options={shippingStateOptions}
                    placeholder='State'
                    onChange={option => field.onChange((option as { value: string | number; label: string })?.value)}
                  />
                )}
              />
              {errors?.shipping_address?.state && <span className='text-red-500'>{errors.shipping_address.state.message}</span>}
            </div>
            <div>
              <Label text='City' required />
              <Input placeholder='City' {...register('shipping_address.city', { required: 'City is required' })} />
              {errors?.shipping_address?.city && <span className='text-red-500'>{errors.shipping_address.city.message}</span>}
            </div>
            <div>
              <Label text='Zip code' required />
              <Input
                placeholder='Zip code'
                {...register('shipping_address.zipCode', {
                  pattern: {
                    value: /^[0-9-]+$/,
                    message: 'Zip code must contain only numbers and dashes',
                  },
                  minLength: {
                    value: 4,
                    message: 'Zip code must be at least 4 characters long',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Zip code must be no longer than 10 characters',
                  },
                })}
              />
              {errors?.shipping_address?.zipCode && (
                <span className='text-red-500'>{errors.shipping_address.zipCode.message}</span>
              )}
            </div>
            <div className='w-full flex gap-2 items-center'>
              <Controller
                name='is_shipping_address_equals_billing'
                control={control}
                render={({ field }) => (
                  <Checkbox id='is_shipping_address_equals_billing' checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
              <span className={cn('text-secondary-black')}>Shipping Address the same as billing</span>
            </div>
            {!isShippingEqualsBilling && (
              <div className='col-span-2 flex gap-4'>
                <Button type='submit'>Save</Button>
                <Button type='button' variant='blackUnderline' onClick={() => setShowShippingForm(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </form>
        )}
      </div>
      <div className='border-b border-secondary-light-grey' />

      <div className='flex flex-col gap-5'>
        <h2 className='text-lg uppercase'>Billing Address</h2>
        {!billingData && !showBillingForm && (
          <div className='cursor-pointer font-semibold text-base capitalize' onClick={() => setShowBillingForm(true)}>
            + Add Billing Address
          </div>
        )}
      </div>

      {billingData && !showBillingForm && (
        <div className='flex justify-between items-center'>
          {renderAddress(billingData)}
          <div className='flex gap-2'>
            <button onClick={() => handleEdit('billing')}>✏️</button>
            <button onClick={() => setBillingData(null)}>🗑️</button>
          </div>
        </div>
      )}

      {showBillingForm && (
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-6 mt-4'>
          <div>
            <Label required text='First name' />
            <Input placeholder='First name' {...register('billing_address.firstName', { required: 'First name is required' })} />
            {errors?.billing_address?.firstName && (
              <span className='text-red-500'>{errors.billing_address.firstName.message}</span>
            )}
          </div>
          <div>
            <Label required text='Last name' />
            <Input placeholder='Last name' {...register('billing_address.lastName', { required: 'Last name is required' })} />
            {errors?.billing_address?.lastName && <span className='text-red-500'>{errors.billing_address.lastName.message}</span>}
          </div>
          <div>
            <Label required text='Address' />
            <Input placeholder='Street address' {...register('billing_address.address', { required: 'Address is required' })} />
            {errors?.billing_address?.address && <span className='text-red-500'>{errors.billing_address.address.message}</span>}
          </div>
          <div>
            <Label required text='Region' />
            <Controller
              name='billing_address.region'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  styles={customStyles}
                  value={regionOptions.find((option: TOption) => option.value === field.value)}
                  options={regionOptions}
                  placeholder='Region'
                  onChange={option => {
                    field.onChange((option as { value: string; label: string })?.value)
                    setValue('billing_address.state', '')
                  }}
                />
              )}
            />{' '}
            {errors?.billing_address?.region && <span className='text-red-500'>{errors.billing_address.region.message}</span>}
          </div>
          <div>
            <Label required text='Apartment' />
            <Input
              placeholder='Aprt, Suite, Bldg.'
              {...register('billing_address.apartment', { required: 'Apartment is required' })}
            />
            {errors?.billing_address?.apartment && (
              <span className='text-red-500'>{errors.billing_address.apartment.message}</span>
            )}
          </div>
          <div>
            <Label required text='State' />
            <Controller
              name='billing_address.state'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  styles={customStyles}
                  value={billingStateOptions.find((option: TOption) => option.value === field.value) || null}
                  options={billingStateOptions}
                  placeholder='State'
                  onChange={option => field.onChange((option as { value: string | number; label: string })?.value)}
                />
              )}
            />{' '}
            {errors?.billing_address?.state && <span className='text-red-500'>{errors.billing_address.state.message}</span>}
          </div>
          <div>
            <Label required text='City' />
            <Input placeholder='City' {...register('billing_address.city', { required: 'City is required' })} />
            {errors?.billing_address?.city && <span className='text-red-500'>{errors.billing_address.city.message}</span>}
          </div>
          <div>
            <Label required text='Zip code' />
            <Input
              placeholder='Zip code'
              {...register('billing_address.zipCode', {
                pattern: {
                  value: /^[0-9-]+$/,
                  message: 'Zip code must contain only numbers and dashes',
                },
                minLength: {
                  value: 4,
                  message: 'Zip code must be at least 4 characters long',
                },
                maxLength: {
                  value: 10,
                  message: 'Zip code must be no longer than 10 characters',
                },
              })}
            />
            {errors?.billing_address?.zipCode && <span className='text-red-500'>{errors?.billing_address?.zipCode.message}</span>}
          </div>
          <div className='col-span-2 flex gap-4'>
            <Button type='submit'>Save</Button>
            <Button type='button' variant='blackUnderline' onClick={() => setShowBillingForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
    // </div>
  )
}

export default AddressBookPage
