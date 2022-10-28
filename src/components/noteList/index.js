import React from 'react';
import './index.css';

export default class NotesList extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        const notes = this.props.notes;
        return (
            <div>
                <button className='note-add' onClick={this.props.addNote}>添加新的笔记 📒</button>
                <ul className='note-list'>
                    {notes.map(note => 
                    <li key={note.id}>
                        <div className='note-type' 
                            onClick={(e) => {
                                e.stopPropagation()
                                this.props.noteActived(note.id)
                        }}>
                            <div className='title-type' >{note.title}</div>
                            <div className='body-type'>{note.body}</div>
                            <div className='time-type'>{note.time}</div>
                        </div>
                        <button className='note-delete'
                            onClick={(e) => {
                            e.stopPropagation()
                            this.props.deleteNote(note.id)}}
                        >删除</button>
                    </li>
                    )}
                </ul>
            </div>
        )
    }
}