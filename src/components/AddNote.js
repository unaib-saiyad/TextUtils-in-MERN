import React, { useContext, useState } from 'react'
import NodeContext from '../context/notes/NodeContext';


function AddNote(props) {
    const [ note, setNote ] = useState({
        title:"",
        description: "",
        tag:""
    });
    const context = useContext(NodeContext);
    const { addNote } = context;
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("Note Added successfully", "success")
        setNote({title:"", description:"", tag:""});
    }
    const Change=(e)=>{
        setNote({...note, [e.target.name]:e.target.value});
    }
    return (
        <div>
            <div className='m-2 p-2'>
                <h2 className="h2">Add a note</h2>
                <form>
                    <div className="form-group my-2">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" name='title' onChange={Change} placeholder="Enter Title" value={note.title}/>
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" onChange={Change} name="description" placeholder="Enter Description" value={note.description}/>
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" id="tag" onChange={Change} name="tag" placeholder="Enter Tag" value={note.tag}/>
                    </div>
                    <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary my-2" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote