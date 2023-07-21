'use client'
import { useState } from "react";
import "../../../../styles/admin.scss";

export default function Admin() {
    let [src, setSrc] = useState('')

    return (
        <div className="container">
            <div className="p-20">
                <h4>배너</h4>
                <form action="/api/slide/new" method="POST">
                    <input name="title" placeholder="배너 제목" />
                    <input name="price" placeholder="게임 배너일 시 가격" />
                    <input name="eachSlide" defaultValue={src}></input>
                    <button type="submit">전송</button>
                </form>

                <input type="file" accept="image/*" onChange={
                    async (e) => {
                        let file = e.target.files[0]
                        let filename = encodeURIComponent(file.name)
                        let res = await fetch('/api/slide/image?file=' + filename)
                        res = await res.json()

                        const formData = new FormData()
                        Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
                            formData.append(key, value)
                        })
                        let result = await fetch(res.url, {
                            method: 'POST',
                            body: formData,
                        })
                        console.log(result)

                        if (result.ok) {
                            setSrc(result.url + '/' + filename)
                        } else {
                            console.log('실패')
                        }

                    }
                } />
                <img src={src} />
            </div>
        </div>
    )
} 