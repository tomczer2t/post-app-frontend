import userDefault from '../../assets/images/default-user-img.jpeg';

interface Props {
  username: string;
  avatarURL?: string;
}

export const AuthorHeader = ({ username, avatarURL }: Props) => {


  return (
    <div className="relative bg-slate-500 flex flex-col-reverse items-center p-4 mt-8 md:px-8 md:flex-row md:justify-between max-w-[1200px] mx-auto overflow-hidden rounded-md">
      <h2 className="text-white">By { username }</h2>
      <div className="hidden bg-white h-8 w-[200px] md:block absolute top-10 right-24 rotate-[110deg] z-10" />
      <div className="aspect-square w-28 overflow-hidden rounded-full bg-slate-600">
        <img src={ avatarURL ? avatarURL : userDefault }
             className="object-cover"
             alt="" />
      </div>
    </div>
  );
};
