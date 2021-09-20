export const addToFavouritesAction = (companyToAdd) => ({
  type: "ADD_COMPANY_TO_FAV",
  payload: companyToAdd,
});

export const removeFromFavouritesAction = (index) => ({
  type: "REMOVE_COMPANY_FROM_FAVOURITES",
  payload: index,
});

export const backButtonAction = (boolean) => ({
  type: "BACK_BUTTON_PRESSED",
  payload: boolean,
});

export const searchArrayAction = (searchQuery) => {
  return async (dispatch, getState) => {
    console.log("fetching the array...");
    try {
      let response = await fetch(
        `https://strive-jobs-api.herokuapp.com/jobs?search=${searchQuery}`
      );
      if (response.ok) {
        let jobsresponse = await response.json();
        if (jobsresponse.length === 0) {
          alert("No jobs found with this title!");
        }
        setTimeout(() => {
          dispatch({
            type: "FILL_ARRAY_LOADING",
            payload: false,
          });
        }, 1000);
        dispatch({
          type: "FILL_ARRAY_ERROR",
          payload: false,
        });
        dispatch({
          type: "FILL_ARRAY",
          payload: jobsresponse.data,
        });
      } else {
        console.log("error");
        setTimeout(() => {
          dispatch({
            type: "FILL_ARRAY_LOADING",
            payload: false,
          });
        }, 1000);
        setTimeout(() => {
          dispatch({
            type: "FILL_ARRAY_ERROR",
            payload: true,
          });
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        dispatch({
          type: "FILL_ARRAY_LOADING",
          payload: false,
        });
      }, 1000);
      setTimeout(() => {
        dispatch({
          type: "FILL_ARRAY_ERROR",
          payload: true,
        });
      }, 1000);
    }
  };
};
