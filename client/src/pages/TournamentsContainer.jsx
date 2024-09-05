import React, { useContext, useEffect, useState } from 'react'
import {  Button, Container, Image } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { Avatar, Card, message, Popconfirm, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import TournamentContext from './Contexts/TournamentContext';

const TournamentsContainer = () => {
    const {tournaments}=useContext(TournamentContext)
    const [isTabular,setIsTabular]=useState(true);
    const columns = [
      {
        title: "Tournament",
        dataIndex: "tournamentName",
      },
      {
        title: "Category",
        dataIndex: "category",
      },
      {
        title: "Number Of Prizes",
        dataIndex: "numberOfPrizes",
      },
      {
        title: "Number Of Pigeons",
        dataIndex: "numberOfPigeons",
      },
      {
        title: "Start Date",
        dataIndex: "startDate",
        render: (_, { tags }) => {
          const date = _.slice(0, 10);
          return <Tag> {date}</Tag>;
        },
      },
      {
        title: "Start Time",
        dataIndex: "startTime",
      },
      {
        title: "Status",
        dataIndex: "status_",
        render: (_, { tags }) => {
          const color = _.length <= 6 ? "red" : "blue";
          return <Tag color={color}> {_}</Tag>;
        },
      },
      {
        title: "Tournament Information",
        dataIndex: "tournamentInformation",
      },
      {
        title: "Helper Pigeons",
        dataIndex: "helperPigeons",
      },
      {
        title: "Continue Days",
        dataIndex: "continueDays",
      },
      {
        title: "Number of Days",
        dataIndex: "numberOfDays",
      },
      {
        title: "Type",
        dataIndex: "type",
      },
      {
        title: "Participating Loft",
        dataIndex: "participatingLoft",
        render: (_) => {
          if (_) {
            return _.map((_, index) => (
              <Tag color="blue" key={index}>
                {_}
              </Tag>
            ));
          }
        },
      },
  
      {
        title: "First Prize",
        dataIndex: "prize1",
      },
      {
        title: "2nd Prize",
        dataIndex: "prize2",
      },
      {
        title: "3rd Prize",
        dataIndex: "prize3",
      },
      {
        title: "4th Prize",
        dataIndex: "prize4",
      },
  
      {
        title: "5th Prize",
        dataIndex: "prize5",
      },

    
      {
        title: "Actions",
        render :(_)=>{
          return <div className="d-flex gap-2 flex-column py-2 align-items-start">
          <Popconfirm
            title="Update the task"
            description="Are you sure to update this task?"
            okText="Yes"
            cancelText="No"
            onCancel={() => message.info("Cancle update")}
            onConfirm={(e) => {
              navigate(`/tournaments/:${_._id}`,{state:{tournament:_}})
            }}
          >
            <Button variant="outline-primary" size='sm'>Update</Button>
            <Toaster />
          </Popconfirm>
        </div>
        }
      }
    ];

        
    const { Meta } = Card;
    const navigate =useNavigate()
   return (
    <Container >
    <h5 className="card-title">Tournaments</h5>
    {!isTabular ?
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
      :
      <Table
        columns={columns}
        scroll={{ x: 1300 }}
        pagination={false}
        dataSource={tournaments}
        size="small"
        rowKey={(row)=>row._id || row.id}
      />  
      }
    </Container>
  )
}

export default TournamentsContainer;