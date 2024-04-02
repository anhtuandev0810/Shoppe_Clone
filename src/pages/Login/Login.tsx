import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import { path } from 'src/constants/path'
import { AppConText } from 'src/context/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { LoginSchema, loginSchema } from 'src/ultis/rules'
import { isAxiosUnprocessError } from 'src/ultis/ultis'

type FormData = Pick<LoginSchema, 'email' | 'password'>

function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppConText)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginAccount(body)
  })
  // const rules = getRules()
  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessError<ErrorResponse<FormData>>(error)) {
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

  console.log(loginAccountMutation.isPending);
  
  return (
    <div className='bg-orange lg:bg-shoppe-banner bg-no-repeat bg-center'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm ' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <div className='mt-8'>
                <input
                  type='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-400 rounded-sm focus:shadow-sm'
                  placeholder='Enter your email'
                  {...register('email')}
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errors.email?.message}</div>
              </div>

              <div className='mt-3'>
                <input
                  type='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-400 rounded-sm focus:shadow-sm'
                  placeholder='Enter your password'
                  autoComplete='on'
                  {...register('password')}
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errors.password?.message}</div>
              </div>

              <div className='mt-3'>
                <Button
                  isLoading={loginAccountMutation.isPending}
                  disabled={Boolean(loginAccountMutation.isPending)}
                  className='w-full text-center py-4 px-2 uppercase bg-orange text-white text-sm hover:bg-red-600 flex justify-center items-center'
                >
                  Đăng nhập
                </Button>
              </div>

              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className='text-slate-400'>Bạn chưa có tài khoản?</span>
                  <Link className='text-orange ml-1' to={path.register}>
                    Đăng ký
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

export default Login
