export const api =
  process.env.REACT_APP_CONTACTS_API_URL || "http://localhost:8081";

const headers = {
  Accept: "application/json"
};

export const doLogin = payload =>
  //fetch(`${api}/mongoCalls/login`, {
  fetch(`${api}/login`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      let ResponseJSON = { status: 200, data: data };
      console.log(ResponseJSON);
      return ResponseJSON;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const fetchAllMovies = payload =>
  fetch(`${api}/movie/search`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Authorization: localStorage.JWTToken
    },
    credentials: "include",
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      let ResponseJSON = { status: 200, data: data };
      console.log(ResponseJSON);
      return ResponseJSON;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const fetchAllMoviesByRating = payload =>
  fetch(`${api}/movie/getByRating`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Authorization: localStorage.JWTToken
    },
    credentials: "include",
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      let ResponseJSON = { status: 200, data: data };
      console.log(ResponseJSON);
      return ResponseJSON;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const fetchMovieById = payload =>
  fetch(`${api}/movie/` + payload, {
    method: "GET",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Authorization: localStorage.JWTToken
    },
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      let ResponseJSON = { status: 200, data: data };
      console.log(ResponseJSON);
      return ResponseJSON;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const fetchMovieReviewsById = payload =>
  fetch(`${api}/review/retrieve`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Authorization: localStorage.JWTToken
    },
    credentials: "include",
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      let ResponseJSON = { status: 200, data: data };
      // console.log('response from api ', data);
      return ResponseJSON;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const ValidateMovieForWatch = payload =>
  fetch(`${api}/movie/play`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Authorization: localStorage.JWTToken
    },
    credentials: "include",
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      let ResponseJSONM = { status: 200, data: data };
      // console.log('response from api ', data);
      return ResponseJSONM;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const saveData = details =>
  fetch(
    `${api}/userprofile`,
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(details)
    },
    console.log(JSON.stringify(details))
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let ResponseJSON = { status: 200, data: data };
      return ResponseJSON;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const postReview = details =>
  fetch(
    `${api}/review/`,
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Authorization: localStorage.JWTToken
      },
      credentials: "include",
      body: JSON.stringify(details)
    },
    console.log("review post payload ", JSON.stringify(details))
  )
    .then(res => res.json())
    .then(data => {
      if (data.status && data.status !== 200) {
        let ResponseJSON = { status: 400, data: data };
        return ResponseJSON;
      } else {
        let ResponseJSON = { status: 200, data: data };
        return ResponseJSON;
      }
    });

export const addMoney = details =>
  fetch(
    `${api}/subcribe`,
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Authorization: localStorage.JWTToken
      },
      credentials: "include",
      body: JSON.stringify(details)
    },
    console.log(JSON.stringify(details))
  )
    .then(res => res.json())

    .then(data => {
      if (data.status && data.status !== 200) {
        let ResponseJSON = { status: 400, data: data };
        return ResponseJSON;
      } else {
        let ResponseJSON = { status: 200, data: data };
        return ResponseJSON;
      }
    });

export const addMoneyPPV = details =>
  fetch(
    `${api}/moviepay`,
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Authorization: localStorage.JWTToken
      },
      credentials: "include",
      body: JSON.stringify(details)
    },
    console.log(JSON.stringify(details))
  )
    .then(res => res.json())

    .then(data => {
      if (data.status && data.status !== 200) {
        let ResponseJSON = { status: 400, data: data };
        return ResponseJSON;
      } else {
        let ResponseJSON = { status: 200, data: data };
        return ResponseJSON;
      }
    });

