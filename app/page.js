"use client"
import { useState, useEffect } from "react"
import { menu, business } from "../menuData.js"

export default function Home() {
    const [cart, setCart] = useState([])
    const [sel, setSel] = useState(null)
    const [cat, setCat] = useState("All")
    const [table, setTable] = useState("Takeaway")
    useEffect(() => { const t = new URLSearchParams(window.location.search).get("table"); if (t) setTable("Table " + t) }, [])
    const cats = ["All", "MILKSHAKES", "SMOOTHIES", "SPECIALS", "PARFAIT", "ICE CREAM", "YOGHURT"]
    const fil = cat === "All" ? menu : menu.filter(m => m.cat === cat)
    const total = cart.reduce((s, i) => s + i.price, 0)
    const add = (it, sz, pr) => { setCart([...cart, { ...it, size: sz, price: pr, uid: Date.now() }]); setSel(null) }
    const order = () => { let m = `🥤 NEW ORDER - ${business.name}%0A🪑 ${table}%0A%0A`; cart.forEach((c, i) => { m += `${i + 1}. ${c.name} (${c.size}) - ₦${c.price}%0A` }); m += `%0ATotal: ₦${total}`; window.open(`https://wa.me/${business.whatsapp}?text=${m}`, "_blank") }
    return (
        <div style={{ minHeight: "100vh", background: "#fff8f0", paddingBottom: "120px" }}>
            {/* HEADER WITH YOUR LOGO */}
            <div style={{ background: "#000", color: "#fff", padding: "14px 20px", position: "sticky", top: 0, zIndex: 20, display: "flex", alignItems: "center", gap: "12px" }}>
                <img src="/images/logo.jpeg" alt="logo" style={{ width: "56px", height: "56px", borderRadius: "14px", objectFit: "cover", background: "#000" }} />
                <div>
                    <h1 style={{ fontSize: "20px", fontWeight: 900, lineHeight: 1 }}>Eatwithmytj</h1>
                    <p style={{ fontSize: "10px", opacity: 0.8, color: "#ff6b9d" }}>Fruities & Crunches</p>
                    <p style={{ fontSize: "9px", opacity: 0.6 }}>{business.address} • {table}</p>
                </div>
            </div>

            <div style={{ display: "flex", gap: "8px", overflowX: "auto", padding: "12px" }}>
                {cats.map(c => <button key={c} onClick={() => setCat(c)} style={{ padding: "8px 14px", borderRadius: "999px", fontSize: "11px", whiteSpace: "nowrap", border: "1px solid #ddd", background: cat === c ? "#000" : "#fff", color: cat === c ? "#fff" : "#000", fontWeight: 700 }}>{c}</button>)}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "12px" }}>
                {fil.map(it => (
                    <div key={it.id} onClick={() => setSel(it)} style={{ background: "#fff", borderRadius: "20px", padding: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: "1px solid #eee" }}>
                        <img src={it.image} alt={it.name} style={{ width: "100%", height: "180px", objectFit: "cover", objectPosition: "center", borderRadius: "14px", background: "#ffe4e6" }} />
                        <h3 style={{ fontSize: "12px", fontWeight: 800, marginTop: "8px" }}>{it.name}</h3>
                        <p style={{ fontSize: "10px", color: "#666", margin: "2px 0", height: "20px", overflow: "hidden" }}>{it.desc}</p>
                        <p style={{ fontSize: "11px", fontWeight: 700, color: "#e11d48" }}>From ₦{Math.min(...Object.values(it.prices))}</p>
                        <button style={{ width: "100%", marginTop: "6px", background: "#000", color: "#fff", fontSize: "11px", padding: "8px", borderRadius: "999px", border: "none", fontWeight: 700 }}>Add +</button>
                    </div>
                ))}
            </div>

            {sel && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 50, display: "flex", alignItems: "flex-end" }} onClick={() => setSel(null)}>
                    <div style={{ background: "#fff", width: "100%", borderRadius: "28px 28px 0 0", padding: "20px" }}>
                        <img src={sel.image} style={{ width: "100%", height: "250px", objectFit: "cover", objectPosition: "center", borderRadius: "16px", background: "#ffe4e6" }} />
                        <h2 style={{ fontSize: "20px", fontWeight: 900, marginTop: "12px" }}>{sel.name}</h2>
                        <p style={{ fontSize: "12px", color: "#666" }}>{sel.desc}</p>
                        {Object.entries(sel.prices).map(([sz, pr]) => (
                            <button key={sz} onClick={() => add(sel, sz, pr)} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "14px", border: "1px solid #eee", borderRadius: "14px", marginTop: "8px", background: "#fff" }}><span style={{ fontWeight: 600 }}>{sz}</span><span style={{ fontWeight: 800 }}>₦{pr}</span></button>
                        ))}
                    </div>
                </div>
            )}

            {cart.length > 0 && (
                <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #eee", padding: "14px", borderRadius: "20px 20px 0 0", boxShadow: "0 -4px 20px rgba(0,0,0,0.1)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "10px", fontWeight: 700 }}><span>{cart.length} items • {table}</span><span>₦{total}</span></div>
                    <button onClick={order} style={{ width: "100%", background: "#25D366", color: "#fff", fontWeight: 800, padding: "15px", borderRadius: "999px", border: "none" }}>Order on WhatsApp</button>
                </div>
            )}
        </div>
    )
}