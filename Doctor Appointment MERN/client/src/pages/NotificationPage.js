import React from 'react'
import {useSelector , useDispatch} from 'react-redux'
import Layout from '../components/Layout';
import {showLoading , hideLoading} from '../redux/features/alertSlice';
import axios from 'axios';
import { message,Tabs } from 'antd'
import {useNavigate} from 'react-router-dom'

const NotificationPage = () => {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  //handle Read notification
  const handleMarkAllRead = async() =>{
    try
    {
     dispatch(showLoading());
     const res =  await axios.post('/api/v1/user/get-all-notification', 
     {userId : user._id},
     {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
     });
     dispatch(hideLoading());
     if(res.data.success){
        message.success(res.data.message)
     }
     else
     {
      message.error(res.data.message)
     }
    }catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
     }


  };

  //delete notifications
  const handleDeleteAllRead = async() =>{
    try
    {
     dispatch(showLoading());
     const res =  await axios.post('/api/v1/user/delete-all-notification', 
     {userId : user._id},
     {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
     }
     );
     dispatch(hideLoading());
     if(res.data.success){
        message.success(res.data.message)
     }
     else
     {
      message.error(res.data.message)
     }
    }catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");

    }};

  return (
    <Layout>
        <h4 className="p-4 text-center">NotificationPage</h4>
        <Tabs>
           <Tabs.TabPane tab="Unread" key={0}>
            <div className="d-flex justify-content-end">
              <h6 className="p-2" onClick={handleMarkAllRead} style={ {cursor:"pointer"}}>
                Mark All Read
              </h6>
            </div>
            {user?.notification.map(notificationMsg => (
                <div 
                  className="card" 
                  onClick={ () => navigate(notificationMsg.onClickPath)}
                  style={ {cursor:"pointer"}}
                >
                   <div className="card-text">{notificationMsg.message}</div>
                </div>
              ))}
           </Tabs.TabPane>

           <Tabs.TabPane tab="seen" key={1}>
            <div className="d-flex justify-content-end">
              <h6 className="p-2 text-primary" style={{cursor: "pointer"}} onClick={()=>handleDeleteAllRead()}>
                Delete All Read
                </h6>
            </div>

            {
              user?.seennotification.map((notificationMsg) => (
                <div 
                  className="card" 
                  style={ {cursor:"pointer"}}
                >
                   <div className="card-text"   
                   onClick={ () => navigate(notificationMsg.onClickPath)}>
                    {notificationMsg.message}
                   </div>
                </div>
              ))
            }
           </Tabs.TabPane>
        </Tabs>
        
    </Layout>
  )
}

export default NotificationPage