export const registerConfirmation = token =>
  fetch(`${api}/userprofile/regitrationConfirm?token=` + token, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "true"
  })
    .then(res => res.json())
    .then(data => {
      let ResponseJSON = { status: 200, data: data };
      console.log(ResponseJSON);
      return ResponseJSON;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const logout = userId =>
  fetch(`${api}/login/logout`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(userId)
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log("This is error" + error);
      return error;
    });

export const fetchData = payload =>
  fetch(`${api}/login/getUserData`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(payload)
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const checkSession = () =>
  fetch(`${api}/users/redirectToHomepage`, {
    method: "GET",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const postProject = projectdetails =>
  // fetch(`${api}/kafka/kafkaProducer/postproject`, {
  fetch(`${api}/mongoCalls/postproject`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(projectdetails)
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const fetchProjects = () =>
  fetch(`${api}/project/all`, {
    method: "get",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.log("This is error in fetch projects");
      return error;
    });

export const fetchProjectsWithStatus = status =>
  fetch(`${api}/project/status`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(status)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.log("This is error in fetch projects with status");
      return error;
    });

export const editUpdateProfile = userdata =>
  //fetch(`${api}/users/editUpdateProfile`, {
  //    fetch(`${api}/kafka/kafkaProducer/editUpdateProfile`, {
  fetch(`${api}/login/editProfile`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(userdata)
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log("This is error while updating profile");
      return error;
    });

export const fetchUserProfile = userId =>
  //fetch(`${api}/users/getUserProfile`, {
  fetch(`${api}/getUserProfile/${userId}`, {
    method: "GET",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Authorization: localStorage.JWTToken
    },
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.log("This is error in fetch user Profile");
      return error;
    });

export const fetchAllProjects = () =>
  //fetch(`${api}/kafka/kafkaProducer/getAllProjects`, {
  fetch(`${api}/mongoCalls/getAllProjectsWithBids`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      return data;
    })
    .catch(error => {
      console.log("This is error in fetch projects");
      return error;
    });

export const fetchAllProjectsForBrowse = () =>
  //fetch(`${api}/kafka/kafkaProducer/getAllProjects`, {
  fetch(`${api}/mongoCalls/getAllProjectsWithBids`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      return data;
    })
    .catch(error => {
      console.log("This is error in fetch projects");
      return error;
    });

export const fetchProjectDetails = projectdata =>
  fetch(`${api}/project/add`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(projectdata)
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log("This is error while updating profile");
      return error;
    });

export const postBid = projectdetails =>
  fetch(`${api}/bid/addBid`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(projectdetails)
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const fetchBidInfo = projectdetails =>
  fetch(`${api}/bid/getBidInfo`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(projectdetails)
  })
    .then(res => res.json())
    .then(data => {
      console.log("in bids then " + data);
      return data;
    })
    .catch(error => {
      console.log("This is error in fetch Bid info");
      return error;
    });

export const withdrawMoney = userdata =>
  fetch(`${api}/kafka/kafkaProducer/withdrawMoney`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(userdata)
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const getIncomingTransactions = () =>
  fetch(`${api}/mongoCalls/getIncomingTransactions`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      return data;
    })
    .catch(error => {
      console.log("This is error in fetch credit transactions ");
      return error;
    });

