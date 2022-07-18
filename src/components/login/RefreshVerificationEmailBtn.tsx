import { Loading } from '../common/loading/Loading';

interface Props {
  onClick: (() => Promise<void>) | (() => void);
  loading?: boolean;
}

export const RefreshVerificationEmailBtn = ({ onClick, loading = false }: Props) => {
  return (
    <div className="flex justify-center">
      <button onClick={onClick} disabled={loading} className="flex items-center gap-x-2 justify-center shrink-0">
        <span>Send again verification email</span>
        <Loading loading={loading}/>
      </button>
    </div>
  );
};
