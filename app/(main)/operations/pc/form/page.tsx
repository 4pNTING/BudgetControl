'use client';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React from 'react';

const PCFormPage = () => {
   return (
           <div className="grid">
               <div className="col-12">
                   <h3>ສ້າງ (PC)</h3>
   
                   <div className="card">
                       <div className='p-fluid'>
                           <div className="field">
                               <label htmlFor="name1">ຫົວຂໍ້</label>
                               <InputText id="name1" type="text" />
                           </div>
                           <div className="field">
                               <label htmlFor="email1">Label</label>
                               <InputText id="email1" type="text" />
                           </div>
                           <div className="field">
                               <label htmlFor="age1">Label</label>
                               <InputText id="age1" type="text" />
                           </div>
                       </div>
   
                       <Button type="button" icon="pi pi-plus" label="ສ້າງ PR" onClick={() => {}} />
                   </div>
               </div>
           </div>
       );
};

export default PCFormPage;
