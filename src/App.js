import React from 'react';
import NotesList from './components/noteList';
import NotePanel from './components/notePanel';
import {getTime} from './common/util'
import './style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [], //笔记列表
            activedId: 0, //激活的笔记Id
        }
    }

    //初始化获取localStorage中的notes列表
    componentDidMount() {
        this.init();
    }
    init = () => {
        let notes = JSON.parse(localStorage.getItem('note_lists') || "[]");
        this.setState({notes});
    }


    // 添加空白笔记
    addNote = () => {
        let notes = this.state.notes;
        let time = getTime();
        let item = {
            title: "新建笔记",
            body: "开始记录...",
            time,
            id: Math.floor(Math.random() * 1000000)
        }

        notes = [item].concat(notes);
        this.refreshList(notes);
    }

    //更新笔记
    edit = (editedNote) => {
        let notes = this.state.notes;
        notes = notes.filter((item) => item.id !== editedNote.id)
        notes = [editedNote].concat(notes);
        this.refreshList(notes);
    }
    
    //删除笔记
    deleteNote = (id) => {
        let notes = this.state.notes;
        const activedId = this.state.activedId;
        if(id === activedId) {
            this.setState({activedId: 0})
        }
        notes = notes.filter((item) => item.id != id)
        this.refreshList(notes);
    }

    //更新页面
    refreshList = (notes) => {
        this.setState({notes});
        localStorage.setItem('note_lists', JSON.stringify(notes));
    }
    //激活笔记
    noteActived = (activedId) => {
        this.setState({activedId})
    }
    render() {
        const activedId = this.state.activedId;
        const notes = this.state.notes;
        const note = activedId ? notes.filter((item) => item.id == activedId)[0] : [];
        return (
            <div className='note-box'>
                <aside className='note-aside'>
                    <NotesList 
                        notes={notes} 
                        addNote={this.addNote} 
                        noteActived={this.noteActived}
                        deleteNote={this.deleteNote}
                    />
                </aside>
                <section className='note-panel'>
                    <NotePanel 
                        note={note}
                        activedId={activedId}
                        edit={this.edit}
                    />
                </section>
            </div>
        )
    }
}

export default App;
