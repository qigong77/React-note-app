import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import {getTime} from '../../common/util';
import './index.css';

export default class NotePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            title: '',
            body: ''
        }
    }

    noteEdit = () => {
        const title = this.props.note.title;
        const body = this.props.note.body;
        this.setState({
            isEdit: true,
            title,
            body
        })
    }

    editTitle = (e) => {
        console.log('e.target.value', e.target.value)
        this.setState({title: e.target.value})
    }
    editBody = (e) => {
        this.setState({body: e.target.value});
    }

    noteEditFinish = () => {
        let title = this.state.title;
        let body = this.state.body;
        if (!title) {
            alert('请输入标题...');
            return;
        } else if (!body) {
            alert('请输入内容...');
            return;
        }

        let time = getTime();
        let id = this.props.note.id;
        let editedNote = {
            title,
            body,
            time,
            id
        }
        this.props.edit(editedNote);
        this.setState({
            isEdit: false, 
            title: '', 
            body: ''
        });

    }

    render () {
        const note = this.props.note;
        const activedId = this.props.activedId;
        const isEdit = this.state.isEdit;
        let title = this.state.title;
        let body = this.state.body;

        return (
            <div>
                {note ? 
                    <div className='note-panel'>
                        {
                            !isEdit ?  <div className='panel-title'>{note.title}</div>
                            : <input className='panel-edit-title' value={title} onChange={this.editTitle}/>
                        }
                        <div>{note.time}</div>
                        {
                            !isEdit ? <div className='panel-body'>{note.body}</div>
                            : <textarea className='panel-edit-body' value={body} onChange={this.editBody} />
                        }
                        
                    </div>
                    : null
                }
                
                {
                activedId ? <button className='panel-button' onClick={this.noteEdit}>编辑</button>
                : null
                }
                {
                    activedId && isEdit ?  <button className='panel-button' onClick={this.noteEditFinish}>保存</button>
                    : null
                }

                
            </div>
        )
    }
}