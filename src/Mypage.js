/* Mypage.js（完成版） */

import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import { useNavigate, Navigate } from "react-router-dom";

const Mypage = () => {
  const [user, setUser] = useState("");

  // useStateを定義し、初期値をtrueに
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  // ↓を実行するとログアウトが行われる
  // ログインページにリダイレクトされる
  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };

  return (
    <>
      {/* ↓「loading」がfalseのときにマイページを表示する設定 */}
      {!loading && (
        <>
          {!user ? (
            <Navigate to={`/login/`} />
          ) : (
            <>
              <h1>マイページ</h1>
              {/* ↓ユーザーのメールアドレスを表示 */}
              <p>{user?.email}</p>
              <button onClick={logout}>ログアウト</button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Mypage;
