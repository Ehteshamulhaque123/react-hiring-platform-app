import React, { useMemo, useState } from 'react'
import useLocalStorage from './useLocalStorage'

const empty = { title:'', company:'', salary:'', location:'Remote', type:'Full-time', tags:'' }

export default function App(){
  const [jobs, setJobs] = useLocalStorage('jobs', [])
  const [form, setForm] = useState(empty)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('recent')
  const [editingId, setEditingId] = useState(null)

  const add = e => {
    e.preventDefault()
    if(!form.title.trim() || !form.company.trim()) return
    const normalized = { ...form, id: editingId ?? Date.now(), salary: form.salary ? Number(form.salary) : '', tags: form.tags.split(',').map(t=>t.trim()).filter(Boolean) }
    if(editingId){
      setJobs(prev => prev.map(j => j.id === editingId ? normalized : j))
    }else{
      setJobs(prev => [normalized, ...prev])
    }
    setForm(empty); setEditingId(null)
  }

  const remove = id => setJobs(prev => prev.filter(j => j.id !== id))
  const edit = j => { setForm({ ...j, tags: (j.tags || []).join(', ') }); setEditingId(j.id) }

  const clearAll = () => { if(confirm('Clear all jobs?')) setJobs([]) }

  const exportCsv = () => {
    const head = ['title','company','salary','location','type','tags']
    const rows = jobs.map(j => [j.title, j.company, j.salary ?? '', j.location, j.type, (j.tags||[]).join('|')])
    const csv = [head.join(','), ...rows.map(r => r.map(v => (''+v).replace(/"/g,'""')).map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'jobs.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    let arr = jobs.filter(j =>
      [j.title, j.company, j.location, j.type, ...(j.tags||[])].join(' ').toLowerCase().includes(q)
    )
    if(sort === 'recent') arr = arr.sort((a,b)=>b.id-a.id)
    if(sort === 'salaryHigh') arr = arr.sort((a,b)=>(b.salary||0)-(a.salary||0))
    if(sort === 'salaryLow') arr = arr.sort((a,b)=>(a.salary||0)-(b.salary||0))
    return arr
  }, [jobs, query, sort])

  return (
    <div className="container">
      <header className="header">
        <div className="brand">Hiring Platform</div>
        <div className="toolbar">
          <button className="button ghost" onClick={exportCsv}>Export CSV</button>
          <button className="button danger" onClick={clearAll}>Clear</button>
        </div>
      </header>

      <section className="card">
        <form onSubmit={add} className="grid">
          <input className="input" placeholder="Job title *" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
          <input className="input" placeholder="Company *" value={form.company} onChange={e=>setForm({...form, company:e.target.value})} />
          <input className="input" type="number" placeholder="Salary (optional)" value={form.salary} onChange={e=>setForm({...form, salary:e.target.value})} />
          <input className="input" placeholder="Location" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} />
          <select value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
            <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
          </select>
          <input className="input" placeholder="Tags (comma separated, e.g. react, senior)" value={form.tags} onChange={e=>setForm({...form, tags:e.target.value})} />
          <div className="row">
            <button className="button">{editingId ? 'Update Job' : 'Post Job'}</button>
            {editingId && <button type="button" className="button ghost" onClick={()=>{ setForm(empty); setEditingId(null) }}>Cancel</button>}
          </div>
        </form>
      </section>

      <section className="row" style={{marginTop:12}}>
        <div className="card" style={{flex:3}}>
          <div className="row" style={{marginBottom:10}}>
            <input className="input" placeholder="Search..." value={query} onChange={e=>setQuery(e.target.value)} />
            <select value={sort} onChange={e=>setSort(e.target.value)}>
              <option value="recent">Sort: Recent</option>
              <option value="salaryHigh">Sort: Salary (High→Low)</option>
              <option value="salaryLow">Sort: Salary (Low→High)</option>
            </select>
          </div>

          <div className="table">
            {filtered.length === 0 && <div className="badge">No jobs yet</div>}
            {filtered.map(j => (
              <div key={j.id} className="job">
                <div>
                  <div className="title">{j.title} <span className="meta"> @ {j.company}</span></div>
                  <div className="meta">{j.location} • {j.type} {j.salary ? `• $${j.salary.toLocaleString()}` : ''}</div>
                  <div className="meta">{(j.tags||[]).map(t => <span key={t} className="badge" style={{marginRight:6}}>{t}</span>)}</div>
                </div>
                <div className="row" style={{flex:'0 0 auto'}}>
                  <button className="button ghost" onClick={()=>edit(j)}>Edit</button>
                  <button className="button danger" onClick={()=>remove(j.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="card" style={{flex:1}}>
          <div className="meta">Stats</div>
          <hr/>
          <div className="row">
            <span className="badge">Total: {jobs.length}</span>
            <span className="badge">Filtered: {filtered.length}</span>
          </div>
          <hr/>
          <div className="meta">Tip: use tags like <b>react</b> or <b>nextjs</b> for quick filtering.</div>
        </aside>
      </section>

      <footer>Built with React + Vite • Data persists in your browser localStorage</footer>
    </div>
  )
}
