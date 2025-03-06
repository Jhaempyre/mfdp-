## we will be deploying this app on ubuntu by using nginx and pm2 servers
--All step by step guide command will be written here 

--server is updated 
>>ssh keys added to edit files remotely and push things
--readme.md created here to jot everything and step down .


>>>>>>>>>>>>>>>>>ADD GPG KEYS TO SIGN COMMITS 
---COPY THE FOLLOWING (don't use sudo)
The most problematic part was this , which was like gpg agent errror: permission denied... we solved this as :
--another problem arised like it is getting signed but not asking for passphrase
>>solved this by some steps now asking for passpharase will chek again but the commit going 
>>there is being said unverified
>>> i hope i am in right direction 
>>VERIFIED CAME CORRECTLY 
>>NOW ANOTHER PROBLEM IS PASSPHRASE IS NOT BEING ASKED ALL THE TIME IT IS GETTING CACHED , CHAKING THAT 
>>2nd attempt to make this happen again finger crossed 

--------------I will describe the whole problem first then will proceed---------------------
1) The error was coming like gpg agent errror: permission denied...
2) then it was getting signed but not asking for passphrase each time 
3) then it was getting signed but not asking for passphrase each time and it was showing unverified
4) but on gihub it was getting unverified 
5) and yes it was not asking for passphrase each time i do commit 

----------How i solved-------------
problem (1)

on research i found that 
when i was changing user in the server it was actually not give file permission to new user so there was permission denied and if you will use sudo then obviously it won't happen but it's unethical to use sudo for generating gpg keys because many user can have theier own also if someone is not root user also need to have this faciltiy ... what i did was 

tty

>> sudo chown currentuser:current user ${tty}
after you are done please give this to the original user 

this solved the problem of not getting generated


2) in GPG keys the system or gpg agent caches the passphrase for next attempt to revoke that feature i did was 

i configured 
>> nano ~/.gnupg/gpg-agent.conf
 to have this 
 >>default-cache-ttl 0
>>max-cache-ttl 0

when they had this it worked 

3) while genrating gpg i became so anxious i passed wrong email which made it unverified

4 and 5 ) you can have multiple emails in your github while commiting and signing chek wether the same email used in gpg keys is being used for commiting and push operation 
if both are not same it wil generate the verification error 
git config --global user.email "jhaashish.ajha@gmail.com"


thus ,, keeping these things and debugging all through made all ...



## Looking for new problems🎇🎇💀💀

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
gpg --armor --export A1B2C3D4E5F67890  

--test signing with commit 

git commit -S -m "Test signed commit"






