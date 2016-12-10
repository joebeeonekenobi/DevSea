call openssl genrsa -des3 -out key.pem 1024
call openssl req -new -key key.pem -out csr.pem -subj "/C=GB/ST=London/L=London/O=Private/OU=Private/CN=mysite.com"
call openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem

call cp key.pem openkey.pem
call openssl rsa -in openkey.pem -out openkey.pem
call openssl x509 -req -days 365 -in csr.pem -signkey openkey.pem -out opencert.pem