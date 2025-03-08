## we will be deploying this app on ubuntu by using nginx and pm2 servers
--All step by step guide command will be written here 

--server is updated 
>>ssh keys added to edit files remotely and push things
--readme.md created here to jot everything and step down .


>>ADD GPG KEYS TO SIGN COMMITS 
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
// The next thing we headed was yesterday to deploy the app 
we first deployed normally like running development server 

--Three major things happened yesterday 

1) -we ourself blocked us on the server as we were couldn't able to login via ssh into terminal also from web console we were not able to do it . this was really a tricky situation
2) -- we then had a problem like we didn't know but we accidentally created a firewall which was blocking the outbound traffic 
3) -- We then tried to deploy using pm2 on server (but then has a  common enviroment variable problem)

## problem 1 ====>>>>

>> we were trying to enable firewall to bring income traffic from the public internet but what we did we disabled port 22/tcp which then resulted in completely problem .. we did some research then we tried to enable serial console in remote part of gcp from there we got access after a long time and then we ourself enabled ssh port and could log in again it was terrific .but got solved from this .

## problem 2 <<<<===>>>>
When we were having having problem 1 we reconfigured many firewalls we created and deleted many of them that brought a bunch of problems regarding one of them was we were discberable on internal ip , 0.0.0.0;
127.0.0.0/ but we were not discoberavel on external ip we troubleshoot many thing but the end result was not in our favour ... we tried almost every possible network configuration we could try but things went nasty the whole problem was like in due course of first problem we created a firewall name http -8000 but in the ingress traffic we didn't allow (0.0.0.0/0) network  tag thus it was rejeccting each inbound network traffic

## Problem 3 <<<<3!=3>>>>
This was the common problem of most like pm2 don't load enviroment variables directly thus we have to supply a ecosytem.config.cjs(js) dependening on the type of files which includes the thing also after that problem didn't resolved thus we added .env instead on env that you can see in the earlier commit 
>> https://github.com/Jhaempyre/mfdp-/tree/645340c8548b4edc2d33fbb47ed9dd7845804de9

everything seems currently seems good 
let's bring new problem by deploying frontend .




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






