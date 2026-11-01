"use client"
import { useState } from "react"

export default function QRPage() {
    const [count, setCount] = useState(5)
    const [link, setLink] = useState("https://eatwithmytj.vercel.app")

    return (
        <div style={{ padding: "20px", background: "#fff8f0", minHeight: "100vh", fontFamily: "sans-serif" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <img src="/images/logo.jpeg" style={{ width: "50px", height: "50px", borderRadius: "12px" }} />
                <div>
                    <h1 style={{ fontSize: "20px", fontWeight: 900 }}>QR Scanner - Eatwithmytj</h1>
                    <p style={{ fontSize: "11px", color: "#666" }}>Generate QR for tables</p>
                </div>
            </div>

            <div style={{ background: "#fff", padding: "16px", borderRadius: "16px", border: "1px solid #eee" }}>
                <p style={{ fontSize: "12px", fontWeight: 700 }}>Your website link:</p>
                <input value={link} onChange={e => setLink(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "10px", marginTop: "6px" }} />

                <p style={{ fontSize: "12px", fontWeight: 700, marginTop: "12px" }}>How many tables?</p>
                <input type="number" value={count} onChange={e => setCount(Number(e.target.value))} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "10px", marginTop: "6px" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "20px" }}>
                {Array.from({ length: count }).map((_, i) => {
                    const tableNum = i + 1
                    const fullLink = `${link}?table=${tableNum}`
                    const qr = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(fullLink)}`
                    return (
                        <div key={i} style={{ background: "#fff", padding: "14px", borderRadius: "20px", textAlign: "center", border: "1px solid #eee" }}>
                            <h3 style={{ fontWeight: 800 }}>Table {tableNum}</h3>
                            <img src={qr} alt="qr" style={{ width: "100%", marginTop: "10px", borderRadius: "10px" }} />
                            <p style={{ fontSize: "8px", marginTop: "8px", wordBreak: "break-all" }}>{fullLink}</p>
                        </div>
                    )
                })}
            </div>

            <a href="/" style={{ display: "block", marginTop: "20px", textAlign: "center", background: "#000", color: "#fff", padding: "14px", borderRadius: "999px", textDecoration: "none", fontWeight: 700 }}>Back to Menu</a>
        </div>
    )
}