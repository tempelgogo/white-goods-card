# 🧺 White Goods Card

A customizable Lovelace card for Home Assistant to visually monitor the state of your **washing machine**, **dishwasher**, or **dryer** – clean and smart.

![preview](https://github.com/dein-github-name/white-goods-card/assets/preview.png)

---

## ✨ Features

- 🧼 Supports multiple appliance types: `wama`, `diwa`, `dryer`
- 🖼️ Dynamic image, labels & layout based on type
- 🔌 Works with any `sensor` entities
- 🧠 Fully Lovelace customizable
- 📦 HACS compatible

---

## 📦 Installation via HACS

1. Go to **HACS > Frontend**
2. Click **"⋮" > Custom repositories**
3. Add this repo:  
   `https://github.com/tempelgogo/white-goods-card`  
   as a **Lovelace** repository
4. Install the **White Goods Card**
5. Add to your Lovelace dashboard

> **Make sure to add the resource manually if needed:**

```yaml
url: /hacsfiles/white-goods-card/white-goods-card.js
type: module
