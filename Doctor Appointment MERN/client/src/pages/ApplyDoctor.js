import React from 'react';
import "./../index.css";
import Layout from "./../components/Layout";
import {Form , Col ,Input, Row, TimePicker, message} from 'antd';
import {useSelector , useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {showLoading,hideLoading} from '../redux/features/alertSlice'
import axios from 'axios';


const ApplyDoctor = () => {
    const {user} = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    //handle form
    const handleFinish = async(values) => {
        // console.log(values)
        try{
            dispatch(showLoading)
            const res = await axios.post('/api/v1/user/apply-doctor',{...values, userId:user._id},{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
                navigate('/')
            }else{
                message.success(res.data.success) 
            }
        } catch(error){
            dispatch(hideLoading())
            console.log(error)
            message.error("Something Went Wrong")
        }
    };
  return (
    <Layout>
       <h1 className="text-center">ApplyDoctor</h1>
       <Form layout="vertical" onFinish={handleFinish} className="m-3">
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
                
                <Col xs={24}  md={24} lg={8}>
                <Form.Item  label="Timings" name="timings" required rules={[{required:true}]}>
                   <TimePicker.RangePicker format="HH:mm"/>
                </Form.Item>
                </Col>
         </Row>
          
         <Col xs={24}  md={24} lg={8}></Col>
         
         <Col xs={24}  md={24} lg={8}>
        
            <button className="btn btn-primary" type="submit">Submit</button>
         
         </Col>

        
         
       </Form>

    </Layout>

    
    
  )
}

export default ApplyDoctor;

