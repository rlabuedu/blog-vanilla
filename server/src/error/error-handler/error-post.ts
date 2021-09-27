import { POST_ERROR_MESSAGE } from 'constants/error-message';
import CustomError from 'error/custom-error';
import { IError } from 'types/error';

const errorPost = (err: CustomError): IError => {
  const { status, message } = err;
  let errorMessage;

  switch (message) {
    case POST_ERROR_MESSAGE.notFoundUserId:
      errorMessage = '유저가 존재하지 않습니다';
      break;
    case POST_ERROR_MESSAGE.notFoundPostId:
      errorMessage = '글이 존재하지 않습니다';
      break;
    default:
      errorMessage = '다시 시도해주세요';
      break;
  }

  return { status, errorMessage };
};

export default errorPost;
