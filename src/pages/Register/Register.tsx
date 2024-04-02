import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input/input'
// import { getRules } from 'src/ultis/rules'
import { schema, Schema } from 'src/ultis/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessError } from 'src/ultis/ultis'
import { ErrorResponse } from 'src/types/utils.type'
import { AppConText } from 'src/context/app.context'
import Button from 'src/components/Button'
import { path } from 'src/constants/path'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>

function Register() {
  const { setIsAuthenticated , setProfile } = useContext(AppConText)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  // const rules = getRules(getValues)
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const errorForm = error.response?.data.data
          if (errorForm?.email) {
            setError('email', {
              message: errorForm.email,
              type: 'Server response'
            })
          }
          if (errorForm?.password) {
            setError('password', {
              message: errorForm.password,
              type: 'Server response'
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange lg:bg-shoppe-banner bg-no-repeat bg-center'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              {/* <div className='mt-8'>
                <input
                  type='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-400 rounded-sm focus:shadow-sm'
                  placeholder='Enter your email'
                  {...register('email', rules.email)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>
              </div> */}

              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Enter your email'
              />

              {/* <div className='mt-3'>
                <input
                  type='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-400 rounded-sm focus:shadow-sm'
                  placeholder='Enter your password'
                  autoComplete='on'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
              </div> */}

              <Input
                name='password'
                register={register}
                type='password'
                className='mt-3'
                errorMessage={errors.password?.message}
                placeholder='Enter your password'
              />

              {/* <div className='mt-3'>
                <input
                  type='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-400 rounded-sm focus:shadow-sm'
                  placeholder='Re-enter your password'
                  autoComplete='on'
                  {...register('confirm_password', {
                    ...rules.confirm_password
                  })}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
              </div> */}

              <Input
                name='confirm_password'
                register={register}
                type='password'
                className='mt-3'
                errorMessage={errors.confirm_password?.message}
                placeholder='Enter your password'
              />

              <div className="mt-3">
              <Button
                  isLoading={registerAccountMutation.isPending}
                  disabled={Boolean(registerAccountMutation.isPending)}
                  className='w-full text-center py-4 px-2 uppercase bg-orange text-white text-sm hover:bg-red-600 flex justify-center items-center'
                >
                  Đăng ký
                </Button>
              </div>

              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className='text-slate-400'>Bạn đã có tài khoản?</span>
                  <Link className='text-orange ml-1' to={path.login}>
                    Đăng nhâp
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
