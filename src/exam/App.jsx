import axios from "./axios"
import { useEffect } from "react"
import { useState } from "react"
import './App.scss'
import Modal from "./Modal"



export default function App() {
const [posts, setPosts] = useState([])
const [isOpen, setIsOpen] = useState(false)
const [curentTitle, setCurentTitle] = useState('')
const [currentIndex, setCurrentIndex] = useState(null)
const [onChnageValue, setOnChnageValue] = useState({
    title: curentTitle 
})

useEffect(() => {
    axios('posts')
    .then(res => setPosts(res.data))
}, [])
   

const handleChange = () =>{
    const x = posts.filter((e) => e.id === currentIndex)
    const u = posts.filter((e) => e.id !== currentIndex)
    if(x.length){
        const y =  {
            userId: x[0].userId,
            id: x[0].id ,
            title: onChnageValue.title,
            body: x[0].body
        }
        setPosts([y,...u])
    }


}




console.log('currentTitle', posts)
 

  return (
    <div className="Posts">
      { isOpen
      ?(
        <Modal  >
        <input type='text' name="klaas" value={onChnageValue.title}  onChange={(e) => setOnChnageValue({ title: e.target.value})}/>
        <input type="submit" value="change" onClick={()=>{
            handleChange()
            setIsOpen(!isOpen)
            setCurentTitle('')
        }}/>
        <input type="submit" value="cancel" onClick={()=>{
            setIsOpen(!isOpen)

        }}/>
        </Modal> 
      ):null
      }   

           {
            posts.map((elm,index)=>{
                return (
                    <div key={elm.id} className="Post">
                        <button onClick={()=>{
                            setCurentTitle(elm.title)
                            setCurrentIndex(elm.id)
                            setIsOpen(!isOpen)
                        }}>Edit</button>
                        <h2>{elm?.title}</h2>
                        <p>{elm?.body}</p>
                    </div>
                )
            })
        }
    </div>
  )
    }