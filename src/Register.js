/* Register.js（完成版） */

/* useStateでメールアドレスとパスワードを取得 */
// ログイン判定のレンダリングは1度だけで良い為、useEffectを使用
import React, { useState, useEffect } from "react";
import {
  // ↓Firebaseで用意された関数
  createUserWithEmailAndPassword,
  // ↓Firebaseが用意してくれている関数
  onAuthStateChanged,
} from "firebase/auth";
// ↓FirebaseConfig.js」で定義したもの
import { auth } from "./FirebaseConfig.js";
/* 「Link」をimport↓ */
import { Navigate, Link } from "react-router-dom";

const Register = () => {
  // state変数を定義
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // 下の関数でユーザー登録が可能
  const handleSubmit = async (e) => {
    // ↓これがないと関数「handleSubmit」が実行されたときにブラウザがリロードされてしまう
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      alert("正しく入力してください");
    }
  };

  // ↓の記述でログインしているかどうかを判定している
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <>
          <h1>新規登録</h1>
          {/* 「登録する」ボタンをクリックしたときに
          関数「handleSubmit」を実行するように、「onSubmit」をformタグに追加 */}
          <form onSubmit={handleSubmit}>
            <div>
              <label>メールアドレス</label>
              {/* useStateを使ってinputで入力された値を取得するお決まりの流れ */}
              <input
                name="email"
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
            <div>
              <label>パスワード</label>
              {/* useStateを使ってinputで入力された値を取得するお決まりの流れ */}
              <input
                name="password"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <button>登録する</button>
            {/* ↓リンクを追加 */}
            <p>
              ログインは<Link to={`/login/`}>こちら</Link>
            </p>
          </form>
        </>
      )}
    </>
  );
};

export default Register;
