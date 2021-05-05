
import axios from 'axios';
import MainLayout from '../../containers/layout';
import useData from '../../hooks/useData';
import React from 'react';
import { Row, Col, Statistic, Card } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

export default function MainApp(){
    const { adminData } = useData();
    const [scholarships, setScholarships] = React.useState();
    const [universities, setUniversities] = React.useState();
    const [screens, setScreens] = React.useState();

    const AuthStr = 'Token '.concat(adminData.key)

    console.log(scholarships)


    function InitUniversities(){
        axios.get('https://universities-app-backend.onrender.com/analytics/universities/all', {
            'headers': {
            'Authorization': AuthStr
            }
        }).then(res=>{
            setUniversities(res.data)
        }).catch(e=>{
            alert(e.message)
        })
    }

    function InitScreens(){
        axios.get('https://universities-app-backend.onrender.com/analytics/screens/', {
            'headers': {
            'Authorization': AuthStr
            }
        }).then(res=>{
            setScreens(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }





    function InitScholarships(){
        axios.get('https://universities-app-backend.onrender.com/analytics/scholarships/all', {
            'headers': {
            'Authorization': AuthStr
            }
        }).then(res=>{
            setScholarships(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }

    React.useEffect(() => {
        InitUniversities();
        InitScholarships();
        InitScreens();
     })

     function profileLinkedScholarships(){
         const data = scholarships.filter(function(item){
             return item.profile!==null;
         })
         return data
     }
   
     function profileLinkedUniversities(){
        const data = universities.filter(function(item){
            return item.profile!==null;
        })
        return data
    }

    const isToday = (date) => {
        const today = new Date();
        var someDate =new Date(date);
        return someDate.getDate() === today.getDate() &&
          someDate.getMonth() === today.getMonth() &&
          someDate.getFullYear() === today.getFullYear()
    }



    
    function todayScholarshipsData(){
        const data = scholarships.filter(function(item){
            return isToday(item.time);
        })
        return data
    }

    function todayUniversitiesData(){
        const data = universities.filter(function(item){
            return isToday(item.time);
        })
        return data
    }

    function todayProfileLinkedScholarships(){
        let data  = scholarships.filter(function(item){
            return isToday(item.time) && item.profile !==null;
        })
        return data
    }

    function todayProfileLinkedUniversities(){
        let data  = universities.filter(function(item){
            return isToday(item.time) && item.profile !==null;
        })
        return data
    }

    function getScreen(screen){
        let data  = screens.filter(function(item){
            return item.screen===screen
        })
        return data
    }

    return(
        <MainLayout>
            {universities && scholarships &&  screens &&
            <div>
                <div className="block">
                    <h2>Today</h2>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card>
                            <Statistic
                                title="Scholarships"
                                value={todayScholarshipsData().length}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="instances"
                            />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card>
                            <Statistic
                                title="Universities"
                                value={todayUniversitiesData().length}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="instances"
                            />
                            </Card>
                        </Col>
                    </Row>
                </div>
                

                <div className="block">
                    <h2>All Time</h2>
                    <Row style={{marginTop: 20}} gutter={16}>
                        <Col span={12}>
                            <Card>
                            <Statistic
                                title="All Scholarships"
                                value={scholarships.length}
                                valueStyle={{ color: '#3f8600' }}
                                
                                suffix="instances"
                            />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card>
                            <Statistic
                                title="All Universities"
                                value={universities.length}
                                valueStyle={{ color: '#3f8600' }}
                            
                                suffix="instances"
                            />
                            </Card>
                        </Col>
                    </Row>
                </div>

                <div className="block">
                  <h2>Profile Linked</h2>
                  <Row style={{marginTop: 20}} gutter={16}>
                        <Col span={12}>
                            <Card>
                            <Statistic
                                title="Profile Linked Scholarships Today"
                                value={todayProfileLinkedScholarships().length}
                                valueStyle={{ color: '#3f8600' }}
                                suffix="instances"
                            />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card>
                            <Statistic
                                title="Profile Linked Universities Today"
                                value={todayProfileLinkedUniversities().length}
                                valueStyle={{ color: '#3f8600' }}
                            
                                suffix="instances"
                            />
                            </Card>
                        </Col>
                    </Row>

                    <Row style={{marginTop: 20}} gutter={16}>
                        <Col span={12}>
                            <Card>
                            <Statistic
                                title="All Profile Linked Scholarships"
                                value={profileLinkedScholarships().length}
                                valueStyle={{ color: '#3f8600' }}
                                suffix="instances"
                            />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card>
                            <Statistic
                                title="All Profile Linked Universities"
                                value={profileLinkedUniversities().length}
                                valueStyle={{ color: '#3f8600' }}
                            
                                suffix="instances"
                            />
                            </Card>
                        </Col>
                    </Row>
                </div>

                <div className="block">
                    <h2>Screens</h2>
                        <Row style={{marginTop: 20}} gutter={16}>
                            <Col span={12}>
                                <Card>
                                <Statistic
                                    title="All Scholarships"
                                    value={getScreen("Welcome").length}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="instances"
                                />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card>
                                <Statistic
                                    title="Universities"
                                    value={getScreen("Uuiversities").length}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="instances"
                                />
                                </Card>
                            </Col>
                        </Row>
                        <Row style={{marginTop: 20}} gutter={16}>
                            <Col span={12}>
                                <Card>
                                <Statistic
                                    title="Search Scholarships"
                                    value={getScreen("Search Scholarships").length}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="instances"
                                />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card>
                                <Statistic
                                    title="Search Universities"
                                    value={getScreen("Search Universities").length}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="instances"
                                />
                                </Card>
                            </Col>
                        </Row>

                        <Row style={{marginTop: 20}} gutter={16}>
                            <Col span={12}>
                                <Card>
                                <Statistic
                                    title="Profile"
                                    value={getScreen("Profile").length}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="instances"
                                />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card>
                                <Statistic
                                    title="Saved"
                                    value={getScreen("Saved").length}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="instances"
                                />
                                </Card>
                            </Col>
                        </Row>
                </div>

            </div>
        }
        </MainLayout>
    )
}
