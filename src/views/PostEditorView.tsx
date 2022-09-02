import image from '../assets/images/andrew-neel-cckf4TsHAuw-unsplash.jpeg';
import { PostEditor } from '../components/PostEditor/PostEditor';

export const PostEditorView = () => {
  return (
    <>
      <div className="h-[300px] overflow-hidden">
        <img src={ image }
             className="block h-full object-bottom md:object-center object-cover w-full"
             alt="" />
      </div>
      <PostEditor/>
    </>
  );
};
