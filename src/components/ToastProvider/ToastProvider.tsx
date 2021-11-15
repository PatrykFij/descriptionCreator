import * as S from "./styles";

const ToastProvider = () => {
  return (
    <div>
      <S.Toast
        autoClose={20000} // 20s
        hideProgressBar={true}
      />
    </div>
  );
};

export default ToastProvider;
