import { FormEvent, useEffect, useState } from 'react';
import { ContentState, convertToRaw, EditorState, RichUtils } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { axios } from '../../api/axios';
import { Editor } from 'react-draft-wysiwyg';
import { FormGroup } from '../common/form/FormGroup';
import { FormLabel } from '../common/form/FormLabel';
import { FormInput } from '../common/form/FormInput';
import { Form } from '../common/form/Form';
import { ErrorModal } from '../common/modals/ErrorModal';
// import { convertImages } from '../../utils/convertImages';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useAuth } from '../../hooks/useAuth';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

//@todo teraz działa bez sprawdzania użytkownika.
//@todo zmienić to koniecznie!
export const PostEditor = () => {

  const [id, setId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [photoURL, setPhotoURL] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [headline, setHeadline] = useState<string>('');
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSucces] = useState<string>('');
  const [error, setError] = useState<string>('');

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const { auth } = useAuth();
  const { postID } = useParams();

  useEffect(() => {
    setError('');
  }, [title, photoURL, content, headline, editorState])

  useEffect(() => {
    if (postID) {
      setId(postID);
      getPost(postID);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 100)
    }
  }, [postID]);

  const getPost = async (id: string) => {
    try {
      const response = await axiosPrivate.get(`posts/${ id }`);

      if (response.status === 200 || response.status === 304) {
        if (auth?.user.id !== response.data.post.author.id) {
          console.error('This blog is owned by someone else');
          setId('');
        } else {
          let post = response.data.post; // zrobić as PostIneterface z backendu
          setTitle(post.title);
          setContent(post.content);
          setHeadline(post.headline);
          setPhotoURL(post.photoURL || '');
          // convert html string to draft JS editor state
          const contentBlog = htmlToDraft(post.content);
          const contentState = ContentState.createFromBlockArray(contentBlog.contentBlocks);
          const _editorState = EditorState.createWithContent(contentState);

          setEditorState(_editorState);
        }
      } else {
        setError(`Unable to retrieve post ${ id }`);
        setId('');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (title === '' || headline === '' || content === '') {
      setError('Please fill out all required forms.');
      setSucces('');
      return null;
    }

    setError('');
    setSucces('');
    setSaving(true);

    try {
      console.log({ content });
      const response = await axiosPrivate.post<{postId: string}>('posts', {
        title,
        photoURL,
        headline,
        content,
      });
      navigate(`/posts/${response.data.postId}`);
      // if (response.status === 201)
      // {
      //   setId(response.data.post.id);
      //   setSucces('Post posted. You can continue to edit it on this page.');
      // }
      // else
      // {
      //   setError('Unable to save post.');
      // }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEditBlog = async () => {
    if (title === '' || headline === '' || content === '') {
      setError('Please fill out all required forms.');
      setSucces('');
      return null;
    }

    setError('');
    setSucces('');
    setSaving(true);

    try {
      const response = await axios.patch(`posts/${ id }`, {
        title,
        photoURL,
        headline,
        content,
      });

      if (response.status === 201) {
        setSucces('Post edited.');
      } else {
        setError('Unable to save post.');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    id ? handleEditBlog() : handleCreatePost();
  };

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
    setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
  };

  if (loading) return <h1>Loading editor ...</h1>; //@todo poprawić

  return (
    <div className="min-h-screen max-w-[860px] mx-auto">
      <h1 className="text-2xl py-4 m-0 px-8">{ id ? 'Edit your post' : 'Create new post' }</h1>
      <div className="mb-5">
        <ErrorModal close={ () => setError('') }
                    error={ error } />
        <Form className="myEditor">
          <FormGroup>
            <FormLabel htmlFor="title">
              Title *
            </FormLabel>
            <FormInput value={ title }
                       setValue={ setTitle }
                       placeholder="Enter a title..."
                       name="title"
                       id="title"
                       disabled={ saving }
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="picture">
              Picture
            </FormLabel>
            <FormInput value={ photoURL }
                       setValue={ setPhotoURL }
                       placeholder="Set picture f.e. https://....."
                       name="picture"
                       id="picture"
                       disabled={ saving }
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="headline">
              Headline *
            </FormLabel>
            <FormInput value={ headline }
                       setValue={ setHeadline }
                       placeholder="Enter a headline..."
                       name="headline"
                       id="headline"
                       disabled={ saving }
            />
          </FormGroup>

          <div>
            <label>Content</label>
            <Editor editorState={ editorState }
                    editorClassName="border-solid border-slate-200 p-4 max-w-[812px] mx-auto py-12"
                    wrapperClassName=""
                    handleKeyCommand={ (command) => {
                      const newState = RichUtils.handleKeyCommand(editorState, command);
                      if (newState) {
                        onEditorStateChange(newState);
                        return 'handled';
                      }
                      return 'not-handled';
                    } }
                    onEditorStateChange={ onEditorStateChange }
                    toolbar={ {
                      options: ['inline', 'blockType', 'fontFamily', 'fontSize', 'list', 'textAlign', 'history', 'colorPicker', 'embedded', 'emoji', 'image'],
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                      fontFamily: { inDropDown: true },
                    } } />
          </div>

          <div>
            { success && <p className="text-green-600 text-xl">{ success }</p> }
          </div>

          <div>
            <button type="submit"
                    onClick={ handleSubmit }
                    disabled={ saving }
                    className="block bg-slate-500 px-4 py-2 rounded-md text-white">
              { id !== '' ? 'Update' : 'Post' }
            </button>
            { id !== '' &&
              <button className="bg-green-400 text-white">
                <Link to={ `/posts/${ id }` }>View your post</Link>
              </button>
            }
          </div>

          <div>
            <label>Preview</label>
            <div className="border-solid border-slate-200 p-4 py-12" dangerouslySetInnerHTML={ { __html: content } } />
          </div>
        </Form>
      </div>
    </div>
  );
};
