#!/bin/bash

src_pth="/etc/letsencrypt/live/apiqr.doorsapp.com.tr/"
dest_pth="/home/xdev/src/ssl/"

rm -f ${dest_pth}*.pem;
while read -r line; do echo "$line" >> ${dest_pth}cert.pem; done < ${src_pth}cert.pem;
while read -r line; do echo "$line" >> ${dest_pth}chain.pem; done < ${src_pth}chain.pem;
while read -r line; do echo "$line" >> ${dest_pth}fullchain.pem; done < ${src_pth}fullchain.pem;
while read -r line; do echo "$line" >> ${dest_pth}privkey.pem; done < ${src_pth}privkey.pem;