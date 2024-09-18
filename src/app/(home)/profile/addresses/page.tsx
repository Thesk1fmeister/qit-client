'use client'
import { useForm } from 'react-hook-form'
// import { Input, Button } from '@/components/ui'
import { useState } from 'react'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import PageHeader from '@/components/PageHeader/PageHeader'

const AddressBookPage = () => {
  const [showShippingForm, setShowShippingForm] = useState(false)
  const [showBillingForm, setShowBillingForm] = useState(false)
  const [shippingData, setShippingData] = useState(null)
  const [billingData, setBillingData] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
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

  const onSubmit = (data: any) => {
    if (showBillingForm) {
      setBillingData(data.billing_address)
      setShowBillingForm(false)
    }
    if (showShippingForm) {
      setShippingData(data.shipping_address)
      setShowShippingForm(false)
    }
  }

  const handleEdit = (type: any) => {
    if (type === 'shipping') {
      setShowShippingForm(true)
    } else if (type === 'billing') {
      setShowBillingForm(true)
    }
  }

  const renderAddress = (address: any) => (
    <>
      <div>
        <div>{`${address.firstName} ${address.lastName}`}</div>
        <div>{`${address.address}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.region}`}</div>
      </div>
    </>
  )

  return (
    <div className='flex w-full h-full flex-col gap-8'>
      <PageHeader title='Address book' />

      {/* SHIPPING ADDRESS */}
      <div>
        <h2 className='font-bold text-lg'>SHIPPING ADDRESS</h2>
        {!shippingData && !showShippingForm && (
          <div className='cursor-pointer text-primary' onClick={() => setShowShippingForm(true)}>
            + Add Shipping Address
          </div>
        )}

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
              <label>First name *</label>
              <Input {...register('shipping_address.firstName', { required: 'First name is required' })} />
              {errors?.shipping_address?.firstName && (
                <span className='text-red-500'>{errors.shipping_address.firstName.message}</span>
              )}
            </div>
            <div>
              <label>Last name *</label>
              <Input {...register('shipping_address.lastName', { required: 'Last name is required' })} />
              {errors?.shipping_address?.lastName && (
                <span className='text-red-500'>{errors.shipping_address.lastName.message}</span>
              )}
            </div>
            <div>
              <label>Address *</label>
              <Input {...register('shipping_address.address', { required: 'Address is required' })} />
              {errors?.shipping_address?.address && (
                <span className='text-red-500'>{errors.shipping_address.address.message}</span>
              )}
            </div>
            <div>
              <label>Region *</label>
              <Input {...register('shipping_address.region', { required: 'Region is required' })} />
              {errors?.shipping_address?.region && <span className='text-red-500'>{errors.shipping_address.region.message}</span>}
            </div>
            <div>
              <label>Apartment *</label>
              <Input {...register('shipping_address.apartment', { required: 'Apartment is required' })} />
              {errors?.shipping_address?.apartment && (
                <span className='text-red-500'>{errors.shipping_address.apartment.message}</span>
              )}
            </div>
            <div>
              <label>State *</label>
              <Input {...register('shipping_address.state', { required: 'State is required' })} />
              {errors?.shipping_address?.state && <span className='text-red-500'>{errors.shipping_address.state.message}</span>}
            </div>
            <div>
              <label>City *</label>
              <Input {...register('shipping_address.city', { required: 'City is required' })} />
              {errors?.shipping_address?.city && <span className='text-red-500'>{errors.shipping_address.city.message}</span>}
            </div>
            <div>
              <label>Zip code *</label>
              <Input {...register('shipping_address.zipCode', { required: 'Zip code is required' })} />
              {errors?.shipping_address?.zipCode && (
                <span className='text-red-500'>{errors.shipping_address.zipCode.message}</span>
              )}
            </div>
            <div className='col-span-2 flex gap-4'>
              <Button type='submit'>Save</Button>
              <Button type='button' variant='blackUnderline' onClick={() => setShowShippingForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* BILLING ADDRESS */}
      <div>
        <h2 className='font-bold text-lg'>BILLING ADDRESS</h2>
        {!billingData && !showBillingForm && (
          <div className='cursor-pointer text-primary' onClick={() => setShowBillingForm(true)}>
            + Add Billing Address
          </div>
        )}

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
              <label>First name *</label>
              <Input {...register('billing_address.firstName', { required: 'First name is required' })} />
              {errors?.billing_address?.firstName && (
                <span className='text-red-500'>{errors.billing_address.firstName.message}</span>
              )}
            </div>
            <div>
              <label>Last name *</label>
              <Input {...register('billing_address.lastName', { required: 'Last name is required' })} />
              {errors?.billing_address?.lastName && (
                <span className='text-red-500'>{errors.billing_address.lastName.message}</span>
              )}
            </div>
            <div>
              <label>Address *</label>
              <Input {...register('billing_address.address', { required: 'Address is required' })} />
              {errors?.billing_address?.address && <span className='text-red-500'>{errors.billing_address.address.message}</span>}
            </div>
            <div>
              <label>Region *</label>
              <Input {...register('billing_address.region', { required: 'Region is required' })} />
              {errors?.billing_address?.region && <span className='text-red-500'>{errors.billing_address.region.message}</span>}
            </div>
            <div>
              <label>Apartment *</label>
              <Input {...register('billing_address.apartment', { required: 'Apartment is required' })} />
              {errors?.billing_address?.apartment && (
                <span className='text-red-500'>{errors.billing_address.apartment.message}</span>
              )}
            </div>
            <div>
              <label>State *</label>
              <Input {...register('billing_address.state', { required: 'State is required' })} />
              {errors?.billing_address?.state && <span className='text-red-500'>{errors.billing_address.state.message}</span>}
            </div>
            <div>
              <label>City *</label>
              <Input {...register('billing_address.city', { required: 'City is required' })} />
              {errors?.billing_address?.city && <span className='text-red-500'>{errors.billing_address.city.message}</span>}
            </div>
            <div>
              <label>Zip code *</label>
              <Input {...register('billing_address.zipCode', { required: 'Zip code is required' })} />
              {errors?.billing_address?.zipCode && (
                <span className='text-red-500'>{errors?.billing_address?.zipCode.message}</span>
              )}
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
    </div>
  )
}

export default AddressBookPage
