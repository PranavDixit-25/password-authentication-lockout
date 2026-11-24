const MAX_ATTEMPTS=3;
const $=id=>document.getElementById(id);
const encoder=new TextEncoder();
function bytesToHex(bytes){return [...bytes].map(b=>b.toString(16).padStart(2,'0')).join('')}
function randomSalt(){const a=new Uint8Array(16);crypto.getRandomValues(a);return bytesToHex(a)}
async function sha256(text){return bytesToHex(new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode(text))))}
function getAccount(){try{return JSON.parse(localStorage.getItem('secureAuthAccount'))}catch{return null}}
function saveAccount(a){localStorage.setItem('secureAuthAccount',JSON.stringify(a));render()}
function notify(text,type='good'){const m=$('message');m.textContent=text;m.className=`message show ${type}`}
function render(){const a=getAccount();if(!a){$('storedUser').textContent=$('storedSalt').textContent=$('storedHash').textContent='—';$('attempts').textContent='0 / 3';$('status').textContent='No account';$('status').className='status neutral';return}$('storedUser').textContent=a.username;$('storedSalt').textContent=a.salt;$('storedHash').textContent=a.hash;$('attempts').textContent=`${a.failedAttempts} / ${MAX_ATTEMPTS}`;$('status').textContent=a.locked?'Locked':'Active';$('status').className=`status ${a.locked?'locked':'ok'}`}
document.querySelectorAll('.tab').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('.tab,.panel').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$(btn.dataset.tab).classList.add('active');$('message').className='message'});
$('registerBtn').onclick=async()=>{const username=$('regUser').value.trim(),password=$('regPass').value;if(!username||password.length<6)return notify('Enter a username and a password of at least 6 characters.','bad');const salt=randomSalt();const hash=await sha256(password+salt);saveAccount({username,salt,hash,failedAttempts:0,locked:false});$('regPass').value='';notify('Account registered. Only the salt and password hash were stored.');};
$('loginBtn').onclick=async()=>{const a=getAccount();if(!a)return notify('Register a demo account first.','bad');if(a.locked)return notify('Account is locked. Use “Reset demo lockout” to continue the demonstration.','bad');if($('loginUser').value.trim()!==a.username){return fail(a)}const candidate=await sha256($('loginPass').value+a.salt);if(candidate===a.hash){a.failedAttempts=0;saveAccount(a);$('loginPass').value='';notify(`Authentication successful. Welcome, ${a.username}!`)}else fail(a)};
function fail(a){a.failedAttempts++;if(a.failedAttempts>=MAX_ATTEMPTS){a.locked=true;saveAccount(a);notify('Incorrect credentials. Account locked after 3 failed attempts.','bad')}else{saveAccount(a);notify(`Incorrect credentials. ${MAX_ATTEMPTS-a.failedAttempts} attempt(s) remaining.`,'bad')}}
$('resetBtn').onclick=()=>{const a=getAccount();if(!a)return notify('No account exists yet.','bad');a.failedAttempts=0;a.locked=false;saveAccount(a);notify('Demo lockout reset. The account is active again.')};render();
