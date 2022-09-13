import Nweet from 'components/Nweet';
import { dbService, storageService } from 'fbase';
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NweetFactory from 'components/NweetFactory';

const Home = ({ userObj }) => {
  // const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  // const [attachment, setAttachment] = useState('');
  // const fileInput = useRef();

  useEffect(() => {
    dbService.collection('nweets').onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  // const getNweets = async () => {
  //   const dbNweets = await dbService.collection('nweets').get();
  //   dbNweets.forEach((document) => {
  //     const nweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setNweets((prev) => [nweetObject, ...prev]);
  //   });
  // };
  // useEffect(() => {
  //   getNweets();
  // }, []);

  // const onSubmit = async (event) => {
  //   event.preventDefault();

  //   let attachmentUrl = '';
  //   if (attachment !== '') {
  //     const attachmentRef = storageService
  //       .ref()
  //       .child(`${userObj.uid}/${uuidv4()}`);
  //     const response = await attachmentRef.putString(attachment, 'data_url');
  //     attachmentUrl = await response.ref.getDownloadURL();
  //   }
  //   const nweetObj = {
  //     text: nweet,
  //     createdAt: Date.now(),
  //     creatorId: userObj.uid,
  //     attachmentUrl,
  //   };

  //   await dbService.collection('nweets').add(nweetObj);
  //   setNweet('');
  //   setAttachment('');

  //   // const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
  //   // const response = await fileRef.putString(attachment, 'data_url');
  //   // console.log(response);

  //   // await dbService.collection('nweets').add({
  //   //   text: nweet,
  //   //   createdAt: Date.now(),
  //   //   creatorId: userObj.uid,
  //   // });
  //   // setNweet('');
  // };
  // const onChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setNweet(value);
  // };
  // const onFileChange = (event) => {
  //   const {
  //     target: { files },
  //   } = event;
  //   const theFile = files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = (finishedEvent) => {
  //     const {
  //       currentTarget: { result },
  //     } = finishedEvent;
  //     setAttachment(result);
  //   };
  //   reader.readAsDataURL(theFile);
  // };

  // const onClearAttachment = () => {
  //   fileInput.current.value = '';
  //   setAttachment(null);
  // };

  return (
    <div className='container'>
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
