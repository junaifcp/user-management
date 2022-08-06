import styled from "styled-components";
import PublishIcon from '@mui/icons-material/Publish';
export const ItemContainer = styled.div`
    flex: 4;
    padding: 20px;
`
export const ItemTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const ItemAddButton = styled.button`
    width: 80px;
    border: none;
    padding: 5px;
    background-color: indigo;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: 16px;
    text-transform: uppercase;
`
export const ItemShowImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: ${props => props.mr ? "20px" : "0px"};
`
export const ItemUploadImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
`
export const ItemUpdateButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 5px;
    cursor: pointer;
    background-color: midnightblue;
    color: white;
    font-weight: 600;
`
export const ItemUpload = styled.div`
    display: flex;
    align-items: center;
`
export const UserContainer = styled.div`
    display: flex;
    margin-top: 20px;
`
export const ShowUser = styled.div`
    flex: 1;
    padding: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
export const UpdateUser = styled.div`
    flex: 2;
    padding: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left: 20px;
`
export const ShowUserTop = styled.div`
    display: flex;
    align-items: center;
`
export const ShowUserBottom = styled.div`
    margin-top: 20px;
`
export const ShowTopTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`
export const FontWeight = styled.span`
    font-weight: ${props => props.bolder ? "600" : "300"};
`
export const UserShowTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: rgb(175, 170, 170);
`
export const UserShowInfo = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0px;
    color: #444;
    .showIcon{
        font-size: 16px !important;
    }
    .showInfoTitle{
        margin-left: 10px;
    }
`
export const UpdateTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
`
export const UpdateForm = styled.form`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
`
export const UpdateFormNew = styled.form`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
`
export const UpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    label{
        margin-bottom: 5px;
        font-size: 14px;
    }
    input{
        border: none;
        width: 250px;
        height: 30px;
        border-bottom: 1px solid gray;
    }
    select{
        border: none;
        width: 250px;
        height: 30px;
        border-bottom: 1px solid gray;
    }
`
export const UpdateRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
export const MyPublish = styled(PublishIcon)`
    cursor: pointer;
`
export const UserRadio = styled.div`
    input {
        margin-top: 15px;
    }
    label{
        margin: 10px;
        font-size: 18px;
        color: #555;
    }
`
