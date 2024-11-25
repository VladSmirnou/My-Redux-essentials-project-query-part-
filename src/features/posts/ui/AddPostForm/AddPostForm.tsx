import { useAppSelector } from '@/common/hooks/useAppSelector'
import { useAddNewPostMutation } from '@/features/api/apiSlice'
import { selectLoggedInUserId } from '@/features/auth/model/authSlice'
import { useForm } from 'react-hook-form'

const defaultValues = {
  title: '',
  content: '',
}

type FormFields = typeof defaultValues

const required = {
  value: true,
  message: 'this field is required',
}

export const AddPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    defaultValues,
  })

  const userId = useAppSelector(selectLoggedInUserId)!

  const [addPost, { isLoading }] = useAddNewPostMutation()

  const onSubmit = (data: FormFields) => {
    addPost({ user: userId, ...data })
      .unwrap()
      .catch(alert)
      .finally(reset)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Post title:
        {/* <input {...register('title', { required })} type="text" /> */}
        <input {...register('title')} type="text" />
      </label>
      {errors.title && <p>{errors.title.message}</p>}
      <label>
        Post content:
        <textarea {...register('content', { required })} />
      </label>
      {errors.content && <p>{errors.content.message}</p>}
      <button disabled={isLoading}>add post</button>
    </form>
  )
}
