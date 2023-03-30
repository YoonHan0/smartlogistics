import React, {useRef} from 'react'

function AddItem({addList}) {

    const refForm = useRef(null);
    return (

        <div>
            <form
                ref={refForm} 
                onSubmit={
                    (e) => {
                        addList(e);
                        refForm.current.reset();
                    }

                }>
                <label htmlFor="id">ID</label>
                <input type="text" id="id" name="id" />
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" name="phone" />
                <input type="submit" value="등록" />
            </form>
        </div>
    )
}

export default AddItem