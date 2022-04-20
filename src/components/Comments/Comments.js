import React, { useEffect, useState } from 'react'
import config from '../../config'
import { fetchData } from '../../utils/fetchData'
import Comment from './Comment'
import './Comments.scss'

const Comments = ({ mediaId }) => {
  const [state, setState] = useState({
    comments: [],
    error: false,
    loading: false,
    pi: 0,
    showMoreComments: false,
  })

  useEffect(() => {
    if (state.loading === false && state.error === false) {
      fetchNextComment(1)
    }
  }, [])

  const fetchNextComment = (pi) => {
    fetchData(
      mediaId,
      'Comments',
      (result) => {
        setState((state) => ({
          ...state,
          comments: [...state.comments, ...result],
          error: false,
          loading: false,
          pi: pi,
          showMoreComments:
            result.length < config.sections.Comments.ps ? false : true,
        }))
      },
      () => {},
      (isLoading) => {
        setState((state) => ({ ...state, loading: true }))
      },
      {
        mediaId: mediaId,
        profileId: 0,
        pi: pi,
      }
    )
  }

  return (
    <div className="comments">
      <div className="comments-header">نظرات کاربران</div>
      <div className="comments-container">
        {state.comments.map((comment) => (
          <Comment
            comment={comment}
            key={`comments-${mediaId}-${comment.id}`}
          />
        ))}
        {state.showMoreComments && (
          <div>
            <div
              className="more-button"
              onClick={() => fetchNextComment(state.pi + 1)}
            >
              بیشتر
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Comments
