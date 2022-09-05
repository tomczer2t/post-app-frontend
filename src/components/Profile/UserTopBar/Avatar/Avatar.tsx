import userDefault from '../../../../assets/images/default-user-img.jpeg';
import { useState } from 'react';
import { useAxiosPrivate } from '../../../../hooks/useAxiosPrivate';
import { useAuth } from '../../../../hooks/useAuth';

interface Props {
  avatarURL: string | undefined;
}

export const Avatar = ({ avatarURL }: Props) => {

  const [isClicked, setIsClicked] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const formData = new FormData();
    console.log(e.target.files[0]);
    console.log(e.target.files[0].name);
    formData.append('file', e.target.files[0], e.target.files[0].name);
    const { data } = await axiosPrivate.patch<string | undefined>('users/avatar', formData);
    setAuth((prev) => {
      if (prev === null) return null;
      return { ...prev, user: { ...prev.user, avatarURL: data } };
    });
  };

  return (
    <div className="relative w-20 md:w-full">
      <img src={ avatarURL ? avatarURL : userDefault }
           className="object-fit aspect-square rounded-full border-solid border-slate-200 border-2 cursor-pointer"
           onClick={ () => setIsClicked(prev => !prev) }
           alt="" />
      { isClicked && (
        <div className="absolute top-full left-0 border-solid border-2 border-slate-400 w-[200px] bg-slate-200 overflow-hidden rounded-md text-slate-500 md:w-full flex flex-col">
          <label htmlFor="upload-photo"
                 className="cursor-pointer text-center hover:bg-slate-300 p-2">Upload avatar</label>
          <input type="file"
                 className="opacity-0 absolute -z-10"
                 name="photo"
                 onChange={ handleImageChange }
                 id="upload-photo" />
          { avatarURL && (
            <button type="button"
                    className="text-slate-500 text-base cursor-pointer hover:bg-slate-300 p-2">Remove avatar</button>
          ) }
        </div>
      ) }
    </div>
  );
};