export const hireFreelancer = projectdetails =>
  fetch(`${api}/mongoCalls/hireFreelancer`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(projectdetails)
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const getJWTToken = loginDetails =>
  fetch(`${api}/login`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(loginDetails)
  })
    .then(res => res.json())
    .then(data => {
      console.log("Sending JWT token and other details in response : ", data);
      return data;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const addMovie = details =>
  fetch(`${api}/admin/movie`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      // 'Authorization': details.jwtToken
      Authorization: localStorage.getItem("JWTToken")
    },
    credentials: "include",
    body: JSON.stringify(details)
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const getMovies = () =>
  fetch(`${api}/admin/movie`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      // 'Authorization': details.jwtToken
      Authorization: localStorage.getItem("JWTToken")
    },
    credentials: "include"
    // body: JSON.stringify(details)
  })
    .then(res => res.json())
    .then(data => {
      console.log("All Movies : " + data);
      return data;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const getFinancialsByMonthly = (year, month) =>
  fetch(`${api}/admin/finance/monthly?year=${year}&month=${month}`, {
    method: "GET",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("JWTToken")
      // 'Authorization': details.jwtToken
    },
    credentials: "include"
    // body: JSON.stringify(details)
  })
    .then(res => res.json())
    .then(data => {
      console.log("All Finances : " + data);
      return data;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const getUsers = (search, page, size) =>
  fetch(`${api}/admin/search`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Authorization: localStorage.JWTToken
    },
    credentials: "include",
    body: JSON.stringify({
      search: search,
      page: page,
      size: size
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log("All User info -: ", data);
      console.log("All content  : ", data.content);
      return data.content;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const getFinancials = () =>
  fetch(`${api}/admin/finance/yearly`, {
    method: "GET",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      // 'Authorization': details.jwtToken
      Authorization: localStorage.getItem("JWTToken")
    },
    credentials: "include"
    // body: JSON.stringify(details)
  })
    .then(res => res.json())
    .then(data => {
      console.log("All Finances : " + data);
      return data;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const getMovieList = days =>
  fetch(`${api}/movie/play/stats/${days}`, {
    method: "GET",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      // 'Authorization': details.jwtToken
      Authorization: localStorage.getItem("JWTToken")
    },
    credentials: "include"
    // body: JSON.stringify(details)
  })
    .then(res => res.json())
    .then(data => {
      console.log("All Movies : " + data);
      return data;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const searchMovie = (searchText, filterValues, page, size) =>
  fetch(`${api}/movie/search`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      // 'Authorization': details.jwtToken
      Authorization: localStorage.getItem("JWTToken")
    },
    credentials: "include",
    // body: JSON.stringify(details)
    body: JSON.stringify({ searchText, filterValues, page, size })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Search movies return : ", data);
      console.log("Values : ", data.content);
      return data.content;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const deleteMovie = movieID =>
  fetch(`${api}/admin/movie/${movieID}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      // 'Authorization': details.jwtToken
      Authorization: localStorage.getItem("JWTToken")
    },
    credentials: "include",
    body: JSON.stringify(movieID)
  })
    .then(res => res.json())
    .then(data => {
      if (data.status && data.status !== 200) {
        let ResponseJSON = { status: 400, data: data };
        return ResponseJSON;
      } else {
        let ResponseJSON = { status: 200, data: data };
        return ResponseJSON;
      }
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const updateMovie = (movieID, movieDetails) =>
  fetch(`${api}/admin/movie/${movieID}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Authorization: localStorage.JWTToken
    },
    credentials: "include",
    body: JSON.stringify(movieDetails)
  })
    .then(res => res.json())
    .then(data => {
      if (data.status && data.status !== 200) {
        let ResponseJSON = { status: 400, data: data };
        return ResponseJSON;
      } else {
        let ResponseJSON = { status: 200, data: data };
        return ResponseJSON;
      }
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const getUserMovieHistory = userId =>
  //fetch(`${api}/users/getUserProfile`, {
  fetch(`${api}/movie/play/byUser/${userId}`, {
    method: "GET",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Authorization: localStorage.JWTToken
    },
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.log("This is error in fetch user Profile");
      return error;
    });

export const getUserStats = () =>
  fetch(`${api}/admin/userStats/yearly`, {
    method: "GET",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      // 'Authorization': details.jwtToken
      Authorization: localStorage.getItem("JWTToken")
    },
    credentials: "include"
    // body: JSON.stringify(details)
  })
    .then(res => res.json())
    .then(data => {
      console.log("All users until now : " + data);
      return data;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

export const getUserStatsByMonthly = (year, month) =>
  fetch(`${api}/admin/userStats/monthly?year=${year}&&month=${month}`, {
    method: "GET",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("JWTToken")
      // 'Authorization': details.jwtToken
    },
    credentials: "include"
    // body: JSON.stringify(details)
  })
    .then(res => res.json())
    .then(data => {
      console.log("All user list : " + data);
      return data;
    })
    .catch(error => {
      console.log("This is error");
      return error;
    });

// export const fetchSensorData = () =>
//                                     fetch(`${api}/sensorsimulation`, {
//                                         method: 'POST',
//                                         headers: {
//                                             ...headers,
//                                             'Content-Type': 'application/json'
//                                         },
//                                         credentials: 'include',
//                                     }).then((res) => res.json())
//                                         .then((data) => {
//                                             console.log('API '+data);
//                                             return data
//                                                 ;})
//                                         .catch(error => {
//                                             console.log("This is error in fetch sensors");
//                                             return error;
//                                         });
