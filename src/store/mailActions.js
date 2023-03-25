import { useSelector } from "react-redux";
import { mailAction } from "./mailSlice";

export const addMail = (mail) => {
  const senderEmail = mail.from.replace("@", "").replace(".", "");
  const receiverEmail = mail.to.replace("@", "").replace(".", "");

  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://mail-box-526a5-default-rtdb.firebaseio.com/${senderEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify({ ...mail, read: true }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (senderEmail != receiverEmail) {
        await fetch(
          `https://mail-box-526a5-default-rtdb.firebaseio.com/${receiverEmail}.json`,
          {
            method: "POST",
            body: JSON.stringify({ ...mail, read: false }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        dispatch(
          mailAction.add({
            id: data.name,
            ...mail,
            read: true,
          })
        );
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }

    // const data1 = useSelector((state) => state.mail);
    // console.log(data1);
  };
};

export const replacemail = (emailUrl, loggedUserEmail) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `https://mail-box-526a5-default-rtdb.firebaseio.com/${emailUrl}.json`
      );

      const data = await res.json();

      if (res.ok) {
        let mailData = [];
        let unReadMessage = 0;

        for (let key in data) {
          mailData = [{ id: key, ...data[key] }, ...mailData];
          if (data[key].to === loggedUserEmail && data[key].read === false) {
            unReadMessage++;
          }
        }

        console.log("first time", mailData);

        dispatch(
          mailAction.replace({
            mailData: mailData,
            unReadMessage: unReadMessage,
          })
        );
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteMail = (mail) => {
  const userEmail = localStorage.getItem("email");
  const emailUrl = userEmail.replace("@", "").replace(".", "");
  return async (dispatch) => {
    try {
      const res = await fetch(
        `https://mail-box-526a5-default-rtdb.firebaseio.com/${emailUrl}/${mail.id}.json`,
        {
          method: "DELETE",
        }
      );
      console.log(res);
      // const data = await res.json()

      dispatch(mailAction.remove(mail));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateMail = (emailUrl, loggedUserEmail, currentMail) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `https://mail-box-526a5-default-rtdb.firebaseio.com/${emailUrl}.json`
      );

      const data = await res.json();

      if (res.ok) {
        // if(data.length>currentMail.length){

        let mailData = [];
        let unReadMessage = 0;

        for (let key in data) {
          mailData = [{ id: key, ...data[key] }, ...mailData];
          if (data[key].to === loggedUserEmail && data[key].read === false) {
            unReadMessage++;
          }
        }
        dispatch(
          mailAction.replace({
            mailData: mailData,
            unReadMessage: unReadMessage,
          })
        );
        // }
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
