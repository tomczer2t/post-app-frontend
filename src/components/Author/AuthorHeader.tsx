import userDefault from '../../assets/images/default-user-img.jpeg';
import { useAuth } from '../../hooks/useAuth';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useEffect } from 'react';

interface Props {
  username: string;
  avatarURL?: string;
}

export const AuthorHeader = ({ username, avatarURL }: Props) => {

  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const toggleFavouriteAuthor  = async () => {
    try {
      const { data } = await axiosPrivate.patch(`users/favourite-author`, { authorUsername:  username });
      setAuth(prevState => {
        if (prevState === null) return null;
        return { ...prevState, user: { ...prevState.user, favouriteAuthors: data }}
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative bg-slate-500 flex flex-col-reverse items-center p-4 mt-8 md:px-8 md:flex-row md:justify-between max-w-[1200px] mx-auto overflow-hidden rounded-md">
      <div className="flex items-center gap-2">
        <h2 className="text-white">By { username }</h2>
        { auth && auth.user.favouriteAuthors?.some(author => author === username) ? <button onClick={ toggleFavouriteAuthor }>remove</button> : <button onClick={ toggleFavouriteAuthor } >add</button>}
      </div>
      <div className="hidden bg-white h-8 w-[200px] md:block absolute top-10 right-24 rotate-[110deg] z-10" />
      <div className="aspect-square w-28 overflow-hidden rounded-full bg-slate-600">
        <img src={ avatarURL ? avatarURL : userDefault }
             className="object-cover"
             alt="" />
      </div>
    </div>
  );
};
