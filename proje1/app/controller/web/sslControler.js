const fs = require("fs")
const path = require("path")

const src = "D:/Proje/nsm"
const tar = "D:/Proje/rifd-qr_backend/cert"

// const src = "/etc/letsencrypt/live/apiqr.doorsapp.com.tr"
// const src = "/home/xdev/nsm"
// const tar = "/home/xdev/src/cert"
//

const originSslFileList = ["cert1.pem", "chain1.pem", "fullchain1.pem", "privkey1.pem"]
const copySslFileList = ["cert.pem", "chain.pem", "fullchain.pem", "privkey.pem"]
const renameSslFileList = ["cert_n.pem", "chain_n.pem", "fullchain_n.pem", "privkey_n.pem"]


async function copySllFile(src, tar) {
    let from = "";
    let to = "";

    originSslFileList.map((item,index) => {
        from = src + "/" + originSslFileList[index];
        to = tar + "/" + copySslFileList[index];
        console.log(from, "   ", to)
        console.log("from", fs.existsSync(from))

        if(fs.existsSync(from)) {
            fs.copyFileSync(from, to );
            console.log("ok")
        } else {
            console.log("err")
        }
    })
    console.log("copy finished")
}
 
async function renameSslFile(src){
    let from = "";
    let to = "";

    originSslFileList.map((item,index)=>{
        from = src + "/" + originSslFileList[index];
        to = src + "/" + renameSslFileList[index];

        if (fs.existsSync(from)) {
            fs.renameSync(from, to);
            console.log("ok")
        } else {
            console.log("err")
        }
    })
    console.log("rename finished")
}


copySllFile(src, tar)
.then(()=>{
    renameSslFile(src) 
})
 