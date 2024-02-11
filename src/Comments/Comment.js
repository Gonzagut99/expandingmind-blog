import React from 'react'
import { users, useAuth } from '../auth'
import RequestButton from '../Buttons/RequestButton';
import { useBlogContent } from '../useBlogContent.js';

function Comment({idUser, content, slug, blogdataLocal, setBlogdataLocal}) {
  const author = findUser(idUser)
  const { user } = useAuth()

  const updateActions = {
    'EDIT': 'EDIT',
    'DELETE': 'DELETE'
  }

  const updatedBlogData = (action, inputContent) => (
    blogdataLocal.map(post => {
      if (post.slug === slug) {
        let updatedComments;
        if(action === updateActions.DELETE){
          updatedComments = post.comments.filter(comment => comment.idUser !== idUser);
        } else if(action === updateActions.EDIT){
          updatedComments = post.comments.map(comment => {
            if(comment.idUser === idUser){
              return {
                ...comment,
                content: inputContent
              };
            }
            return comment;
          });
        }
        return {
          ...post,
          comments: updatedComments
        };
      }
      return post;
    })
  )

  const {
    edit,
    inputContent,
    loading,
    
    setInputContent,
    handleEdit,
    handleCancelEdit,
    handleDelete: handleDeleteComment,
    handleSave,
  } = useBlogContent({
    contentToChange: content,
    actions: {
      onEdit:()=> updatedBlogData(updateActions.EDIT,inputContent),
      onDelete:()=> updatedBlogData(updateActions.DELETE, inputContent),
    },
    setBlogdataLocal,
  });

  return (
    <article>
      <h4>{author.userName}</h4>
      <div>
        {!edit && <p>{content}</p>}
        {edit && <textarea value={inputContent} onChange={(e) => setInputContent(e.target.value)} />}
      </div>
      {!edit && <div>
        {user?.elseWrite && <button  onClick={handleEdit}>Editar</button>}
        {user?.elseDelete  && <RequestButton requestType={'DELETE'} onClick={handleDeleteComment} loading={loading}>Borrar</RequestButton>}
        {user?.userName === author.userName && (!user?.elseWrite||!user?.elseDelete) && (
              <>
                <button onClick={handleEdit}>Editar</button>
                <RequestButton requestType={'DELETE'} loading={loading} onClick={handleDeleteComment}>Borrar</RequestButton>
              </>
          )}
      </div>}
      {
        edit && <div>
          <RequestButton loading={loading} requestType={'EDIT'} onClick={handleSave}>Guardar</RequestButton>
          <button onClick={handleCancelEdit}>Cancelar</button>
        </div>
      }
    </article>
  );
}

//a function that iterates over a list of objects and return the object that have the same userName that i am looking for
export function findUser(idUser){
  let user = users.find(user => user.id === idUser)
  user = user ? user: {userName: 'Anónimo'}
  return user   
}

export default Comment