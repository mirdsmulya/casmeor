
import React from 'react';
import TexInput from '../common/textInput';
import ImageUploader from 'react-images-upload';

const MenuInput = ({uploadTextButton, onChange, display, newMenu, saveButton, upload}) => {
    return(
        <div className={display} >
            <div className="border img">
            <ImageUploader 
                    withIcon={false}
                    buttonText={uploadTextButton}
                    className="center"
                    label=""
                    onChange={upload}
                    singleImage={true}
                />               
            </div>
            <div className="detail-menu  ">
            <TexInput 
                name="name"
                type="text"
                placeholder="Name"
                className="form-control dish-name"
                onChange={onChange}
                value={newMenu.name} 
            />
            <textarea
                name="description"
                type="text"
                placeholder="Description"
                className="form-control description"
                onChange={onChange}
                value={newMenu.description} 
            />
            </div>

            <div className="price-qty  ">
            <TexInput 
                name="price"
                type="text"
                placeholder="Price"
                className="form-control "
                onChange={onChange}
                value={newMenu.price} 
            /> 
            <div className="qty-box save-button ">            
            <button className=""  newMenu={newMenu} onClick={saveButton}>Save</button>
            </div>
            </div>
        </div>
    );
};
export default MenuInput;
