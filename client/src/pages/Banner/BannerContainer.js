import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const BannerContainer = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/images");
      setImages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/images/${id}`,
        config
      );
      fetchImages();
      console.log(response);
    } catch (error) {
      console.error("failed to delete", error);
      toast("you are unauthorized");
    }
  };
  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
        <h4>
          total banners <Tag color="blue"> {images.length}</Tag>
        </h4>
        <Link
          style={{
            textDecoration: "none",
            border: "1px solid blue",
            padding: "1px 3px",
            borderRadius: "5px",
          }}
          to={"/banners/bannerForm"}
        >
          Create New Banner
        </Link>
      </div>
      <div className="d-flex gap-3 flex-column">
        {images.map((image) => {
          return (
            <div key={image._id} className="d-flex gap-5">
              <Image
                width={200}
                style={{ borderRadius: "5px", boxShadow: "5px 3px 3px grey" }}
                preview={{
                  destroyOnClose: true,
                  imageRender: () => (
                    <video
                      muted
                      width="100%"
                      controls
                      src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*uYT7SZwhJnUAAAAAAAAAAAAADgCCAQ"
                    />
                  ),
                  toolbarRender: () => null,
                }}
                src={`http://localhost:8080/uploads/${image.imageUrl}`}
              />
              <div className="py-1">
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => handleDelete(image._id)}
                  icon={
                    <QuestionCircleOutlined
                      style={{
                        color: "red",
                      }}
                    />
                  }
                >
                  <Button danger>
                    <DeleteOutlined /> Delete Banner
                  </Button>
                  <Toaster />
                </Popconfirm>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default BannerContainer;
