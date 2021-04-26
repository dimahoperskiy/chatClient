import React from "react"
import style from "./Home.module.css"
import img from "./me.jpg"

const Home = (props) => {
    return (
        <div>
            <h1>Home page</h1>
            <div className={style.homeContent}>
                <p>Hi, this is my client-server chat application!</p>
                <p>Technology stack used: Spring Boot + Postgresql + ReactJS</p>
                <a href="http://github.com/dimahoperskiy" target="_blank">Github</a>
                <div className={style.imgWrapper}>
                    <img src={img} alt="me" className={style.meImg}/>
                </div>
            </div>
        </div>
    )
}

export default Home