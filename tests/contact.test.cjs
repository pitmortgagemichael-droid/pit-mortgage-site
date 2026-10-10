const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const elements={};
function element(id){ return elements[id] ||= {value:'',textContent:'',handlers:{},attrs:{},focus(){},addEventListener(type,handler){this.handlers[type]=handler;},setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];}}; }
const button=element('button');button.dataset={lead:'MRTA / MLTA 比较'};
const dialog=element('quick-contact');dialog.showModal=()=>{dialog.open=true};dialog.close=()=>{dialog.open=false;dialog.handlers.close()};
let opened=[];
vm.runInNewContext(readFileSync('contact.js','utf8'),{
 document:{getElementById:element,querySelector:()=>element('close'),querySelectorAll:()=>[button]},
 window:{open:(...args)=>opened.push(args)}
});
button.handlers.click({preventDefault(){}});
assert.equal(dialog.open,true);
assert.equal(element('quick-interest').value,'MRTA / MLTA 比较');
const submit=()=>element('quick-form').handlers.submit({preventDefault(){}});
element('quick-name').value='   ';element('quick-phone').value='0123456789';submit();assert.equal(opened.length,0);
element('quick-name').value='Test & 测试';element('quick-phone').value='123';submit();assert.equal(opened.length,0);
assert.equal(element('quick-phone').attrs['aria-invalid'],'true');
element('quick-phone').value='+60 12-345 6789';submit();assert.equal(opened.length,1);
const url=new URL(opened[0][0]);assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,'/60174648113');
assert.match(url.searchParams.get('text'),/Test & 测试/);assert.match(url.searchParams.get('text'),/MRTA \/ MLTA 比较/);
assert.equal(opened[0][2],'noopener');
element('close').handlers.click();assert.equal(dialog.open,false);
console.log('Contact routing, validation, encoding and close checks passed; no external messages sent.');
