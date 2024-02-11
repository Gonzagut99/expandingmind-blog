import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
//import { blogdata } from './blogData'
import { useAuth } from './auth'
import Comments from './Comments/Comments'
import Comment from './Comments/Comment'
import RequestButton from './Buttons/RequestButton'
import { useBlogContent } from './useBlogContent'


function BlogPost({blogDataStates}) {
    const [blogdataLocal, setBlogdataLocal] = blogDataStates

    const navigate = useNavigate()
    const auth = useAuth()
    const { user } = auth
    const { slug } = useParams()
    const { title, content, author, comments } = blogdataLocal.find(post => post.slug === slug)
    const returnToBlog = () => {
        //window.history.back()
        //window.history.go(-1)
        //navigate(-1)
        navigate('/blog')
    }

    const updateActions = {
        'EDIT': 'EDIT',
    }

    const updateTitlePost = (action, inputContent) => (
        blogdataLocal.map(post => {
            if (post.slug === slug) {
                if(action === updateActions.EDIT){
                    return {
                        ...post,
                        title: inputContent
                    };
                }
            }
            return post;
        })
    )

    const updateContentPost = (action, inputContent) => (
        blogdataLocal.map(post => {
            if (post.slug === slug) {
                if(action === updateActions.EDIT){
                    return {
                        ...post,
                        content: inputContent
                    };
                }
            }
            return post;
        })
    )

    const deletePost = () => {
        const updatedBlogData = blogdataLocal.filter(post => post.slug !== slug);
        setBlogdataLocal(updatedBlogData);
        navigate('/blog')
    }
        
    

    const {
        edit:editTitle,
        inputContent: inputContentTitle,
        loading: loadingTitle,
        
        setInputContent: setInputContentTitle,
        handleEdit: handleEditTitle,
        handleCancelEdit: handleCancelEditTitle,
        handleSave: handleSaveTitle,
    } = useBlogContent({
      contentToChange: title,
      actions: {
        onEdit: () => updateTitlePost(updateActions.EDIT, inputContentTitle),
      },
      setBlogdataLocal,
    });

    const {
        edit:editContent,
        inputContent: inputContentPostContent,
        loading: loadingContent,
        
        setInputContent: setInputContentPostContent,
        handleEdit: handleEditContent,
        handleCancelEdit: handleCancelEditContent,
        handleSave: handleSaveContent,
    } = useBlogContent({
      contentToChange: content,
      actions: {
        onEdit: () => updateContentPost(updateActions.EDIT, inputContentPostContent),
      },
      setBlogdataLocal,
    });

  return (
    <>
      <header>
        {!editTitle && <h2>{title}</h2>}
        {editTitle && (
          <input
            type="text"
            value={inputContentTitle}
            onChange={(e) => setInputContentTitle(e.target.value)}
          />
        )}
        {!editTitle && (
          <div>
            {(user?.elseWrite || user?.userName === author) && (
              <button onClick={handleEditTitle}>Editar título</button>
            )}
          </div>
        )}
        {editTitle && (
          <div>
            <RequestButton
              loading={loadingTitle}
              requestType={"EDIT"}
              onClick={handleSaveTitle}
            >
              Guardar
            </RequestButton>
            <button onClick={handleCancelEditTitle}>Cancelar</button>
          </div>
        )}
      </header>
        <br />
      <button onClick={returnToBlog}>Volver al blog</button>
      <p>{author}</p>
      {!editContent && <p>{content}</p>}
        {editContent && (
            <textarea
            value={inputContentPostContent}
            onChange={(e) => setInputContentPostContent(e.target.value)}
            />
        )}
        {!editContent && (
           <>
                {user?.elseWrite && <button onClick={handleEditContent}>Editar Contenido</button>}
                
                {user?.userName === author && (!user?.elseWrite || !user?.elseDelete) &&
                    <button onClick={handleEditContent}>Editar Contenido</button>
                }
            </> 
        )}
        {editContent && (
            <div>
                <RequestButton
                    loading={loadingContent}
                    requestType={"EDIT"}
                    onClick={handleSaveContent}
                >
                    Guardar
                </RequestButton>
                <button onClick={handleCancelEditContent}>Cancelar</button>
            </div>
        )}
        <br />
        {user?.elseDelete && <RequestButton requestType={"DELETE"} onClick={deletePost}>Borrar Post</RequestButton>}
        {user?.userName === author && (!user?.elseWrite || !user?.elseDelete) &&
            <RequestButton requestType={"DELETE"} onClick={deletePost}>Borrar Post</RequestButton>
        }
        
      
      <br />
      <Comments>
        {comments.map(({ idUser, content }, index) => (
          <Comment
            key={index}
            idUser={idUser}
            content={content}
            slug={slug}
            setBlogdataLocal={setBlogdataLocal}
            blogdataLocal={blogdataLocal}
          />
        ))}
      </Comments>
      {/*crea */}
    </>
  );
}


export default BlogPost