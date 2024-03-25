class ApiError extends Error {
  constructor(response, responseData) {
    super(responseData.error);
    this.name = 'ApiError';
    this.response = response;
    this.status = response.status;
    this.responseData = responseData;
  }
}

export default ApiError;
