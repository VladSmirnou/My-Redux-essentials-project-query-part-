import { Loader } from '@/common/components/Loader'

import { useGetPostsQuery } from '@/features/api/apiSlice'
import { useMemo } from 'react'
import { Post } from './Post/Post'

export const Posts = () => {
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetPostsQuery()

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts])

  let content: React.ReactNode

  if (isLoading) {
    content = <Loader />
  } else if (isSuccess) {
    content = (
      <>
        {isFetching && <Loader />}
        {sortedPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </>
    )
  } else if (isError) {
    content = <p>{error.toString()}</p>
  }

  return (
    <div>
      <h2>Posts</h2>
      {content}
    </div>
  )
}
