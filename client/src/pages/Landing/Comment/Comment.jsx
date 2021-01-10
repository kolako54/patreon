import React from 'react';
import classes from './Comment.module.css';

const Comment = ({ comment, isRtl }) => {
  const { imgSrc, title, textBody, author } = comment;
  return (
    <div className={`${classes.comment} ${isRtl ? classes.rtl : ''}`}>
      <div className={classes['thumbnail-container']}>
        <img src={imgSrc} alt="thumbnail" className={classes.thumbnail} />
        <i className={classes.linkage}></i>
      </div>
      <div className={classes['comment-text']}>
        <h1 className={classes['comment-text__header']}>{title}</h1>
        <div className={classes['comment-text__body']}>
          <p> {textBody}</p>
          <p className={classes['author-info']}>
            {author.name} - {author.job}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
