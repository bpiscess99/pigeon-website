import React, { useEffect, useState } from 'react'
import { Button, Container, Image } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Avatar, Card } from 'antd';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const TournamentsContainer = () => {
    const { Meta } = Card;
    const [tournaments,setTournaments]=useState([]);
    const navigate = useNavigate();
    const fetchTournaments= async ()=>{
        try {
            const response  = await axios.get("http://localhost:8080/api/v1/tournaments/");
            setTournaments(response.data.tournaments);
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    }
    useEffect(()=>{
        fetchTournaments();
    },[])
   return (
    <Container >
    <h5 className="card-title">Tournaments</h5>
      <div className='d-flex gap-2 flex-wrap justify-content-center'>
       {
        tournaments.map((tournament,index)=>{
            return(
                <Card
                    key={index}
                    style={{
                        width: 250,
                        cursor:"pointer"
                    }}
                    onClick={()=>{
                       navigate(`/tournaments/:${tournament._id}`,{
                        state:{tournament:tournament}}
                    )   

                    }}
                    cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                    }
                    actions={[
                            <span 
                                className={`badge ${tournament.status_ ==="active" ? "text-bg-danger" : "text-bg-warning"} rounded-pill`}>{tournament.status_}
                            </span>,
                        <div className='position-relative'>
                            <Image width={"35px"} src='/prize.png' alt='_img'/>
                            <span className="position-absolute top-15 start-60 translate-middle badge rounded-pill bg-info">{tournament.numberOfPrizes}</span>
                        </div>,
                        <div className='position-relative'>
                            <Image width={"35px"} src='/pigeon.png' alt='_img'/>
                            <span className="position-absolute top-15 start-60 translate-middle badge rounded-pill bg-info">{tournament.numberOfPigeons}</span>
                         </div>
                    ]}
                  >
                    <Meta
                        avatar={<Avatar src="/tournament.png" />}
                        title={tournament.tournamentName}
                        description={tournament.tournamentInformation}
                    />
                </Card>
                )
                })
            }     
      </div>  
    </Container>
  )
}

export default TournamentsContainer;