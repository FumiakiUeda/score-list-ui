import axios from '@/lib/axios';
import { NextRouter } from 'next/router';

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

// Score一覧取得
export async function useScoreList(setScores: React.Dispatch<React.SetStateAction<any>>): Promise<any> {
  try {
    // axiosを使用して非同期にデータを取得する
    const response = await axios.get('/api/scores');
    // レスポンスのデータを戻り値として返す
    setScores(response.data);
  } catch (error) {
    // エラーハンドリング
    console.error('Error fetching data:', error);
    throw error; // エラーを再スローします。
  }
}

// 編集するScore取得
export async function useScoreEdit(id: string | string[] | undefined, setScore: React.Dispatch<React.SetStateAction<any>>) {
  try {
    // axiosを使用して非同期にデータを取得する
    const response = await axios.get('/api/score/' + id);
    // レスポンスのデータをsetする
    setScore(response.data);
  } catch (error) {
    // エラーハンドリング
    console.error('Error fetching data:', error);
    throw error; // エラーを再スローします。
  }
}

// 新規Score保存
export async function useScoreCreate(params: FormData, useRouter: NextRouter) {
  try {
    // axiosを使用して非同期にデータを送信する
    await axios
      .post('/api/score', params)
      .then(() => {
        useRouter.push('/')
      })
  } catch (error) {
    // エラーハンドリング
    console.error('Error fetching data:', error);
    throw error; // エラーを再スローします。
  }
}
