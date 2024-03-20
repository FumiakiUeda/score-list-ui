import axios from '@/lib/axios';
import useSWR from 'swr';

interface Score {
  id: number;
  name: string;
  composer: string;
  arranger: string;
  publisher: number;
  note: string;
  part: { part_id: number }[];
}

type SetScoreFunction = (score: Score | null) => void;

export function useScoreList() {
  const { data: scores, error, mutate } = useSWR<Score[]>('/api/scores', () =>
    axios
      .get('/api/scores')
      .then(res => res.data)
      .catch(error => {
        if (error.response.status !== 200) throw error;
      })
  );

  return {
    scores,
    error,
  };
};

export async function useScoreEdit(id: string | string[] | undefined, setScore: SetScoreFunction) {
  await axios
    .get('/api/score/' + id)
    .then(res => setScore(res.data))
};