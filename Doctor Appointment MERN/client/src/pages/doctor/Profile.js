import React, { useState, useEffect } from 'react';
import Layout from './../../components/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {Form , Col ,Input, Row, TimePicker, message} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading , hideLoading} from '../../redux/features/alertSlice';
import moment from 'moment';



const Profile = () => {

  const {user} = useSelector(state => state.user)
  const [doctor , setDoctor] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams();
   //update doc======

    //handle form
    const handleFinish = async(values) => {
      // console.log(values)
      try{
          dispatch(showLoading)
          const res = await axios.post(
            '/api/v1/doctor/updateProfile',
            {...values, userId:user._id, 
                timings:[
                    moment(values.timings[0] , 'HH:mm'),
                    moment(values.timings[1] , 'HH:mm')
                ]},
            {
                  headers:{
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
          }
          );
          dispatch(hideLoading())
          if(res.data.success){
              message.success(res.data.message)
              navigate('/')
          }else{
              message.error(res.data.success) 
          }
      } catch(error){
          dispatch(hideLoading())
          console.log(error)
          message.error("Something Went Wrong")
      }
  };


  //getDoc details
  const getDoctorInfo = async(req,res) => {
    try{
       const res = await axios.post('/api/v1/doctor/getDoctorInfo',
       {userId: params.id},
       {
         headers:{
              Authorization: `Bearer ${localStorage.getItem('token')}`
         }
       })
       if(res.data.success){
        setDoctor(res.data.data)
       }
    }catch(error){
      console.log(error)
    }

  }

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
},[]);

  return (
    <Layout> 
      <h1>Manage Profile</h1>
      {doctor && <Form layout="vertical" onFinish={handleFinish} className="m-3" initialValues={{
        ...doctor,
        timings:[
            moment(doctor.timings[0], "HH:mm"),
            moment(doctor.timings[1], "HH:mm"),

        ],
        }}>

       <h4 className="text-dark">Personal details</h4>
         <Row gutter={20}>
         
            <Col xs={24}  md={24} lg={8}>
                <Form.Item  label="First name" name="firstName" required rules={[{required:true}]}>
                    <Input type="text" placeholder="your name"/>
                </Form.Item>
            </Col>
               
            <Col xs={24}  md={24} lg={8}>
                <Form.Item  label="Last name" name="lastName" required rules={[{required:true}]}>
                    <Input type="text" placeholder="your name"/>
                </Form.Item>
            </Col>
                
            <Col xs={24}  md={24} lg={8}>
                <Form.Item  label="Phone Number" name="phone" required rules={[{required:true}]}>
                    <Input type="text" placeholder="your name"/>
                </Form.Item>
                </Col>

                <Col xs={24}  md={24} lg={8}>
                 <Form.Item  label="Email" name="email" required rules={[{required:true}]}>
                <Input type="text" placeholder="your name"/>
                </Form.Item>
                </Col>
                 
                <Col xs={24}  md={24} lg={8}>
                <Form.Item  label="Website" name="website" required rules={[{required:true}]}>
                    <Input type="text" placeholder="your name"/>
                </Form.Item>
                </Col>
                
                <Col xs={24}  md={24} lg={8}>
                <Form.Item  label="Address" name="address" required rules={[{required:true}]}>
                    <Input type="text" placeholder="your name"/>
                </Form.Item>
                </Col>
                </Row>


        <h4 className="text-dark">Professional details</h4> 
        <Row gutter={20}>
                <Col xs={24}  md={24} lg={8}>
                <Form.Item  label="Specialization" name="specialization" required rules={[{required:true}]}>
                    <Input type="text" placeholder="your name"/>
                </Form.Item>
                </Col>
                
                <Col xs={24}  md={24} lg={8}>
                <Form.Item  label="Experience" name="experience" required rules={[{required:true}]}>
                    <Input type="text" placeholder="your name"/>
                </Form.Item>
                </Col>
                
                <Col xs={24}  md={24} lg={8}>
                <Form.Item  label="Fees" name="feesPerConsultation" required rules={[{required:true}]}>
                    <Input type="text" placeholder="your name"/>
                </Form.Item>
                </Col>
               
                {/* <Col xs={24}  md={24} lg={8}>
                <Form.Item  label="Timings" name="timings" required rules={[{required:true}]}>
                   <TimePicker.RangePicker format="HH:mm"/>
                </Form.Item>
                </Col>  */}
         </Row>
          
         <Col xs={24}  md={24} lg={8}></Col>
         
         <Col xs={24}  md={24} lg={8}>
        
            <button className="btn btn-primary" type="submit">Update</button>
         
         </Col>

        
         
       </Form>}
      </Layout>
  )
}

export default Profile