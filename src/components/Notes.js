import React, { useContext, useEffect, useRef, useState } from 'react'
import NodeContext from '../context/notes/NodeContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
function Notes(props) {
    const [ note, setNote ] = useState({
        id:"",
        etitle:"",
        edescription: "",
        etag:""
    });
    const context = useContext(NodeContext);
    const { notes, getAllNotes, editNote } = context;
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllNotes();
        }
        else{
            navigate('/login');
        }
        // eslint-disable-next-line 
    }, []);

    const handleClick = (e)=>{
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("Note updated successfully", "success")
        refClose.current.click();
    }
    const Change=(e)=>{
        setNote({...note, [e.target.name]:e.target.value});
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    }
    const ref = useRef(null);
    const refClose = useRef(null);
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button type="button" className="btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal" hidden>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="form-group my-2">
                                <label htmlFor="eetitle">Title</label>
                                <input type="text" className="form-control" id="eetitle" name='etitle' value={note.etitle} onChange={Change} placeholder="Enter Title" />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="edescription">Description</label>
                                <input type="text" className="form-control" id="edescription" value={note.edescription} onChange={Change} name="edescription" placeholder="Enter Description" />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="etag">Tag</label>
                                <input type="text" className="form-control" id="etag" value={note.etag} onChange={Change} name="etag" placeholder="Enter Tag" />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="h2">Your Notes</h2>
            <div className="row">
                <div className="container">
                    {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>;
                })}
            </div>
        </>
    )
}

export default Notes