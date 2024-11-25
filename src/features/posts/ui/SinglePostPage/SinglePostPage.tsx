import { PostMetadata } from '@/common/components/PostMetadata'
import { Reactions } from '@/common/components/Reactions'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { useGetPostQuery, useGetPostsQuery } from '@/features/api/apiSlice'
import { selectLoggedInUserId } from '@/features/auth/model/authSlice'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { UpdatePostForm } from './UpdatePostForm/UpdatePostForm'
import { Loader } from '@/common/components/Loader'

export const SinglePostPage = () => {
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  const { postId } = useParams<{ postId: string }>()

  const {
    data: post,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetPostQuery(postId!)

  const currentlyLoggedInUserId = useAppSelector(selectLoggedInUserId)

  let finalContent: React.ReactNode

  if (isFetching) {
    finalContent = <Loader />
  } else if (isSuccess) {
    const { content, title, user: userId, date, reactions } = post

    const hideUpdateFormHandler = () => {
      setShowUpdateForm(false)
    }

    const showUpdateFormHandler = () => {
      setShowUpdateForm(true)
    }

    const editButton =
      currentlyLoggedInUserId === post.user ? (
        <button onClick={showUpdateFormHandler}>edit post</button>
      ) : null

    finalContent = showUpdateForm ? (
      <UpdatePostForm
        postId={post.id}
        title={title}
        content={content}
        onFormClose={hideUpdateFormHandler}
      />
    ) : (
      <div>
        <h2>{title}</h2>
        <PostMetadata userId={userId} timestamp={date} showPrefix />
        <p>{content}</p>
        <Reactions reactions={reactions} postId={post.id} />
        {editButton}
      </div>
    )
  } else if (isError) {
    finalContent = <p>{error.toString()}</p>
  } else {
    finalContent = <p>post doesnt exist</p>
  }

  return finalContent
}
