"use client";

import Button from "@/components/Button";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";

const Page = () => {
  const { logout, resendEmailVerification } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/dashboard",
  });

  const [status, setStatus] = useState(null);

  return (
    <>
      <div className="mb-4 text-sm text-gray-400">
        ご登録頂きありがとうございます。メールアドレス確認のリンクを送付しましたので、メールに記載のリンクをクリックしてください。メールが届いていない場合には、再送も可能です
      </div>

      {status === "verification-link-sent" && (
        <div className="mb-4 font-medium text-sm text-green-600">
          ユーザ登録時に入力頂いたメールアドレス宛にメールアドレス確認リンクを再送しました
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <Button onClick={() => resendEmailVerification({ setStatus })}>
          メールアドレス確認リンクの再送
        </Button>

        <button
          type="button"
          className="underline text-sm text-gray-600 hover:text-gray-900"
          onClick={logout}
        >
          ログアウト
        </button>
      </div>
    </>
  );
};

export default Page;
