import { PostMetadata } from '@/common/components/PostMetadata'
import { Reactions } from '@/common/components/Reactions'
import type { Post as P } from '@/features/posts/model/postsSlice'
import { Link } from 'react-router-dom'

type Props = {
  post: P
}

export const Post = (props: Props) => {
  const { post } = props

  const { title, user: userId, date, content, id, reactions } = post

  return (
    <div>
      <h3>
        <Link to={`/posts/${id}`}>{title}</Link>
      </h3>
      <PostMetadata userId={userId} timestamp={date} showPrefix />
      <p>{content.slice(0, 100)}</p>
      <Reactions reactions={reactions} postId={post.id} />
    </div>
  )
}
