## we will be deploying this app on ubuntu by using nginx and pm2 servers
--All step by step guide command will be written here 

--server is updated 
>>ssh keys added to edit files remotely and push things
--readme.md created here to jot everything and step down .


>>>>>>>>>>>>>>>>>ADD GPG KEYS TO SIGN COMMITS 
---COPY THE FOLLOWING (USE sudo if needed , errors like permission denied)
The most problematic part was this , which was like gpg agent errror: permission denied... we solved this as :
--another problem arised like it is getting signed but not asking for passphrase
>>solved this by some steps now asking for passpharase will chek again but the commit going 
>>there is being said unverified
>>> i hope i am in right direction 
>> gpg --full-generate-key
Choose RSA and RSA (default).
Enter 4096 (recommended for security).
Set Key Expiration
enter user details
>>Set a Strong Passphrase

--List the keys
gpg --list-secret-keys --keyid-format=long

""something like this appears" 
sec   rsa4096/A1B2C3D4E5F67890 2025-03-04 [SC]
      ABCD1234EFGH5678IJKL9012MNO34567PQRSTU89

copy A1B2C3D4E5F67890

Configure Git to Use Your GPG Key
git config --global user.signingkey A1B2C3D4E5F67890
Enable commit signing by default:
git config --global commit.gpgsign true

Export Your Public Key (For GitHub)
gpg --armor --export A1B2C3D4E5F67890  (use sudo if non root user)

--test signing with commit 

git commit -S -m "Test signed commit"






