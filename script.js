// إعداد Firebase
const firebaseConfig = {
    apiKey: "// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAc18qgOasCsj1SRXvwRrDu1qJzPtH3CyY",
  authDomain: "islam-3be15.firebaseapp.com",
  databaseURL: "https://islam-3be15-default-rtdb.firebaseio.com",
  projectId: "islam-3be15",
  storageBucket: "islam-3be15.firebasestorage.app",
  messagingSenderId: "193592789314",
  appId: "1:193592789314:web:73eec55381acfc65b0e0db",
  measurementId: "G-08QKGN4S11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// تهيئة التطبيق
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// جلب البيانات عند تحميل الصفحة
window.addEventListener("load", function () {
    const tableBody = document.querySelector("#editableTable tbody");
    database.ref("tableData").once("value", (snapshot) => {
        tableBody.innerHTML = ""; // تفريغ الجدول
        snapshot.forEach((childSnapshot) => {
            const row = childSnapshot.val();
            const tr = document.createElement("tr");
            Object.values(row).forEach((cell) => {
                const td = document.createElement("td");
                td.contentEditable = "true";
                td.innerText = cell;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    });
});

// حفظ البيانات عند الضغط على الزر
document.getElementById("saveButton").addEventListener("click", function () {
    const tableRows = document.querySelectorAll("#editableTable tbody tr");
    const data = [];

    tableRows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        const rowData = {};
        cells.forEach((cell, index) => {
            rowData[`cell_${index + 1}`] = cell.innerText;
        });
        data.push(rowData);
    });

    database.ref("tableData").set(data, (error) => {
        const statusMessage = document.getElementById("statusMessage");
        if (error) {
            statusMessage.innerText = "فشل في الحفظ.";
            statusMessage.style.color = "red";
        } else {
            statusMessage.innerText = "تم حفظ البيانات بنجاح!";
            statusMessage.style.color = "green";
        }
    });
});