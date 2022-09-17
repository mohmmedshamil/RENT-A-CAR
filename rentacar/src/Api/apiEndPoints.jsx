export const API_END_POINTS = {
    BASE_URL: `${window.location.origin.toString()}`,
    // baseURL:"http://localhost:81",
    baseURL:"http://localhost:5000",
  //  baseURL : window.location.origin,
    VERSION: "/api/v1",
    ADD:"/add",
    GETALL:"/getall",
    UPDATE:"/update",
    DELETE:"/delete",
    COLLECTION:"/collection",
    GETBYID:'/getbyid',
    REGISTER:'/register',
    ACTIVATION:'/activationid',
    SERVICE:{
      CARS:"/cars",
      AUTH:"/auth",
    }
  };
  